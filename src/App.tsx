/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PrivilegeBanner } from './components/PrivilegeBanner';
import { PressRibbon } from './components/PressRibbon';
import { AboutSection } from './components/AboutSection';
import { DiagnosticQuiz } from './components/DiagnosticQuiz';
import { ServicesSection } from './components/ServicesSection';
import { RitualBuilder } from './components/RitualBuilder';
import { InteractiveBeforeAfter } from './components/InteractiveBeforeAfter';
import { GallerySection } from './components/GallerySection';
import { StyleVisualizer } from './components/StyleVisualizer';
import { AtelierVirtualTour } from './components/AtelierVirtualTour';
import { HairScalpScanner } from './components/HairScalpScanner';
import { BridalConciergeEstimator } from './components/BridalConciergeEstimator';
import { PackagesSection } from './components/PackagesSection';
import { LiveWaitlistSection } from './components/LiveWaitlistSection';
import { GiftVoucherSection } from './components/GiftVoucherSection';
import { GiftRegistryWishlist } from './components/GiftRegistryWishlist';
import { MembershipSection } from './components/MembershipSection';
import { SovereignRewards } from './components/SovereignRewards';
import { TeamSection } from './components/TeamSection';
import { ApothecarySection } from './components/ApothecarySection';
import { AtelierPromise } from './components/AtelierPromise';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BookingSection } from './components/BookingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingConcierge } from './components/FloatingConcierge';
import { CursorGlow } from './components/CursorGlow';
import { LiveActivityTicker } from './components/LiveActivityTicker';
import { BeautyArchiveModal } from './components/BeautyArchiveModal';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { SectionReveal } from './components/SectionReveal';
import { AtelierLivePulse } from './components/AtelierLivePulse';
import { CelebrityLookbook } from './components/CelebrityLookbook';
import { SensorySuiteCustomizer } from './components/SensorySuiteCustomizer';
import { VipDigitalPassModal } from './components/VipDigitalPassModal';
import { VirtualConsultationModal } from './components/VirtualConsultationModal';
import { ThemeMoodSwitcher } from './components/ThemeMoodSwitcher';
import { GoldDustCanvas } from './components/GoldDustCanvas';
import { BackToTop } from './components/BackToTop';
import { BlogArticleModal } from './components/BlogArticleModal';
import { CrownPointsTracker } from './components/CrownPointsTracker';
import { ReferAFriendModal } from './components/ReferAFriendModal';
import { SalonService, Stylist, VIPPackage, BeautyArchiveProfile, BlogArticle } from './types';
import { STYLISTS_DATA } from './data/salonData';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedStylistId, setSelectedStylistId] = useState<string | null>(null);
  const [appliedPrivilegeCode, setAppliedPrivilegeCode] = useState<string | null>(null);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState<boolean>(false);
  const [isVipPassModalOpen, setIsVipPassModalOpen] = useState<boolean>(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [isReferModalOpen, setIsReferModalOpen] = useState<boolean>(false);
  const [referralWelcomeBanner, setReferralWelcomeBanner] = useState<string | null>(null);

  // Check URL query parameters for referral links (e.g. ?ref=AURA-VIP-8824)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const refCode = params.get('ref');
      if (refCode) {
        setAppliedPrivilegeCode(refCode);
        setReferralWelcomeBanner(refCode);
      }
    }
  }, []);

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClaimFirstVisitPrivilege = () => {
    setAppliedPrivilegeCode('AURA-GOLD');
    scrollToBooking();
  };

  const handleSelectService = (service: SalonService) => {
    setSelectedServiceId(service.id);
    scrollToBooking();
  };

  const handleSelectPackage = (pkg: VIPPackage) => {
    setSelectedServiceId(pkg.id);
    scrollToBooking();
  };

  const handleSelectStylist = (stylist: Stylist) => {
    setSelectedStylistId(stylist.id);
    scrollToBooking();
  };

  const handleBookLook = (serviceId: string, stylistId?: string) => {
    setSelectedServiceId(serviceId);
    if (stylistId) {
      setSelectedStylistId(stylistId);
    }
    scrollToBooking();
  };

  const handleApplyVoucherToBooking = (voucherCode: string) => {
    setAppliedPrivilegeCode(voucherCode);
    scrollToBooking();
  };

  const handleApplyArchiveToBooking = (profile: BeautyArchiveProfile, serviceId?: string, stylistId?: string) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    if (stylistId) {
      setSelectedStylistId(stylistId);
    } else if (profile.preferredStylistId) {
      setSelectedStylistId(profile.preferredStylistId);
    }
    scrollToBooking();
  };

  const handleBookArticleAuthor = (authorName: string) => {
    const matched = STYLISTS_DATA.find(
      (s) => s.name.toLowerCase().includes(authorName.toLowerCase()) || authorName.toLowerCase().includes(s.name.toLowerCase())
    );
    if (matched) {
      setSelectedStylistId(matched.id);
    }
    scrollToBooking();
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#e8e4dc] selection:bg-[#c5a059] selection:text-black overflow-x-hidden relative">
      {/* Sleek Luxury Gold Scroll Progress Bar at very top of viewport */}
      <ScrollProgressBar />

      {/* Interactive 24K Gold Dust Canvas Particles */}
      <GoldDustCanvas />

      {/* Interactive Luxury Gold Cursor Glow */}
      <CursorGlow />

      {/* Luxury Theme Mood Switcher */}
      <ThemeMoodSwitcher />

      {/* Navigation Header with Callback Modal, VIP Pass & Soundscape */}
      <Navbar
        onBookClick={scrollToBooking}
        onOpenArchive={() => setIsArchiveModalOpen(true)}
        onOpenVipPass={() => setIsVipPassModalOpen(true)}
        onOpenConsultation={() => setIsConsultationModalOpen(true)}
        onSelectService={handleSelectService}
        onSelectStylist={handleSelectStylist}
        onSelectArticle={(article) => setSelectedArticle(article)}
        onOpenReferral={() => setIsReferModalOpen(true)}
      />

      {/* VIP Referral Privilege Welcome Banner when visited via ?ref=... */}
      {referralWelcomeBanner && (
        <div className="relative z-40 bg-gradient-to-r from-[#2a1b0b] via-[#1a1107] to-[#2a1b0b] border-y border-[#c5a059]/60 px-4 py-3 text-center shadow-[0_5px_20px_rgba(212,175,55,0.2)]">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-[#e8ded1]">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-full bg-[#3d2712] border border-[#ffd700] text-[#ffd700] text-[10px] font-bold">
                VIP
              </span>
              <span>
                Exclusive Referral Privilege Activated: <strong className="text-[#ffd700]">$50 Welcome Courtesy</strong> applied with code <code className="font-mono text-[#ffd700] bg-black/40 px-1.5 py-0.5 rounded">{referralWelcomeBanner}</code>!
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={scrollToBooking}
                className="btn-gold-luxury px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
              >
                Claim & Book Ritual
              </button>
              <button
                type="button"
                onClick={() => setReferralWelcomeBanner(null)}
                aria-label="Dismiss referral banner"
                className="text-[#9e8f7e] hover:text-white text-xs px-2 py-1"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Sections with Intersection Observer Fade-In-Up Animations */}
      <main>
        {/* 1. Full-Screen Cinematic Video Hero */}
        <HeroSection
          onBookClick={scrollToBooking}
          onExploreServices={scrollToServices}
        />

        {/* 2. Real-Time Atelier Chair Telemetry & Busy Pulse */}
        <SectionReveal>
          <AtelierLivePulse onClaimSlot={scrollToBooking} />
        </SectionReveal>

        {/* 3. Royal First-Visit Privilege Invitation Bar ($50 Courtesy + Champagne) */}
        <SectionReveal>
          <PrivilegeBanner onClaimPrivilege={handleClaimFirstVisitPrivilege} />
        </SectionReveal>

        {/* 4. Editorial Press & Cannes Accreditation Ribbon */}
        <SectionReveal>
          <PressRibbon />
        </SectionReveal>

        {/* 5. Celebrity Red Carpet & Met Gala Lookbook Studio */}
        <SectionReveal>
          <CelebrityLookbook onBookLook={(sId) => handleBookLook(sId)} />
        </SectionReveal>

        {/* 6. Aura Sensory Suite Hospitality Customizer */}
        <SectionReveal>
          <SensorySuiteCustomizer />
        </SectionReveal>

        {/* 7. Atelier Heritage & Philosophy (About Us) */}
        <SectionReveal>
          <AboutSection />
        </SectionReveal>

        {/* 8. Interactive Diagnostic Beauty Consultation Quiz */}
        <SectionReveal>
          <DiagnosticQuiz onSelectServiceForBooking={handleSelectService} />
        </SectionReveal>

        {/* 9. Signature Haute Coiffure & Spa Services */}
        <SectionReveal>
          <ServicesSection onSelectServiceForBooking={handleSelectService} />
        </SectionReveal>

        {/* 10. Multi-Service Bespoke Ritual Builder & Price Calculator */}
        <SectionReveal>
          <RitualBuilder onBookCustomRitual={handleSelectService} />
        </SectionReveal>

        {/* 11. Interactive Drag Comparison Before & After Transformation */}
        <SectionReveal>
          <InteractiveBeforeAfter />
        </SectionReveal>

        {/* 12. Curated Editorial Lookbook Gallery with Lightbox */}
        <SectionReveal>
          <GallerySection />
        </SectionReveal>

        {/* 13. AR-Inspired Style Visualizer (Virtual Haute Miroir) */}
        <SectionReveal>
          <StyleVisualizer onBookLook={handleBookLook} />
        </SectionReveal>

        {/* 14. Interactive 360° Atelier Virtual Tour */}
        <SectionReveal>
          <AtelierVirtualTour />
        </SectionReveal>

        {/* 15. AI Hair & Scalp Diagnostic Trichology Scanner */}
        <SectionReveal>
          <HairScalpScanner
            onBookPrescribedRitual={(sId) => {
              setSelectedServiceId(sId);
              scrollToBooking();
            }}
          />
        </SectionReveal>

        {/* 16. Haute Bridal Party Concierge & Experience Estimator */}
        <SectionReveal>
          <BridalConciergeEstimator
            onBookBridalParty={(sId) => {
              setSelectedServiceId(sId);
              scrollToBooking();
            }}
          />
        </SectionReveal>

        {/* 17. VIP Day Retreat Packages */}
        <SectionReveal>
          <PackagesSection onSelectPackageForBooking={handleSelectPackage} />
        </SectionReveal>

        {/* 18. Live Atelier Telemetry & Virtual Standby Queue */}
        <SectionReveal>
          <LiveWaitlistSection />
        </SectionReveal>

        {/* 19. Curated Gift Registry & Bespoke Ritual Wishlist */}
        <SectionReveal>
          <GiftRegistryWishlist />
        </SectionReveal>

        {/* 20. 3D Digital Luxury Gift Card & Voucher Vault */}
        <SectionReveal>
          <GiftVoucherSection />
        </SectionReveal>

        {/* 21. 3D Holographic VIP Membership Cards (Sovereign Guild) */}
        <SectionReveal>
          <MembershipSection />
        </SectionReveal>

        {/* 22. The Sovereign Rewards & Crown Points Vault */}
        <SectionReveal>
          <SovereignRewards
            onApplyVoucherToBooking={handleApplyVoucherToBooking}
            onOpenReferral={() => setIsReferModalOpen(true)}
          />
        </SectionReveal>

        {/* 23. Master Stylists & International Beauty Directors */}
        <SectionReveal>
          <TeamSection onSelectStylistForBooking={handleSelectStylist} />
        </SectionReveal>

        {/* 24. Proprietary Haute Apothecary & Boutique Showcase */}
        <SectionReveal>
          <ApothecarySection />
        </SectionReveal>

        {/* 25. The Haute Atelier Charter of Trust & Guarantees */}
        <SectionReveal>
          <AtelierPromise />
        </SectionReveal>

        {/* 26. Discerning Reviews & Testimonials Carousel */}
        <SectionReveal>
          <TestimonialsSection />
        </SectionReveal>

        {/* 27. Interactive Booking Engine with Date/Time & Live Calc */}
        <SectionReveal>
          <BookingSection
            preselectedServiceId={selectedServiceId}
            preselectedStylistId={selectedStylistId}
            appliedPrivilegeCode={appliedPrivilegeCode}
            onOpenArchive={() => setIsArchiveModalOpen(true)}
          />
        </SectionReveal>

        {/* 28. Atelier Location & Google Maps Contact */}
        <SectionReveal>
          <ContactSection />
        </SectionReveal>
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Personal Beauty Archive Modal */}
      <BeautyArchiveModal
        isOpen={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
        onApplyToBooking={handleApplyArchiveToBooking}
      />

      {/* 3D VIP Digital Pass Generator Modal */}
      <VipDigitalPassModal
        isOpen={isVipPassModalOpen}
        onClose={() => setIsVipPassModalOpen(false)}
      />

      {/* Virtual 1-on-1 Video Consultation Modal */}
      <VirtualConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />

      {/* Editorial Journal & Blog Article Reader Modal */}
      <BlogArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onBookAuthor={handleBookArticleAuthor}
      />

      {/* Live Atelier Reservation & Activity Ticker */}
      <LiveActivityTicker />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Floating Crown Points Loyalty Tracker Widget */}
      <CrownPointsTracker onOpenReferral={() => setIsReferModalOpen(true)} />

      {/* Refer-a-Friend VIP Companion Modal */}
      <ReferAFriendModal
        isOpen={isReferModalOpen}
        onClose={() => setIsReferModalOpen(false)}
      />

      {/* Floating WhatsApp & VIP Concierge Button */}
      <FloatingConcierge onBookClick={scrollToBooking} />
    </div>
  );
}
