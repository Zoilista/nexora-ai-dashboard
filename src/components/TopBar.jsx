import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Globe, User, ChevronDown, CheckCircle2, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: '中文' }
];

const mockNotifications = [
  { id: 1, type: 'message', text: 'New message from Sarah J.', time: '2 min ago', read: false },
  { id: 2, type: 'system', text: 'Campaign "Summer Sale" finished.', time: '1 hour ago', read: false },
  { id: 3, type: 'booking', text: 'New booking: Emma (14:00)', time: '3 hours ago', read: true },
];

export const TopBar = () => {
  const { t, i18n } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

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
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="h-20 flex items-center justify-between px-8 bg-[#050505] sticky top-0 z-40 w-full">
      <div className="flex items-center gap-10 flex-1 min-w-0">
        <div className="shrink-0">
          <h1 className="text-xl font-bold tracking-tight text-white">{t('topbar.greeting', { time: getTimeGreeting() })}, Görkem</h1>
        </div>

        <div className="flex-1 max-w-sm relative group hidden md:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
          <input 
            type="text" 
            placeholder={t('topbar.searchPlaceholder')}
            className="w-full bg-white/[0.02] border border-transparent hover:border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.05] transition-all placeholder:text-zinc-600"
          />
        </div>
      </div>

      <div className="flex items-center gap-6 shrink-0 ml-4">
        {/* Language Switcher */}
        <div className="relative" ref={langRef}>
          <button 
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors border border-transparent"
          >
            <Globe size={16} />
            <span className="text-sm font-medium">{currentLangName}</span>
            <ChevronDown size={14} className="text-zinc-500 opacity-50" />
          </button>
          
          {showLangMenu && (
            <div className="absolute top-full right-0 mt-2 w-32 bg-[#111] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1 z-50 animate-in fade-in zoom-in-95 duration-200">
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
          
          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full border-2 border-[#050505]" />
              )}
            </button>
            
            {showNotifMenu && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <h3 className="font-bold text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium">
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-zinc-500 text-sm">No new notifications.</div>
                  ) : (
                    notifications.map(notif => (
                      <div key={notif.id} className={`p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer flex gap-3 ${!notif.read ? 'bg-purple-500/5' : ''}`}>
                        <div className={`mt-0.5 p-1.5 rounded-full h-min ${notif.type === 'message' ? 'bg-blue-500/20 text-blue-400' : notif.type === 'system' ? 'bg-purple-500/20 text-purple-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                           {notif.type === 'message' ? <MessageSquare size={14} /> : notif.type === 'system' ? <Bell size={14} /> : <CheckCircle2 size={14} />}
                        </div>
                        <div>
                          <p className={`text-sm ${!notif.read ? 'font-bold text-white' : 'text-zinc-300'}`}>{notif.text}</p>
                          <p className="text-[10px] text-zinc-500 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3 group cursor-pointer pl-2 border-l border-white/10">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center overflow-hidden group-hover:ring-2 ring-purple-500/50 transition-all">
               <User className="text-zinc-400" size={18} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
