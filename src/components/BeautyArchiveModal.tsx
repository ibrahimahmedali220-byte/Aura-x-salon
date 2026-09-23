import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  UserCheck,
  Wine,
  Music,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  Plus,
  RefreshCw,
  Download,
  Trash2,
  Heart,
  ChevronRight,
  ShieldCheck,
  Lock,
  ArrowRight
} from 'lucide-react';
import { BeautyArchiveProfile, PastTreatmentRecord } from '../types';
import {
  getBeautyArchive,
  saveBeautyArchive,
  addTreatmentRecord,
  clearBeautyArchive,
} from '../utils/archiveStorage';
import { STYLISTS_DATA, SERVICES_DATA } from '../data/salonData';

interface BeautyArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyToBooking: (profile: BeautyArchiveProfile, serviceId?: string, stylistId?: string) => void;
}

export const BeautyArchiveModal: React.FC<BeautyArchiveModalProps> = ({
  isOpen,
  onClose,
  onApplyToBooking,
}) => {
  const [profile, setProfile] = useState<BeautyArchiveProfile>(getBeautyArchive());
  const [activeTab, setActiveTab] = useState<'profile' | 'history' | 'addLog'>('history');
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // Form state for adding custom treatment record
  const [newLogServiceId, setNewLogServiceId] = useState(SERVICES_DATA[0].id);
  const [newLogStylistId, setNewLogStylistId] = useState(STYLISTS_DATA[0].id);
  const [newLogDate, setNewLogDate] = useState(new Date().toISOString().split('T')[0]);
  const [newLogNotes, setNewLogNotes] = useState('');
  const [newLogFormula, setNewLogFormula] = useState('');

  useEffect(() => {
    if (isOpen) {
      setProfile(getBeautyArchive());
    }
  }, [isOpen]);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveBeautyArchive(profile);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const handleAddNewTreatment = (e: React.FormEvent) => {
    e.preventDefault();
    const service = SERVICES_DATA.find((s) => s.id === newLogServiceId) || SERVICES_DATA[0];
    const stylist = STYLISTS_DATA.find((st) => st.id === newLogStylistId) || STYLISTS_DATA[0];

    const added = addTreatmentRecord({
      serviceId: service.id,
      serviceName: service.name,
      stylistId: stylist.id,
      stylistName: stylist.name,
      date: newLogDate,
      price: service.price,
      notes: newLogNotes || 'Custom ritual documented by patron.',
      formulaNote: newLogFormula || 'Standard haute protocol applied.',
      vipBeverage: profile.preferredBeverage,
    });

    setProfile(getBeautyArchive());
    setActiveTab('history');
    setNewLogNotes('');
    setNewLogFormula('');
  };

  const handleRebookTreatment = (treatment: PastTreatmentRecord) => {
    onApplyToBooking(profile, treatment.serviceId, treatment.stylistId);
    onClose();
  };

  const handleExportDossier = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Aura_Dor_Dossier_${profile.fullName.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetArchive = () => {
    if (window.confirm('Are you sure you wish to clear your local Beauty Archive on this browser?')) {
      clearBeautyArchive();
      setProfile(getBeautyArchive());
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-[#0e0a07] border border-[#c5a059]/45 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden my-auto flex flex-col max-h-[92vh]"
        >
          {/* Top Bar Header */}
          <div className="p-6 sm:p-7 border-b border-[#291f14] bg-gradient-to-r from-[#17110a] via-[#100c07] to-[#17110a] flex items-center justify-between relative">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c5a059] to-[#805a1e] p-[1.5px] shadow-lg shrink-0">
                <div className="w-full h-full rounded-[14px] bg-[#0c0906] flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#c5a059]" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-bold">
                    Encrypted Local Sanctuary Dossier
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#241a10] border border-[#c5a059]/40 text-[9px] uppercase tracking-widest text-[#dfba73]">
                    VIP Patron Archive
                  </span>
                </div>
                <h3 className="font-cormorant text-2xl sm:text-3xl text-white font-medium flex items-center gap-2">
                  <span>{profile.fullName || "Patron's Private Archive"}</span>
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Archive"
                className="w-9 h-9 rounded-full bg-[#1c150e] hover:bg-[#2e2215] border border-[#382b1c] text-[#a09483] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 border-b border-[#241a10] bg-[#0d0906] flex items-center justify-between overflow-x-auto">
            <div className="flex items-center gap-2 py-3">
              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'history'
                    ? 'btn-gold-luxury'
                    : 'text-[#9c8e7c] hover:text-white hover:bg-[#1a140d]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Treatment History ({profile.treatmentHistory.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'profile'
                    ? 'btn-gold-luxury'
                    : 'text-[#9c8e7c] hover:text-white hover:bg-[#1a140d]'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Sanctuary Preferences</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('addLog')}
                className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'addLog'
                    ? 'btn-gold-luxury'
                    : 'text-[#9c8e7c] hover:text-white hover:bg-[#1a140d]'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log Past Ritual</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <button
                type="button"
                onClick={handleExportDossier}
                className="text-[11px] uppercase tracking-wider text-[#9f917e] hover:text-[#c5a059] flex items-center gap-1 transition-colors cursor-pointer"
                title="Download personal dossier as JSON"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Dossier</span>
              </button>
            </div>
          </div>

          {/* Modal Body with Scrollable Area */}
          <div className="p-6 sm:p-7 overflow-y-auto space-y-6 flex-1 bg-[#0a0705]">
            {/* Success Alert */}
            {showSaveSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Personal dossier saved securely to your browser localStorage.</span>
              </motion.div>
            )}

            {/* TAB 1: TREATMENT HISTORY */}
            {activeTab === 'history' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#130e09] p-4 rounded-2xl border border-[#261d13]">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold block">
                      Effortless 1-Click Re-Booking
                    </span>
                    <p className="text-xs text-[#b8ac9c] font-light">
                      Click <strong className="text-white">"Re-Book This Ritual"</strong> on any previous visit to auto-fill the booking engine with your exact stylist, service, and formulation history.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onApplyToBooking(profile);
                      onClose();
                    }}
                    className="btn-gold-luxury shrink-0 px-5 py-2.5 rounded-xl text-xs flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-black" />
                    <span>Auto-Fill Booking Engine</span>
                  </button>
                </div>

                {profile.treatmentHistory.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-[#332619] rounded-2xl p-6">
                    <Calendar className="w-8 h-8 text-[#5e4f3f] mx-auto mb-2" />
                    <h4 className="text-sm font-semibold text-white">No Treatment Records Yet</h4>
                    <p className="text-xs text-[#9f917e] max-w-sm mx-auto mt-1 mb-4 font-light">
                      Whenever you confirm an appointment or log a custom ritual, your formulation history will appear here.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('addLog')}
                      className="btn-outline-luxury px-5 py-2 rounded-xl text-xs"
                    >
                      Log First Past Ritual
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {profile.treatmentHistory.map((item) => (
                      <div
                        key={item.id}
                        className="p-5 rounded-2xl bg-[#120d08] border border-[#2b2014] hover:border-[#c5a059]/40 transition-all space-y-3 group"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#21180f] pb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-cinzel text-xs font-bold text-[#c5a059]">
                                {item.serviceName}
                              </span>
                              <span className="text-[10px] text-[#7d7162]">•</span>
                              <span className="text-[11px] text-[#a89d8d] flex items-center gap-1">
                                <Clock className="w-3 h-3 text-[#c5a059]" />
                                {item.date}
                              </span>
                            </div>
                            <div className="text-xs text-[#d6cdbf] font-light mt-0.5">
                              Artistic Director: <strong className="text-white">{item.stylistName}</strong>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-cinzel text-base text-gold-gradient font-bold">
                              ${item.price}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRebookTreatment(item)}
                              className="btn-gold-luxury px-4 py-2 rounded-xl text-[11px] flex items-center gap-1.5"
                            >
                              <span>Re-Book Ritual</span>
                              <ArrowRight className="w-3 h-3 text-black group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>

                        {/* Formulation Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-[#17100a] p-3.5 rounded-xl border border-[#2b1f13]">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-[#9d8e7c] font-semibold block mb-0.5">
                              Director's Note & Cut Technique
                            </span>
                            <p className="text-[#d8cfc1] font-light leading-relaxed">
                              {item.notes || 'Routine maintenance and signature finish.'}
                            </p>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-[#c5a059] font-semibold block mb-0.5">
                              Custom Formula & Bio-Actives
                            </span>
                            <p className="text-[#e2dacd] font-light leading-relaxed font-mono text-[11px]">
                              {item.formulaNote || 'Confidential salon proprietary mix.'}
                            </p>
                          </div>
                        </div>

                        {item.vipBeverage && (
                          <div className="flex items-center gap-2 text-[11px] text-[#9a8d7c] pt-1">
                            <Wine className="w-3.5 h-3.5 text-[#c5a059]" />
                            <span>Served: <strong className="text-[#d4c9b8] font-normal">{item.vipBeverage}</strong></span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SANCTUARY PROFILE & PREFERENCES */}
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#a89d8d] font-medium block mb-1.5">
                      Your Full Name / Title
                    </label>
                    <input
                      type="text"
                      required
                      value={profile.fullName}
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      className="w-full bg-[#16100a] border border-[#332617] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-2.5 text-xs text-[#e6decb]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#a89d8d] font-medium block mb-1.5">
                      Confidential Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full bg-[#16100a] border border-[#332617] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-2.5 text-xs text-[#e6decb]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#a89d8d] font-medium block mb-1.5">
                      Email for Priority Dossier
                    </label>
                    <input
                      type="email"
                      required
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full bg-[#16100a] border border-[#332617] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-2.5 text-xs text-[#e6decb]"
                    />
                  </div>
                </div>

                {/* Preferred Stylist Picker */}
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#c5a059] font-semibold block mb-2">
                    Primary Preferred Artistic Director
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {STYLISTS_DATA.map((stylist) => {
                      const isSelected = profile.preferredStylistId === stylist.id;
                      return (
                        <button
                          key={stylist.id}
                          type="button"
                          onClick={() =>
                            setProfile({
                              ...profile,
                              preferredStylistId: stylist.id,
                              preferredStylistName: stylist.name,
                            })
                          }
                          className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#22180e] border-[#c5a059] shadow-[0_0_15px_rgba(197,160,89,0.3)]'
                              : 'bg-[#120d08] border-[#291e13] hover:border-[#c5a059]/40'
                          }`}
                        >
                          <img
                            src={stylist.image}
                            alt={stylist.name}
                            className="w-10 h-10 rounded-full object-cover border border-[#c5a059]/40 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <span className="text-xs font-semibold text-white block truncate">
                              {stylist.name}
                            </span>
                            <span className="text-[10px] text-[#c5a059] block truncate">
                              {stylist.role}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Hair, Skin & Allergy Notes */}
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#a89d8d] font-medium block mb-1.5">
                    Hair Texture, Scalp Sensitivity & Chromatic Preferences
                  </label>
                  <textarea
                    rows={3}
                    value={profile.hairOrSkinNotes}
                    onChange={(e) => setProfile({ ...profile, hairOrSkinNotes: e.target.value })}
                    placeholder="e.g. Fine texture, sensitive scalp, prefers cool ash highlights, avoid ammonia..."
                    className="w-full bg-[#16100a] border border-[#332617] focus:border-[#c5a059] focus:outline-none rounded-xl p-3 text-xs text-[#e6decb] leading-relaxed"
                  />
                </div>

                {/* Sensory Sanctuary Preferences */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#a89d8d] font-medium flex items-center gap-1.5 mb-1.5">
                      <Wine className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>Complimentary Sommelier Welcome Beverage</span>
                    </label>
                    <select
                      value={profile.preferredBeverage}
                      onChange={(e) => setProfile({ ...profile, preferredBeverage: e.target.value })}
                      className="w-full bg-[#16100a] border border-[#332617] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-2.5 text-xs text-[#e6decb]"
                    >
                      <option value="Vintage Dom Pérignon Brut Champagne with Lemon Verbena">Vintage Dom Pérignon Brut Champagne with Lemon Verbena</option>
                      <option value="Ceremonial Kyoto Uji Matcha with Gold Leaf">Ceremonial Kyoto Uji Matcha with Gold Leaf</option>
                      <option value="Sparkling Pellegrino with Fresh Mint & Persian Lime">Sparkling Pellegrino with Fresh Mint & Persian Lime</option>
                      <option value="Artisan Organic Darjeeling First Flush">Artisan Organic Darjeeling First Flush</option>
                      <option value="Fresh Cold-Pressed French Hibiscus & Pomegranate Elixir">Fresh Cold-Pressed French Hibiscus & Pomegranate Elixir</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#a89d8d] font-medium flex items-center gap-1.5 mb-1.5">
                      <Music className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>Preferred Soundscape Frequency</span>
                    </label>
                    <select
                      value={profile.preferredSoundscape}
                      onChange={(e) => setProfile({ ...profile, preferredSoundscape: e.target.value })}
                      className="w-full bg-[#16100a] border border-[#332617] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-2.5 text-xs text-[#e6decb]"
                    >
                      <option value="Parisian Velvet Lounge (108 Hz)">Parisian Velvet Lounge (108 Hz)</option>
                      <option value="Zen Rain & Cedar Garden (432 Hz Solfeggio)">Zen Rain & Cedar Garden (432 Hz Solfeggio)</option>
                      <option value="Crystal Harp Meditation (528 Hz Miracles)">Crystal Harp Meditation (528 Hz Miracles)</option>
                      <option value="Complete Acoustic Silence (Private Quiet Suite)">Complete Acoustic Silence (Private Quiet Suite)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#241a10]">
                  <button
                    type="button"
                    onClick={handleResetArchive}
                    className="text-xs text-rose-400/80 hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Browser Archive</span>
                  </button>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="submit"
                      className="btn-gold-luxury w-full sm:w-auto px-7 py-3 rounded-full text-xs flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-black" />
                      <span>Save Sanctuary Profile</span>
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* TAB 3: LOG PAST TREATMENT */}
            {activeTab === 'addLog' && (
              <form onSubmit={handleAddNewTreatment} className="space-y-4 max-w-xl mx-auto">
                <div className="text-center mb-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold block">
                    Manual Treatment & Formula Archival
                  </span>
                  <h4 className="font-cormorant text-2xl text-white">Record Previous Salon Session</h4>
                  <p className="text-xs text-[#9c8e7c] font-light">
                    Keep your custom toner shades, balayage levels, or facial regimens safely cataloged.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#a89d8d] font-medium block mb-1">
                      Service / Ritual
                    </label>
                    <select
                      value={newLogServiceId}
                      onChange={(e) => setNewLogServiceId(e.target.value)}
                      className="w-full bg-[#16100a] border border-[#332617] focus:border-[#c5a059] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-[#e6decb]"
                    >
                      {SERVICES_DATA.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} (${s.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#a89d8d] font-medium block mb-1">
                      Master Stylist
                    </label>
                    <select
                      value={newLogStylistId}
                      onChange={(e) => setNewLogStylistId(e.target.value)}
                      className="w-full bg-[#16100a] border border-[#332617] focus:border-[#c5a059] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-[#e6decb]"
                    >
                      {STYLISTS_DATA.map((st) => (
                        <option key={st.id} value={st.id}>
                          {st.name} ({st.role})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#a89d8d] font-medium block mb-1">
                    Date of Session
                  </label>
                  <input
                    type="date"
                    required
                    value={newLogDate}
                    onChange={(e) => setNewLogDate(e.target.value)}
                    className="w-full bg-[#16100a] border border-[#332617] focus:border-[#c5a059] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-[#e6decb]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#a89d8d] font-medium block mb-1">
                    Styling & Outcome Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Feathered curtain bangs, subtle root transition..."
                    value={newLogNotes}
                    onChange={(e) => setNewLogNotes(e.target.value)}
                    className="w-full bg-[#16100a] border border-[#332617] focus:border-[#c5a059] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-[#e6decb]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#c5a059] font-medium block mb-1">
                    Formula Specification (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Formula 10.21 Pearl Gloss with 10vol developer, leave on for 15 mins..."
                    value={newLogFormula}
                    onChange={(e) => setNewLogFormula(e.target.value)}
                    className="w-full bg-[#16100a] border border-[#332617] focus:border-[#c5a059] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs text-[#e6decb] font-mono text-[11px]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-gold-luxury w-full py-3.5 rounded-full text-xs flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4 text-black" />
                    <span>Catalog Ritual to Private History</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-4 sm:p-5 border-t border-[#241a10] bg-[#0c0805] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8f8170]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
              <span>Dossier persisted strictly within client browser memory. No third-party tracking.</span>
            </div>

            <button
              type="button"
              onClick={() => {
                onApplyToBooking(profile);
                onClose();
              }}
              className="btn-gold-luxury px-6 py-2.5 rounded-full text-xs flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <span>Apply Profile to Booking</span>
              <ChevronRight className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
