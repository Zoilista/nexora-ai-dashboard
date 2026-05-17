import React, { useState } from 'react';
import { ShoppingBag, Package, DollarSign, RefreshCw, Plus, AlertCircle, ChevronDown, Truck, Check, Clock, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const orders = [
  { id: '#ORD-1042', customer: 'Ayşe Kara', product: 'Face Serum Bundle', amount: 89.90, status: 'Delivered', date: 'May 17' },
  { id: '#ORD-1041', customer: 'Mehmet Yılmaz', product: 'Hair Care Set', amount: 64.50, status: 'Shipped', date: 'May 17' },
  { id: '#ORD-1040', customer: 'Fatma Demir', product: 'Vitamin C Cream', amount: 45.00, status: 'Processing', date: 'May 16' },
  { id: '#ORD-1039', customer: 'Ali Çelik', product: 'Premium Nail Kit', amount: 32.00, status: 'Delivered', date: 'May 16' },
  { id: '#ORD-1038', customer: 'Zeynep Arslan', product: 'Face Serum Bundle', amount: 89.90, status: 'Refunded', date: 'May 15' },
];

const products = [
  { id: 1, name: 'Face Serum Bundle', category: 'Skin Care', price: 89.90, stock: 3, sold: 48 },
  { id: 2, name: 'Hair Care Set', category: 'Hair', price: 64.50, stock: 15, sold: 31 },
  { id: 3, name: 'Vitamin C Cream', category: 'Skin Care', price: 45.00, stock: 22, sold: 67 },
  { id: 4, name: 'Premium Nail Kit', category: 'Nails', price: 32.00, stock: 8, sold: 24 },
];

const statusConfig = {
  Delivered: { color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', icon: Check },
  Shipped: { color: 'bg-blue-500/10 text-blue-400 border-blue-500/30', icon: Truck },
  Processing: { color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30', icon: Clock },
  Refunded: { color: 'bg-red-500/10 text-red-400 border-red-500/30', icon: X },
};

export const Ecommerce = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">{t('ecommerce.title')}</h1>
          <p className="text-sm text-zinc-400">{t('ecommerce.subtitle')}</p>
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
          <div key={i} className="bg-[#111] border border-white/10 p-5 rounded-2xl shadow-md">
            <stat.icon size={20} className={`${stat.color} mb-2`} />
            <p className="text-xs text-zinc-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-zinc-500 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* AI Restock Alert */}
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 p-5 rounded-2xl flex justify-between items-center shadow-md">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-orange-500 text-white shadow-lg shrink-0"><AlertCircle size={22} /></div>
          <div>
            <h3 className="font-bold text-white mb-1">{t('ecommerce.aiSuggestion')}</h3>
            <p className="text-sm text-zinc-300">{t('ecommerce.aiSuggestionDesc')}</p>
          </div>
        </div>
        <button className="bg-orange-500 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-orange-600 transition-colors text-sm whitespace-nowrap">
          {t('ecommerce.reorderNow')}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-px">
        {[{ id: 'orders', label: t('ecommerce.orders') }, { id: 'products', label: t('ecommerce.products') }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 border-b-2 text-sm font-semibold transition-all ${activeTab === tab.id ? 'border-purple-500 text-white' : 'border-transparent text-zinc-400 hover:text-white'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'orders' && (
        <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/5">
            <span className="col-span-2 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Order ID</span>
            <span className="col-span-3 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Customer</span>
            <span className="col-span-3 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Product</span>
            <span className="col-span-2 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Amount</span>
            <span className="col-span-2 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Status</span>
          </div>
          {orders.map(order => {
            const cfg = statusConfig[order.status];
            return (
              <div key={order.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                <div className="col-span-2 text-xs font-mono text-purple-400 font-bold">{order.id}</div>
                <div className="col-span-3 text-sm font-medium text-white">{order.customer}</div>
                <div className="col-span-3 text-sm text-zinc-400">{order.product}</div>
                <div className="col-span-2 text-sm font-bold text-emerald-400">${order.amount}</div>
                <div className="col-span-2">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${cfg.color}`}>{order.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'products' && (
        <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/5">
            <span className="col-span-4 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Product</span>
            <span className="col-span-2 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Category</span>
            <span className="col-span-2 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Price</span>
            <span className="col-span-2 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Stock</span>
            <span className="col-span-2 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Sold</span>
          </div>
          {products.map(product => (
            <div key={product.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
              <div className="col-span-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0"><Package size={16} /></div>
                <span className="text-sm font-bold text-white">{product.name}</span>
              </div>
              <div className="col-span-2"><span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-zinc-300 font-medium">{product.category}</span></div>
              <div className="col-span-2 text-sm font-bold text-emerald-400">${product.price}</div>
              <div className="col-span-2">
                <span className={`text-sm font-bold ${product.stock <= 5 ? 'text-red-400' : 'text-white'}`}>{product.stock}</span>
                {product.stock <= 5 && <span className="ml-1 text-[10px] text-red-400">Low</span>}
              </div>
              <div className="col-span-2 text-sm text-zinc-400">{product.sold} units</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
