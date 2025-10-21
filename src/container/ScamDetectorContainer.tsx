import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { ModeToggle } from '../components/ModeToggle';
import { ManualInput } from '../components/ManualInput';
import { StatusBadge } from '../components/StatusBadge';
import { ThreatIndicator } from '../components/ThreatIndicator';
import { AnalyzeButton } from '../components/AnalyzeButton';
import { InfoFooter } from '../components/InfoFooter';
import { RiskFactors } from '../components/RiskFactors';
import { getStatus, getGradientColor } from '../utils/helper';
import { AnalysisMode } from '../types';
import { apiService } from '../services/api';

export const ScamDetectorContainer: React.FC = () => {
  const [mode, setMode] = useState<AnalysisMode>('auto');
  const [manualText, setManualText] = useState<string>('');
  const [scamScore, setScamScore] = useState<number | null>(null);
  const [riskFactors, setRiskFactors] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiHealthy, setApiHealthy] = useState<boolean>(false);

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
  
  const handleAnalyze = async (): Promise<void> => {
    // Validate manual mode has text
    if (mode === 'manual' && !manualText.trim()) {
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
      if (mode === 'manual') {
        // Analyze manual text
        const result = await apiService.analyzeMessage(manualText);
        console.log(result)
        setScamScore(result.score);
        setRiskFactors(result.labels);
      } else {
        // Auto-detect from page (work in progress)
        setError('Auto-detection feature is coming soon!');
      }
    } catch (err) {
      console.error('Analysis failed:', err);
      setError(err instanceof Error ? err.message : 'Analysis failed. Please try again.');
      setScamScore(null);
      setRiskFactors([]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleModeChange = (newMode: AnalysisMode): void => {
    setMode(newMode);
    // Reset analysis when switching modes
    setScamScore(null);
    setRiskFactors([]);
    setManualText('');
    setError(null);
  };
  
  const status = getStatus(scamScore);
  const StatusIcon = status.icon;

  // Disable analyze button if in manual mode and no text, or if API is not healthy
  const isAnalyzeDisabled = (mode === 'manual' && !manualText.trim()) || !apiHealthy;

  return (
    <div className="w-96 bg-white rounded-2xl shadow-2xl overflow-hidden">
      <Header />
      
      <div className="p-6">
        {!apiHealthy && (
          <div className="mb-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-3">
            <p className="text-xs text-yellow-800 text-center">
              ⚠️ Backend not connected. Start your API server on port 8000.
            </p>
          </div>
        )}

        <ModeToggle mode={mode} onModeChange={handleModeChange} />
        
        {mode === 'manual' && (
          <ManualInput value={manualText} onChange={setManualText} />
        )}
        
        { riskFactors.length > 0 && <RiskFactors riskFactors={riskFactors} />}
        
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
        
        <InfoFooter scamScore={scamScore} mode={mode} error={error} />
      </div>
    </div>
  );
};

