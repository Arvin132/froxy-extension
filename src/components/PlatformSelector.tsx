import { MessageSquare } from 'lucide-react';
import { Platform } from '../types';

interface PlatformOption {
  value: Platform;
  label: string;
  icon: string;
}

const platformOptions: PlatformOption[] = [
  { value: 'whatsapp', label: 'WhatsApp', icon: '💬' },
  { value: 'telegram', label: 'Telegram', icon: '✈️' },
  { value: 'messenger', label: 'Messenger', icon: '💬' },
  { value: 'generic', label: 'Generic Text', icon: '📝' },
];

interface PlatformSelectorProps {
  selectedPlatform: Platform;
  onChange: (platform: Platform) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({ 
  selectedPlatform, 
  onChange 
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <MessageSquare className="w-4 h-4" />
        Select Platform Template
      </label>
      <div className="grid grid-cols-2 gap-3">
        {platformOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`
              flex items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200
              ${selectedPlatform === option.value
                ? 'border-orange-500 bg-orange-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50'
              }
            `}
          >
            <span className="text-2xl">{option.icon}</span>
            <span className={`text-sm font-semibold ${
              selectedPlatform === option.value ? 'text-orange-600' : 'text-gray-700'
            }`}>
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
