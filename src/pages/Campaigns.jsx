import React, { useState } from 'react';
import { Sparkles, RefreshCw, Target, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Campaigns = () => {
  const { t } = useTranslation();
  const [platform, setPlatform] = useState('Instagram');

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
          <Sparkles className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">{t('campaigns.title')}</h1>
          <p className="text-sm text-zinc-400">{t('campaigns.subtitle')}</p>
        </div>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-xl">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
           <div className="space-y-3">
              <label className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest">{t('campaigns.platform')}</label>
              <div className="flex gap-3">
                 {['Instagram', 'Facebook', 'TikTok'].map(p => (
                   <button 
                     key={p}
                     type="button"
                     onClick={() => setPlatform(p)}
                     className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition-all ${
                       platform === p 
                        ? 'bg-purple-500/10 border-purple-500 text-white' 
                        : 'bg-white/5 border-transparent text-zinc-400 hover:bg-white/10'
                     }`}
                   >
                     {p}
                   </button>
                 ))}
              </div>
           </div>

           <div className="space-y-3">
             <label className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest flex justify-between">
               <span>{t('campaigns.goal')}</span>
               <span className="text-purple-400 flex items-center gap-1"><Target size={12}/> {t('campaigns.recommended')}</span>
             </label>
             <input 
               type="text" 
               placeholder={t('campaigns.goalPlaceholder')}
               className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
             />
           </div>

           <div className="space-y-3">
             <label className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest">
               {t('campaigns.keyPoints')}
             </label>
             <textarea 
               rows="3"
               placeholder={t('campaigns.keyPointsPlaceholder')}
               className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all resize-none"
             />
           </div>

           <div className="pt-4">
              <button type="button" className="w-full bg-purple-500 text-white font-bold text-sm py-3.5 rounded-xl hover:bg-purple-600 transition-colors shadow-lg flex justify-center items-center gap-2">
                <Sparkles size={18} />
                {t('campaigns.generate')}
              </button>
           </div>
        </form>
      </div>
    </div>
  );
};
