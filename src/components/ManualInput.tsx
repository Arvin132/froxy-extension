import { Platform } from '../types';

interface ManualInputProps {
  value: string;
  onChange: (value: string) => void;
  platform: Platform;
}

export const ManualInput: React.FC<ManualInputProps> = ({ value, onChange, platform }) => {
  const getPlaceholder = () => {
    switch (platform) {
      case 'whatsapp':
        return 'Paste WhatsApp chat here...\n\nExample:\n[10:30 AM, 1/15/2024] John: Hey!\n[10:31 AM, 1/15/2024] You: Hi there!';
      case 'telegram':
        return 'Paste Telegram chat here...\n\nExample:\nJohn [10:30 AM]\nHey!\nYou [10:31 AM]\nHi there!';
      case 'messenger':
        return 'Paste Messenger chat here...';
      case 'generic':
        return 'Paste any text message here...';
      default:
        return 'Paste your chat or message here...';
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        Paste {platform === 'generic' ? 'Message' : `${platform.charAt(0).toUpperCase() + platform.slice(1)} Chat`}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={getPlaceholder()}
        className="w-full h-40 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none text-sm text-gray-900 bg-white placeholder-gray-400"
      />
      <p className="mt-2 text-xs text-gray-500">
        Tip: Copy the entire conversation from {platform === 'generic' ? 'your source' : platform.charAt(0).toUpperCase() + platform.slice(1)} and paste it here
      </p>
    </div>
  );
};
