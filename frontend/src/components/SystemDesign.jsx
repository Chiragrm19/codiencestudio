import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import ComponentCard from './ComponentCard';
import AntiPromptButton from './AntiPromptButton';

const SystemDesign = ({ design, onComponentClick }) => {
  const workflowRef = useRef(null);
  const architectureRef = useRef(null);
  const [activeTab, setActiveTab] = useState('workflow');

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'base',
      themeVariables: {
        primaryColor: '#ffffff',
        primaryTextColor: '#111827',
        lineColor: '#9ca3af',
      },
      flowchart: { curve: 'basis' }
    });
  }, []);

  // Re-render mermaid when tab switches
  useEffect(() => {
    if (!design) return;
    
    // Tiny delay to ensure DOM is ready
    setTimeout(() => {
      try {
        if (activeTab === 'workflow' && workflowRef.current) {
          workflowRef.current.removeAttribute('data-processed');
          workflowRef.current.innerHTML = design.workflow;
          mermaid.contentLoaded();
        }
        if (activeTab === 'architecture' && architectureRef.current) {
          architectureRef.current.removeAttribute('data-processed');
          architectureRef.current.innerHTML = design.architecture;
          mermaid.contentLoaded();
        }
      } catch (e) {
        console.error("Mermaid render error", e);
      }
    }, 50);
  }, [design, activeTab]);

  if (!design) return null;

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in duration-500">
      {/* Dashboard Sub-Nav Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50/50">
        {[
          { id: 'workflow', label: 'System Workflow' },
          { id: 'architecture', label: 'Infrastructure View' },
          { id: 'dependencies', label: 'Components & Tech' },
          { id: 'apis', label: 'API Endpoints' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 px-6 font-semibold text-sm transition-colors border-b-2 ${
              activeTab === tab.id 
                ? 'border-blue-600 text-blue-700 bg-white' 
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-8">
        
        {activeTab === 'workflow' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex justify-between items-center bg-blue-50 p-4 rounded-xl border border-blue-100">
               <div>
                  <h3 className="font-bold text-blue-900">Workflow aligned to {design.sdlcModel}</h3>
                  <p className="text-sm text-blue-700 mt-1">This flowchart incorporates deployment pipelines and user interaction loops optimized for your methodology.</p>
               </div>
               <div className="text-right">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-500 block">Est. Cost</span>
                  <span className="font-bold text-gray-900">{design.estimatedCost}</span>
               </div>
            </div>
            <div className="mermaid flex items-center justify-center bg-slate-50 min-h-[400px] border border-gray-100 rounded-2xl p-4" ref={workflowRef}>
              {design.workflow}
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="space-y-6 animate-in fade-in">
             <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
               <h3 className="font-bold text-purple-900">Infrastructure Visualization</h3>
               <p className="text-sm text-purple-700 mt-1">Abstract network topologies and container boundaries mapping across your application scale.</p>
            </div>
            <div className="mermaid flex items-center justify-center bg-slate-50 min-h-[400px] border border-gray-100 rounded-2xl p-4" ref={architectureRef}>
              {design.architecture}
            </div>
          </div>
        )}

        {activeTab === 'dependencies' && (
          <div className="animate-in fade-in space-y-6">
             <div className="flex justify-between items-center mb-4">
               <div>
                 <h3 className="text-xl font-bold text-gray-900">Project Dependencies</h3>
                 <p className="text-gray-500">Click any card to view detailed installation and configuration instructions.</p>
               </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
               {design.components.map((comp, i) => (
                 <ComponentCard key={i} component={comp} onClick={onComponentClick} />
               ))}
             </div>
          </div>
        )}

        {activeTab === 'apis' && (
          <div className="animate-in fade-in">
            <h3 className="text-xl font-bold text-gray-900 mb-6">REST API Definitions</h3>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
               <div className="bg-gray-50 grid grid-cols-12 px-6 py-3 border-b border-gray-200 font-semibold text-gray-600 text-sm tracking-wider uppercase">
                 <div className="col-span-2">Method</div>
                 <div className="col-span-4">Endpoint</div>
                 <div className="col-span-6">Description</div>
               </div>
               <div className="divide-y divide-gray-100">
                 {design.apiEndpoints.map((endpoint, i) => (
                   <div key={i} className="grid grid-cols-12 px-6 py-4 items-center">
                     <div className="col-span-2">
                       <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                         endpoint.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                         endpoint.method === 'POST' ? 'bg-green-100 text-green-700' :
                         endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                         endpoint.method === 'DELETE' ? 'bg-red-100 text-red-700' :
                         'bg-purple-100 text-purple-700'
                       }`}>
                         {endpoint.method}
                       </span>
                     </div>
                     <div className="col-span-4 font-mono text-sm font-semibold text-gray-800 break-all pr-4">
                       {endpoint.path}
                     </div>
                     <div className="col-span-6 text-gray-600 text-sm">
                       {endpoint.description}
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}

      </div>
      
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <AntiPromptButton design={design} />
      </div>

    </div>
  );
};

export default SystemDesign;
