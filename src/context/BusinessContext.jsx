import React, { createContext, useContext, useState, useEffect } from 'react';

const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
  const [businessType, setBusinessTypeState] = useState(() => {
    return localStorage.getItem('nexora_business_type') || 'salon';
  });

  const setBusinessType = (type) => {
    localStorage.setItem('nexora_business_type', type);
    setBusinessTypeState(type);
  };

  return (
    <BusinessContext.Provider value={{ businessType, setBusinessType }}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};
