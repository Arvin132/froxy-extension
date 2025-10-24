import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { PlatformSelector } from '../components/PlatformSelector';
import { ManualInput } from '../components/ManualInput';
import { StatusBadge } from '../components/StatusBadge';
import { ThreatIndicator } from '../components/ThreatIndicator';
import { AnalyzeButton } from '../components/AnalyzeButton';
import { InfoFooter } from '../components/InfoFooter';
import { RiskFactors } from '../components/RiskFactors';
import { getStatus, getGradientColor } from '../utils/helper';
import { Platform } from '../types';
import { apiService } from '../services/api';
import { AnalysisContent } from '@/components/AnalysisContent';

export const ScamDetectorContainer: React.FC = () => {
  const [platform, setPlatform] = useState<Platform>('whatsapp');
  const [manualText, setManualText] = useState<string>('');
  const [scamScore, setScamScore] = useState<number | null>(null);
  const [riskFactors, setRiskFactors] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiHealthy, setApiHealthy] = useState<boolean>(false);
  const [analysisContent, setAnalysisContent] = useState<string>('');

  // Check API connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const isConnected = await apiService.checkConnection();
        setApiHealthy(isConnected);
      } catch (err) {
        console.error('API connection check failed:', err);
        setApiHealthy(false);
      }
    };

    checkConnection();
  }, []);

  const handleLogout = () => {
    apiService.logout();
    window.location.reload(); // Reload to show auth screen
  };
  
  const handleAnalyze = async (): Promise<void> => {
    // Validate text is present
    if (!manualText.trim()) {
      return;
    }

    // Check API health
    if (!apiHealthy) {
      setError('Backend API is not available. Make sure it\'s running on localhost:8000');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    
    try {
      const result = await apiService.analyzeMessage(manualText, platform);
      setScamScore(result.score);
      setRiskFactors(result.labels);
      setAnalysisContent(result.analysis_content);
    } catch (err) {
      console.error('Analysis failed:', err);
      setError(err instanceof Error ? err.message : 'Analysis failed. Please try again.');
      setScamScore(null);
      setRiskFactors([]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePlatformChange = (newPlatform: Platform): void => {
    setPlatform(newPlatform);
    setScamScore(null);
    setRiskFactors([]);
    setError(null);
    setAnalysisContent('')
  };
  
  const status = getStatus(scamScore);
  const StatusIcon = status.icon;

  // Disable analyze button if no text or API not healthy
  const isAnalyzeDisabled = !manualText.trim() || !apiHealthy;

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      <Header />
      
      <div className="p-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-red-600 transition-colors font-medium"
          >
            Logout
          </button>
        </div>

        {!apiHealthy && (
          <div className="mb-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-3">
            <p className="text-xs text-yellow-800 text-center">
              ⚠️ Backend not connected. Start your API server on port 8000.
            </p>
          </div>
        )}

        <PlatformSelector selectedPlatform={platform} onChange={handlePlatformChange} />
        
        <ManualInput value={manualText} onChange={setManualText} platform={platform} />

        {analysisContent && <AnalysisContent content={analysisContent} />}
        
        {riskFactors.length > 0 && <RiskFactors riskFactors={riskFactors} />}
        
        <StatusBadge status={status} StatusIcon={StatusIcon} />
        
        <ThreatIndicator 
          scamScore={scamScore} 
          getGradientColor={getGradientColor} 
        />
        
        <AnalyzeButton 
          onAnalyze={handleAnalyze} 
          isAnalyzing={isAnalyzing}
          disabled={isAnalyzeDisabled}
        />
        
        <InfoFooter scamScore={scamScore} platform={platform} error={error} />
      </div>
    </div>
  );
};