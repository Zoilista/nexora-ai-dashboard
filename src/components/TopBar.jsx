import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Globe, User, ChevronDown, CheckCircle2, MessageSquare, Menu, Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: '中文' }
];

const notifMeta = [
  { id: 1, type: 'message', key: 'n1', time: '2', unit: 'minAgo', read: false },
  { id: 2, type: 'system',  key: 'n2', time: '1', unit: 'hourAgo', read: false },
  { id: 3, type: 'booking', key: 'n3', time: '3', unit: 'hoursAgo', read: true },
];

export const TopBar = ({ onMenuClick }) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  // Read state persisted in localStorage
  const [readIds, setReadIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('nexora_read_notifs') || '[]'); } catch { return []; }
  });

  const notifications = notifMeta.map(n => ({
    ...n,
    text: t(`notifications.${n.key}`),
    timeStr: `${n.time} ${t(`notifications.${n.unit}`)}`,
    read: readIds.includes(n.id),
  }));

  const notifRef = useRef(null);
  const langRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) setShowNotifMenu(false);
      if (langRef.current && !langRef.current.contains(event.target)) setShowLangMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('topbar.morning');
    if (hour < 18) return t('topbar.afternoon');
    return t('topbar.evening');
  };

  const currentLangName = languages.find(l => l.code === i18n.language)?.name || 'English';
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    const allIds = notifMeta.map(n => n.id);
    setReadIds(allIds);
    localStorage.setItem('nexora_read_notifs', JSON.stringify(allIds));
  };

  return (
    <header className="h-20 flex items-center justify-between px-8 bg-bg-main sticky top-0 z-40 w-full border-b border-black/5 dark:border-transparent transition-colors duration-300">
      <div className="flex items-center gap-10 flex-1 min-w-0">
        <div className="shrink-0 flex items-center gap-2">
          <button onClick={onMenuClick} className="lg:hidden p-2 -ml-2 text-zinc-600 dark:text-text-muted hover:text-black dark:hover:text-text-main transition-colors">
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold tracking-tight text-text-main hidden sm:block">{t('topbar.greeting', { time: getTimeGreeting() })}, Görkem</h1>
        </div>

        <div className="flex-1 max-w-sm relative group hidden md:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <input 
            type="text" 
            placeholder={t('topbar.searchPlaceholder')}
            className="w-full bg-white/[0.02] border border-transparent hover:border-border-main rounded-full py-2 pl-10 pr-4 text-sm text-text-main focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.05] transition-all placeholder:text-zinc-600"
          />
        </div>
      </div>

      <div className="flex items-center gap-6 shrink-0 ml-4">
        {/* Language Switcher */}
        <div className="relative" ref={langRef}>
          <button 
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-bg-panel-hover text-text-muted hover:text-text-main transition-colors border border-transparent"
          >
            <Globe size={16} />
            <span className="text-sm font-medium">{currentLangName}</span>
            <ChevronDown size={14} className="text-zinc-500 opacity-50" />
          </button>
          
          {showLangMenu && (
            <div className="absolute top-full right-0 mt-2 w-32 bg-bg-panel border border-border-main rounded-xl shadow-2xl overflow-hidden py-1 z-50 animate-in fade-in zoom-in-95 duration-200">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors ${i18n.language === lang.code ? 'text-purple-400 font-bold' : 'text-zinc-300'}`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-bg-panel-hover text-text-muted hover:text-text-main transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 rounded-full hover:bg-bg-panel-hover text-text-muted hover:text-text-main transition-colors"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full border-2 border-[#050505]" />
              )}
            </button>
            
            {showNotifMenu && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-bg-panel border border-border-main rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b border-border-main">
                  <h3 className="font-bold text-text-main">{t('notifications.title')}</h3>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium">
                      {t('notifications.markAllRead')}
                    </button>
                  )}
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-zinc-500 text-sm">{t('notifications.empty')}</div>
                  ) : (
                    notifications.map(notif => (
                      <div key={notif.id} className={`p-4 border-b border-border-main last:border-0 hover:bg-bg-panel-hover transition-colors cursor-pointer flex gap-3 ${!notif.read ? 'bg-purple-500/5' : ''}`}>
                        <div className={`mt-0.5 p-1.5 rounded-full h-min ${notif.type === 'message' ? 'bg-blue-500/20 text-blue-400' : notif.type === 'system' ? 'bg-purple-500/20 text-purple-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                           {notif.type === 'message' ? <MessageSquare size={14} /> : notif.type === 'system' ? <Bell size={14} /> : <CheckCircle2 size={14} />}
                        </div>
                        <div>
                          <p className={`text-sm ${!notif.read ? 'font-bold text-text-main' : 'text-zinc-300'}`}>{notif.text}</p>
                          <p className="text-[10px] text-zinc-500 mt-1">{notif.timeStr}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3 group cursor-pointer pl-2 border-l border-border-main">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center overflow-hidden group-hover:ring-2 ring-purple-500/50 transition-all">
               <User className="text-text-muted" size={18} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
