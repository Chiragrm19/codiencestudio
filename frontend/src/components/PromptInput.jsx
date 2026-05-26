import React, { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';

const PromptInput = ({ onGenerate, isLoading, disabled }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim() || disabled || isLoading) return;
    onGenerate(prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto flex flex-col gap-3">
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={disabled || isLoading}
          placeholder={disabled ? "You've reached your limit of 5 prompts for today." : "Describe your app idea (e.g., 'A real-time chat app for remote teams' or 'An e-commerce clothing store')"}
          className="w-full h-32 p-4 pt-5 pr-12 text-gray-800 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-shadow text-lg disabled:opacity-50 disabled:bg-gray-50 placeholder:text-gray-400"
        />
        <div className="absolute bottom-4 left-4 flex gap-2">
           <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-200">
             <Sparkles className="w-3 h-3 text-blue-500" /> AI Architect
           </span>
        </div>
        <button
          type="submit"
          disabled={!prompt.trim() || disabled || isLoading}
          className="absolute bottom-4 right-4 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition disabled:opacity-50 disabled:hover:bg-blue-600 disabled:cursor-not-allowed group flex items-center justify-center"
        >
          {isLoading ? (
            <svg className="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          )}
        </button>
      </div>
    </form>
  );
};

export default PromptInput;
