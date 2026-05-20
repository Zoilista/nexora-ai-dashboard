import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { AIAssistantPanel } from './AIAssistantPanel';

export const Layout = ({ children }) => {
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false); // Default to closed on mobile/initially to save space
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg-main text-text-main overflow-hidden relative transition-colors duration-300">
      <Sidebar 
        isAIPanelOpen={isAIPanelOpen} 
        onToggleAI={() => setIsAIPanelOpen(!isAIPanelOpen)} 
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />
      
      <div className={`flex-1 flex flex-col min-w-0 lg:ml-64 relative h-screen overflow-y-auto transition-all duration-500 ease-in-out ${isAIPanelOpen ? 'lg:mr-[360px]' : 'mr-0'}`}>
        <TopBar onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full transition-all duration-500">
          {children}
        </main>
      </div>

      <AIAssistantPanel isOpen={isAIPanelOpen} setIsOpen={setIsAIPanelOpen} />
    </div>
  );
};
