
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4">
        <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
                Copy Checker
            </h1>
            <p className="text-gray-500 mt-1">
                AI-Powered Answer Sheet Evaluator
            </p>
        </div>
      </div>
    </header>
  );
};
