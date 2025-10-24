interface AnalysisContentProps {
  content: string;
}

export const AnalysisContent: React.FC<AnalysisContentProps> = ({ content }) => {
  return (
    <div className="mb-6 bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
      <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Analysis Details
      </h3>
      <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
        {content}
      </div>
    </div>
  );
};