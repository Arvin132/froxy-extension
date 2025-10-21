interface ManualInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ManualInput: React.FC<ManualInputProps> = ({ value, onChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Paste Message for Analysis
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the suspicious message here..."
        className="w-full h-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all resize-none text-sm text-gray-900"
      />
    </div>
  );
};
