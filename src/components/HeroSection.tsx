import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, ArrowDown, Play, Pause, Volume2, VolumeX, ShieldCheck, Star } from 'lucide-react';
import { Card3D } from './Card3D';

interface HeroSectionProps {
  onBookClick: () => void;
  onExploreServices: () => void;
}

interface VideoScene {
  id: string;
  name: string;
  videoUrl: string;
  poster: string;
}

const VIDEO_SCENES: VideoScene[] = [
  {
    id: 'styling',
    name: 'Luxury Hair Styling',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hairdresser-brushing-and-drying-a-womans-hair-43410-large.mp4',
    poster: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'spa',
    name: 'Sanctuary Spa',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-stylist-washing-the-hair-of-a-woman-in-a-salon-43407-large.mp4',
    poster: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop'
  }
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onBookClick, onExploreServices }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentScene = VIDEO_SCENES[currentSceneIndex];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section id="hero-section" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-32 sm:pt-36 pb-16">
      {/* Background Video with Mobile Fallback */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black">
        <video
          ref={videoRef}
          key={currentScene.videoUrl}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          poster={currentScene.poster}
          onCanPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-55' : 'opacity-30'
          }`}
        >
          <source src={currentScene.videoUrl} type="video/mp4" />
        </video>

        {/* Fallback & Layered Dark & Golden Luxury Gradient Overlays for optimal text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/75 to-[#080808]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/90 via-[#080808]/40 to-[#080808]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.08)_0%,_transparent_70%)] pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Crest & Crown Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c5a059]/40 bg-[#120f0b]/70 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(212,175,55,0.15)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#e5c07b] font-medium">
            5-Star Luxury Hair Styling & Bespoke Spa
          </span>
          <span className="w-1 h-1 rounded-full bg-[#c5a059]" />
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#a89d8d]">Beverly Hills</span>
        </motion.div>

        {/* Main Headings */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-cormorant text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white max-w-5xl leading-[1.08] mb-6"
        >
          Where Elite Artistry Meets <br className="hidden sm:inline" />
          <span className="text-gold-gradient italic font-normal">Pure Diamond Luxury</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-[#c7beaf] max-w-2xl font-light tracking-wide leading-relaxed mb-10"
        >
          Indulge in custom balayage styling, 24K gold cellular facial rejuvenation, and private sanctuary rituals designed exclusively for distinguished clientele.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto justify-center mb-14"
        >
          <button
            id="hero-book-appointment-cta"
            onClick={onBookClick}
            className="btn-gold-luxury w-full sm:w-auto px-10 py-4 rounded-full flex items-center justify-center gap-3 group text-xs sm:text-sm"
          >
            <Calendar className="w-4 h-4 text-black group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
            <span>Book VIP Appointment</span>
          </button>

          <button
            id="hero-explore-services-cta"
            onClick={onExploreServices}
            className="btn-outline-luxury w-full sm:w-auto px-9 py-4 rounded-full flex items-center justify-center gap-2 group text-xs sm:text-sm"
          >
            <span>Explore Services Menu</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#c5a059] group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </motion.div>

        {/* 3D Floating Feature Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="w-full max-w-4xl"
        >
          <Card3D intensity={8} glowColor="rgba(212, 175, 55, 0.2)">
            <div
              id="hero-floating-stats"
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-5 sm:p-6 rounded-2xl bg-[#110d0a]/80 backdrop-blur-xl border border-[#c5a059]/30 shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
            >
              <div className="flex flex-col items-center justify-center border-r border-[#261f17]/60 pr-2">
                <div className="flex items-center text-[#c5a059] text-xl sm:text-2xl font-cinzel font-bold">
                  15+
                </div>
                <span className="text-[11px] uppercase tracking-wider text-[#a89d8d] mt-0.5">
                  Years of Mastery
                </span>
              </div>

              <div className="flex flex-col items-center justify-center md:border-r border-[#261f17]/60 pr-2">
                <div className="flex items-center gap-1 text-[#c5a059] text-xl sm:text-2xl font-cinzel font-bold">
                  <Star className="w-4 h-4 fill-[#c5a059] text-[#c5a059]" />
                  4.95
                </div>
                <span className="text-[11px] uppercase tracking-wider text-[#a89d8d] mt-0.5">
                  1,400+ VIP Reviews
                </span>
              </div>

              <div className="flex flex-col items-center justify-center border-r border-[#261f17]/60 pr-2">
                <div className="flex items-center text-[#c5a059] text-xl sm:text-2xl font-cinzel font-bold">
                  100%
                </div>
                <span className="text-[11px] uppercase tracking-wider text-[#a89d8d] mt-0.5">
                  Bespoke Formulations
                </span>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-1 text-[#c5a059] text-xl sm:text-2xl font-cinzel font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                  Private
                </div>
                <span className="text-[11px] uppercase tracking-wider text-[#a89d8d] mt-0.5">
                  VIP Private Suites
                </span>
              </div>
            </div>
          </Card3D>
        </motion.div>
      </div>

      {/* Floating Video Controls & Scene Switcher */}
      <div
        id="hero-video-controls"
        className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-2 bg-[#0d0a07]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#c5a059]/30 text-xs"
      >
        <span className="text-[10px] uppercase tracking-wider text-[#8f8270] mr-1">Atmosphere:</span>
        {VIDEO_SCENES.map((scene, idx) => (
          <button
            key={scene.id}
            onClick={() => setCurrentSceneIndex(idx)}
            className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider transition-colors ${
              currentSceneIndex === idx
                ? 'bg-[#c5a059] text-black font-semibold'
                : 'text-[#c7beaf] hover:text-white'
            }`}
          >
            {scene.name}
          </button>
        ))}
        <div className="w-[1px] h-3 bg-[#3a3022] mx-1" />
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          className="p-1 rounded-full text-[#c7beaf] hover:text-[#c5a059] transition-colors"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          className="p-1 rounded-full text-[#c7beaf] hover:text-[#c5a059] transition-colors"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Scroll Down Gentle Animation */}
      <a
        href="#about"
        id="hero-scroll-indicator"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-[#9f9483] hover:text-[#c5a059] transition-colors group cursor-pointer"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] mb-1.5">Discover Atelier</span>
        <div className="w-5 h-9 rounded-full border border-[#c5a059]/40 flex justify-center p-1 group-hover:border-[#c5a059]">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 rounded-full bg-[#c5a059]"
          />
        </div>
      </a>
    </section>
  );
};
