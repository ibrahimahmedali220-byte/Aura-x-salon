import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  Clock,
  Sparkles,
  Phone,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  DoorClosed,
  DoorOpen,
  RefreshCw,
  Bell,
  X,
  ShieldCheck,
  Zap,
  ArrowRight,
  Flame
} from 'lucide-react';
import { Card3D } from './Card3D';
import { WaitlistTicket, SuiteStatus } from '../types';
import {
  getActiveWaitlistTicket,
  joinWaitlist,
  cancelWaitlistTicket,
  INITIAL_SUITE_STATUSES
} from '../utils/waitlistStorage';
import { SERVICES_DATA, SALON_INFO } from '../data/salonData';

export const LiveWaitlistSection: React.FC = () => {
  const [ticket, setTicket] = useState<WaitlistTicket | null>(getActiveWaitlistTicket());
  const [suiteStatuses, setSuiteStatuses] = useState<SuiteStatus[]>(INITIAL_SUITE_STATUSES);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now');

  // Intake Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES_DATA[0].id);
  const [preferredWindow, setPreferredWindow] = useState('Immediate Walk-In (Next 30-45 Mins)');
  const [partySize, setPartySize] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [joinSuccess, setJoinSuccess] = useState(false);

  // Sync ticket from custom event or storage
  useEffect(() => {
    const handleUpdate = () => {
      setTicket(getActiveWaitlistTicket());
    };
    window.addEventListener('aurador_waitlist_updated', handleUpdate);
    return () => window.removeEventListener('aurador_waitlist_updated', handleUpdate);
  }, []);

  // Live timer tick for waitlist countdown
  useEffect(() => {
    if (!ticket) return;
    const interval = setInterval(() => {
      setTicket((prev) => {
        if (!prev) return null;
        if (prev.estimatedWaitMinutes > 2) {
          return {
            ...prev,
            estimatedWaitMinutes: prev.estimatedWaitMinutes - 1
          };
        }
        return prev;
      });
    }, 60000); // decrement minute
    return () => clearInterval(interval);
  }, [ticket]);

  // Simulate live occupancy fluctuations periodically
  const refreshTelemetry = () => {
    setLastRefreshed('Just now');
    setSuiteStatuses((prev) =>
      prev.map((suite) => {
        if (suite.status === 'sanitizing') {
          return { ...suite, status: 'available', currentRitual: 'Suite Sanitized & Prepared for Standby', availableInMins: 0 };
        }
        return suite;
      })
    );
  };

  const handleJoinQueue = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const service = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

    setTimeout(() => {
      const newTicket = joinWaitlist({
        fullName,
        phone,
        serviceId: service.id,
        serviceName: service.name,
        preferredTimeWindow: preferredWindow,
        partySize,
      });

      setTicket(newTicket);
      setIsSubmitting(false);
      setJoinSuccess(true);
      setTimeout(() => setJoinSuccess(false), 5000);
    }, 600);
  };

  const handleCancelTicket = () => {
    if (window.confirm('Do you wish to release your priority standby queue position?')) {
      cancelWaitlistTicket();
      setTicket(null);
    }
  };

  const occupiedCount = suiteStatuses.filter((s) => s.status === 'occupied').length;
  const totalSuites = suiteStatuses.length;
  const occupancyPercentage = Math.round((occupiedCount / totalSuites) * 100);

  return (
    <section id="waitlist" className="py-24 sm:py-32 relative bg-[#060403] overflow-hidden">
      {/* Ambient Luxury Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#c5a059]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-[450px] h-[300px] bg-[#a07a38]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c150e] border border-[#c5a059]/40 mb-4 shadow-[0_0_20px_rgba(197,160,89,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
            </span>
            <span className="text-[11px] font-semibold tracking-widest text-[#dfba73] uppercase">
              Live Atelier Telemetry & Virtual Queue
            </span>
          </div>

          <h2 className="font-cormorant text-3xl sm:text-5xl lg:text-6xl text-white font-medium tracking-tight mb-5 leading-tight">
            Real-Time Occupancy & <br />
            <span className="text-gold-gradient italic font-normal">Haute Standby Priority</span>
          </h2>

          <p className="text-sm sm:text-base text-[#bfb4a4] font-light leading-relaxed">
            Our 8 private soundproof suites experience extraordinary demand. Monitor live salon capacity in real-time or secure your virtual standby ticket for same-day walk-in access.
          </p>
        </div>

        {/* Real-time Occupancy Metrics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {/* Metric 1: Capacity */}
          <div className="p-5 rounded-2xl bg-[#0f0b07] border border-[#2b1f13] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#9d8e7c] block font-semibold">
                Atelier Occupancy
              </span>
              <div className="text-2xl font-cinzel font-bold text-white mt-1 flex items-baseline gap-2">
                <span className="text-gold-gradient">{occupancyPercentage}%</span>
                <span className="text-xs text-[#827464] font-sans font-normal">
                  ({occupiedCount}/{totalSuites} Suites)
                </span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-full bg-[#1f150c] border border-[#c5a059]/30 flex items-center justify-center">
              <Flame className="w-5 h-5 text-[#c5a059]" />
            </div>
          </div>

          {/* Metric 2: Estimated Wait */}
          <div className="p-5 rounded-2xl bg-[#0f0b07] border border-[#2b1f13] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#9d8e7c] block font-semibold">
                Current Standby Wait
              </span>
              <div className="text-2xl font-cinzel font-bold text-white mt-1">
                <span className="text-white">~20 – 30</span>
                <span className="text-xs text-[#9d8e7c] font-sans font-normal ml-1">Mins</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-full bg-[#1f150c] border border-[#c5a059]/30 flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#c5a059]" />
            </div>
          </div>

          {/* Metric 3: Active Virtual Queue */}
          <div className="p-5 rounded-2xl bg-[#0f0b07] border border-[#2b1f13] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#9d8e7c] block font-semibold">
                VIPs on Standby
              </span>
              <div className="text-2xl font-cinzel font-bold text-white mt-1">
                <span className="text-white">3</span>
                <span className="text-xs text-[#9d8e7c] font-sans font-normal ml-1">In Virtual Line</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-full bg-[#1f150c] border border-[#c5a059]/30 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#c5a059]" />
            </div>
          </div>

          {/* Metric 4: Refresh Status */}
          <div className="p-5 rounded-2xl bg-[#0f0b07] border border-[#2b1f13] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#9d8e7c] block font-semibold">
                Telemetry Sync
              </span>
              <div className="text-xs text-[#d8cfc0] mt-1 font-light flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Synchronized ({lastRefreshed})</span>
              </div>
            </div>
            <button
              onClick={refreshTelemetry}
              aria-label="Refresh Telemetry"
              className="w-11 h-11 rounded-full bg-[#1f150c] hover:bg-[#2b1f13] border border-[#c5a059]/30 text-[#c5a059] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Grid: Live Suites (Left 7 Cols) + Virtual Queue Engine (Right 5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 8 Private Soundproof Suites Matrix */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-cormorant text-2xl text-white font-medium flex items-center gap-2">
                <span>Private Soundproof Sanctuary Suites</span>
              </h3>
              <span className="text-xs text-[#a09180] font-light">
                Auto-updated every 60s
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {suiteStatuses.map((suite) => {
                const isOccupied = suite.status === 'occupied';
                const isSanitizing = suite.status === 'sanitizing';
                const isAvailable = suite.status === 'available';

                return (
                  <div
                    key={suite.id}
                    className={`p-4 rounded-2xl border transition-all text-left relative overflow-hidden ${
                      isOccupied
                        ? 'bg-[#110d08] border-[#291f14]'
                        : isSanitizing
                        ? 'bg-[#151108] border-amber-600/40'
                        : 'bg-[#0f140e] border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                    }`}
                  >
                    {/* Status Top Strip */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-wider text-[#9d8e7c] font-semibold">
                        Suite {suite.id}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-semibold flex items-center gap-1 ${
                          isOccupied
                            ? 'bg-rose-950/70 text-rose-300 border border-rose-800/40'
                            : isSanitizing
                            ? 'bg-amber-950/70 text-amber-300 border border-amber-800/40'
                            : 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/40'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isOccupied ? 'bg-rose-400' : isSanitizing ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'
                          }`}
                        />
                        <span>{suite.status}</span>
                      </span>
                    </div>

                    <h4 className="font-cormorant text-lg text-white font-medium leading-snug">
                      {suite.name}
                    </h4>

                    <div className="text-xs text-[#b8ac9c] font-light mt-1 truncate">
                      {suite.currentRitual}
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#1f170f] flex items-center justify-between text-[11px]">
                      <span className="text-[#877a6a]">
                        Director: <strong className="text-[#d8cfc0] font-normal">{suite.stylistName}</strong>
                      </span>
                      <span className="font-mono text-[#c5a059]">
                        {isAvailable ? 'Immediate Opening' : `Est. Open: ${suite.availableInMins}m`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Virtual Standby Queue Engine (5 Cols) */}
          <div className="lg:col-span-5">
            <Card3D intensity={6} glowColor="rgba(212, 175, 55, 0.25)">
              <div className="p-7 sm:p-8 rounded-3xl bg-[#110c08] border border-[#c5a059]/45 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative overflow-hidden">
                
                {/* Condition A: User has an ACTIVE Waitlist Ticket */}
                {ticket ? (
                  <div className="space-y-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#c5a059] to-[#805a1e] p-[1.5px] mx-auto shadow-[0_0_25px_rgba(197,160,89,0.5)]">
                      <div className="w-full h-full rounded-full bg-[#0d0905] flex items-center justify-center">
                        <Zap className="w-7 h-7 text-[#c5a059] animate-pulse" />
                      </div>
                    </div>

                    <div>
                      <span className="px-3 py-1 rounded-full bg-[#241a10] border border-[#c5a059]/40 text-[10px] uppercase tracking-widest text-[#dfba73] font-bold inline-block mb-2">
                        Priority Standby Pass Confirmed
                      </span>
                      <h3 className="font-cormorant text-3xl text-white font-medium">
                        {ticket.fullName}
                      </h3>
                      <span className="font-mono text-xs text-[#a39482]">
                        Direct Contact: {ticket.phone}
                      </span>
                    </div>

                    {/* Ticket Pass Display */}
                    <div className="p-6 rounded-2xl bg-gradient-to-b from-[#19120b] to-[#120d07] border border-[#c5a059]/50 shadow-inner space-y-4 text-left">
                      <div className="flex items-center justify-between border-b border-[#291f14] pb-3">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[#9d8e7c] block">
                            Ticket Reference
                          </span>
                          <span className="font-cinzel text-xl font-bold text-gold-gradient">
                            {ticket.ticketNumber}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase tracking-widest text-[#9d8e7c] block">
                            Position in Line
                          </span>
                          <span className="font-cinzel text-xl font-bold text-white">
                            #{ticket.position} <span className="text-xs font-sans text-[#c5a059]">VIP</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#9d8e7c] block">
                            Requested Ritual
                          </span>
                          <span className="text-xs text-white font-medium">
                            {ticket.serviceName}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase tracking-wider text-[#9d8e7c] block">
                            Est. Ready Time
                          </span>
                          <span className="text-sm font-bold text-emerald-400 flex items-center gap-1 justify-end">
                            <Clock className="w-3.5 h-3.5" />
                            ~{ticket.estimatedWaitMinutes} mins
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#291f14] text-[11px] text-[#b8ac9b] flex items-center gap-2">
                        <Bell className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                        <span>Head Concierge will dispatch SMS & WhatsApp alert 10 minutes prior to suite readiness.</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3 pt-2">
                      <a
                        href={`https://wa.me/${SALON_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Aura%20%26%20D'Or%2C%20I%20am%20holding%20Priority%20Standby%20Ticket%20${ticket.ticketNumber}%20(${ticket.fullName}).%20Please%20confirm%20my%20arrival.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold-luxury w-full py-3.5 rounded-full text-xs flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4 text-black" />
                        <span>Confirm Arrival via WhatsApp</span>
                      </a>

                      <button
                        onClick={handleCancelTicket}
                        className="text-xs text-rose-400/80 hover:text-rose-400 underline cursor-pointer transition-colors"
                      >
                        Release / Cancel Standby Queue Position
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Condition B: Form to Join Standby Virtual Queue */
                  <form onSubmit={handleJoinQueue} className="space-y-4">
                    <div className="text-center mb-6">
                      <div className="w-10 h-10 rounded-full bg-[#1e150c] border border-[#c5a059]/40 flex items-center justify-center mx-auto mb-2.5">
                        <Users className="w-5 h-5 text-[#c5a059]" />
                      </div>
                      <h3 className="font-cormorant text-2xl sm:text-3xl text-white font-medium">
                        Join Virtual Standby Queue
                      </h3>
                      <p className="text-xs text-[#a09483] font-light mt-1">
                        Bypass the waitlist. Get notified instantly when the next private soundproof suite becomes available.
                      </p>
                    </div>

                    {joinSuccess && (
                      <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                        <span>Standby ticket generated successfully!</span>
                      </div>
                    )}

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#a89d8d] font-medium block mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lady Genevieve Sterling"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-[#18110b] border border-[#382b1c] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-2.5 text-xs text-[#e6decb]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#a89d8d] font-medium block mb-1">
                        Mobile Phone for Priority Dispatch *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#18110b] border border-[#382b1c] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-2.5 text-xs text-[#e6decb]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-[#a89d8d] font-medium block mb-1">
                          Desired Ritual
                        </label>
                        <select
                          value={selectedServiceId}
                          onChange={(e) => setSelectedServiceId(e.target.value)}
                          className="w-full bg-[#18110b] border border-[#382b1c] focus:border-[#c5a059] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-[#e6decb]"
                        >
                          {SERVICES_DATA.slice(0, 6).map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-[#a89d8d] font-medium block mb-1">
                          Party Size
                        </label>
                        <select
                          value={partySize}
                          onChange={(e) => setPartySize(Number(e.target.value))}
                          className="w-full bg-[#18110b] border border-[#382b1c] focus:border-[#c5a059] focus:outline-none rounded-xl px-3 py-2.5 text-xs text-[#e6decb]"
                        >
                          <option value={1}>Solo Patron (1 Private Suite)</option>
                          <option value={2}>Duo Retreat (2 Adjoining Suites)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#a89d8d] font-medium block mb-1">
                        Preferred Standby Arrival Window
                      </label>
                      <select
                        value={preferredWindow}
                        onChange={(e) => setPreferredWindow(e.target.value)}
                        className="w-full bg-[#18110b] border border-[#382b1c] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-2.5 text-xs text-[#e6decb]"
                      >
                        <option value="Immediate Walk-In (Next 30-45 Mins)">Immediate Standby (Within 30–45 Mins)</option>
                        <option value="This Afternoon (1:00 PM – 4:00 PM)">This Afternoon Priority (1:00 PM – 4:00 PM)</option>
                        <option value="This Evening (5:00 PM – 8:00 PM)">Evening Twilight Standby (5:00 PM – 8:00 PM)</option>
                      </select>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-gold-luxury w-full py-4 rounded-full text-xs flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            <span>Queuing Virtual Pass...</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 text-black" />
                            <span>Secure Standby Queue Ticket</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[10px] text-[#7d705f] pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>Complimentary valet parking & champagne reserved upon standby arrival.</span>
                    </div>
                  </form>
                )}
              </div>
            </Card3D>
          </div>
        </div>
      </div>
    </section>
  );
};
