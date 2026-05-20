import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, User, AlertCircle, Plus, X, ChevronDown, List as ListIcon, Grid as GridIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useBusiness } from '../context/BusinessContext';
import { EmptyState } from '../components/EmptyState';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const businessApts = {
  salon: [
    { id: 1, time: '09:00', client: 'Emma Thompson', serviceKey: 'facial', duration: '60 min', status: 'confirmed' },
    { id: 2, time: '10:30', client: 'Michael Chen', serviceKey: 'massage', duration: '90 min', status: 'arrived' },
    { id: 3, time: '13:00', client: 'Sarah Jenkins', serviceKey: 'nails', duration: '90 min', status: 'confirmed' },
    { id: 4, time: '15:30', client: 'Jessica Alba', serviceKey: 'hair', duration: '45 min', status: 'pending' },
  ],
  clinic: [
    { id: 1, time: '09:00', client: 'Emma Thompson', serviceKey: 'checkup', duration: '30 min', status: 'confirmed' },
    { id: 2, time: '10:30', client: 'Michael Chen', serviceKey: 'cleaning', duration: '60 min', status: 'arrived' },
    { id: 3, time: '13:00', client: 'Sarah Jenkins', serviceKey: 'extraction', duration: '45 min', status: 'confirmed' },
    { id: 4, time: '15:30', client: 'Jessica Alba', serviceKey: 'rootcanal', duration: '60 min', status: 'pending' },
  ],
  gym: [
    { id: 1, time: '09:00', client: 'Emma Thompson', serviceKey: 'personal', duration: '60 min', status: 'confirmed' },
    { id: 2, time: '10:30', client: 'Michael Chen', serviceKey: 'yoga', duration: '75 min', status: 'arrived' },
    { id: 3, time: '13:00', client: 'Sarah Jenkins', serviceKey: 'hiit', duration: '60 min', status: 'confirmed' },
    { id: 4, time: '15:30', client: 'Jessica Alba', serviceKey: 'spinning', duration: '45 min', status: 'pending' },
  ],
  cafe: [
    { id: 1, time: '09:00', client: 'Emma Thompson', serviceKey: 'booth', duration: '120 min', status: 'confirmed' },
    { id: 2, time: '10:30', client: 'Michael Chen', serviceKey: 'patio', duration: '90 min', status: 'arrived' },
    { id: 3, time: '13:00', client: 'Sarah Jenkins', serviceKey: 'chef', duration: '150 min', status: 'confirmed' },
    { id: 4, time: '15:30', client: 'Jessica Alba', serviceKey: 'party', duration: '180 min', status: 'pending' },
  ],
  shop: [
    { id: 1, time: '09:00', client: 'Emma Thompson', serviceKey: 'style', duration: '30 min', status: 'confirmed' },
    { id: 2, time: '10:30', client: 'Michael Chen', serviceKey: 'bulk', duration: '45 min', status: 'arrived' },
    { id: 3, time: '13:00', client: 'Sarah Jenkins', serviceKey: 'fitting', duration: '60 min', status: 'confirmed' },
    { id: 4, time: '15:30', client: 'Jessica Alba', serviceKey: 'registry', duration: '45 min', status: 'pending' },
  ],
};

const serviceOptions = {
  salon: ['facial', 'massage', 'nails', 'hair'],
  clinic: ['checkup', 'cleaning', 'extraction', 'rootcanal'],
  gym: ['personal', 'yoga', 'hiit', 'spinning'],
  cafe: ['booth', 'patio', 'chef', 'party'],
  shop: ['style', 'bulk', 'fitting', 'registry'],
};

