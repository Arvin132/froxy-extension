import { useState, useEffect } from 'react';
import { AuthContainer } from '../container/AuthContainer';
import { ScamDetectorContainer } from '../container/ScamDetectorContainer';
import { apiService } from '../services/api';

const FIXED_WIDTH = '450px';
const FIXED_HEIGHT = '600px';

const preventPopupClose = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (apiService.isAuthenticated()) {
        try {
          await apiService.getCurrentUser();
          setIsAuthenticated(true);
        } catch {
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
      <div className="w-96 h-96 flex items-center" onMouseDown={preventPopupClose}>
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ width: FIXED_WIDTH, height: FIXED_HEIGHT }}>
      {isAuthenticated ? (
        <ScamDetectorContainer />
      ) : (
        <AuthContainer onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  )
};

export default App;