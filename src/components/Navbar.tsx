import React, { useState, useEffect } from 'react';
import { Sparkles, Phone, Calendar, Menu, X, Clock, MapPin, UserCheck, Flame, Send, Crown, Video, Search, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SALON_INFO } from '../data/salonData';
import { AmbientSoundscape } from './AmbientSoundscape';
import { LanguageSwitcher } from './LanguageSwitcher';
import { QuickCallbackModal } from './QuickCallbackModal';
import { CurrencySwitcher } from './CurrencySwitcher';
import { ExclusiveSmsAlertModal } from './ExclusiveSmsAlertModal';
import { GlobalSearchBar } from './GlobalSearchBar';
import { SalonService, Stylist, BlogArticle } from '../types';

const WHATSAPP_CHANNEL_URL = 'https://whatsapp.com/channel/0029VbDjq2eBVJl7tp9j6J2b';

interface NavbarProps {
  onBookClick: () => void;
  onOpenArchive?: () => void;
  onOpenVipPass?: () => void;
  onOpenConsultation?: () => void;
  onSelectService?: (service: SalonService) => void;
  onSelectStylist?: (stylist: Stylist) => void;
  onSelectArticle?: (article: BlogArticle) => void;
  onOpenReferral?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onBookClick,
  onOpenArchive,
  onOpenVipPass,
  onOpenConsultation,
  onSelectService,
  onSelectStylist,
  onSelectArticle,
  onOpenReferral,
}) => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.services', 'Services'), href: '#services' },
    { name: t('nav.celebrityLookbook', 'Lookbook'), href: '#celebrity-lookbook' },
    { name: t('nav.sensorySuite', 'Sensory Suite'), href: '#sensory-customizer' },
    { name: t('nav.arVisualizer', 'AR Visualizer'), href: '#visualizer' },
    { name: t('nav.virtualTour', '360° Tour'), href: '#virtual-tour' },
    { name: t('nav.aiScanner', 'AI Scanner'), href: '#ai-scanner' },
    { name: t('nav.bridal', 'Bridal'), href: '#bridal-concierge' },
    { name: t('nav.liveWaitlist', 'Live Waitlist'), href: '#waitlist' },
    { name: t('nav.rewards', 'Rewards'), href: '#rewards' },
    { name: t('nav.vipGuild', 'VIP Guild'), href: '#memberships' },
    { name: t('nav.contact', 'Contact'), href: '#contact' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-40">
      {/* Top Luxury Utility & Feature Ribbon */}
      <div
        id="luxury-topbar"
        className={`hidden md:flex justify-between items-center px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          scrolled
            ? 'py-1.5 bg-[#070503]/95 backdrop-blur-md border-b border-[#261d14]'
            : 'py-2 bg-gradient-to-r from-[#080503] via-[#100b07] to-[#080503] border-b border-[#c5a059]/30 shadow-[0_4px_25px_rgba(0,0,0,0.85)]'
        }`}
      >
        {/* Left: Location & Hours Interactive Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            id="topbar-address-btn"
            className="group relative flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#171009] via-[#20150d] to-[#120b06] border border-[#3d2c1b] hover:border-[#c5a059] text-[#e0d3bf] hover:text-white transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.25)] hover:scale-[1.02] cursor-pointer"
            title="Beverly Hills Atelier • 452 Royale Promenade"
          >
            <span className="w-4 h-4 rounded-full bg-[#2a1b0e] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] group-hover:scale-110 group-hover:rotate-12 transition-transform">
              <MapPin className="w-2.5 h-2.5 text-[#e5c07b]" />
            </span>
            <span className="text-xs font-medium tracking-wide">
              Beverly Hills Atelier
            </span>
            <span className="text-xs text-[#a39582] group-hover:text-[#c5a059] transition-colors hidden xl:inline">
              • 452 Royale Promenade
            </span>
          </a>

          <a
            href="#contact"
            id="topbar-hours-btn"
            className="group relative flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#171009] via-[#20150d] to-[#120b06] border border-[#3d2c1b] hover:border-[#c5a059] text-[#e0d3bf] hover:text-white transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.25)] hover:scale-[1.02] cursor-pointer"
            title="Operating Hours & Valet Concierge Status"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <Clock className="w-3 h-3 text-[#c5a059] group-hover:rotate-180 transition-transform duration-700" />
            <span className="text-xs font-medium tracking-wide">
              Tue–Sat 9AM–8PM
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#162719] text-emerald-300 border border-emerald-500/30 text-xs font-medium tracking-normal hidden 2xl:inline">
              Valet Ready
            </span>
          </a>
        </div>

        {/* Right: Interactive Feature Action Buttons with Animations */}
        <div className="flex items-center gap-2">
          {onOpenVipPass && (
            <button
              onClick={onOpenVipPass}
              id="topbar-vip-pass-btn"
              className="group hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#2a1d0f] to-[#1a1108] border border-[#c5a059]/60 hover:border-[#ffd700] text-[#f5ebd9] hover:text-white transition-all duration-300 shadow-[0_0_12px_rgba(212,175,55,0.2)] hover:scale-[1.03] cursor-pointer"
              title="Generate 3D VIP Digital Wallet Pass"
            >
              <Crown className="w-3 h-3 text-[#c5a059] group-hover:rotate-12 transition-transform" />
              <span className="text-[10px] lg:text-[11px] font-semibold tracking-wider uppercase">
                VIP Pass
              </span>
            </button>
          )}

          {onOpenConsultation && (
            <button
              onClick={onOpenConsultation}
              id="topbar-video-call-btn"
              className="group hidden 2xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#17120c] to-[#0f0b07] border border-[#3b2b1a] hover:border-[#c5a059] text-[#e0d3bf] hover:text-white transition-all duration-300 shadow-sm hover:scale-[1.02] cursor-pointer"
              title="Book Free 10-Min Virtual Video Consultation"
            >
              <Video className="w-3 h-3 text-[#c5a059]" />
              <span className="text-[10px] lg:text-[11px] font-medium tracking-wider uppercase">
                Video Consult
              </span>
            </button>
          )}

          <LanguageSwitcher />

          <CurrencySwitcher />

          <QuickCallbackModal />

          <a
            href={WHATSAPP_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="topbar-whatsapp-btn"
            className="group relative flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#0d2616] via-[#12331e] to-[#0a2013] border border-emerald-500/60 hover:border-emerald-400 text-emerald-200 hover:text-white transition-all duration-300 shadow-[0_0_12px_rgba(16,185,129,0.25)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:scale-[1.03] cursor-pointer"
            title="Join the Official AURA & D'OR WhatsApp Channel"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <Send className="w-3 h-3 text-emerald-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-[10px] lg:text-[11px] font-semibold tracking-wider uppercase">
              WhatsApp VIP
            </span>
          </a>

          <a
            href={`tel:${SALON_INFO.phone}`}
            id="topbar-concierge-phone-btn"
            className="group flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#21160c] via-[#2a1c10] to-[#1a1109] border border-[#c5a059]/60 hover:border-[#f5d796] text-[#f7ebd4] hover:text-white transition-all duration-300 shadow-[0_0_12px_rgba(212,175,55,0.2)] hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] hover:scale-[1.03] cursor-pointer"
            title="Call Atelier Direct Concierge Line"
          >
            <div className="w-4 h-4 rounded-full bg-[#352313] flex items-center justify-center text-[#d4af37] group-hover:rotate-12 transition-transform">
              <Phone className="w-2.5 h-2.5" />
            </div>
            <span className="font-semibold text-[10px] lg:text-[11px] tracking-wider text-[#e8dcce] group-hover:text-white">
              {SALON_INFO.phoneDisplay}
            </span>
          </a>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        id="main-luxury-navbar"
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-[#080808]/95 backdrop-blur-md shadow-2xl py-3 border-b border-[#c5a059]/20'
            : 'bg-gradient-to-b from-[#080808]/90 via-[#0a0705]/80 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Logo & Brand Crest */}
          <a href="#" id="navbar-brand-logo" className="group flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full border border-[#c5a059]/60 flex items-center justify-center bg-gradient-to-br from-[#1b1712] to-[#0a0a0a] group-hover:border-[#c5a059] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all">
              <span className="font-cinzel text-base font-bold text-[#c5a059]">A&D</span>
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel tracking-[0.25em] text-lg font-bold text-white group-hover:text-gold-gradient transition-colors">
                AURA & D'OR
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#a09482] font-light">
                Haute Coiffure & Spa
              </span>
            </div>
          </a>

          {/* Global Search Bar - Responsive in Navigation Header */}
          <div className="hidden md:block flex-1 max-w-xs lg:max-w-sm xl:max-w-md mx-2">
            <GlobalSearchBar
              onSelectService={onSelectService}
              onSelectStylist={onSelectStylist}
              onSelectArticle={onSelectArticle}
            />
          </div>

          {/* Navigation Controls & Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              aria-label="Toggle Global Search"
              className="md:hidden p-2 rounded-full border border-[#3b2a1a] hover:border-[#c5a059] bg-[#140e08] text-[#c5a059] hover:text-white transition-colors cursor-pointer"
              title="Search Services, Stylists, and Articles"
            >
              <Search className="w-4 h-4" />
            </button>

            <AmbientSoundscape />

            {/* Language Switcher (English, Hindi, Bangla) */}
            <LanguageSwitcher showIconOnlyOnMobile={true} />

            <div className="hidden sm:flex items-center gap-3">
              {onOpenArchive && (
                <button
                  type="button"
                  id="nav-beauty-archive-btn"
                  onClick={onOpenArchive}
                  className="btn-outline-luxury px-3.5 py-2 rounded-full flex items-center gap-1.5 group text-xs cursor-pointer"
                  title="Open Personal Beauty Archive & Treatment History"
                >
                  <UserCheck className="w-3.5 h-3.5 text-[#c5a059] group-hover:scale-110 transition-transform" />
                  <span className="hidden xl:inline">{t('nav.beautyArchive', 'Beauty Archive')}</span>
                  <span className="xl:hidden">Archive</span>
                </button>
              )}

              <a
                href={`tel:${SALON_INFO.phone}`}
                id="nav-call-btn"
                className="hidden 2xl:flex items-center gap-2 text-xs tracking-wider uppercase text-[#c5a059] hover:text-white px-3 py-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{t('nav.callConcierge', 'Call Concierge')}</span>
              </a>

              <button
                id="navbar-reserve-btn"
                onClick={onBookClick}
                className="btn-gold-luxury px-5 py-2 rounded-full flex items-center gap-2 group text-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-black group-hover:scale-110 group-hover:rotate-45 transition-transform duration-300" />
                <span>{t('nav.bookAppointment', 'Book')}</span>
              </button>
            </div>

            {/* Menu Toggle Button (3-line hamburger menu for clean desktop/mobile layout) */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
              className="p-2 rounded-lg text-[#d6cec0] hover:text-[#c5a059] hover:bg-[#1f1a14] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown Bar (when mobile search icon clicked) */}
        {mobileSearchOpen && (
          <div className="md:hidden px-4 pt-3 pb-2 border-t border-[#261c12] bg-[#0c0906]/98 backdrop-blur-xl animate-in slide-in-from-top-2 duration-150">
            <GlobalSearchBar
              isMobileDrawer={true}
              onSelectService={onSelectService}
              onSelectStylist={onSelectStylist}
              onSelectArticle={onSelectArticle}
              onResultClick={() => setMobileSearchOpen(false)}
            />
          </div>
        )}

        {/* Slide-Out Navigation Menu Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="bg-[#0a0a0a]/98 backdrop-blur-xl border-b border-[#c5a059]/30 px-6 py-8 mt-3 shadow-2xl transition-all max-w-7xl mx-auto"
          >
            {/* Global Search Bar inside Drawer */}
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold block mb-2">
                Quick Atelier Search
              </span>
              <GlobalSearchBar
                isMobileDrawer={true}
                onSelectService={onSelectService}
                onSelectStylist={onSelectStylist}
                onSelectArticle={onSelectArticle}
                onResultClick={() => setMobileMenuOpen(false)}
              />
            </div>

            <div className="flex flex-col gap-4 mb-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm tracking-widest uppercase text-[#d6cec0] hover:text-[#c5a059] py-2 border-b border-[#1c1813] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-2">
              {onOpenArchive && (
                <button
                  type="button"
                  id="mobile-drawer-archive-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenArchive();
                  }}
                  className="btn-outline-luxury w-full py-3 rounded-full flex items-center justify-center gap-2 text-xs"
                >
                  <UserCheck className="w-4 h-4 text-[#c5a059]" />
                  <span>Personal Beauty Archive</span>
                </button>
              )}

              <button
                id="mobile-drawer-book-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="btn-gold-luxury w-full py-3 rounded-full flex items-center justify-center gap-2 text-xs"
              >
                <Calendar className="w-4 h-4 text-black" />
                <span>Book Appointment</span>
              </button>

              {onOpenReferral && (
                <button
                  type="button"
                  id="mobile-drawer-refer-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenReferral();
                  }}
                  className="w-full py-2.5 px-3 rounded-full bg-[#1b120a] hover:bg-[#281b0f] border border-[#c5a059]/50 text-[#ffd700] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5 text-[#ffd700]" />
                  <span>Refer a Friend & Earn 500 PTS</span>
                </button>
              )}

              <div className="flex gap-2 pt-2">
                <a
                  href={`tel:${SALON_INFO.phone}`}
                  className="flex-1 py-2.5 rounded-full border border-[#c5a059]/40 text-[#c5a059] text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 hover:bg-[#c5a059]/10"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Atelier</span>
                </a>
                <a
                  href={WHATSAPP_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-full border border-emerald-500/40 text-emerald-400 text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 hover:bg-emerald-500/10"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>WhatsApp Channel</span>
                </a>
              </div>

              <div className="pt-2">
                <ExclusiveSmsAlertModal />
              </div>

              <div className="pt-3 border-t border-[#1c1813] flex items-center justify-between">
                <span className="text-xs text-[#8f8270] uppercase tracking-wider">Atmospheric Audio</span>
                <AmbientSoundscape />
              </div>

              <div className="pt-3 border-t border-[#1c1813] flex items-center justify-between">
                <span className="text-xs text-[#8f8270] uppercase tracking-wider">Currency</span>
                <CurrencySwitcher />
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
