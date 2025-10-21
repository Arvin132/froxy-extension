import { Sparkles, FileText } from 'lucide-react';
import { AnalysisMode } from '../types';

interface ModeToggleProps {
  mode: AnalysisMode;
  onModeChange: (mode: AnalysisMode) => void;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ mode, onModeChange }) => {
  return (
    <div className="mb-6">
      <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
        <button
          onClick={() => onModeChange('auto')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold transition-all duration-200 ${
            mode === 'auto'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm">Auto Detect</span>
        </button>
        <button
          onClick={() => onModeChange('manual')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold transition-all duration-200 ${
            mode === 'manual'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span className="text-sm">Paste Text</span>
        </button>
      </div>
    </div>
  );
};