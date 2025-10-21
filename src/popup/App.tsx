import { useState, useEffect } from 'react';
import { AuthContainer } from '../container/AuthContainer';
import { ScamDetectorContainer } from '../container/ScamDetectorContainer';
import { apiService } from '../services/api';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (apiService.isAuthenticated()) {
        try {
          // Verify token is still valid
          await apiService.getCurrentUser();
          setIsAuthenticated(true);
        } catch {
          // Token is invalid, clear it
          apiService.logout();
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return (
      <div className="w-96 h-96 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? (
    <ScamDetectorContainer />
  ) : (
    <AuthContainer onAuthSuccess={handleAuthSuccess} />
  );
};

export default App;