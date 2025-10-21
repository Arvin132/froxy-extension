
interface ThreatIndicatorProps {
  scamScore: number | null;
  getGradientColor: (score: number) => string;
}

export const ThreatIndicator: React.FC<ThreatIndicatorProps> = ({ scamScore, getGradientColor }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-700">Threat Level</span>
        <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          {scamScore === null ? 'N/A' : scamScore}
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="relative h-5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <div 
          className={`h-full bg-gradient-to-r ${scamScore === null ? 'from-gray-300 to-gray-400' : getGradientColor(scamScore)} transition-all duration-500 rounded-full shadow-md`}
          style={{ width: `${scamScore === null ? 0 : scamScore}%` }}
        />
      </div>
      
      {/* Scale Labels */}
      <div className="flex justify-between text-xs font-medium text-gray-600">
        <span>0</span>
        <span className="text-orange-600">Safe</span>
        <span className="text-red-600">Danger</span>
        <span>100</span>
      </div>
    </div>
  );
};