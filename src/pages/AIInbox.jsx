import React, { useState, useEffect } from 'react';
import { Search, Send, ShieldCheck, Tag, Sparkles, Check, Edit2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const contactMetadata = [
  { id: 1, key: 't1', source: 'Instagram', time: '12:45', status: 'waiting', tagKey: 'vip' },
  { id: 2, key: 't2', source: 'WhatsApp', time: '10:30', status: 'waiting', tagKey: 'question' },
  { id: 3, key: 't3', source: 'GMB', time: 'yesterday', status: 'replied', tagKey: 'feedback' },
];

export const AIInbox = () => {
  const { t } = useTranslation();
  
  // Dynamically map contacts list from i18n
  const contactsList = contactMetadata.map(c => ({
    ...c,
    name: t(`inbox.threads.${c.key}.name`),
    lastMsg: t(`inbox.threads.${c.key}.lastMsg`),
    draft: t(`inbox.threads.${c.key}.draft`),
    time: c.time === 'yesterday' ? t('inbox.yesterday') : c.time,
    tagName: t(`inbox.tags.${c.tagKey}`),
  }));

  const [activeContact, setActiveContact] = useState(contactsList[0]);
  const [autopilot, setAutopilot] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [inputText, setInputText] = useState('');
  const [threadMessages, setThreadMessages] = useState({});

  const handleSend = (text) => {
    if (!text.trim()) return;
    setThreadMessages(prev => ({
      ...prev,
      [activeContact.id]: [...(prev[activeContact.id] || []), text]
    }));
    setInputText('');
  };

  // Update active contact details on language switch to remain in sync
  useEffect(() => {
    const updatedActive = contactsList.find(c => c.id === activeContact.id);
    if (updatedActive) {
      setActiveContact(updatedActive);
    }
  }, [t]);

  const filtered = contactsList.filter(c => {
    if (activeTab === 'waiting') return c.status === 'waiting';
    if (activeTab === 'handled') return c.status === 'replied';
    return true;
  });

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6 animate-in fade-in duration-500">
      {/* Contact List */}
      <div className="w-80 bg-bg-panel border border-border-main rounded-2xl flex flex-col overflow-hidden shrink-0 shadow-lg">
        <div className="p-4 border-b border-border-main bg-bg-panel/50">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
              type="text" 
              placeholder={t('inbox.search')}
              className="w-full bg-white/[0.05] border border-transparent rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:bg-white/10 transition-all text-text-main placeholder:text-zinc-500"
            />
          </div>
          <div className="flex gap-2 p-1 bg-bg-panel-hover rounded-lg">
            {['all', 'waiting', 'handled'].map(tabKey => (
              <button 
                key={tabKey} 
                onClick={() => setActiveTab(tabKey)}
                className={`flex-grow text-[11px] py-1.5 rounded-md font-semibold transition-all ${tabKey === activeTab ? 'bg-[#222] text-text-main shadow-sm' : 'text-zinc-500 hover:text-text-main'}`}
              >
                {t(`inbox.${tabKey}`)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filtered.map(contact => (
            <button 
              key={contact.id}
              onClick={() => setActiveContact(contact)}
              className={`w-full p-3 rounded-xl text-left transition-all ${activeContact.id === contact.id ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-transparent hover:bg-bg-panel-hover border border-transparent'}`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={`text-sm font-bold ${activeContact.id === contact.id ? 'text-text-main' : 'text-zinc-200'}`}>{contact.name}</span>
                <span className={`text-[10px] font-semibold ${activeContact.id === contact.id ? 'text-purple-400' : 'text-zinc-500'}`}>{contact.time}</span>
              </div>
              <p className={`text-xs truncate mb-2 ${activeContact.id === contact.id ? 'text-zinc-300' : 'text-zinc-500'}`}>{contact.lastMsg}</p>
              <div className="flex justify-between items-center">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${activeContact.id === contact.id ? 'bg-purple-500/20 text-purple-300' : 'bg-white/10 text-text-muted'}`}>
                  {contact.source}
                </span>
                <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                  contact.tagKey === 'vip' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                  contact.tagKey === 'question' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}>
                  {contact.tagName}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 bg-bg-panel border border-border-main rounded-2xl flex flex-col overflow-hidden shadow-lg min-w-0">
        {/* Chat Header */}
        <div className="p-4 border-b border-border-main flex justify-between items-center bg-bg-panel/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/40 to-blue-500/40 flex items-center justify-center text-sm font-bold text-text-main border border-border-main">
              {activeContact.name[0]}
            </div>
            <div>
              <h3 className="font-bold text-base text-text-main">{activeContact.name}</h3>
              <p className="text-[11px] text-text-muted font-medium">
                {t('inbox.lastVisit')}: 12 May
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-panel-hover border border-border-main">
               <ShieldCheck size={14} className={autopilot ? "text-emerald-400" : "text-zinc-500"} />
               <span className="text-[11px] font-bold text-zinc-300">{t('inbox.autopilot')}</span>
               <button 
                onClick={() => setAutopilot(!autopilot)}
                className={`w-8 h-4 rounded-full relative transition-colors duration-300 focus:outline-none ${autopilot ? 'bg-emerald-500' : 'bg-white/20'}`}
               >
                 <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all duration-300 ${autopilot ? 'left-[18px]' : 'left-0.5'}`} />
               </button>
            </div>
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-bg-panel">
           <div className="flex flex-col items-start max-w-[70%]">
             <div className="bg-[#222] p-3.5 rounded-xl rounded-tl-sm text-sm text-zinc-200 border border-border-main leading-relaxed">
               {activeContact.lastMsg}
             </div>
             <span className="text-[10px] font-medium text-zinc-500 mt-1.5 pl-1">{activeContact.time} • {activeContact.source}</span>
           </div>

           {(threadMessages[activeContact.id] || []).map((msg, idx) => (
             <div key={idx} className="flex flex-col items-end w-full">
               <div className="bg-purple-600 p-3.5 rounded-xl rounded-tr-sm text-sm text-text-main border border-purple-500/20 leading-relaxed max-w-[70%] text-left">
                 {msg}
               </div>
               <span className="text-[10px] font-medium text-zinc-500 mt-1.5 pr-1">{t('inbox.justNow')}</span>
             </div>
           ))}

           {/* Draft UI */}
           <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/5 border border-purple-500/20 relative overflow-hidden mt-6">
             <div className="flex items-center gap-2 mb-3">
               <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
                 <Sparkles size={16} />
               </div>
               <span className="text-[11px] font-bold text-purple-400 uppercase tracking-widest">{t('inbox.aiDraft')}</span>
             </div>
             
             <p className="text-sm text-zinc-300 mb-5 leading-relaxed">
               "{activeContact.draft}"
             </p>
             
             <div className="flex gap-3">
               <button 
                 onClick={() => handleSend(activeContact.draft)}
                 className="flex-1 bg-purple-500 text-text-main font-semibold py-2.5 rounded-lg hover:bg-purple-600 transition-colors flex justify-center items-center gap-2 text-xs"
               >
                 <Check size={16} />
                 {t('inbox.approveSend')}
               </button>
               <button className="flex-1 bg-white/10 text-text-main font-semibold py-2.5 rounded-lg hover:bg-white/20 transition-colors flex justify-center items-center gap-2 text-xs border border-border-main">
                 <Edit2 size={16} />
                 {t('inbox.editDraft')}
               </button>
             </div>
           </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-border-main bg-bg-panel">
          <div className="relative group">
             <input 
              type="text" 
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend(inputText)}
              placeholder={t('inbox.typeMessage')}
              className="w-full bg-bg-panel-hover border border-border-main rounded-xl py-2.5 pl-4 pr-12 text-sm text-text-main focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-zinc-500"
             />
             <button 
              onClick={() => handleSend(inputText)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-text-muted hover:text-text-main hover:bg-purple-500 transition-colors"
             >
               <Send size={14} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
