import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { TextAreaInput } from './components/TextAreaInput';
import { EvaluationCard } from './components/EvaluationCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { evaluateAnswer } from './services/geminiService';
import type { EvaluationResult } from './types';
import { FileText, UserSquare } from './components/icons/EditorIcons';

const DEMO_ANSWER_KEY = "Photosynthesis is the process used by plants, algae, and certain bacteria to convert light energy into chemical energy. This process involves taking in carbon dioxide (CO2) and water (H2O) and using sunlight to convert them into glucose (a sugar that serves as food) and oxygen (O2). The green pigment in plants, called chlorophyll, is essential for capturing the light energy. The overall balanced chemical equation for photosynthesis is: 6CO2 + 6H2O + Light Energy → C6H12O6 + 6O2.";
const DEMO_STUDENT_ANSWER = "Photosynthesis is how plants make food. They use sunlight, water, and carbon dioxide from the air. They produce sugar for energy and release oxygen for us to breathe. This process is why plants are green.";


const App: React.FC = () => {
  const [answerKey, setAnswerKey] = useState(DEMO_ANSWER_KEY);
  const [studentAnswer, setStudentAnswer] = useState(DEMO_STUDENT_ANSWER);
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEvaluate = useCallback(async () => {
    if (!answerKey.trim() || !studentAnswer.trim()) {
      setError('Please provide both the answer key and the student\'s answer.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setEvaluationResult(null);
    try {
      const result = await evaluateAnswer(answerKey, studentAnswer);
      setEvaluationResult(result);
    } catch (err) {
      console.error(err);
      setError('An error occurred while evaluating the answer. Please check the console for details and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [answerKey, studentAnswer]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <TextAreaInput
            id="answer-key"
            label="Answer Key / Rubric"
            placeholder="Enter the official answer key or marking criteria here..."
            value={answerKey}
            onChange={(e) => setAnswerKey(e.target.value)}
            icon={<FileText />}
          />
          <TextAreaInput
            id="student-answer"
            label="Student's Answer"
            placeholder="Enter the student's answer here..."
            value={studentAnswer}
            onChange={(e) => setStudentAnswer(e.target.value)}
            icon={<UserSquare />}
          />
        </div>

        <div className="text-center mb-8">
          <button
            onClick={handleEvaluate}
            disabled={isLoading || !answerKey.trim() || !studentAnswer.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-transform duration-150 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            {isLoading ? 'Evaluating...' : 'Evaluate Answer'}
          </button>
        </div>

        {isLoading && <LoadingSpinner />}
        
        {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md max-w-3xl mx-auto" role="alert">
                <p className="font-bold">Error</p>
                <p>{error}</p>
            </div>
        )}

        {evaluationResult && (
          <div className="mt-8 max-w-5xl mx-auto">
             <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Evaluation Result</h2>
            <EvaluationCard result={evaluationResult} />
          </div>
        )}
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Powered by Gemini API. Designed for educational purposes.</p>
      </footer>
    </div>
  );
};

export default App;