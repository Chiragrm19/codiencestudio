import React, { useState } from 'react';
import { Code2, CheckCircle2 } from 'lucide-react';

const AntiPromptButton = ({ design }) => {
  const [copied, setCopied] = useState(false);

  if (!design) return null;

  const handleCopy = () => {
    const prompt = `# AI Project Setup Request

You are an expert full-stack developer acting as my technical lead. Please build the following application based on the architecture design below.

## CORE BUSINESS REQUIREMENTS
- **Project Name**: ${design.name}
- **Target Customers**: ${design.targetCustomers || 'General Users'}
- **Business Goals Constraints**: ${design.businessGoals || 'Standard operational goals'}
- **SDLC Methodology to Follow**: ${design.sdlcModel || 'Agile'}

## SYSTEM OVERVIEW
${design.overview}

## TECH STACK INSTRUCTIONS
Please scaffold the project using the following components explicitly:
${design.components.map(c => `- ${c.name}: ${c.technology} (Purpose: ${c.purpose})`).join('\n')}

## INITIAL API ENDPOINTS TO STUB
${design.apiEndpoints.map(a => `- ${a.method} ${a.path}: ${a.description}`).join('\n')}

## IMPLEMENTATION INSTRUCTIONS
1. Initialize the repository structure following standard best practices for the chosen tech stack.
2. Implement the API endpoints as defined above.
3. Stub connecting to the databases/services.
4. Integrate the architectural patterns aligned with the ${design.sdlcModel} methodology.
5. Create a basic README.md with run instructions.

Proceed step-by-step. Let's build!`;

    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <button
      onClick={handleCopy}
      className={`relative overflow-hidden flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl font-bold transition-all duration-300 shadow-sm border ${
        copied 
          ? 'bg-green-50 text-green-700 border-green-200'
          : 'bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:shadow-lg hover:-translate-y-0.5 border-transparent'
      }`}
    >
      {copied ? (
        <>
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <span>Prompt Copied! Paste into Cursor or Emergent</span>
        </>
      ) : (
        <>
          <Code2 className="w-5 h-5" />
          <span>Generate Detailed AI Dev Prompt</span>
        </>
      )}
    </button>
  );
};

export default AntiPromptButton;
