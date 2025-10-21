import { AnalysisMode } from '../types';

interface InfoFooterProps {
  scamScore: number | null;
  mode: AnalysisMode;
  error?: string | null;
}

export const InfoFooter: React.FC<InfoFooterProps> = ({ scamScore, mode, error }) => {
  if (error) {
    return (
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-center text-red-600">
          {error}
        </p>
      </div>
    );
  }

  const getMessage = () => {
    if (scamScore === null) {
      return mode === 'auto' 
        ? 'Auto detection will scan messages on this page (Coming Soon)'
        : 'Paste a message above and click analyze';
    }
    return 'Analysis complete';
  };

  return (
    <div className="mt-6 pt-4 border-t border-gray-200">
      <p className="text-xs text-center text-gray-500">
        {getMessage()}
      </p>
    </div>
  );
};