export const Appointments = () => {
  const { t } = useTranslation();
  const { businessType } = useBusiness();
  const [showModal, setShowModal] = useState(false);
  const [selectedApt, setSelectedApt] = useState(null);
  const [appointmentList, setAppointmentList] = useState([]);
  const [viewMode, setViewMode] = useState('list');

  // Reset or change list on businessType change
  useEffect(() => {
    setAppointmentList(businessApts[businessType] || businessApts.salon);
  }, [businessType]);

  // Form State
  const [clientName, setClientName] = useState('');
  const [serviceKey, setServiceKey] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);

  // Update default selected key when businessType changes
  useEffect(() => {
    const keys = serviceOptions[businessType] || serviceOptions.salon;
    setServiceKey(keys[0]);
  }, [businessType]);

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!clientName || !time) return;

    const newApt = {
      id: appointmentList.length + 1,
      time: time,
      client: clientName,
      serviceKey: serviceKey,
      duration: businessType === 'cafe' ? '120 min' : '60 min',
      status: 'confirmed'
    };

    setAppointmentList(prev => [...prev, newApt]);
    setShowModal(false);
    
    // Reset form
    setClientName('');
    setDate('');
    setTime('');
  };

  const keys = serviceOptions[businessType] || serviceOptions.salon;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 relative">
      
      <div className="flex justify-between items-center bg-[#111] border border-white/10 p-4 rounded-2xl shadow-lg">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
            <CalendarIcon size={24} />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-white">{t('appointments.today')}</h2>
            <p className="text-sm text-zinc-400 font-medium">May 12, 2026</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-[#050505] p-1 rounded-xl border border-white/10 hidden sm:flex">
             <button 
               onClick={() => setViewMode('list')}
               className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-white'}`}
             >
               <ListIcon size={18} />
             </button>
             <button 
               onClick={() => setViewMode('calendar')}
               className={`p-1.5 rounded-lg transition-colors ${viewMode === 'calendar' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-white'}`}
             >
               <GridIcon size={18} />
             </button>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-white text-black font-bold py-2.5 px-5 rounded-xl hover:bg-zinc-200 transition-all flex items-center gap-2 text-sm shadow-md"
          >
            <Plus size={16} />
            {t('appointments.newBooking')}
          </button>
        </div>
      </div>

      {/* AI Suggestion */}
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 p-6 rounded-2xl flex justify-between items-center shadow-md">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-orange-500 text-white shadow-lg">
            <AlertCircle size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">{t('appointments.aiSuggestion')}</h3>
            <p className="text-sm text-zinc-300 leading-relaxed">{t('appointments.aiSuggestionDesc')}</p>
          </div>
        </div>
        <button className="bg-orange-500 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-orange-600 transition-colors text-sm whitespace-nowrap">
          {t('appointments.sendCampaign')}
        </button>
      </div>

      {/* Main View Area */}
      {appointmentList.length === 0 ? (
        <EmptyState 
          icon={CalendarIcon} 
          title={t('appointments.emptyTitle') || 'No appointments yet'} 
          description={t('appointments.emptyDesc') || 'You have no appointments scheduled for today.'} 
          action={
            <button 
              onClick={() => setShowModal(true)}
              className="bg-purple-600 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-purple-500 transition-colors shadow-lg mt-2 flex items-center gap-2 mx-auto"
            >
              <Plus size={16} />
              {t('appointments.newBooking')}
            </button>
          }
        />
      ) : viewMode === 'list' ? (
        <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
          {appointmentList.map((apt) => (
            <div key={apt.id} onClick={() => setSelectedApt(apt)} className="flex items-center gap-6 p-6 border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors cursor-pointer group flex-wrap sm:flex-nowrap">
              <div className="text-xl font-bold text-white w-16 group-hover:text-purple-400 transition-colors">{apt.time}</div>
              
              <div className="flex-1 min-w-[200px]">
                <h4 className="text-base font-bold text-white mb-1">{apt.client}</h4>
                <div className="flex items-center gap-3 text-zinc-400 text-xs font-medium">
                  <span className="flex items-center gap-1"><User size={14} /> {t('appointments.newClient') || 'Client'}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-600" />
                  <span className="flex items-center gap-1"><Clock size={14} /> {apt.duration}</span>
                </div>
              </div>

              <div className="text-sm text-zinc-300 font-medium px-4 py-1.5 bg-white/5 rounded-lg border border-white/10 shrink-0">
                {t(`appointments.services.${businessType}.${apt.serviceKey}`)}
              </div>
              
              <div className={`shrink-0 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${
                apt.status === 'arrived' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                apt.status === 'confirmed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : 
                'bg-orange-500/10 text-orange-400 border-orange-500/30'
              }`}>
                {t(`appointments.status.${apt.status}`)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-lg overflow-x-auto" style={{ minHeight: '600px' }}>
           <style>{`
             .fc-theme-standard td, .fc-theme-standard th { border-color: rgba(255,255,255,0.1); }
             .fc .fc-toolbar-title { font-size: 1.25rem; font-weight: bold; color: white; }
             .fc .fc-button-primary { background-color: #8b5cf6; border-color: #8b5cf6; }
             .fc .fc-button-primary:not(:disabled):active, .fc .fc-button-primary:not(:disabled).fc-button-active { background-color: #7c3aed; border-color: #7c3aed; }
             .fc-timegrid-slot-label { color: #a1a1aa; font-size: 0.8rem; }
             .fc-event { cursor: pointer; border-radius: 0.5rem; overflow: hidden; font-size: 0.75rem; padding: 2px; }
             .fc-v-event { background-color: rgba(139, 92, 246, 0.2); border: 1px solid rgba(139, 92, 246, 0.5); color: #c4b5fd; }
             .fc-v-event .fc-event-main { color: white; font-weight: bold; }
           `}</style>
           <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridDay"
            headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
            events={appointmentList.map(apt => {
              const today = new Date().toISOString().split('T')[0];
              const startStr = `${today}T${apt.time}:00`;
              const durationMins = parseInt(apt.duration) || 60;
              const endDate = new Date(new Date(startStr).getTime() + durationMins * 60000);
              return {
                id: String(apt.id),
                title: `${apt.client} - ${t(`appointments.services.${businessType}.${apt.serviceKey}`)}`,
                start: startStr,
                end: endDate.toISOString(),
                extendedProps: { ...apt }
              };
            })}
            eventClick={(info) => {
              setSelectedApt(info.event.extendedProps);
            }}
            height="100%"
            allDaySlot={false}
            slotMinTime="08:00:00"
            slotMaxTime="20:00:00"
           />
        </div>
      )}

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
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">{t('appointments.clientName')}</label>
                  <input 
                    type="text" 
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors" 
                    placeholder={t('appointments.clientPlaceholder')} 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">{t('appointments.service')}</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white flex items-center justify-between hover:bg-white/10 hover:border-purple-500/50 transition-all cursor-pointer shadow-md"
                    >
                      <span>{t(`appointments.services.${businessType}.${serviceKey}`)}</span>
                      <ChevronDown size={18} className={`text-zinc-400 transition-transform duration-300 ${isServiceDropdownOpen ? 'rotate-180 text-purple-400' : ''}`} />
                    </button>

                    {isServiceDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsServiceDropdownOpen(false)} />
                        <div className="absolute left-0 mt-2 w-full bg-[#161616] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="p-1 space-y-1">
                            {keys.map((k) => (
                              <button
                                key={k}
                                type="button"
                                onClick={() => {
                                  setServiceKey(k);
                                  setIsServiceDropdownOpen(false);
                                }}
                                className={`w-full px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm text-left transition-all ${
                                  serviceKey === k 
                                    ? 'bg-purple-600 text-white font-bold' 
                                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                <span>{t(`appointments.services.${businessType}.${k}`)}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">{t('appointments.date')}</label>
                    <input 
                      type="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 block">{t('appointments.time')}</label>
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
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-xl font-bold text-sm text-zinc-300 hover:bg-white/5 transition-colors">{t('appointments.cancel')}</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl font-bold text-sm bg-purple-600 text-white hover:bg-purple-500 transition-colors">{t('appointments.confirm')}</button>
             </div>
          </form>
        </div>
      )}
      {/* Appointment Details Modal */}
      {selectedApt && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#111] border border-white/10 w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden">
             <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">{t('appointments.details') || 'Appointment Details'}</h3>
                <button type="button" onClick={() => setSelectedApt(null)} className="text-zinc-500 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <X size={20} />
                </button>
             </div>
             <div className="p-6 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/40 to-blue-500/40 flex items-center justify-center text-lg font-bold text-white border border-white/10">
                    {selectedApt.client.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white leading-tight">{selectedApt.client}</p>
                    <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5"><Clock size={12}/> {selectedApt.time} ({selectedApt.duration})</p>
                  </div>
                </div>
                
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                   <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mb-1">{t('appointments.service')}</p>
                   <p className="text-sm text-white font-medium">{t(`appointments.services.${businessType}.${selectedApt.serviceKey}`)}</p>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                   <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">{t('appointments.statusLabel') || 'Status'}</p>
                   <div className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${
                     selectedApt.status === 'arrived' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                     selectedApt.status === 'confirmed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : 
                     'bg-orange-500/10 text-orange-400 border-orange-500/30'
                   }`}>
                     {t(`appointments.status.${selectedApt.status}`)}
                   </div>
                </div>
             </div>
             <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex gap-3">
                <button type="button" onClick={() => setSelectedApt(null)} className="flex-1 py-2.5 rounded-xl font-bold text-sm bg-white text-black hover:bg-zinc-200 transition-colors">
                  {t('customers.close') || 'Close'}
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
