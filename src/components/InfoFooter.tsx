import { Platform } from '../types';

interface InfoFooterProps {
  scamScore: number | null;
  platform: Platform;
  error?: string | null;
}

export const InfoFooter: React.FC<InfoFooterProps> = ({ scamScore, platform, error }) => {
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
      return 'Select a template, paste your chat, and click analyze';
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