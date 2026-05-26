import React, { useState, useRef } from 'react';
import { FileUp, Sparkles, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';

const ProjectWizard = ({ onGenerate, isLoading }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: '',
    inputType: 'text', // 'text' or 'file'
    prompt: '',
    fileName: '',
    targetCustomers: '',
    businessGoals: '',
    sdlcModel: 'Agile',
    selectedComponents: {
      auth: true,
      database: true,
      payment: false,
      realtime: false,
      cache: false,
      storage: false
    }
  });

  const fileInputRef = useRef(null);

  const updateForm = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const toggleComponent = (key) => {
    setFormData(prev => ({
      ...prev,
      selectedComponents: {
        ...prev.selectedComponents,
        [key]: !prev.selectedComponents[key]
      }
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateForm('fileName', file.name);
      updateForm('inputType', 'file');
      updateForm('prompt', `Mock extracted content from ${file.name}`);
    }
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleGenerate = () => {
    onGenerate(formData);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Stepper Header */}
      <div className="mb-10 flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 z-0 rounded-full"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-500 z-0 rounded-full transition-all duration-300"
          style={{ width: `${(step - 1) * 50}%` }}
        ></div>

        {[1, 2, 3].map((num) => (
          <div key={num} className="relative z-10 flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-colors ${
              step >= num ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-400'
            }`}>
              {step > num ? <CheckCircle2 className="w-6 h-6" /> : num}
            </div>
            <span className={`text-xs font-semibold ${step >= num ? 'text-gray-900' : 'text-gray-400'}`}>
              {num === 1 ? 'Project setup' : num === 2 ? 'Analysis' : 'Architecture'}
            </span>
          </div>
        ))}
      </div>

      {/* Main Form Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Project Setup</h2>
              <p className="text-gray-500 mt-1">Let's start with the basics of what you're building.</p>
            </div>
            
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">Project Name</label>
              <input 
                type="text" 
                value={formData.projectName}
                onChange={(e) => updateForm('projectName', e.target.value)}
                autoFocus
                placeholder="e.g. Acme React E-commerce"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-base"
              />
            </div>

            <div className="space-y-4">
               <label className="block text-sm font-semibold text-gray-700">Input Method</label>
               <div className="grid grid-cols-2 gap-4">
                 <button 
                  onClick={() => updateForm('inputType', 'text')}
                  className={`p-4 rounded-xl border-2 text-left transition ${formData.inputType === 'text' ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                 >
                   <div className="font-bold text-gray-900 mb-1">Text Prompt</div>
                   <div className="text-sm text-gray-500">Describe your app manually</div>
                 </button>
                 <button 
                  onClick={() => fileInputRef.current.click()}
                  className={`p-4 rounded-xl border-2 text-left flex items-center justify-between transition ${formData.inputType === 'file' ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                 >
                   <div>
                     <div className="font-bold text-gray-900 mb-1">Upload Plan (PDF/Doc)</div>
                     <div className="text-sm text-gray-500">{formData.fileName || 'Extract architecture from docs'}</div>
                   </div>
                   <FileUp className="w-6 h-6 text-gray-400" />
                 </button>
                 <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx,.txt" />
               </div>
            </div>

            {formData.inputType === 'text' && (
               <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                 <label className="block text-sm font-semibold text-gray-700">App Description</label>
                 <textarea 
                   value={formData.prompt}
                   onChange={(e) => updateForm('prompt', e.target.value)}
                   placeholder="Describe your app idea in detail..."
                   className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                 />
               </div>
            )}
            
            <div className="pt-6 flex justify-end">
              <button 
                onClick={handleNext}
                disabled={!formData.projectName || !formData.prompt}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-300">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Requirements Gathering</h2>
              <p className="text-gray-500 mt-1">Help the AI tailor the architecture to your business needs.</p>
            </div>
            
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">Who are the target customers?</label>
              <input 
                type="text" 
                value={formData.targetCustomers}
                onChange={(e) => updateForm('targetCustomers', e.target.value)}
                placeholder="e.g. Enterprise B2B users, Gen Z consumers, internal teams"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">Primary Business Goals & Scale</label>
              <textarea 
                value={formData.businessGoals}
                onChange={(e) => updateForm('businessGoals', e.target.value)}
                placeholder="e.g. Expecting 10k DAU in 6 months, prioritizing data security over latency..."
                className="w-full h-28 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
            
            <div className="pt-6 flex justify-between">
              <button 
                onClick={() => setStep(1)}
                className="px-6 py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition"
              >
                Back
              </button>
              <button 
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
              >
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-300">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Technical Constraints</h2>
              <p className="text-gray-500 mt-1">Select your desired methodology and minimum core components.</p>
            </div>
            
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">SDLC Methodology</label>
              <select 
                value={formData.sdlcModel}
                onChange={(e) => updateForm('sdlcModel', e.target.value)}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
              >
                <option value="Agile">Agile / Scrum (Iterative, CI/CD focus)</option>
                <option value="Waterfall">Waterfall (Strict phases, monolith focus)</option>
                <option value="V-Model">V-Model (High validation, testing focus)</option>
                <option value="Kanban">Kanban (Continuous flow, microservices focus)</option>
              </select>
            </div>

            <div className="space-y-4">
               <label className="block text-sm font-semibold text-gray-700">Must-have System Components</label>
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                 {[
                   { id: 'auth', label: 'Authentication' },
                   { id: 'database', label: 'Relational DB' },
                   { id: 'payment', label: 'Payment Gateway' },
                   { id: 'realtime', label: 'WebSockets (Live)' },
                   { id: 'cache', label: 'Redis/Caching' },
                   { id: 'storage', label: 'Object/File Storage' }
                 ].map(item => (
                   <button
                     key={item.id}
                     onClick={() => toggleComponent(item.id)}
                     className={`p-3 text-sm font-medium border-2 rounded-xl text-left transition flex items-center justify-between ${
                       formData.selectedComponents[item.id] ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                     }`}
                   >
                     {item.label}
                     {formData.selectedComponents[item.id] && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                   </button>
                 ))}
               </div>
            </div>
            
            <div className="pt-8 flex justify-between items-center border-t border-gray-100">
              <button 
                onClick={() => setStep(2)}
                className="px-6 py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition"
              >
                Back
              </button>
              <button 
                onClick={handleGenerate}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-wait"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Architecture...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Engage AI Architect
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProjectWizard;
