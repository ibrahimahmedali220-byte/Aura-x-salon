/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
import { SalonService, Stylist, VIPPackage, BeautyArchiveProfile } from './types';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedStylistId, setSelectedStylistId] = useState<string | null>(null);
  const [appliedPrivilegeCode, setAppliedPrivilegeCode] = useState<string | null>(null);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState<boolean>(false);
  const [isVipPassModalOpen, setIsVipPassModalOpen] = useState<boolean>(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState<boolean>(false);

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
      />

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
          <SovereignRewards onApplyVoucherToBooking={handleApplyVoucherToBooking} />
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

      {/* Live Atelier Reservation & Activity Ticker */}
      <LiveActivityTicker />

      {/* Floating WhatsApp & VIP Concierge Button */}
      <FloatingConcierge onBookClick={scrollToBooking} />
    </div>
  );
}
