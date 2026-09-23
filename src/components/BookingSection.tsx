import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar as CalendarIcon, Clock, User, Phone, Mail, FileText, CheckCircle2, ShieldCheck, Download, Share2, MessageCircle, UserCheck, BookOpen, Send, Copy, ExternalLink, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SERVICES_DATA, STYLISTS_DATA, VIP_PACKAGES, SALON_INFO } from '../data/salonData';
import { SalonService, Stylist, VIPPackage } from '../types';
import { Card3D } from './Card3D';
import { getBeautyArchive, addTreatmentRecord, updatePreferredStylist } from '../utils/archiveStorage';
import { FlowerRain } from './FlowerRain';
import { sanitizeInput, sanitizeEmail, sanitizePhone, isSafePayload, rateLimiter } from '../utils/security';

const WHATSAPP_CHANNEL_URL = 'https://whatsapp.com/channel/0029VbDjq2eBVJl7tp9j6J2b';

interface BookingSectionProps {
  preselectedServiceId?: string | null;
  preselectedStylistId?: string | null;
  appliedPrivilegeCode?: string | null;
  onOpenArchive?: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  preselectedServiceId,
  preselectedStylistId,
  appliedPrivilegeCode,
  onOpenArchive
}) => {
  const { t } = useTranslation();
  const [serviceId, setServiceId] = useState<string>(preselectedServiceId || SERVICES_DATA[0].id);
  const [stylistId, setStylistId] = useState<string>(preselectedStylistId || 'any');
  const [date, setDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('11:00 AM');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [beverage, setBeverage] = useState<string>('champagne');
  const [notes, setNotes] = useState<string>('');
  const [promoCodeInput, setPromoCodeInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [archiveFillNotice, setArchiveFillNotice] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFlowerRain, setShowFlowerRain] = useState<boolean>(false);
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  const [confirmedBooking, setConfirmedBooking] = useState<{
    referenceId: string;
    serviceName: string;
    price: number;
    duration: string;
    stylistName: string;
    date: string;
    timeSlot: string;
    fullName: string;
    phone: string;
    email: string;
    beverage: string;
    appliedPromo: string | null;
    notes: string;
  } | null>(null);

  const handleAutoFillFromArchive = () => {
    const archive = getBeautyArchive();
    if (archive) {
      if (archive.fullName) setFullName(archive.fullName);
      if (archive.phone) setPhone(archive.phone);
      if (archive.email) setEmail(archive.email);
      if (archive.preferredStylistId) setStylistId(archive.preferredStylistId);
      if (archive.hairOrSkinNotes) {
        setNotes((prev) => (prev ? `${prev}\n[Archive Notes]: ${archive.hairOrSkinNotes}` : `[Archive Notes]: ${archive.hairOrSkinNotes}`));
      }
      setArchiveFillNotice(`Loaded dossier for ${archive.fullName || 'Patron'}`);
      setTimeout(() => setArchiveFillNotice(null), 4000);
    }
  };

  // Set default minimum date to tomorrow
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const tomorrowStr = today.toISOString().split('T')[0];
    setDate(tomorrowStr);
  }, []);

  // Update when props change
  useEffect(() => {
    if (preselectedServiceId) setServiceId(preselectedServiceId);
  }, [preselectedServiceId]);

  useEffect(() => {
    if (preselectedStylistId) setStylistId(preselectedStylistId);
  }, [preselectedStylistId]);

  // Combined services list including both individual services and packages
  const allBookableOptions = [
    ...SERVICES_DATA.map((s) => ({
      id: s.id,
      name: `${s.name} (${s.duration})`,
      price: s.price,
      duration: s.duration,
      category: s.category.toUpperCase()
    })),
    ...VIP_PACKAGES.map((p) => ({
      id: p.id,
      name: `[VIP PACKAGE] ${p.name} (${p.duration})`,
      price: p.price,
      duration: p.duration,
      category: 'VIP RETREAT'
    }))
  ];

  const currentOption = allBookableOptions.find((o) => o.id === serviceId) || allBookableOptions[0];
  const currentStylist = STYLISTS_DATA.find((s) => s.id === stylistId);

  const timeSlots = [
    '09:30 AM', '11:00 AM', '01:30 PM', '03:00 PM', '04:30 PM', '06:00 PM', '07:15 PM'
  ];

  // Handle appliedPrivilegeCode prop
  useEffect(() => {
    if (appliedPrivilegeCode) {
      setAppliedPromo(appliedPrivilegeCode);
      if (appliedPrivilegeCode === 'AURA-GOLD') {
        setBeverage('champagne');
      }
    }
  }, [appliedPrivilegeCode]);

  const discountAmount = appliedPromo === 'AURA-GOLD'
    ? 50
    : appliedPromo?.startsWith('AD-GIFT-')
    ? 100
    : appliedPromo?.startsWith('SOV-')
    ? 65
    : 0;
  const finalPrice = Math.max(0, currentOption.price - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    const clean = promoCodeInput.trim().toUpperCase();
    if (clean === 'AURA-GOLD') {
      setAppliedPromo('AURA-GOLD');
      setBeverage('champagne');
      setPromoCodeInput('');
    } else if (clean.startsWith('AD-GIFT-') || clean.startsWith('GIFT')) {
      setAppliedPromo(clean);
      setPromoCodeInput('');
    } else if (clean.startsWith('SOV-')) {
      setAppliedPromo(clean);
      setBeverage('champagne');
      setPromoCodeInput('');
    } else {
      setPromoError('Invalid privilege code. Please check code or enter AURA-GOLD.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-Abuse & Rate Limiting Guard
    if (!rateLimiter.isAllowed('booking_submission', 4, 60000)) {
      alert('Too many requests. For security, please wait 60 seconds before submitting another booking reservation.');
      return;
    }

    // Input Sanitization & XSS Defense
    const cleanName = sanitizeInput(fullName, 100);
    const cleanPhone = sanitizePhone(phone);
    const cleanEmail = sanitizeEmail(email);
    const cleanNotes = sanitizeInput(notes, 500);

    if (!cleanName || !cleanPhone || !cleanEmail || !date) {
      alert('Please complete all required fields (Name, Phone, Email, and Date) with valid inputs.');
      return;
    }

    if (!isSafePayload(cleanName) || !isSafePayload(cleanNotes)) {
      alert('Invalid characters detected in form inputs. Please remove special script characters.');
      return;
    }

    // 10-digit mobile number validation check
    const digitsOnly = cleanPhone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      setPhoneError('कृपया अपना मोबाइल नंबर ठीक करें (कम से कम 10 अंक होने चाहिए) / Please enter a valid 10-digit mobile number.');
      const phoneElem = document.getElementById('booking-phone-input');
      if (phoneElem) {
        phoneElem.focus();
        phoneElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setPhoneError(null);

    setIsSubmitting(true);

    const refId = `AD-${Math.floor(10000 + Math.random() * 90000)}`;
    const confirmedData = {
      referenceId: refId,
      serviceName: currentOption.name,
      price: finalPrice,
      duration: currentOption.duration,
      stylistName: currentStylist ? currentStylist.name : 'Master Director On-Duty',
      date,
      timeSlot,
      fullName: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      beverage,
      appliedPromo,
      notes: cleanNotes || 'None specified'
    };

    // Format complete dossier text for auto-dispatch directly into WhatsApp chat
    const dossierText = `✨ *NEW VIP ATELIER APPOINTMENT RESERVATION* ✨
━━━━━━━━━━━━━━━━━━━━━━━
👑 *Reference ID:* ${refId}
👤 *Honored Guest:* ${fullName}
📞 *Contact Phone:* ${phone}
📧 *Patron Email:* ${email}
━━━━━━━━━━━━━━━━━━━━━━━
💎 *Haute Ritual / Package:* ${currentOption.name}
⏳ *Duration:* ${currentOption.duration}
🎨 *Artisan Director:* ${currentStylist ? currentStylist.name : 'Master Director On-Duty'}
📅 *Scheduled Date:* ${date}
⏰ *Time Slot:* ${timeSlot}
🥂 *Welcome Beverage:* ${beverage.toUpperCase()}
🎟️ *Privilege / Promo Code:* ${appliedPromo || 'None'}
💰 *Investment Total:* $${finalPrice}
📝 *Special Notes:* ${notes || 'None specified'}
━━━━━━━━━━━━━━━━━━━━━━━
🏛️ *Atelier:* AURA & D'OR | 452 Royale Promenade, Beverly Hills`;

    // Copy complete details to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(dossierText).catch(() => {});
    }

    // AUTOMATIC WHATSAPP LAUNCH: Open WhatsApp chat directly with all booking details already pasted in the message box!
    const cleanNumber = SALON_INFO.whatsappNumber.replace(/[^0-9]/g, '');
    const directWhatsAppUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(dossierText)}`;
    try {
      window.open(directWhatsAppUrl, '_blank', 'noopener,noreferrer');
    } catch (popupErr) {
      console.warn('Auto-popup notification:', popupErr);
    }

    // Persist to user's Personal Beauty Archive locally
    try {
      addTreatmentRecord({
        serviceId: currentOption.id,
        serviceName: currentOption.name,
        stylistId: currentStylist ? currentStylist.id : 'stylist-master',
        stylistName: currentStylist ? currentStylist.name : 'Master Director On-Duty',
        date,
        price: finalPrice,
        notes: notes ? `Reservation Ref: ${refId}. ${notes}` : `Reservation Ref: ${refId}. Private sanctuary session.`,
        formulaNote: 'Bespoke atelier formulation to be documented by Master Director upon completion.',
        vipBeverage: beverage
      });
    } catch (err) {
      console.error('Could not save to Beauty Archive:', err);
    }

    // Delay slightly for smooth transition and trigger 2-second Flower Petals confetti
    setTimeout(() => {
      setConfirmedBooking(confirmedData);
      setShowFlowerRain(true);
      setIsSubmitting(false);
      setCopiedNotice(null);
    }, 700);
  };

  const getWhatsAppChannelDossierText = () => {
    if (!confirmedBooking) return '';
    return `✨ *NEW VIP ATELIER APPOINTMENT RESERVATION* ✨
━━━━━━━━━━━━━━━━━━━━━━━
👑 *Reference ID:* ${confirmedBooking.referenceId}
👤 *Honored Guest:* ${confirmedBooking.fullName}
📞 *Contact Phone:* ${confirmedBooking.phone}
📧 *Patron Email:* ${confirmedBooking.email}
━━━━━━━━━━━━━━━━━━━━━━━
💎 *Haute Ritual / Package:* ${confirmedBooking.serviceName}
⏳ *Duration:* ${confirmedBooking.duration}
🎨 *Artisan Director:* ${confirmedBooking.stylistName}
📅 *Scheduled Date:* ${confirmedBooking.date}
⏰ *Time Slot:* ${confirmedBooking.timeSlot}
🥂 *Welcome Beverage:* ${confirmedBooking.beverage.toUpperCase()}
🎟️ *Privilege / Promo Code:* ${confirmedBooking.appliedPromo || 'None'}
💰 *Investment Total:* $${confirmedBooking.price}
📝 *Special Notes:* ${confirmedBooking.notes}
━━━━━━━━━━━━━━━━━━━━━━━
🏛️ *Atelier:* AURA & D'OR | 452 Royale Promenade, Beverly Hills
📲 *Official WhatsApp Channel:* ${WHATSAPP_CHANNEL_URL}`;
  };

  const handleDispatchToWhatsAppChannel = () => {
    const text = getWhatsAppChannelDossierText();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedNotice('Copied! Opening WhatsApp Channel...');
    window.open(WHATSAPP_CHANNEL_URL, '_blank', 'noopener,noreferrer');
    setTimeout(() => setCopiedNotice(null), 4000);
  };

  const handleCopyFullDossier = () => {
    const text = getWhatsAppChannelDossierText();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedNotice('Complete appointment details copied to clipboard!');
      setTimeout(() => setCopiedNotice(null), 3500);
    }
  };

  const getWhatsAppMessage = () => {
    if (!confirmedBooking) return '';
    const text = encodeURIComponent(getWhatsAppChannelDossierText());
    return `https://wa.me/?text=${text}`;
  };

  const getGoogleCalendarUrl = () => {
    if (!confirmedBooking) return '#';
    const title = encodeURIComponent(`AURA & D'OR: ${confirmedBooking.serviceName}`);
    const details = encodeURIComponent(`VIP Reservation at AURA & D'OR Atelier with ${confirmedBooking.stylistName}.\nRef: ${confirmedBooking.referenceId}\nAddress: ${SALON_INFO.address}`);
    const location = encodeURIComponent(SALON_INFO.address);
    // Simple start/end format
    const cleanDate = confirmedBooking.date.replace(/-/g, '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${cleanDate}T110000Z/${cleanDate}T130000Z`;
  };

  return (
    <section id="booking" className="relative py-28 bg-[#080808] border-t border-[#1c1813]">
      {/* Background illumination */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#4a1525]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#14100b] mb-4">
            <Sparkles className="w-3 h-3 text-[#c5a059]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37] font-medium">
              Bespoke VIP Reservation
            </span>
          </div>

          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.15] mb-6">
            Reserve Your <span className="italic text-gold-gradient font-light">Atelier Sanctuary</span>
          </h2>

          <p className="text-sm sm:text-base text-[#b5a896] leading-relaxed font-light">
            Due to our intimate atelier setting, appointments are strictly prioritized. Select your preferred master artisan, ritual, and time below.
          </p>
        </div>

        {/* Booking Card */}
        <div className="max-w-4xl mx-auto">
          <Card3D intensity={6} glowColor="rgba(212, 175, 55, 0.2)">
            <div className="rounded-3xl bg-gradient-to-b from-[#140f0a] via-[#100c08] to-[#0a0705] border border-[#c5a059]/35 p-6 sm:p-10 md:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.85)]">
              
              {/* Quick Auto-Fill Banner from Personal Beauty Archive */}
              <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-[#1c150e] via-[#16100a] to-[#1c150e] border border-[#c5a059]/35 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2b1f12] border border-[#c5a059]/40 flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5 text-[#c5a059]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#c5a059] font-bold block">
                      Personal Beauty Archive Detected
                    </span>
                    <span className="text-xs text-[#d8cfc0] font-light">
                      Prefill your saved Master Stylist, preferences & contact details instantly.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleAutoFillFromArchive}
                    className="btn-gold-luxury px-4 py-2 rounded-xl text-xs flex-1 sm:flex-initial flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-black" />
                    <span>Auto-Fill From Archive</span>
                  </button>

                  {onOpenArchive && (
                    <button
                      type="button"
                      onClick={onOpenArchive}
                      className="btn-outline-luxury px-3 py-2 rounded-xl text-xs flex items-center gap-1"
                      title="Open full Beauty Archive Dossier"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span className="hidden md:inline">View Dossier</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Notification when auto-filled */}
              {archiveFillNotice && (
                <div className="mb-6 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{archiveFillNotice} — Preferred artisan, phone, and formulation history applied.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Service Selection */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#d8cfc0] font-semibold mb-2">
                    1. Select Haute Ritual or Package *
                  </label>
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full bg-[#1b150f] border border-[#3b2d1c] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-3.5 text-sm text-[#e6decb] appearance-none cursor-pointer transition-colors"
                  >
                    {allBookableOptions.map((opt) => (
                      <option key={opt.id} value={opt.id} className="bg-[#140f0a] text-white py-1">
                        [{opt.category}] {opt.name} — ${opt.price}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Stylist Preference & Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#d8cfc0] font-semibold mb-2">
                      2. Preferred Master Artisan
                    </label>
                    <select
                      value={stylistId}
                      onChange={(e) => setStylistId(e.target.value)}
                      className="w-full bg-[#1b150f] border border-[#3b2d1c] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-3.5 text-sm text-[#e6decb] appearance-none cursor-pointer transition-colors"
                    >
                      <option value="any" className="bg-[#140f0a]">First Available Master Director</option>
                      {STYLISTS_DATA.map((stylist) => (
                        <option key={stylist.id} value={stylist.id} className="bg-[#140f0a]">
                          {stylist.name} ({stylist.role})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#d8cfc0] font-semibold mb-2">
                      3. Preferred Date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        value={date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-[#1b150f] border border-[#3b2d1c] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-3.5 text-sm text-[#e6decb] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Time Slots Grid */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#d8cfc0] font-semibold mb-3">
                    4. Select Preferred Hour *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                    {timeSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setTimeSlot(slot)}
                        className={`py-2.5 px-2 rounded-xl text-xs tracking-wider transition-all duration-200 border ${
                          timeSlot === slot
                            ? 'bg-gold-gradient text-black font-semibold border-[#c5a059] shadow-md scale-105'
                            : 'bg-[#18120c] text-[#b8ac9a] border-[#2e2316] hover:border-[#c5a059]/40 hover:text-white'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Guest Contact Information */}
                <div className="pt-4 border-t border-[#231a10]">
                  <label className="block text-xs uppercase tracking-widest text-[#d8cfc0] font-semibold mb-4">
                    5. Guest Particulars
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                    <div>
                      <label className="block text-[11px] text-[#938573] uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#8f816f] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Lady Vivienne Claire"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-[#1b150f] border border-[#3b2d1c] focus:border-[#c5a059] focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm text-[#e6decb]"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-[11px] text-[#938573] uppercase tracking-wider">
                          Phone Number (10 Digits Required) *
                        </label>
                        {phone && (
                          <span className={`text-[10px] font-mono ${phone.replace(/\D/g, '').length >= 10 ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {phone.replace(/\D/g, '').length >= 10 ? '✓ 10+ digits' : `${phone.replace(/\D/g, '').length}/10 digits`}
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <Phone className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${phoneError ? 'text-rose-400' : 'text-[#8f816f]'}`} />
                        <input
                          id="booking-phone-input"
                          type="tel"
                          required
                          placeholder="e.g. 9876543210 or (555) 000-0000"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            const count = e.target.value.replace(/\D/g, '').length;
                            if (phoneError && count >= 10) {
                              setPhoneError(null);
                            }
                          }}
                          onBlur={() => {
                            const count = phone.replace(/\D/g, '').length;
                            if (phone.trim() && count < 10) {
                              setPhoneError('कृपया अपना मोबाइल नंबर ठीक करें (कम से कम 10 अंक होने चाहिए) / Please enter a valid 10-digit mobile number.');
                            } else {
                              setPhoneError(null);
                            }
                          }}
                          className={`w-full bg-[#1b150f] border ${
                            phoneError
                              ? 'border-rose-500/80 ring-1 ring-rose-500/50'
                              : 'border-[#3b2d1c] focus:border-[#c5a059]'
                          } focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm text-[#e6decb]`}
                        />
                      </div>
                      {phoneError ? (
                        <p className="mt-1.5 text-[11px] text-rose-400 font-medium flex items-center gap-1.5 animate-pulse">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{phoneError}</span>
                        </p>
                      ) : (
                        <p className="mt-1 text-[10px] text-[#7d6f5f]">
                          कम से कम 10 अंकों का वैध मोबाइल नंबर दर्ज करें
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#938573] uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#8f816f] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          placeholder="vivienne@domain.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-[#1b150f] border border-[#3b2d1c] focus:border-[#c5a059] focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm text-[#e6decb]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Lounge Welcome Elixir Preference & Notes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                    <div>
                      <label className="block text-[11px] text-[#938573] uppercase tracking-wider mb-1.5">
                        VIP Lounge Welcome Elixir
                      </label>
                      <select
                        value={beverage}
                        onChange={(e) => setBeverage(e.target.value)}
                        className="w-full bg-[#1b150f] border border-[#3b2d1c] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-3 text-sm text-[#e6decb]"
                      >
                        <option value="champagne">Vintage French Champagne (Dom Pérignon / Veuve Clicquot)</option>
                        <option value="rose_tea">Artisanal Damask Rose & White Peony Tea</option>
                        <option value="matcha">Ceremonial Uji Japanese Organic Matcha</option>
                        <option value="pellegrino">San Pellegrino Sparkling with Sicilian Lemon</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#938573] uppercase tracking-wider mb-1.5">
                        Special Requests / Scalp or Skin Sensitivities
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sensitive scalp, bridal gown dressing room requested..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-[#1b150f] border border-[#3b2d1c] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-3 text-sm text-[#e6decb]"
                      />
                    </div>
                  </div>
                </div>

                {/* Privilege Key / Gift Pass Redemption Box */}
                <div className="p-4 rounded-2xl bg-[#140f0a] border border-[#2b2014] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex-1 w-full">
                    {appliedPromo ? (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-400">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>
                            Privilege Key <strong className="font-mono">{appliedPromo}</strong> Applied:{' '}
                            {appliedPromo === 'AURA-GOLD'
                              ? '-$50 First-Visit Courtesy + Complimentary Vintage Champagne'
                              : appliedPromo.startsWith('SOV-')
                              ? `-$${discountAmount} Sovereign Guild Credit + Complimentary Sommelier Champagne`
                              : `-$${discountAmount} Gift Pass Credit`}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setAppliedPromo(null)}
                          className="text-[10px] text-emerald-300 hover:text-white underline cursor-pointer ml-2"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Have a Privilege Key or Gift Pass? (e.g. AURA-GOLD)"
                          value={promoCodeInput}
                          onChange={(e) => setPromoCodeInput(e.target.value)}
                          className="flex-1 bg-[#1c150f] border border-[#3b2d1c] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-2.5 text-xs text-[#e6decb] uppercase tracking-wider font-mono"
                        />
                        <button
                          type="button"
                          onClick={handleApplyPromo}
                          className="btn-outline-luxury px-5 py-2.5 rounded-xl text-xs flex items-center justify-center cursor-pointer"
                        >
                          Apply Key
                        </button>
                      </div>
                    )}
                    {promoError && (
                      <span className="text-[11px] text-rose-400 mt-1 block">{promoError}</span>
                    )}
                  </div>
                </div>

                {/* Real-Time Reservation Summary Bar */}
                <div className="p-5 rounded-2xl bg-[#1a140d] border border-[#c5a059]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-medium">
                      Estimated Atelier Investment
                    </span>
                    <div className="text-2xl font-cinzel font-bold text-white flex items-baseline gap-2">
                      {discountAmount > 0 && (
                        <span className="text-sm text-[#8c7f6e] line-through font-sans">
                          ${currentOption.price}
                        </span>
                      )}
                      <span className="text-gold-gradient">${finalPrice}</span>
                      <span className="text-xs text-[#a19584] font-normal font-sans">
                        • {currentOption.duration} • Valet Included
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="submit-booking-reservation-btn"
                    className="btn-gold-luxury w-full sm:w-auto px-10 py-4 rounded-full text-xs flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Securing Atelier...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-black group-hover:scale-125 group-hover:rotate-45 transition-transform duration-300" />
                        <span>Confirm VIP Reservation</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Guarantee footnote */}
                <div className="flex items-center justify-center gap-2 text-[11px] text-[#8e8170]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Confidentiality guaranteed. Complimentary cancellation up to 24 hours prior.</span>
                </div>
              </form>
            </div>
          </Card3D>
        </div>
      </div>

      {/* Flower Petal Confetti Celebration (🌺🌻🌹🌷) triggers for exactly 2 seconds */}
      {showFlowerRain && (
        <FlowerRain durationMs={2000} onComplete={() => setShowFlowerRain(false)} />
      )}

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-gradient-to-b from-[#18110b] to-[#0c0906] border-2 border-[#c5a059] rounded-3xl p-6 sm:p-8 shadow-[0_25px_80px_rgba(212,175,55,0.4)] text-center my-8"
            >
              {/* Floral Rain Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#24170d] border border-[#c5a059]/50 text-xs text-[#e5c07b] font-medium mb-3 shadow-[0_0_15px_rgba(212,175,55,0.25)]">
                <span>🌺 🌻 🌹 🌷</span>
                <span className="uppercase tracking-widest text-[10px] font-bold">Flower Petals Confetti</span>
                <span>🌷 🌹 🌻 🌺</span>
              </div>

              {/* Big Golden Congratulations Header */}
              <h3 className="font-cormorant text-3xl sm:text-5xl text-white font-medium mb-2 tracking-tight">
                Congratulations! <span className="inline-block animate-bounce">🎉</span>
              </h3>
              <p className="text-sm text-[#e0cfbe] font-normal max-w-md mx-auto mb-4 leading-relaxed">
                Your Atelier Sanctuary reservation has been officially secured with celebratory flower petal confetti!
              </p>

              {/* WhatsApp Chat Pre-Filled Notification */}
              <div className="mb-4 p-3 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-[#0e2418] to-emerald-950/80 border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)] text-left flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xs">
                  <div className="text-emerald-300 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <span>⚡ WhatsApp Message Ready to Send</span>
                  </div>
                  <p className="text-emerald-100/90 text-[11px] mt-0.5 leading-snug">
                    Aapki saari booking information WhatsApp me paste ho chuki hai. Aap direct send kar sakte hain bina kisi extra step ke.
                  </p>
                </div>
              </div>

              {/* Reservation Pass Details */}
              <div className="p-5 rounded-2xl bg-[#140e08] border border-[#3b2d1c] text-left space-y-2.5 mb-4 text-xs">
                <div className="flex justify-between items-center border-b border-[#2a2014] pb-2">
                  <span className="text-[#8f8270] uppercase tracking-wider text-[10px]">Reference ID</span>
                  <span className="font-cinzel font-bold text-[#c5a059] text-sm tracking-wider">
                    {confirmedBooking.referenceId}
                  </span>
                </div>

                <div className="flex justify-between items-center border-b border-[#2a2014] pb-2">
                  <span className="text-[#8f8270] uppercase tracking-wider text-[10px]">Honored Guest</span>
                  <span className="text-white font-medium">{confirmedBooking.fullName} ({confirmedBooking.phone})</span>
                </div>

                <div className="flex justify-between items-center border-b border-[#2a2014] pb-2">
                  <span className="text-[#8f8270] uppercase tracking-wider text-[10px]">Patron Email</span>
                  <span className="text-[#d8cfc0]">{confirmedBooking.email}</span>
                </div>

                <div className="flex justify-between items-center border-b border-[#2a2014] pb-2">
                  <span className="text-[#8f8270] uppercase tracking-wider text-[10px]">Haute Ritual</span>
                  <span className="text-[#e5c07b] font-medium truncate max-w-[240px]">
                    {confirmedBooking.serviceName}
                  </span>
                </div>

                <div className="flex justify-between items-center border-b border-[#2a2014] pb-2">
                  <span className="text-[#8f8270] uppercase tracking-wider text-[10px]">Artisan Director</span>
                  <span className="text-white font-medium">{confirmedBooking.stylistName}</span>
                </div>

                <div className="flex justify-between items-center border-b border-[#2a2014] pb-2">
                  <span className="text-[#8f8270] uppercase tracking-wider text-[10px]">Date & Slot</span>
                  <span className="text-white font-medium">
                    {confirmedBooking.date} at {confirmedBooking.timeSlot}
                  </span>
                </div>

                <div className="flex justify-between items-center border-b border-[#2a2014] pb-2">
                  <span className="text-[#8f8270] uppercase tracking-wider text-[10px]">Welcome Beverage</span>
                  <span className="text-[#c5a059] capitalize">{confirmedBooking.beverage}</span>
                </div>

                <div className="flex justify-between items-center border-b border-[#2a2014] pb-2">
                  <span className="text-[#8f8270] uppercase tracking-wider text-[10px]">Privilege Key</span>
                  <span className="text-emerald-400 font-mono">{confirmedBooking.appliedPromo || 'None'}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#8f8270] uppercase tracking-wider text-[10px]">Total Investment</span>
                  <span className="font-cinzel text-base font-bold text-gold-gradient">${confirmedBooking.price}</span>
                </div>
              </div>

              {/* Beauty Archive Logged Badge */}
              <div className="mb-4 p-2.5 rounded-xl bg-[#21180f] border border-[#c5a059]/40 text-left flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#c5a059] shrink-0" />
                  <span className="text-[#d8cfc0] text-[11px]">
                    Logged to your browser's <strong className="text-white font-medium">Personal Beauty Archive</strong>.
                  </span>
                </div>
                {onOpenArchive && (
                  <button
                    type="button"
                    onClick={() => {
                      setConfirmedBooking(null);
                      onOpenArchive();
                    }}
                    className="text-[#c5a059] hover:underline text-[10px] uppercase font-bold shrink-0 cursor-pointer"
                  >
                    View Dossier
                  </button>
                )}
              </div>

              {/* Feedback toast for copy action */}
              {copiedNotice && (
                <div className="mb-3 p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{copiedNotice}</span>
                </div>
              )}

              {/* WhatsApp Quick Dispatch & Controls */}
              <div className="space-y-2.5 mb-4">
                <a
                  href={getWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all cursor-pointer group"
                >
                  <MessageCircle className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                  <span>Send Reservation Details via WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                </a>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="button"
                    onClick={handleCopyFullDossier}
                    className="flex-1 py-2.5 px-3 rounded-full bg-[#201811] hover:bg-[#2c2217] border border-[#c5a059]/40 text-[#f5ebd7] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Copy Full Dossier</span>
                  </button>

                  <a
                    href={WHATSAPP_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-full bg-[#181d18] hover:bg-[#222a22] border border-emerald-500/30 text-emerald-300/90 hover:text-emerald-200 font-semibold text-xs tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Channel (Optional)</span>
                  </a>
                </div>
              </div>

              <button
                onClick={() => setConfirmedBooking(null)}
                className="text-xs text-[#8f8270] hover:text-[#c5a059] uppercase tracking-widest pt-1 underline cursor-pointer"
              >
                Close & Return to Atelier
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
