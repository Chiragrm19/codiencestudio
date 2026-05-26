import React from 'react';
import { Database, Server, Cloud, Layers } from 'lucide-react';

const ComponentCard = ({ component, onClick }) => {
  const getIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('database') || n.includes('postgres') || n.includes('redis') || n.includes('cache') || n.includes('store')) {
      return <Database className="w-6 h-6 text-blue-500" />;
    }
    if (n.includes('server') || n.includes('service') || n.includes('worker') || n.includes('broker')) {
      return <Server className="w-6 h-6 text-green-500" />;
    }
    if (n.includes('gateway') || n.includes('cdn') || n.includes('cloud')) {
      return <Cloud className="w-6 h-6 text-purple-500" />;
    }
    return <Layers className="w-6 h-6 text-gray-500" />;
  };

  return (
    <div 
      onClick={() => onClick(component)}
      className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer flex flex-col gap-3 h-full"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-50 rounded-lg">
          {getIcon(component.name)}
        </div>
        <h3 className="font-semibold text-gray-900">{component.name}</h3>
      </div>
      <div className="text-sm font-medium text-blue-600 bg-blue-50 w-max px-2 py-1 rounded inline-block">
        {component.technology}
      </div>
      <p className="text-sm text-gray-600 mt-1 flex-grow">
        {component.purpose}
      </p>
    </div>
  );
};

export default ComponentCard;
