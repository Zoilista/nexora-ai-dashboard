import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, BrainCircuit, Sliders, Shield, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Settings = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('knowledge');

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold text-white tracking-tight mb-1">{t('settings.title')}</h1>
        <p className="text-sm text-zinc-400">{t('settings.subtitle')}</p>
      </div>

      <div className="flex gap-2 border-b border-white/10 pb-px overflow-x-auto">
        {[
          { id: 'knowledge', label: t('settings.tabs.knowledge'), icon: BrainCircuit },
          { id: 'rules', label: t('settings.tabs.rules'), icon: Sliders },
          { id: 'integrations', label: t('settings.tabs.integrations'), icon: Zap },
          { id: 'security', label: t('settings.tabs.security'), icon: Shield },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-all duration-300 text-sm whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-purple-500 text-white font-bold bg-white/5' 
                : 'border-transparent text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'knowledge' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#111] p-6 rounded-2xl border border-white/10 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-2">{t('settings.uploadTitle')}</h3>
            <p className="text-sm text-zinc-400 mb-6">{t('settings.uploadDesc')}</p>
            
            <div className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-purple-500/50 hover:bg-purple-500/5 transition-colors cursor-pointer bg-white/5">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <Upload size={24} className="text-zinc-300" />
              </div>
              <p className="text-sm font-bold text-white mb-1">{t('settings.uploadBox')}</p>
              <p className="text-xs text-zinc-500">{t('settings.uploadSub')}</p>
            </div>
          </div>

          <div className="bg-[#111] p-6 rounded-2xl border border-white/10 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">{t('settings.activeSources')}</h3>
              <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">80% Optimized</span>
            </div>
            
            <div className="space-y-3">
              {[
                { name: 'Services & Pricing.pdf', date: 'Added May 10', size: '2.4 MB' },
                { name: 'Cancellation Policy.txt', date: 'Added May 01', size: '12 KB' },
                { name: 'Website Scrape', date: 'Auto-sync', size: 'Live' },
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-lg bg-blue-500/20 text-blue-400">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{doc.name}</p>
                      <p className="text-[10px] text-zinc-400 mt-0.5">{doc.date} • {doc.size}</p>
                    </div>
                  </div>
                  <CheckCircle size={20} className="text-emerald-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'rules' && (
        <div className="bg-[#111] p-6 rounded-2xl border border-white/10 shadow-lg">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white">{t('settings.rules.title')}</h3>
            <p className="text-sm text-zinc-400">{t('settings.rules.desc')}</p>
          </div>
          
          <div className="space-y-4">
            {[
              { id: 'rule1', title: t('settings.rules.rule1Title'), desc: t('settings.rules.rule1Desc'), active: true },
              { id: 'rule2', title: t('settings.rules.rule2Title'), desc: t('settings.rules.rule2Desc'), active: true },
              { id: 'rule3', title: t('settings.rules.rule3Title'), desc: t('settings.rules.rule3Desc'), active: false }
            ].map(rule => (
              <div key={rule.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex-1 pr-6">
                  <h4 className="text-sm font-bold text-white mb-1">{rule.title}</h4>
                  <p className="text-xs text-zinc-400">{rule.desc}</p>
                </div>
                <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${rule.active ? 'bg-purple-600' : 'bg-zinc-600'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${rule.active ? 'translate-x-6' : 'translate-x-1'}`}/>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'integrations' && (
        <div className="bg-[#111] p-6 rounded-2xl border border-white/10 shadow-lg">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white">Integrations</h3>
            <p className="text-sm text-zinc-400">Connect Nexora to your favorite tools.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Google Calendar', desc: 'Two-way sync for appointments.', icon: '📅', connected: true },
              { name: 'Stripe', desc: 'Accept payments and deposits.', icon: '💳', connected: false },
              { name: 'WhatsApp Business', desc: 'AI-driven chat and reminders.', icon: '💬', connected: true },
              { name: 'Mailchimp', desc: 'Sync customer segments.', icon: '📧', connected: false },
            ].map((int, i) => (
              <div key={i} className="p-5 rounded-xl border border-white/10 bg-white/5 flex items-start gap-4">
                <div className="text-3xl">{int.icon}</div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white">{int.name}</h4>
                  <p className="text-xs text-zinc-400 mb-3">{int.desc}</p>
                  <button className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${int.connected ? 'bg-zinc-800 text-zinc-300 hover:text-white' : 'bg-white text-black hover:bg-zinc-200'}`}>
                    {int.connected ? 'Configure' : 'Connect'}
                  </button>
                </div>
                {int.connected && <CheckCircle size={16} className="text-emerald-400 mt-1" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="bg-[#111] p-6 rounded-2xl border border-white/10 shadow-lg max-w-2xl">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white">Security Settings</h3>
            <p className="text-sm text-zinc-400">Manage your account security and authentication.</p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">Change Password</h4>
              <input type="password" placeholder="Current Password" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors" />
              <input type="password" placeholder="New Password" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors" />
              <button className="bg-white/10 text-white font-semibold py-2 px-4 rounded-lg hover:bg-white/20 transition-colors text-sm">Update Password</button>
            </div>
            
            <hr className="border-white/10" />
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Two-Factor Authentication (2FA)</h4>
                <p className="text-xs text-zinc-400">Add an extra layer of security to your account.</p>
              </div>
              <button className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-500 transition-colors text-sm">Enable 2FA</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
