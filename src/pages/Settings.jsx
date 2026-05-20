import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, BrainCircuit, Sliders, Shield, Zap, Building2, Scissors, Dumbbell, Coffee, ShoppingBag, ChevronDown, Bot, User as UserIcon, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useBusiness } from '../context/BusinessContext';

export const Settings = () => {
  const { t } = useTranslation();
  const { businessType, setBusinessType } = useBusiness();
  const [activeTab, setActiveTab] = useState('profile');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Profile State
  const [profile, setProfile] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('nexora_profile')) || { name: 'Görkem', email: 'gorkem@example.com', phone: '+1 234 567 890' };
    } catch {
      return { name: 'Görkem', email: 'gorkem@example.com', phone: '+1 234 567 890' };
    }
  });

  const saveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('nexora_profile', JSON.stringify(profile));
    alert(t('settings.profileSaved') || 'Profile saved successfully!');
  };

  // Chatbot Sandbox State
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: t('settings.sandbox.defaultWelcome') || 'Hello! I am trained on your loaded files. Ask me any question to test my answers!' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const text = inputText;
    setInputText('');
    executeSandboxReply(text);
  };

  const handleSendSuggestion = (text) => {
    executeSandboxReply(text);
  };

  const executeSandboxReply = (text) => {
    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      let replyText = '';
      let sourceFile = '';
      const tKey = text.toLowerCase();

      if (tKey.includes('fiyat') || tKey.includes('hizmet') || tKey.includes('price') || tKey.includes('pricing') || tKey.includes('service')) {
        replyText = t('settings.sandbox.replies.services') || "Based on your uploaded 'Services & Pricing.pdf', you offer: 1. Signature Facial ($120), 2. Deep Tissue Massage ($150), and 3. Manicure & Pedicure ($80). Bookings can be made directly.";
        sourceFile = 'Services & Pricing.pdf';
      } else if (tKey.includes('iptal') || tKey.includes('politika') || tKey.includes('cancel') || tKey.includes('policy')) {
        replyText = t('settings.sandbox.replies.policy') || "According to your 'Cancellation Policy.txt', appointments cancelled less than 24 hours in advance incur a 50% late fee. No-shows are charged 100% of the service price.";
        sourceFile = 'Cancellation Policy.txt';
      } else {
        replyText = t('settings.sandbox.replies.fallback') || "I've checked your knowledge sources ('Services & Pricing.pdf' and 'Cancellation Policy.txt') but couldn't find a direct answer. However, I will answer the customer professionally: 'We would love to help you with that! Please contact our reception directly.' Would you like to add this details to your files?";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: replyText, source: sourceFile }]);
      setIsTyping(false);
    }, 1200);
  };

  const businessOptions = [
    { id: 'salon', label: t('onboarding.types.salon'), icon: Scissors },
    { id: 'clinic', label: t('onboarding.types.clinic'), icon: Building2 },
    { id: 'gym', label: t('onboarding.types.gym'), icon: Dumbbell },
    { id: 'cafe', label: t('onboarding.types.cafe'), icon: Coffee },
    { id: 'shop', label: t('onboarding.types.shop'), icon: ShoppingBag },
  ];

  const selectedOption = businessOptions.find(opt => opt.id === businessType) || businessOptions[0];
  const SelectedIcon = selectedOption.icon;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold text-text-main tracking-tight mb-1">{t('settings.title')}</h1>
        <p className="text-sm text-text-muted">{t('settings.subtitle')}</p>
      </div>

      <div className="flex gap-2 border-b border-border-main pb-px overflow-x-auto">
        {[
          { id: 'profile', label: t('settings.tabs.profile') || 'Profile', icon: UserIcon },
          { id: 'business', label: t('settings.tabs.business'), icon: Building2 },
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
                ? 'border-purple-500 text-text-main font-bold bg-bg-panel-hover' 
                : 'border-transparent text-text-muted hover:text-text-main hover:bg-bg-panel-hover'
            }`}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <form onSubmit={saveProfile} className="bg-bg-panel p-6 rounded-2xl border border-border-main shadow-lg max-w-xl">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-text-main">{t('settings.profile.title') || 'Personal Profile'}</h3>
            <p className="text-sm text-text-muted">{t('settings.profile.desc') || 'Manage your personal information.'}</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-text-muted block mb-2">{t('settings.profile.name') || 'Full Name'}</label>
              <input 
                type="text" 
                value={profile.name}
                onChange={e => setProfile({...profile, name: e.target.value})}
                className="w-full bg-bg-panel-hover border border-border-main rounded-xl px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-purple-500 transition-colors" 
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-text-muted block mb-2">{t('settings.profile.email') || 'Email Address'}</label>
              <input 
                type="email" 
                value={profile.email}
                onChange={e => setProfile({...profile, email: e.target.value})}
                className="w-full bg-bg-panel-hover border border-border-main rounded-xl px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-purple-500 transition-colors" 
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-text-muted block mb-2">{t('settings.profile.phone') || 'Phone Number'}</label>
              <input 
                type="tel" 
                value={profile.phone}
                onChange={e => setProfile({...profile, phone: e.target.value})}
                className="w-full bg-bg-panel-hover border border-border-main rounded-xl px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-purple-500 transition-colors" 
              />
            </div>
            <div className="pt-2">
               <button type="submit" className="bg-purple-600 text-text-main font-semibold py-2.5 px-6 rounded-xl hover:bg-purple-500 transition-colors text-sm w-full">
                 {t('settings.profile.save') || 'Save Profile'}
               </button>
            </div>
          </div>
        </form>
      )}

      {activeTab === 'business' && (
        <div className="bg-bg-panel p-6 rounded-2xl border border-border-main shadow-lg max-w-xl">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-text-main">{t('settings.business.title')}</h3>
            <p className="text-sm text-text-muted">{t('settings.business.desc')}</p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-text-muted block mb-2">{t('settings.business.typeLabel')}</label>
              
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-bg-panel-hover border border-border-main rounded-xl px-4 py-3 text-sm text-text-main flex items-center justify-between hover:bg-white/10 hover:border-purple-500/50 transition-all cursor-pointer shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <SelectedIcon size={18} className="text-purple-400" />
                    <span className="font-medium">{selectedOption.label}</span>
                  </div>
                  <ChevronDown size={18} className={`text-text-muted transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-purple-400' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <>
                    {/* Invisible overlay for click-outside closure */}
                    <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                    
                    <div className="absolute left-0 mt-2 w-full bg-[#161616] border border-border-main rounded-xl shadow-2xl overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="p-1 space-y-1">
                        {businessOptions.map(option => {
                          const IconComponent = option.icon;
                          const isSelected = option.id === businessType;
                          return (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => {
                                setBusinessType(option.id);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm text-left transition-all ${
                                isSelected 
                                  ? 'bg-purple-600 text-text-main font-bold' 
                                  : 'text-zinc-300 hover:text-text-main hover:bg-bg-panel-hover'
                              }`}
                            >
                              <IconComponent size={16} className={isSelected ? 'text-text-main' : 'text-text-muted'} />
                              <span>{option.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-sm text-purple-200 leading-relaxed shadow-sm">
              <strong>💡 {t('settings.business.tipTitle')}</strong>: {t('settings.business.tipDesc')}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'knowledge' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Upload & Active Sources */}
          <div className="space-y-6">
            <div className="bg-bg-panel p-6 rounded-2xl border border-border-main shadow-lg">
              <h3 className="text-lg font-bold text-text-main mb-2">{t('settings.uploadTitle')}</h3>
              <p className="text-sm text-text-muted mb-6">{t('settings.uploadDesc')}</p>
              
              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-purple-500/50 hover:bg-purple-500/5 transition-colors cursor-pointer bg-bg-panel-hover">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Upload size={24} className="text-zinc-300" />
                </div>
                <p className="text-sm font-bold text-text-main mb-1">{t('settings.uploadBox')}</p>
                <p className="text-xs text-zinc-500">{t('settings.uploadSub')}</p>
              </div>
            </div>

            <div className="bg-bg-panel p-6 rounded-2xl border border-border-main shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-text-main">{t('settings.activeSources')}</h3>
                <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">80% Optimized</span>
              </div>
              
              <div className="space-y-3">
                {[
                  { name: 'Services & Pricing.pdf', date: 'Added May 10', size: '2.4 MB' },
                  { name: 'Cancellation Policy.txt', date: 'Added May 01', size: '12 KB' },
                  { name: 'Website Scrape', date: 'Auto-sync', size: 'Live' },
                ].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-bg-panel-hover border border-border-main hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-lg bg-blue-500/20 text-blue-400">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text-main">{doc.name}</p>
                        <p className="text-[10px] text-text-muted mt-0.5">{doc.date} • {doc.size}</p>
                      </div>
                    </div>
                    <CheckCircle size={20} className="text-emerald-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Chatbot Simulator */}
          <div className="bg-bg-panel p-6 rounded-2xl border border-border-main shadow-lg flex flex-col h-[520px]">
            <div className="flex items-center gap-2.5 mb-2 shrink-0">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400"><Bot size={20} /></div>
              <div>
                <h3 className="text-lg font-bold text-text-main leading-tight">{t('settings.sandbox.title')}</h3>
                <p className="text-xs text-text-muted">{t('settings.sandbox.subtitle')}</p>
              </div>
            </div>
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto space-y-4 my-4 pr-1 min-h-0 text-sm scrollbar-thin">
              {messages.map(msg => (
                <div key={msg.id} className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-2 rounded-xl shrink-0 ${msg.sender === 'user' ? 'bg-purple-600 text-text-main' : 'bg-bg-panel-hover text-zinc-300 border border-border-main'}`}>
                    {msg.sender === 'user' ? <UserIcon size={14} /> : <Bot size={14} className="text-purple-400" />}
                  </div>
                  <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] leading-relaxed ${msg.sender === 'user' ? 'bg-purple-600 text-text-main rounded-tr-none' : 'bg-bg-panel-hover text-zinc-200 border border-border-main rounded-tl-none'}`}>
                    <p>{msg.text}</p>
                    {msg.source && (
                      <span className="inline-block mt-2 text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/20 font-semibold uppercase tracking-wider">
                        Source: {msg.source}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-xl bg-bg-panel-hover text-zinc-300 border border-border-main shrink-0">
                    <Bot size={14} className="text-purple-400" />
                  </div>
                  <div className="px-4 py-2.5 rounded-2xl bg-bg-panel-hover text-text-muted border border-border-main rounded-tl-none italic flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggestions */}
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1 shrink-0">
              <button 
                type="button"
                onClick={() => handleSendSuggestion(t('settings.sandbox.suggestions.prices'))}
                className="text-xs bg-bg-panel-hover border border-border-main rounded-full px-3 py-1.5 text-text-muted hover:text-text-main hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
              >
                {t('settings.sandbox.suggestions.prices')}
              </button>
              <button 
                type="button"
                onClick={() => handleSendSuggestion(t('settings.sandbox.suggestions.policy'))}
                className="text-xs bg-bg-panel-hover border border-border-main rounded-full px-3 py-1.5 text-text-muted hover:text-text-main hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer"
              >
                {t('settings.sandbox.suggestions.policy')}
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="flex gap-2 shrink-0">
              <input 
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder={t('settings.sandbox.placeholder')}
                className="flex-1 bg-bg-panel-hover border border-border-main rounded-xl px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button 
                type="submit"
                className="p-2.5 bg-purple-600 hover:bg-purple-500 text-text-main rounded-xl transition-colors shrink-0 shadow-lg cursor-pointer"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
      
      {activeTab === 'rules' && (
        <div className="bg-bg-panel p-6 rounded-2xl border border-border-main shadow-lg">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-text-main">{t('settings.rules.title')}</h3>
            <p className="text-sm text-text-muted">{t('settings.rules.desc')}</p>
          </div>
          
          <div className="space-y-4">
            {[
              { id: 'rule1', title: t('settings.rules.rule1Title'), desc: t('settings.rules.rule1Desc'), active: true },
              { id: 'rule2', title: t('settings.rules.rule2Title'), desc: t('settings.rules.rule2Desc'), active: true },
              { id: 'rule3', title: t('settings.rules.rule3Title'), desc: t('settings.rules.rule3Desc'), active: false }
            ].map(rule => (
              <div key={rule.id} className="flex items-center justify-between p-4 rounded-xl bg-bg-panel-hover border border-border-main hover:bg-white/10 transition-colors">
                <div className="flex-1 pr-6">
                  <h4 className="text-sm font-bold text-text-main mb-1">{rule.title}</h4>
                  <p className="text-xs text-text-muted">{rule.desc}</p>
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
        <div className="bg-bg-panel p-6 rounded-2xl border border-border-main shadow-lg">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-text-main">Integrations</h3>
            <p className="text-sm text-text-muted">Connect Nexora to your favorite tools.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Google Calendar', desc: 'Two-way sync for appointments.', icon: '📅', connected: true },
              { name: 'Stripe', desc: 'Accept payments and deposits.', icon: '💳', connected: false },
              { name: 'WhatsApp Business', desc: 'AI-driven chat and reminders.', icon: '💬', connected: true },
              { name: 'Mailchimp', desc: 'Sync customer segments.', icon: '📧', connected: false },
            ].map((int, i) => (
              <div key={i} className="p-5 rounded-xl border border-border-main bg-bg-panel-hover flex items-start gap-4">
                <div className="text-3xl">{int.icon}</div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-text-main">{int.name}</h4>
                  <p className="text-xs text-text-muted mb-3">{int.desc}</p>
                  <button className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${int.connected ? 'bg-zinc-800 text-zinc-300 hover:text-text-main' : 'bg-white text-black hover:bg-zinc-200'}`}>
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
        <div className="bg-bg-panel p-6 rounded-2xl border border-border-main shadow-lg max-w-2xl">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-text-main">Security Settings</h3>
            <p className="text-sm text-text-muted">Manage your account security and authentication.</p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-text-main">Change Password</h4>
              <input type="password" placeholder="Current Password" className="w-full bg-bg-panel-hover border border-border-main rounded-xl px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-purple-500 transition-colors" />
              <input type="password" placeholder="New Password" className="w-full bg-bg-panel-hover border border-border-main rounded-xl px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-purple-500 transition-colors" />
              <button className="bg-white/10 text-text-main font-semibold py-2 px-4 rounded-lg hover:bg-white/20 transition-colors text-sm">Update Password</button>
            </div>
            
            <hr className="border-border-main" />
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-text-main mb-1">Two-Factor Authentication (2FA)</h4>
                <p className="text-xs text-text-muted">Add an extra layer of security to your account.</p>
              </div>
              <button className="bg-purple-600 text-text-main font-semibold py-2 px-4 rounded-lg hover:bg-purple-500 transition-colors text-sm">Enable 2FA</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
