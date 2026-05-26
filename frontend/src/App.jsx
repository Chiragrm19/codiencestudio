import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { supabase } from './lib/supabase';
import DashboardLayout from './components/DashboardLayout';
import ProjectWizard from './components/ProjectWizard';
import SystemDesign from './components/SystemDesign';
import ComponentModal from './components/ComponentModal';
import AuthModal from './components/AuthModal';

function App() {
  const [promptsRemaining, setPromptsRemaining] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [design, setDesign] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [userProjects, setUserProjects] = useState([]);
  
  // Supabase Auth State
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // If not logged in, load from local storage
    if (!user) {
      const savedDesign = localStorage.getItem('lastDesign');
      if (savedDesign) {
        try {
          const parsed = JSON.parse(savedDesign);
          setDesign(parsed);
          setProjectName(parsed.name || "Loaded Project");
        } catch (e) {
          console.error("Error parsing saved design");
        }
      }
    } else {
      loadUserProjects();
    }
  }, [user]);

  const loadUserProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setUserProjects(data || []);
    } catch (err) {
      console.error('Failed to load projects', err);
    }
  };

  const saveToSupabase = async (newDesign, formMeta) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([
          { 
            user_id: user.id, 
            name: formMeta.projectName,
            data: newDesign 
          }
        ]);
      if (error) throw error;
      console.log('Project saved to Supabase!');
    } catch (error) {
      console.error('Error saving to Supabase:', error);
    }
  };

  const handleGenerate = async (formData) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5001/api/generate-design', formData);
      const newDesign = response.data;
      
      setDesign(newDesign);
      setProjectName(formData.projectName);
      
      if (user) {
        await saveToSupabase(newDesign, formData);
      } else {
        localStorage.setItem('lastDesign', JSON.stringify(newDesign));
      }
      
    } catch (error) {
      console.error("Failed to generate design", error);
      alert("Failed to generate architecture design. Please ensure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetProject = () => {
    setDesign(null);
    setProjectName("");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    resetProject();
  };

  return (
    <DashboardLayout 
      projectName={projectName} 
      user={user} 
      userProjects={userProjects}
      onLoginClick={() => setIsAuthModalOpen(true)}
      onLogoutClick={handleLogout}
      onSelectProject={(proj) => {
        setDesign(proj.data);
        setProjectName(proj.name);
      }}
    >
      <div className="p-8 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
           {!design ? (
             <div>
               <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
               <p className="text-gray-500 mt-1">Configure your system architecture requirements</p>
             </div>
           ) : (
             <div className="flex justify-between items-center w-full">
               <div>
                 <h1 className="text-3xl font-bold text-gray-900">{design.name} Dashboard</h1>
                 <p className="text-gray-500 mt-1">Methodology: {design.sdlcModel} | Optimized for: {design.targetCustomers || 'General Users'}</p>
               </div>
               <button 
                 onClick={resetProject}
                 className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition"
               >
                 + New Architecture
               </button>
             </div>
           )}
        </div>

        {!design ? (
          <ProjectWizard onGenerate={handleGenerate} isLoading={isLoading} />
        ) : (
          <SystemDesign design={design} onComponentClick={setSelectedComponent} />
        )}

      </div>
      
      <ComponentModal 
        component={selectedComponent} 
        onClose={() => setSelectedComponent(null)} 
      />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(u) => setUser(u)}
      />
    </DashboardLayout>
  );
}

export default App;
