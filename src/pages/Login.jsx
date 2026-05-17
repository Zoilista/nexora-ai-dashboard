import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Login = ({ onLogin }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-8 overflow-hidden relative">
      {/* Soft Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none opacity-50" />

      <div className="w-full max-w-md space-y-12 relative z-10">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mx-auto shadow-2xl animate-float border border-white/10">
             <Sparkles className="text-white w-12 h-12" />
          </div>
          <div className="space-y-2">
            <h1 className="text-6xl font-display font-bold tracking-tight text-white">Nexora<span className="text-purple-500">.</span></h1>
            <p className="text-zinc-400 text-xl font-medium">{t('login.subtitle')}</p>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl space-y-8">
           <button 
            onClick={onLogin}
            className="w-full flex items-center justify-center gap-4 bg-white text-black font-bold py-5 px-6 rounded-2xl hover:bg-zinc-100 hover:scale-[1.02] transition-all duration-300 group shadow-xl text-lg"
           >
             <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6 shrink-0" />
             <span>{t('login.continueGoogle')}</span>
             <ArrowRight size={20} className="opacity-50 group-hover:opacity-100 transition-opacity" />
           </button>
           
           <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="shrink-0 px-6 text-[11px] uppercase font-black tracking-widest text-zinc-600">{t('login.enterpriseReady')}</span>
              <div className="flex-grow border-t border-white/5"></div>
           </div>

           <div className="flex justify-center gap-8">
              <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors font-medium">{t('login.terms')}</a>
              <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors font-medium">{t('login.privacy')}</a>
              <a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors font-medium">{t('login.security')}</a>
           </div>
        </div>
      </div>
    </div>
  );
};
