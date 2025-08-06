
import React from 'react';
import type { EvaluationResult } from '../types';
import { CheckCircleIcon, XCircleIcon, LightbulbIcon, ClipboardCheckIcon } from './icons/FeedbackIcons';

interface EvaluationCardProps {
  result: EvaluationResult;
}

const ScoreCircle: React.FC<{ score: number; maxScore: number }> = ({ score, maxScore }) => {
    const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
    const circumference = 2 * Math.PI * 52;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    let colorClass = 'text-green-500';
    if (percentage < 75) colorClass = 'text-yellow-500';
    if (percentage < 40) colorClass = 'text-red-500';

    return (
        <div className="relative w-40 h-40">
            <svg className="w-full h-full" viewBox="0 0 120 120">
                <circle
                    className="text-gray-200"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="52"
                    cx="60"
                    cy="60"
                />
                <circle
                    className={`${colorClass} transition-all duration-1000 ease-in-out`}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="52"
                    cx="60"
                    cy="60"
                    transform="rotate(-90 60 60)"
                />
            </svg>
            <div className={`absolute inset-0 flex flex-col items-center justify-center ${colorClass}`}>
                <span className="text-4xl font-bold">{score}</span>
                <span className="text-lg">/ {maxScore}</span>
            </div>
        </div>
    );
};


export const EvaluationCard: React.FC<EvaluationCardProps> = ({ result }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="p-6 md:p-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="flex-shrink-0 flex flex-col items-center">
                    <ScoreCircle score={result.score} maxScore={result.maxScore} />
                    <p className="mt-4 text-center text-gray-600 italic max-w-xs">{result.reasoning}</p>
                </div>

                <div className="w-full">
                    <div className="space-y-6">
                        <InfoSection title="Constructive Feedback" icon={<LightbulbIcon className="text-yellow-500" />}>
                           <p className="text-gray-700">{result.feedback}</p>
                        </InfoSection>

                        {result.missingPoints.length > 0 && (
                             <InfoSection title="Missing Key Points" icon={<XCircleIcon className="text-red-500" />}>
                                <ul className="list-disc list-inside space-y-1 text-gray-700">
                                    {result.missingPoints.map((point, index) => <li key={index}>{point}</li>)}
                                </ul>
                            </InfoSection>
                        )}

                        {result.factualErrors.length > 0 && (
                             <InfoSection title="Factual Errors" icon={<XCircleIcon className="text-red-500" />}>
                                <ul className="list-disc list-inside space-y-1 text-gray-700">
                                    {result.factualErrors.map((error, index) => <li key={index}>{error}</li>)}
                                </ul>
                            </InfoSection>
                        )}
                        
                        {(result.missingPoints.length === 0 && result.factualErrors.length === 0) && (
                            <InfoSection title="Excellent Work!" icon={<CheckCircleIcon className="text-green-500" />}>
                                <p className="text-gray-700">No missing points or factual errors were found. Great job!</p>
                            </InfoSection>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-200">
                <InfoSection title="Corrected Answer" icon={<ClipboardCheckIcon className="text-blue-500" />}>
                    <div className="prose prose-blue max-w-none bg-blue-50/50 p-4 rounded-lg border border-blue-200">
                        <p>{result.correctedAnswer}</p>
                    </div>
                </InfoSection>
            </div>
        </div>
    </div>
  );
};

interface InfoSectionProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, icon, children }) => (
    <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
            <span className="mr-3">{icon}</span>
            {title}
        </h3>
        <div className="pl-9">
            {children}
        </div>
    </div>
)
