import { LucideIcon } from 'lucide-react';

export interface Status {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: LucideIcon;
}

export type Platform = 'whatsapp' | 'telegram' | 'messenger' | 'generic';

// API Request Types
export interface ChatMessage {
  sender: 'user' | 'other';
  content: string;
}

export interface AnalysisRequest {
  chat_content: string;
  platform: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

// API Response Types
export interface AnalysisResponse {
  analysis_id: string;
  score: number;
  risk: string;
  labels: string[];
  analysis_content: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface UserResponse {
  id: string;
  email: string;
  created_at: string;
}