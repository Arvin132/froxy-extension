import { useState } from 'react';
import { Header } from '../components/Header';
import { AuthForm } from '../components/AuthForm';
import { apiService } from '../services/api';

interface AuthContainerProps {
  onAuthSuccess: () => void;
}

export const  AuthContainer: React.FC<AuthContainerProps> = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      if (mode === 'login') {
        await apiService.login({ username: email, password });
        onAuthSuccess();
      } else {
        await apiService.register({ email, password });
        setMode('login')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError(null);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
      <Header />
      
      <div className="p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          {mode === 'login' 
            ? 'Sign in to access Froxy chat protection' 
            : 'Sign up to start protecting your chats'}
        </p>

        <AuthForm
          mode={mode}
          onSubmit={handleSubmit}
          onToggleMode={handleToggleMode}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};