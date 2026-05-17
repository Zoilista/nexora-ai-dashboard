import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { AIAssistantPanel } from './AIAssistantPanel';

export const Layout = ({ children }) => {
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#050505] text-white overflow-hidden">
      <Sidebar isAIPanelOpen={isAIPanelOpen} onToggleAI={() => setIsAIPanelOpen(!isAIPanelOpen)} />
      
      <div className={`flex-1 flex flex-col min-w-0 ml-64 relative h-screen overflow-y-auto transition-all duration-500 ease-in-out ${isAIPanelOpen ? 'mr-[360px]' : 'mr-0'}`}>
        <TopBar />
        <main className="flex-1 p-8 max-w-7xl mx-auto w-full transition-all duration-500">
          {children}
        </main>
      </div>

      <AIAssistantPanel isOpen={isAIPanelOpen} setIsOpen={setIsAIPanelOpen} />
    </div>
  );
};
