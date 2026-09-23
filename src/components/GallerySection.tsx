import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/salonData';
import { GalleryItem } from '../types';
import { Card3D } from './Card3D';

export const GallerySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const tabs = [
    { id: 'all', label: 'All Lookbook' },
    { id: 'interior', label: 'Atelier Ambience' },
    { id: 'hair', label: 'Hair Couture' },
    { id: 'bridal', label: 'Bridal' },
    { id: 'skin', label: 'Skin Glow' },
  ];

  const filteredItems = activeTab === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeTab);

  const handleOpenLightbox = (item: GalleryItem) => {
    const idx = filteredItems.findIndex((i) => i.id === item.id);
    setLightboxIndex(idx !== -1 ? idx : 0);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="relative py-28 bg-[#080808] border-t border-[#1c1813]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#14100b] mb-4">
            <Sparkles className="w-3 h-3 text-[#c5a059]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37] font-medium">
              Editorial Portfolio & Lookbook
            </span>
          </div>

          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.15] mb-6">
            The Lookbook of <span className="italic text-gold-gradient font-light">Opulent Elegance</span>
          </h2>

          <p className="text-sm sm:text-base text-[#b5a896] leading-relaxed font-light">
            A glimpse inside our sun-drenched private suites and the runway-ready silhouettes sculpted by our artistic directors.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-5 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300 font-medium ${
                activeTab === t.id
                  ? 'bg-gold-gradient text-black font-semibold shadow-[0_0_15px_rgba(197,160,89,0.3)]'
                  : 'bg-[#120e0a] text-[#a89d8d] border border-[#2b2116] hover:border-[#c5a059]/50 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid with 3D Tilt */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card3D intensity={10} glowColor="rgba(212, 175, 55, 0.25)">
                  <div
                    onClick={() => handleOpenLightbox(item)}
                    className="group relative h-80 rounded-2xl overflow-hidden border border-[#2e2316] hover:border-[#c5a059]/60 cursor-pointer shadow-lg bg-[#110d0a]"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

                    {/* Floating Zoom Icon on Hover */}
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-[#c5a059]/40 text-[#c5a059] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110">
                      <Maximize2 className="w-4 h-4" />
                    </div>

                    {/* Caption Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <span className="text-xs uppercase tracking-widest text-[#dfba73] font-medium block mb-1">
                        {item.category.toUpperCase()}
                      </span>
                      <h3 className="font-cormorant text-xl text-white font-medium leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#d6cec0] font-light line-clamp-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#0d0a07] rounded-3xl overflow-hidden border border-[#c5a059]/40 shadow-2xl flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                aria-label="Close Lightbox"
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 text-[#d6cec0] hover:text-white border border-[#3b3023] hover:border-[#c5a059] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                aria-label="Previous Image"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/70 text-[#d6cec0] hover:text-white border border-[#3b3023] hover:border-[#c5a059] transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Image"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/70 text-[#d6cec0] hover:text-white border border-[#3b3023] hover:border-[#c5a059] transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Image Container */}
              <div className="relative h-[65vh] w-full bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={filteredItems[lightboxIndex].image}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Caption Footer */}
              <div className="p-6 bg-[#130e0a] border-t border-[#292015] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-medium">
                    {filteredItems[lightboxIndex].category.toUpperCase()} • Portfolio Item {lightboxIndex + 1} of {filteredItems.length}
                  </span>
                  <h3 className="font-cormorant text-2xl text-white font-medium">
                    {filteredItems[lightboxIndex].title}
                  </h3>
                  <p className="text-xs text-[#b8ad9d] font-light mt-1 max-w-xl">
                    {filteredItems[lightboxIndex].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
