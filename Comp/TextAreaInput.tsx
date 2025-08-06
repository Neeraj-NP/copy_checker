
import React from 'react';

interface TextAreaInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  icon: React.ReactNode;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({ id, label, placeholder, value, onChange, icon }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-full flex flex-col">
      <label htmlFor={id} className="flex items-center text-lg font-semibold text-gray-700 mb-3">
        <span className="mr-2 text-blue-500">{icon}</span>
        {label}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={12}
        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 flex-grow resize-none text-gray-700 bg-gray-50"
      />
    </div>
  );
};
