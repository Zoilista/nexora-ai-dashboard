import React, { useState } from 'react';
import { Search, Send, ShieldCheck, Tag, Sparkles, Check, Edit2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const contacts = [
  { id: 1, name: 'Sarah Johnson', source: 'Instagram', lastMsg: 'I want to book a bridal facial for Saturday...', time: '12:45', tags: ['VIP'], status: 'waiting' },
  { id: 2, name: 'Mike Ross', source: 'WhatsApp', lastMsg: 'How much for the deep tissue massage?', time: '10:30', tags: ['Question'], status: 'waiting' },
  { id: 3, name: 'Emma Watson', source: 'GMB', lastMsg: 'Thanks for the great service today!', time: 'Yesterday', tags: ['Feedback'], status: 'replied' },
];

export const AIInbox = () => {
  const { t } = useTranslation();
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [autopilot, setAutopilot] = useState(false);

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6 animate-in fade-in duration-500">
      {/* Contact List */}
      <div className="w-80 bg-[#111] border border-white/10 rounded-2xl flex flex-col overflow-hidden shrink-0 shadow-lg">
        <div className="p-4 border-b border-white/10 bg-[#0a0a0a]/50">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
              type="text" 
              placeholder={t('inbox.search')}
              className="w-full bg-white/[0.05] border border-transparent rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:bg-white/10 transition-all text-white placeholder:text-zinc-500"
            />
          </div>
          <div className="flex gap-2 p-1 bg-white/5 rounded-lg">
            {['all', 'waiting', 'handled'].map(tabKey => (
              <button key={tabKey} className={`flex-1 text-[11px] py-1.5 rounded-md font-semibold transition-all ${tabKey === 'all' ? 'bg-[#222] text-white shadow-sm' : 'text-zinc-500 hover:text-white'}`}>
                {t(`inbox.${tabKey}`)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {contacts.map(contact => (
            <button 
              key={contact.id}
              onClick={() => setActiveContact(contact)}
              className={`w-full p-3 rounded-xl text-left transition-all ${activeContact.id === contact.id ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-transparent hover:bg-white/5 border border-transparent'}`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={`text-sm font-bold ${activeContact.id === contact.id ? 'text-white' : 'text-zinc-200'}`}>{contact.name}</span>
                <span className={`text-[10px] font-semibold ${activeContact.id === contact.id ? 'text-purple-400' : 'text-zinc-500'}`}>{contact.time}</span>
              </div>
              <p className={`text-xs truncate mb-2 ${activeContact.id === contact.id ? 'text-zinc-300' : 'text-zinc-500'}`}>{contact.lastMsg}</p>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${activeContact.id === contact.id ? 'bg-purple-500/20 text-purple-300' : 'bg-white/10 text-zinc-400'}`}>
                {contact.source}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 bg-[#111] border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-lg min-w-0">
        {/* Chat Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-white">
              {activeContact.name[0]}
            </div>
            <div>
              <h3 className="font-bold text-base text-white">{activeContact.name}</h3>
              <p className="text-[11px] text-zinc-400 font-medium">
                {t('inbox.lastVisit')}: 12 May
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
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
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0a0a0a]">
           <div className="flex flex-col items-start max-w-[70%]">
             <div className="bg-[#222] p-3.5 rounded-xl rounded-tl-sm text-sm text-zinc-200 border border-white/5 leading-relaxed">
               {activeContact.lastMsg}
             </div>
             <span className="text-[10px] font-medium text-zinc-500 mt-1.5 pl-1">12:45 • {activeContact.source}</span>
           </div>

           {/* Draft UI */}
           <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/5 border border-purple-500/20 relative overflow-hidden mt-6">
             <div className="flex items-center gap-2 mb-3">
               <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
                 <Sparkles size={16} />
               </div>
               <span className="text-[11px] font-bold text-purple-400 uppercase tracking-widest">{t('inbox.aiDraft')}</span>
             </div>
             
             <p className="text-sm text-zinc-300 mb-5 leading-relaxed">
               "Hi Sarah! We'd love to have you. We have a bridal facial slot available this Saturday at 2 PM. Would you like me to book that for you?"
             </p>
             
             <div className="flex gap-3">
               <button className="flex-1 bg-purple-500 text-white font-semibold py-2.5 rounded-lg hover:bg-purple-600 transition-colors flex justify-center items-center gap-2 text-xs">
                 <Check size={16} />
                 {t('inbox.approveSend')}
               </button>
               <button className="flex-1 bg-white/10 text-white font-semibold py-2.5 rounded-lg hover:bg-white/20 transition-colors flex justify-center items-center gap-2 text-xs border border-white/10">
                 <Edit2 size={16} />
                 {t('inbox.editDraft')}
               </button>
             </div>
           </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-white/10 bg-[#111]">
          <div className="relative group">
             <input 
              type="text" 
              placeholder={t('inbox.typeMessage')}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-zinc-500"
             />
             <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-purple-500 transition-colors">
               <Send size={14} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
