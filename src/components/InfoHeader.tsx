import { Scan } from 'lucide-react';

interface AnalyzeButtonProps {
  onAnalyze: () => void;
  isAnalyzing: boolean;
  disabled?: boolean;
}

export const AnalyzeButton: React.FC<AnalyzeButtonProps> = ({ onAnalyze, isAnalyzing, disabled }) => {
  return (
    <button
      onClick={onAnalyze}
      disabled={isAnalyzing || disabled}
      className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Scan className={`w-5 h-5 ${isAnalyzing ? 'animate-spin' : ''}`} />
      <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Message'}</span>
    </button>
  );
};