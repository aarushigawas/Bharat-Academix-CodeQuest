// TODO: This component will be used for RAG-based explanations
// It will display detailed explanations for why a crop was recommended
// using retrieved agricultural knowledge from the vector database

interface RecommendationExplanationProps {
  crop: string;
  explanation?: string;
  sources?: string[];
}

export default function RecommendationExplanation({ crop, explanation, sources }: RecommendationExplanationProps) {
  // TODO: Implement RAG-based explanation generation
  // This will call the RAG service to get detailed explanations with citations
  
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
      <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
        Why {crop}?
      </h4>
      <p className="text-sm text-blue-800 dark:text-blue-300 mb-3">
        {explanation || 'Detailed explanation will be generated using RAG system...'}
      </p>
      {sources && sources.length > 0 && (
        <div className="text-xs text-blue-700 dark:text-blue-400">
          <strong>Sources:</strong> {sources.join(', ')}
        </div>
      )}
    </div>
  );
}
