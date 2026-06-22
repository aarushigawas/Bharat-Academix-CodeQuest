// TODO: This component will provide sustainability explanations using RAG
// It will explain why certain practices are recommended for sustainability

interface SustainabilityExplanationProps {
  topic: string;
  explanation?: string;
  bestPractices?: string[];
}

export default function SustainabilityExplanation({ topic, explanation, bestPractices }: SustainabilityExplanationProps) {
  // TODO: Implement RAG-based explanation generation
  // This will call the RAG service to get detailed sustainability explanations
  
  return (
    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
      <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">
        {topic}
      </h4>
      <p className="text-sm text-green-800 dark:text-green-300 mb-3">
        {explanation || 'Detailed explanation will be generated using RAG system...'}
      </p>
      {bestPractices && bestPractices.length > 0 && (
        <div>
          <p className="text-sm font-medium text-green-900 dark:text-green-300 mb-2">Best Practices:</p>
          <ul className="text-sm text-green-800 dark:text-green-300 list-disc list-inside space-y-1">
            {bestPractices.map((practice, index) => (
              <li key={index}>{practice}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
