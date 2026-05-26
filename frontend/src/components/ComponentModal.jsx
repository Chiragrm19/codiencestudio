import React, { useState } from 'react';
import { X, Copy, Terminal } from 'lucide-react';

const getInstructions = (tech) => {
  const t = tech.toLowerCase();
  if (t.includes('kong') || t.includes('api gateway')) {
    return {
      docker: 'docker run -d --name kong -e KONG_DATABASE=off -p 8000:8000 kong:latest',
      aws: 'aws apigateway create-rest-api --name "my-api" --region us-east-1',
      connect: 'KONG_URL=http://localhost:8000'
    };
  }
  if (t.includes('postgres') || t.includes('relational')) {
    return {
      docker: 'docker run -d --name postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 postgres:15',
      aws: 'aws rds create-db-instance --db-instance-identifier mydb --db-instance-class db.t3.micro --engine postgres --master-username admin --master-user-password secret',
      connect: 'postgresql://localhost:5432/mydb'
    };
  }
  if (t.includes('redis') || t.includes('cache')) {
    return {
      docker: 'docker run -d --name redis -p 6379:6379 redis:7-alpine',
      aws: 'aws elasticache create-cache-cluster --cache-cluster-id myredis --cache-node-type cache.t3.micro --engine redis --num-cache-nodes 1',
      connect: 'redis://localhost:6379'
    };
  }
  if (t.includes('rabbitmq') || t.includes('message broker')) {
    return {
      docker: 'docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management',
      aws: 'aws mq create-broker --broker-name mybroker --engine-type RABBITMQ --host-instance-type mq.t3.micro',
      connect: 'amqp://localhost:5672'
    };
  }
  if (t.includes('node.js') || t.includes('service')) {
    return {
      docker: 'docker run -d --name node-app -p 3000:3000 node:18-alpine',
      aws: '# Typically deployed via ECS, EKS, or AppRunner\naws ecs create-cluster --cluster-name my-cluster',
      connect: 'http://localhost:3000'
    };
  }
  
  return {
    docker: `# No specific Docker command found for ${tech}\nPlease refer to official documentation.`,
    aws: `# No specific AWS command found for ${tech}`,
    connect: `CONNECTION_URL_FOR_${tech.toUpperCase().replace(/\\s+/g, '_')}=...`
  };
};

const ComponentModal = ({ component, onClose }) => {
  const [activeTab, setActiveTab] = useState('install');
  const [copiedText, setCopiedText] = useState(null);

  if (!component) return null;

  const instructions = getInstructions(component.technology);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{component.name}</h2>
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 font-medium rounded-full text-sm">
              <Terminal className="w-4 h-4" />
              {component.technology}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b border-gray-100 px-6">
          <button 
            onClick={() => setActiveTab('install')}
            className={`py-4 px-2 font-medium border-b-2 mr-6 transition-colors ${activeTab === 'install' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            Install Instructions
          </button>
          <button 
            onClick={() => setActiveTab('connect')}
            className={`py-4 px-2 font-medium border-b-2 transition-colors ${activeTab === 'connect' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            Connect Config
          </button>
        </div>

        <div className="p-6 bg-gray-50 flex-grow">
          {activeTab === 'install' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wider">Docker Run Command</h4>
                  <button 
                    onClick={() => handleCopy(instructions.docker, 'docker')}
                    className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {copiedText === 'docker' ? 'Copied!' : <><Copy className="w-3 h-3" /> Copy</>}
                  </button>
                </div>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm font-mono whitespace-pre-wrap">
                  {instructions.docker}
                </pre>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wider">AWS CLI Command</h4>
                  <button 
                    onClick={() => handleCopy(instructions.aws, 'aws')}
                    className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {copiedText === 'aws' ? 'Copied!' : <><Copy className="w-3 h-3" /> Copy</>}
                  </button>
                </div>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm font-mono whitespace-pre-wrap">
                  {instructions.aws}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'connect' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wider">Environment Config</h4>
                <button 
                  onClick={() => handleCopy(instructions.connect, 'connect')}
                  className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
                >
                  {copiedText === 'connect' ? 'Copied!' : <><Copy className="w-3 h-3" /> Copy</>}
                </button>
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm font-mono whitespace-pre-wrap">
                {instructions.connect}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComponentModal;
