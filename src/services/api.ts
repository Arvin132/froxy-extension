import { API_CONFIG } from '../config/api';
import { AnalysisResponse, AnalysisRequest, LoginRequest, RegisterRequest, AuthResponse, UserResponse, ChatMessage } from '../types';



class ApiService {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    // Load token from storage on initialization
    this.token = this.getStoredToken();
  }

  private getStoredToken(): string | null {
    try {
      return sessionStorage.getItem('froxy_token');
    } catch {
      return null;
    }
  }

  private setStoredToken(token: string): void {
    try {
      sessionStorage.setItem('froxy_token', token);
      this.token = token;
    } catch (error) {
      console.error('Failed to store token:', error);
    }
  }

  private clearStoredToken(): void {
    try {
      sessionStorage.removeItem('froxy_token');
      this.token = null;
    } catch (error) {
      console.error('Failed to clear token:', error);
    }
  }

  /**
   * Login user
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      // Backend expects form data for OAuth2
      const formData = new URLSearchParams();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);

      const response = await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();
      this.setStoredToken(data.access_token);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Register new user
   */
  async register(credentials: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.REGISTER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Registration failed');
      }

      const data = await response.json();
      this.setStoredToken(data.access_token);
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<UserResponse> {
    try {
      const response = await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.GET_ME}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get user');
      }

      return await response.json();
    } catch (error) {
      console.error('Get user error:', error);
      throw error;
    }
  }

  /**
   * Logout user
   */
  logout(): void {
    this.clearStoredToken();
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.token;
  }

  async analyzeMessage(message: string, platform: string = 'manual'): Promise<AnalysisResponse> {
    const requestBody: AnalysisRequest = {
      messages: [
        {
          sender: 'user',
          content: message,
        },
      ],
      platform: platform,
    };

    return this.sendAnalysisRequest(requestBody);
  }

  /**
   * Analyze multiple messages (auto mode - WhatsApp)
   */
  async analyzeMessages(messages: ChatMessage[], platform: string): Promise<AnalysisResponse> {
    const requestBody: AnalysisRequest = {
      messages: messages,
      platform: platform,
    };

    return this.sendAnalysisRequest(requestBody);
  }

  /**
   * Send analysis request to backend
   */
  private async sendAnalysisRequest(requestBody: AnalysisRequest): Promise<AnalysisResponse> {
    try {
      const response = await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.ANALYZE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Analysis failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Analysis error:', error);
      throw error;
    }
  }

  /**
   * Check if API is reachable
   */
  async checkConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/analysis/`, {
        method: 'GET',
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

export const apiService = new ApiService();