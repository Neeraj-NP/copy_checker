
export interface EvaluationResult {
  score: number;
  maxScore: number;
  reasoning: string;
  feedback: string;
  missingPoints: string[];
  factualErrors: string[];
  correctedAnswer: string;
}
