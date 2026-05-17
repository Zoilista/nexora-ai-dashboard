import React from 'react';
import { useTranslation } from 'react-i18next';
import { DollarSign, Users, MessageSquare, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Big Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111] border border-white/10 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <DollarSign size={64} />
          </div>
          <p className="text-zinc-400 text-sm font-medium mb-2">{t('dashboard.totalRevenue')}</p>
          <h2 className="text-3xl font-display font-bold text-white mb-3">$12,450</h2>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
            +12.5% vs yesterday
          </span>
        </div>

        <div className="bg-[#111] border border-white/10 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Users size={64} />
          </div>
          <p className="text-zinc-400 text-sm font-medium mb-2">{t('dashboard.newCustomers')}</p>
          <h2 className="text-3xl font-display font-bold text-white mb-3">48</h2>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
            +18.2% vs yesterday
          </span>
        </div>

        <div className="bg-[#111] border border-white/10 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <MessageSquare size={64} />
          </div>
          <p className="text-zinc-400 text-sm font-medium mb-2">{t('dashboard.pendingMessages')}</p>
          <h2 className="text-3xl font-display font-bold text-white mb-3">12</h2>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-500/10 text-orange-400 text-xs font-bold border border-orange-500/20">
            Needs attention
          </span>
        </div>
      </div>

      {/* Hero Action Card */}
      <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 p-8 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="flex items-start gap-4 relative z-10">
          <div className="p-3 rounded-xl bg-purple-500 text-white shadow-lg shrink-0">
            <AlertCircle size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-display font-bold text-white mb-2">{t('dashboard.aiActionRequired')}</h3>
            <p className="text-sm text-zinc-300 mb-6 max-w-xl leading-relaxed">{t('dashboard.aiActionDesc')}</p>
            
            <div className="flex flex-wrap gap-3">
              <button className="bg-white text-black hover:bg-zinc-200 font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-all shadow-md text-sm">
                <CheckCircle2 size={18} />
                {t('dashboard.reviewAndSend')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Upcoming List */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-8">
        <h3 className="text-lg font-bold text-white mb-6">{t('dashboard.upcoming')}</h3>
        
        <div className="space-y-3">
          {[
            { time: '14:00', name: 'Emma Thompson', service: 'Signature Facial' },
            { time: '15:30', name: 'Michael Chen', service: 'Deep Tissue Massage' },
            { time: '17:00', name: 'Sarah Jenkins', service: 'Laser Hair Removal' }
          ].map((apt, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="text-sm font-bold text-purple-400 w-16">{apt.time}</div>
                <div>
                  <h4 className="text-sm font-bold text-white">{apt.name}</h4>
                  <p className="text-xs text-zinc-400">{apt.service}</p>
                </div>
              </div>
              <button className="text-zinc-500 hover:text-white p-2">
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
          
          <div className="text-center pt-4 text-xs text-zinc-500">
            {t('dashboard.noAppointments')}
          </div>
        </div>
      </div>
    </div>
  );
};
