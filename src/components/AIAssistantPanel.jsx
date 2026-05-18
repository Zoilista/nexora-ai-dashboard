import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, RotateCcw, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// Pattern matching engine
const getAIResponse = (message, t, navigate) => {
  const msg = message.toLowerCase();

  // Navigation commands
  if (msg.match(/campaign|kampanya|campaña|campagne|kampagne|活动|营销/)) {
    return {
      text: t('aiChat.cmdCampaigns'),
      action: { label: t('aiChat.btnViewCampaigns'), route: '/campaigns' }
    };
  }
  if (msg.match(/revenue|gelir|satış|ingresos|revenu|umsatz|收入|营业额|sales/)) {
    return {
      text: t('aiChat.cmdRevenue'),
      action: { label: t('aiChat.btnViewCampaigns'), route: '/insights' }
    };
  }
  if (msg.match(/customer|müşteri|cliente|client|kunden|客户|顾客/)) {
    return {
      text: t('aiChat.cmdCustomers'),
      action: { label: t('aiChat.btnViewCustomers'), route: '/customers' }
    };
  }
  if (msg.match(/appointment|randevu|cita|rendez|termin|预约|randezvous/)) {
    return {
      text: t('aiChat.cmdAppointments'),
      action: { label: t('aiChat.btnViewAppointments'), route: '/appointments' }
    };
  }
  if (msg.match(/help|yardım|ayuda|aide|hilfe|帮助|帮我/)) {
    return {
      text: t('aiChat.cmdHelp'),
      action: null
    };
  }
  // Default fallback
  return {
    text: t('aiChat.cmdDefault') + ' ' + t('aiChat.cmdRevenue'),
    action: { label: t('aiChat.btnViewCampaigns'), route: '/insights' }
  };
};

const quickPrompts = [
  { key: 'revenue', icon: '📈' },
  { key: 'customers', icon: '👥' },
  { key: 'appointments', icon: '📅' },
  { key: 'campaigns', icon: '🚀' },
];

const TypingDots = () => (
  <div className="flex items-center gap-1 px-4 py-3">
    {[0, 1, 2].map(i => (
      <span
        key={i}
        className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
        style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.8s' }}
      />
    ))}
  </div>
);

export const AIAssistantPanel = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const initialMessage = { id: 0, role: 'ai', text: t('aiChat.greeting'), action: null };
  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Re-seed greeting when language changes
  useEffect(() => {
    setMessages([{ id: 0, role: 'ai', text: t('aiChat.greeting'), action: null }]);
  }, [t('aiChat.greeting')]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const handleSend = (text) => {
    const msgText = (text || input).trim();
    if (!msgText) return;

    const userMsg = { id: Date.now(), role: 'user', text: msgText, action: null };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay (600-1100ms)
    const delay = 600 + Math.random() * 500;
    setTimeout(() => {
      const response = getAIResponse(msgText, t, navigate);
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', ...response }]);
    }, delay);
  };

  const handleReset = () => {
    setMessages([{ id: 0, role: 'ai', text: t('aiChat.greeting'), action: null }]);
    setInput('');
  };

  return (
    <aside className={`fixed right-0 top-0 h-screen transition-all duration-500 ease-in-out z-50 ${isOpen ? 'w-[360px] translate-x-0' : 'w-[360px] translate-x-full'}`}>
      <div className="h-full bg-[#0a0a0a] border-l border-white/5 flex flex-col shadow-2xl">

        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-white/5 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Sparkles size={14} className="text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-sm text-white block">{t('aiChat.title')}</span>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                Online
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              title={t('aiChat.newChat')}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors"
            >
              <RotateCcw size={15} />
            </button>
            <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 no-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'ai' && (
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shrink-0 mr-2 mt-0.5 shadow-sm">
                  <Sparkles size={10} className="text-white" />
                </div>
              )}
              <div className="max-w-[80%] space-y-2">
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-purple-600 text-white rounded-tr-sm shadow-md shadow-purple-500/20'
                    : 'bg-white/5 text-zinc-200 rounded-tl-sm border border-white/5'
                }`}>
                  {msg.text}
                </div>
                {/* Action button on AI messages */}
                {msg.role === 'ai' && msg.action && (
                  <button
                    onClick={() => { navigate(msg.action.route); setIsOpen(false); }}
                    className="flex items-center gap-1.5 text-xs font-bold text-purple-400 hover:text-purple-300 bg-purple-500/10 hover:bg-purple-500/15 border border-purple-500/20 px-3 py-1.5 rounded-xl transition-all ml-1"
                  >
                    <ExternalLink size={11} />
                    {msg.action.label}
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shrink-0 mr-2 mt-0.5">
                <Sparkles size={10} className="text-white" />
              </div>
              <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm">
                <TypingDots />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 shrink-0">
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold mb-2">{t('aiChat.quickActions')}</p>
          <div className="grid grid-cols-2 gap-1.5">
            {quickPrompts.map(({ key, icon }) => (
              <button
                key={key}
                onClick={() => handleSend(key)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs text-zinc-400 hover:text-white transition-all text-left"
              >
                <span>{icon}</span>
                <span className="truncate capitalize">{key}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 shrink-0 border-t border-white/5">
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder={t('aiChat.placeholder')}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.07] transition-all placeholder:text-zinc-600"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-white/10 disabled:text-zinc-600 text-white flex items-center justify-center transition-all shadow-md"
            >
              <Send size={14} className="ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
