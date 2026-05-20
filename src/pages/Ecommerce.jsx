import React, { useState } from 'react';
import { ShoppingBag, Package, DollarSign, RefreshCw, Plus, AlertCircle, Truck, Check, Clock, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const orders = [
  { id: '#ORD-1042', customer: 'Ayşe Kara', product: 'Face Serum Bundle', amount: 89.90, status: 'delivered', date: 'May 17' },
  { id: '#ORD-1041', customer: 'Mehmet Yılmaz', product: 'Hair Care Set', amount: 64.50, status: 'shipped', date: 'May 17' },
  { id: '#ORD-1040', customer: 'Fatma Demir', product: 'Vitamin C Cream', amount: 45.00, status: 'processing', date: 'May 16' },
  { id: '#ORD-1039', customer: 'Ali Çelik', product: 'Premium Nail Kit', amount: 32.00, status: 'delivered', date: 'May 16' },
  { id: '#ORD-1038', customer: 'Zeynep Arslan', product: 'Face Serum Bundle', amount: 89.90, status: 'refunded', date: 'May 15' },
];

const products = [
  { id: 1, name: 'Face Serum Bundle', category: 'Skin Care', price: 89.90, stock: 3, sold: 48 },
  { id: 2, name: 'Hair Care Set', category: 'Hair', price: 64.50, stock: 15, sold: 31 },
  { id: 3, name: 'Vitamin C Cream', category: 'Skin Care', price: 45.00, stock: 22, sold: 67 },
  { id: 4, name: 'Premium Nail Kit', category: 'Nails', price: 32.00, stock: 8, sold: 24 },
];

const statusConfig = {
  delivered: { color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', icon: Check },
  shipped: { color: 'bg-blue-500/10 text-blue-400 border-blue-500/30', icon: Truck },
  processing: { color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30', icon: Clock },
  refunded: { color: 'bg-red-500/10 text-red-400 border-red-500/30', icon: X },
};

export const Ecommerce = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-main mb-1">{t('ecommerce.title')}</h1>
          <p className="text-sm text-text-muted">{t('ecommerce.subtitle')}</p>
        </div>
        <button className="bg-white text-black font-bold py-2.5 px-5 rounded-xl hover:bg-zinc-200 transition-colors flex items-center gap-2 text-sm shadow-lg">
          <Plus size={16} />{t('ecommerce.newOrder')}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: ShoppingBag, label: t('ecommerce.totalOrders'), value: '142', color: 'text-blue-400', change: '+8 today' },
          { icon: Truck, label: t('ecommerce.pendingShipment'), value: '12', color: 'text-yellow-400', change: 'Needs action' },
          { icon: DollarSign, label: t('ecommerce.revenue'), value: '$4,820', color: 'text-emerald-400', change: '+$320 today' },
          { icon: RefreshCw, label: t('ecommerce.refunds'), value: '3', color: 'text-red-400', change: 'This month' },
        ].map((stat, i) => (
          <div key={i} className="bg-bg-panel border border-border-main p-5 rounded-2xl shadow-md">
            <stat.icon size={20} className={`${stat.color} mb-2`} />
            <p className="text-xs text-zinc-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-text-main">{stat.value}</p>
            <p className="text-xs text-zinc-500 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* AI Restock Alert */}
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 p-5 rounded-2xl flex justify-between items-center shadow-md">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-orange-500 text-text-main shadow-lg shrink-0"><AlertCircle size={22} /></div>
          <div>
            <h3 className="font-bold text-text-main mb-1">{t('ecommerce.aiSuggestion')}</h3>
            <p className="text-sm text-zinc-300">{t('ecommerce.aiSuggestionDesc')}</p>
          </div>
        </div>
        <button className="bg-orange-500 text-text-main font-bold py-2.5 px-6 rounded-xl hover:bg-orange-600 transition-colors text-sm whitespace-nowrap">
          {t('ecommerce.reorderNow')}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border-main pb-px">
        {[{ id: 'orders', label: t('ecommerce.orders') }, { id: 'products', label: t('ecommerce.products') }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 border-b-2 text-sm font-semibold transition-all ${activeTab === tab.id ? 'border-purple-500 text-text-main' : 'border-transparent text-text-muted hover:text-text-main'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'orders' && (
        <div className="bg-bg-panel border border-border-main rounded-2xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-border-main">
            <span className="col-span-2 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{t('ecommerce.orderId')}</span>
            <span className="col-span-3 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{t('ecommerce.customer')}</span>
            <span className="col-span-3 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{t('ecommerce.product')}</span>
            <span className="col-span-2 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{t('ecommerce.amount')}</span>
            <span className="col-span-2 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{t('ecommerce.status')}</span>
          </div>
          {orders.map(order => {
            const cfg = statusConfig[order.status] || statusConfig.delivered;
            return (
              <div key={order.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-border-main last:border-0 hover:bg-bg-panel-hover transition-colors">
                <div className="col-span-2 text-xs font-mono text-purple-400 font-bold">{order.id}</div>
                <div className="col-span-3 text-sm font-medium text-text-main">{order.customer}</div>
                <div className="col-span-3 text-sm text-text-muted">{order.product}</div>
                <div className="col-span-2 text-sm font-bold text-emerald-400">${order.amount}</div>
                <div className="col-span-2">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${cfg.color}`}>{t(`ecommerce.statuses.${order.status}`)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'products' && (
        <div className="bg-bg-panel border border-border-main rounded-2xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-border-main">
            <span className="col-span-4 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{t('ecommerce.product')}</span>
            <span className="col-span-2 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{t('ecommerce.category')}</span>
            <span className="col-span-2 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{t('ecommerce.price')}</span>
            <span className="col-span-2 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{t('ecommerce.stock')}</span>
            <span className="col-span-2 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{t('ecommerce.sold')}</span>
          </div>
          {products.map(product => (
            <div key={product.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-border-main last:border-0 hover:bg-bg-panel-hover transition-colors">
              <div className="col-span-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0"><Package size={16} /></div>
                <span className="text-sm font-bold text-text-main">{product.name}</span>
              </div>
              <div className="col-span-2"><span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-zinc-300 font-medium">{product.category}</span></div>
              <div className="col-span-2 text-sm font-bold text-emerald-400">${product.price}</div>
              <div className="col-span-2">
                <span className={`text-sm font-bold ${product.stock <= 5 ? 'text-red-400' : 'text-text-main'}`}>{product.stock}</span>
                {product.stock <= 5 && <span className="ml-1 text-[10px] text-red-400">{t('ecommerce.low')}</span>}
              </div>
              <div className="col-span-2 text-sm text-text-muted">{product.sold} {t('ecommerce.units')}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
