import { AlertCircle } from 'lucide-react';

interface RiskFactorsProps {
  riskFactors: string[];
}

export const RiskFactors: React.FC<RiskFactorsProps> = ({ riskFactors }) => {
  if (riskFactors.length === 0) return null;

  return (
    <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertCircle className="w-5 h-5 text-red-600" />
        <h3 className="text-sm font-bold text-red-800">Risk Factors Detected</h3>
      </div>
      <ul className="space-y-2">
        {riskFactors.map((factor, index) => (
          <li key={index} className="text-xs text-red-700 flex items-start gap-2">
            <span className="text-red-600 mt-0.5">•</span>
            <span>{factor}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
