import React from 'react';

const UsageCounter = ({ promptsRemaining, onClear }) => {
  return (
    <div className="flex items-center gap-4 text-sm font-medium">
      <div className={`px-3 py-1 rounded-full ${promptsRemaining > 0 ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
        {promptsRemaining} prompts remaining today
      </div>
      {promptsRemaining === 0 && (
        <button 
          onClick={onClear}
          className="text-gray-500 hover:text-gray-800 underline text-xs"
        >
          Reset (Demo)
        </button>
      )}
    </div>
  );
};

export default UsageCounter;
