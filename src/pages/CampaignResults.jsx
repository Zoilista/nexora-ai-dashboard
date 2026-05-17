import React, { useState } from 'react';
import { Sparkles, TrendingUp, Eye, MousePointerClick, CheckCircle2, Clock, BarChart2, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const campaignHistory = [
  { id: 1, title: 'Summer Skincare Bundle Promo', platform: 'Instagram', status: 'Published', sentAt: 'May 15, 2026', reach: 4820, clicks: 312, conversions: 48, aiScore: 'Above Average', aiNote: 'This post generated 48 new bookings — 24% above your average.' },
  { id: 2, title: 'Last-Minute Tuesday Flash Sale', platform: 'WhatsApp', status: 'Published', sentAt: 'May 13, 2026', reach: 1240, clicks: 180, conversions: 22, aiScore: 'Excellent', aiNote: 'SMS campaigns convert 3x better for last-minute slots. Consider repeating weekly.' },
  { id: 3, title: "Mother's Day Special Offer", platform: 'Facebook', status: 'Scheduled', sentAt: 'May 18, 2026', reach: null, clicks: null, conversions: null, aiScore: null, aiNote: 'Scheduled to go live tomorrow morning at 8:00 AM.' },
];

const statusColors = {
  Published: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  Scheduled: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  Draft: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30',
};
const scoreColors = { Excellent: 'text-emerald-400', 'Above Average': 'text-blue-400', Average: 'text-yellow-400' };

export const CampaignResults = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(campaignHistory[0]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">{t('campaignResults.title')}</h1>
          <p className="text-sm text-zinc-400">{t('campaignResults.subtitle')}</p>
        </div>
        <Link to="/campaigns" className="bg-white text-black font-bold py-2.5 px-5 rounded-xl hover:bg-zinc-200 transition-colors flex items-center gap-2 text-sm shadow-lg">
          <Plus size={16} />{t('campaignResults.newCampaign')}
        </Link>
      </div>

      <div className="flex gap-6">
        <div className="w-72 space-y-2 shrink-0">
          {campaignHistory.map(campaign => (
            <button key={campaign.id} onClick={() => setSelected(campaign)}
              className={`w-full p-4 rounded-2xl text-left border transition-all ${selected.id === campaign.id ? 'bg-purple-500/10 border-purple-500/20' : 'bg-[#111] border-white/10 hover:bg-white/5'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-zinc-500 font-semibold">{campaign.platform}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColors[campaign.status]}`}>{campaign.status}</span>
              </div>
              <p className="text-sm font-bold text-white mb-1 leading-snug">{campaign.title}</p>
              <p className="text-xs text-zinc-500">{campaign.sentAt}</p>
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-5 min-w-0">
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Eye, label: t('campaignResults.reach'), value: selected.reach ? selected.reach.toLocaleString() : '—', color: 'text-blue-400' },
              { icon: MousePointerClick, label: t('campaignResults.clicks'), value: selected.clicks ? selected.clicks.toLocaleString() : '—', color: 'text-purple-400' },
              { icon: CheckCircle2, label: t('campaignResults.conversions'), value: selected.conversions ? selected.conversions.toLocaleString() : '—', color: 'text-emerald-400' },
            ].map((stat, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-md">
                <stat.icon size={20} className={`${stat.color} mb-2`} />
                <p className="text-xs text-zinc-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                {selected.reach && stat.label === t('campaignResults.conversions') && (
                  <p className="text-xs text-zinc-500 mt-1">{((selected.conversions / selected.reach) * 100).toFixed(1)}% {t('campaignResults.convRate')}</p>
                )}
              </div>
            ))}
          </div>

          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white">{selected.title}</h3>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${statusColors[selected.status]}`}>{selected.status}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-zinc-400 flex-wrap">
              <span>{selected.platform}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-600" />
              <span className="flex items-center gap-1"><Clock size={14} />{selected.sentAt}</span>
              {selected.aiScore && (<><span className="w-1 h-1 rounded-full bg-zinc-600" /><span className={`flex items-center gap-1 font-bold ${scoreColors[selected.aiScore]}`}><BarChart2 size={14} />{selected.aiScore}</span></>)}
            </div>
          </div>

          {selected.aiNote && (
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/5 border border-purple-500/20 rounded-2xl p-5 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400"><Sparkles size={14} /></div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">{t('campaignResults.aiAnalysis')}</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">{selected.aiNote}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
