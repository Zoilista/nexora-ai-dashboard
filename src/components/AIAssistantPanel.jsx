import React from 'react';
import { Sparkles, Send, X, Zap, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AIAssistantPanel = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();

  return (
    <aside className={`fixed right-0 top-0 h-screen transition-all duration-500 ease-in-out z-50 ${isOpen ? 'w-[360px] translate-x-0' : 'w-[360px] translate-x-full'}`}>
      <div className="h-full bg-[#0a0a0a] border-l border-white/5 flex flex-col relative shadow-2xl">
        <div className="px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <Sparkles size={16} />
            </div>
            <span className="font-display font-bold text-lg text-white">Nexora AI</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-4 space-y-10 no-scrollbar">
          {/* Feed Section */}
          <div className="space-y-6">
            <p className="text-[11px] text-zinc-500 uppercase tracking-widest font-bold">{t('aiPanel.feed')}</p>
            
            <div className="bg-[#111] p-5 rounded-2xl border border-white/5 space-y-5">
              <div className="flex gap-4">
                <div className="p-2 bg-purple-500/20 rounded-xl shrink-0 h-min">
                  <Zap size={18} className="text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-2">{t('aiPanel.newOpp')}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {t('aiPanel.newOppDesc')}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 py-2.5 rounded-xl font-semibold transition-colors text-xs">
                  {t('aiPanel.draftSms')}
                </button>
                <button className="flex-1 bg-white/5 hover:bg-white/10 text-zinc-400 py-2.5 rounded-xl font-semibold transition-colors text-xs">
                  {t('aiPanel.ignore')}
                </button>
              </div>
            </div>

            <div className="bg-[#111] p-5 rounded-2xl border border-white/5">
              <div className="flex gap-4">
                <div className="p-2 bg-blue-500/20 rounded-xl shrink-0 h-min">
                  <Target size={18} className="text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-2">{t('aiPanel.campResult')}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {t('aiPanel.campResultDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Prompts Section */}
          <div className="space-y-4">
            <p className="text-[11px] text-zinc-500 uppercase tracking-widest font-bold">{t('aiPanel.suggestedPrompts')}</p>
            <div className="space-y-3">
              {['Reply to VIP customer Sarah', 'Schedule Tuesday cleaning', 'Update price list'].map((text, i) => (
                <button key={i} className="w-full text-left p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-sm text-zinc-300 hover:text-white transition-colors font-medium">
                  {text}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 mt-auto">
          <div className="relative group">
            <input 
              type="text" 
              placeholder={t('aiPanel.askAnything')}
              className="w-full bg-[#111] border border-white/10 rounded-full py-4 pl-5 pr-14 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-zinc-600"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-purple-500 transition-colors shadow-md">
              <Send size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
      
    </aside>
  );
};
