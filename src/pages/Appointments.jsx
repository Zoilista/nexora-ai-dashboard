import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, AlertCircle, Plus, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const appointments = [
  { id: 1, time: '09:00', client: 'Emma Thompson', service: 'Signature Facial', duration: '60 min', status: 'confirmed' },
  { id: 2, time: '10:30', client: 'Michael Chen', service: 'Deep Tissue Massage', duration: '90 min', status: 'arrived' },
  { id: 3, time: '13:00', client: 'Sarah Jenkins', service: 'Manicure & Pedicure', duration: '90 min', status: 'confirmed' },
  { id: 4, time: '15:30', client: 'Jessica Alba', service: 'Laser Hair Removal', duration: '45 min', status: 'pending' },
];

export const Appointments = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [appointmentList, setAppointmentList] = useState(appointments);

  // Form State
  const [clientName, setClientName] = useState('');
  const [service, setService] = useState('Signature Facial');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!clientName || !time) return;

    const newApt = {
      id: appointmentList.length + 1,
      time: time,
      client: clientName,
      service: service,
      duration: '60 min',
      status: 'confirmed'
    };

    setAppointmentList([...appointmentList, newApt]);
    setShowModal(false);
    
    // Reset form
    setClientName('');
    setService('Signature Facial');
    setDate('');
    setTime('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 relative">
      
      <div className="flex justify-between items-center bg-[#111] border border-white/10 p-4 rounded-2xl shadow-lg">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
            <CalendarIcon size={24} />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-white">{t('appointments.today')}</h2>
            <p className="text-sm text-zinc-400">May 12, 2026</p>
          </div>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-white text-black font-bold py-2 px-4 rounded-lg hover:bg-zinc-200 transition-colors flex items-center gap-2 text-sm"
        >
          <Plus size={16} />
          {t('appointments.newBooking')}
        </button>
      </div>

      {/* AI Suggestion */}
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 p-6 rounded-2xl flex justify-between items-center shadow-md">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-orange-500 text-white shadow-lg">
            <AlertCircle size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">{t('appointments.aiSuggestion')}</h3>
            <p className="text-sm text-zinc-300">{t('appointments.aiSuggestionDesc')}</p>
          </div>
        </div>
        <button className="bg-orange-500 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-orange-600 transition-colors text-sm whitespace-nowrap">
          {t('appointments.sendCampaign')}
        </button>
      </div>

      {/* List View */}
      <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
        {appointmentList.map((apt, i) => (
          <div key={apt.id} className="flex items-center gap-6 p-6 border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors">
            <div className="text-xl font-bold text-white w-16">{apt.time}</div>
            
            <div className="flex-1">
              <h4 className="text-base font-bold text-white mb-1">{apt.client}</h4>
              <div className="flex items-center gap-3 text-zinc-400 text-xs font-medium">
                <span className="flex items-center gap-1"><User size={14} /> {t('appointments.newClient') || 'Client'}</span>
                <span className="w-1 h-1 rounded-full bg-zinc-600" />
                <span className="flex items-center gap-1"><Clock size={14} /> {apt.duration}</span>
              </div>
            </div>

            <div className="text-sm text-zinc-300 font-medium px-4 py-1.5 bg-white/5 rounded-lg border border-white/10">
              {apt.service}
            </div>
            
            <div className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${
              apt.status === 'arrived' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
              apt.status === 'confirmed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : 
              'bg-orange-500/10 text-orange-400 border-orange-500/30'
            }`}>
              {apt.status}
            </div>
          </div>
        ))}
      </div>

      {/* New Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <form onSubmit={handleConfirmBooking} className="bg-[#111] border border-white/10 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
             <div className="p-6 border-b border-white/10 flex items-center justify-between">
               <h3 className="text-xl font-bold text-white">{t('appointments.newBooking')}</h3>
               <button type="button" onClick={() => setShowModal(false)} className="text-zinc-500 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors">
                 <X size={20} />
               </button>
             </div>
             <div className="p-6 space-y-4">
               <div>
                 <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Client Name</label>
                 <input 
                   type="text" 
                   required
                   value={clientName}
                   onChange={(e) => setClientName(e.target.value)}
                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors" 
                   placeholder="e.g. Jane Doe" 
                 />
               </div>
               <div>
                 <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Service</label>
                 <select 
                   value={service}
                   onChange={(e) => setService(e.target.value)}
                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none cursor-pointer"
                 >
                   <option value="Signature Facial" className="bg-[#111]">Signature Facial</option>
                   <option value="Deep Tissue Massage" className="bg-[#111]">Deep Tissue Massage</option>
                   <option value="Manicure & Pedicure" className="bg-[#111]">Manicure & Pedicure</option>
                   <option value="Laser Hair Removal" className="bg-[#111]">Laser Hair Removal</option>
                 </select>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Date</label>
                   <input 
                     type="date" 
                     value={date}
                     onChange={(e) => setDate(e.target.value)}
                     className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors" 
                   />
                 </div>
                 <div>
                   <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">Time</label>
                   <input 
                     type="time" 
                     required
                     value={time}
                     onChange={(e) => setTime(e.target.value)}
                     className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors" 
                   />
                 </div>
               </div>
             </div>
             <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex justify-end gap-3">
               <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-xl font-bold text-sm text-zinc-300 hover:bg-white/5 transition-colors">Cancel</button>
               <button type="submit" className="px-6 py-2.5 rounded-xl font-bold text-sm bg-purple-600 text-white hover:bg-purple-500 transition-colors">Confirm Booking</button>
             </div>
          </form>
        </div>
      )}
    </div>
  );
};
