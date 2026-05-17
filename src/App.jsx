import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { AIInbox } from './pages/AIInbox';
import { Campaigns } from './pages/Campaigns';
import { CampaignResults } from './pages/CampaignResults';
import { Appointments } from './pages/Appointments';
import { Insights } from './pages/Insights';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { Customers } from './pages/Customers';
import { ServiceCatalog } from './pages/ServiceCatalog';
import { Ecommerce } from './pages/Ecommerce';
import { OnboardingModal } from './components/OnboardingModal';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowOnboarding(true);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inbox" element={<AIInbox />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaign-results" element={<CampaignResults />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/analytics" element={<Insights />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/services" element={<ServiceCatalog />} />
          <Route path="/ecommerce" element={<Ecommerce />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
      <OnboardingModal 
        isOpen={showOnboarding} 
        onClose={() => setShowOnboarding(false)} 
      />
    </Router>
  );
}

export default App;
