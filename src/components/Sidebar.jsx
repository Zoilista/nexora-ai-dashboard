import React from 'react';
import { LayoutDashboard, MessageSquare, Calendar, Sparkles, PieChart, Settings, LogOut, ChevronRight, Users, Scissors, BarChart2, ShoppingBag, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useBusiness } from '../context/BusinessContext';

export const Sidebar = ({ isAIPanelOpen, onToggleAI, isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const { businessType } = useBusiness();

  const navItems = [
    { icon: LayoutDashboard, label: t('nav.dashboard'), path: '/' },
    { icon: MessageSquare, label: t('nav.inbox'), path: '/inbox' },
    { icon: Users, label: t('nav.customers'), path: '/customers' },
    { icon: Calendar, label: t('nav.appointments'), path: '/appointments' },
    { icon: Sparkles, label: t('nav.campaigns'), path: '/campaigns' },
    { icon: BarChart2, label: t('nav.campaignResults'), path: '/campaign-results' },
    { icon: Scissors, label: t('nav.services'), path: '/services' },
    { icon: ShoppingBag, label: t('nav.ecommerce'), path: '/ecommerce' },
    { icon: PieChart, label: t('nav.analytics'), path: '/analytics' },
  ];

  const filteredNavItems = navItems.filter(item => {
    if (businessType === 'shop') {
      return item.path !== '/appointments' && item.path !== '/services';
    }
    if (businessType === 'cafe') {
      return item.path !== '/appointments' && item.path !== '/ecommerce';
    }
    // Default: 'salon', 'clinic', 'gym' - hide ecommerce (online store)
    return item.path !== '/ecommerce';
  });

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside className={`w-64 h-screen fixed left-0 top-0 flex flex-col bg-bg-panel border-r border-border-main z-50 transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                <Sparkles className="text-text-main w-4 h-4" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-text-main">Nexora<span className="text-purple-500">.</span></span>
            </div>
            <button className="lg:hidden text-text-muted hover:text-black dark:hover:text-text-main transition-colors" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

        <nav className="space-y-0.5">
          {filteredNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `relative flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group text-sm font-medium overflow-hidden ${
                  isActive ? 'bg-white/10 text-text-main' : 'text-text-muted hover:text-text-main hover:bg-bg-panel-hover'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 rounded-r-sm" />}
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className="transition-transform group-hover:scale-110 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-500 shrink-0" />
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-4">
        <div className="p-4 rounded-xl bg-bg-panel-hover border border-border-main">
          <p className="text-[10px] text-purple-400 font-bold uppercase tracking-wider mb-2">{t('nav.readiness')}</p>
          <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden mb-2">
            <div className="h-full w-[80%] bg-purple-500 rounded-full" />
          </div>
          <p className="text-[10px] text-text-muted">{t('nav.knowledgeBase')} 80% {t('nav.optimized')}</p>
        </div>

        <div className="space-y-2">
          <button 
            onClick={onToggleAI}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all w-full text-sm font-medium border ${!isAIPanelOpen ? 'bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20' : 'bg-bg-panel-hover text-text-muted border-transparent hover:bg-white/10 hover:text-text-main'}`}
          >
            <div className="flex items-center gap-3">
              <Sparkles size={18} />
              <span>Nexora AI</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest bg-black/50 px-2 py-0.5 rounded-full font-bold">
              {!isAIPanelOpen ? 'OFF' : 'ON'}
            </span>
          </button>
          
          <div className="h-px bg-white/10 w-full" />

          <NavLink to="/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-text-muted hover:text-text-main hover:bg-bg-panel-hover transition-all text-sm font-medium">
            <Settings size={18} />
            <span>{t('nav.settings')}</span>
          </NavLink>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-all w-full text-sm font-medium">
            <LogOut size={18} />
            <span>{t('nav.logout')}</span>
          </button>
        </div>
      </div>
      </aside>
    </>
  );
};
