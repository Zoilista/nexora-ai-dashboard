import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Users, MessageSquare, AlertCircle, ArrowRight, CheckCircle2, ShoppingBag, Package, Utensils } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { HealthScoreGauge } from '../components/HealthScoreGauge';

export const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { businessType } = useBusiness();

  // Define widgets details based on businessType
  let stats = [];
  let aiDesc = t('dashboard.aiActionDesc');
  let upcomingTitle = t('dashboard.upcoming');
  let upcomingItems = [];

  if (businessType === 'shop') {
    stats = [
      { label: t('dashboard.totalRevenueShop'), value: '$1,620', icon: DollarSign, change: '+12.5% vs yesterday', changeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
      { label: t('dashboard.newCustomersShop'), value: '18', icon: ShoppingBag, change: '+8 new orders', changeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
      { label: t('dashboard.pendingMessagesShop'), value: '4', icon: Package, change: 'Action Required', changeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
    ];
    aiDesc = t('dashboard.aiActionDescShop');
    upcomingTitle = t('dashboard.upcomingShop');
    upcomingItems = [
      { time: '#ORD-1042', name: 'Ayşe Kara', service: 'Face Serum Bundle' },
      { time: '#ORD-1041', name: 'Mehmet Yılmaz', service: 'Hair Care Set' },
      { time: '#ORD-1040', name: 'Fatma Demir', service: 'Vitamin C Cream' }
    ];
  } else if (businessType === 'cafe') {
    stats = [
      { label: t('dashboard.totalRevenueCafe'), value: '$2,410', icon: DollarSign, change: '+15.4% vs yesterday', changeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
      { label: t('dashboard.newCustomersCafe'), value: '84', icon: Users, change: '+22 guests today', changeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
      { label: t('dashboard.pendingMessagesCafe'), value: '3', icon: Utensils, change: 'Kitchen approval', changeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
    ];
    aiDesc = t('dashboard.aiActionDescCafe');
    upcomingTitle = t('dashboard.upcomingCafe');
    upcomingItems = [
      { time: 'Table 4', name: 'Premium Coffee & Waffle', service: 'Order Time: 14:05' },
      { time: 'Table 12', name: 'Matcha Latte & Croissant', service: 'Order Time: 14:12' },
      { time: 'Table 8', name: 'Espresso Macchiato', service: 'Order Time: 14:15' }
    ];
  } else {
    // Default salon/clinic/gym
    stats = [
      { label: t('dashboard.totalRevenue'), value: '$12,450', icon: DollarSign, change: '+12.5% vs yesterday', changeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
      { label: t('dashboard.newCustomers'), value: '48', icon: Users, change: '+18.2% vs yesterday', changeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
      { label: t('dashboard.pendingMessages'), value: '12', icon: MessageSquare, change: 'Needs attention', changeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
    ];
    aiDesc = t('dashboard.aiActionDesc');
    upcomingTitle = t('dashboard.upcoming');
    upcomingItems = [
      { time: '14:00', name: 'Emma Thompson', service: 'Signature Facial' },
      { time: '15:30', name: 'Michael Chen', service: 'Deep Tissue Massage' },
      { time: '17:00', name: 'Sarah Jenkins', service: 'Laser Hair Removal' }
    ];
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      {/* Health Score + Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Health Score Gauge — spans 1 col */}
        <div className="lg:col-span-1">
          <HealthScoreGauge />
        </div>
        {/* Stats — spans 2 cols in a 2-col sub-grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-bg-panel border border-border-main p-5 rounded-2xl relative overflow-hidden shadow-md">
              <div className="absolute top-0 right-0 p-5 opacity-10">
                <stat.icon size={56} />
              </div>
              <p className="text-text-muted text-xs font-medium mb-2">{stat.label}</p>
              <h2 className="text-2xl font-display font-bold text-text-main mb-3">{stat.value}</h2>
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold border ${stat.changeColor}`}>
                {stat.change}
              </span>
              <div className="absolute bottom-0 right-0 w-32 h-16 pointer-events-none opacity-20">
                <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full">
                  <path 
                    d={index === 0 ? "M0 30 Q 20 25, 40 10 T 80 15 T 100 5" : index === 1 ? "M0 25 Q 30 30, 50 15 T 80 5 T 100 10" : "M0 10 Q 20 5, 40 20 T 70 25 T 100 15"} 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    className={stat.changeColor.includes('emerald') ? 'text-emerald-500' : stat.changeColor.includes('orange') ? 'text-orange-500' : 'text-purple-500'} 
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Action Card */}
      <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 p-8 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="flex items-start gap-4 relative z-10">
          <div className="p-3 rounded-xl bg-purple-500 text-text-main shadow-lg shrink-0">
            <AlertCircle size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-display font-bold text-text-main mb-2">{t('dashboard.aiActionRequired')}</h3>
            <p className="text-sm text-zinc-300 mb-6 max-w-xl leading-relaxed">{aiDesc}</p>
            
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => navigate('/campaigns')}
                className="bg-white text-black hover:bg-zinc-200 font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-all shadow-md text-sm"
              >
                <CheckCircle2 size={18} />
                {t('dashboard.reviewAndSend')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Upcoming List */}
      <div className="bg-bg-panel border border-border-main rounded-2xl p-8 shadow-md">
        <h3 className="text-lg font-bold text-text-main mb-6">{upcomingTitle}</h3>
        
        <div className="space-y-3">
          {upcomingItems.map((apt, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-bg-panel-hover border border-border-main hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="text-sm font-bold text-purple-400 w-24 shrink-0">{apt.time}</div>
                <div>
                  <h4 className="text-sm font-bold text-text-main">{apt.name}</h4>
                  <p className="text-xs text-text-muted">{apt.service}</p>
                </div>
              </div>
              <button className="text-zinc-500 hover:text-text-main p-2">
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
          
          {upcomingItems.length === 0 && (
            <div className="text-center pt-4 text-xs text-zinc-500">
              {t('dashboard.noAppointments')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
