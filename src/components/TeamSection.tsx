import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Award, Instagram, Calendar, Bookmark, Check, Bell, Zap } from 'lucide-react';
import { STYLISTS_DATA } from '../data/salonData';
import { Stylist } from '../types';
import { Card3D } from './Card3D';
import { getBeautyArchive, updatePreferredStylist } from '../utils/archiveStorage';
import { ExclusiveSmsAlertModal } from './ExclusiveSmsAlertModal';

interface TeamSectionProps {
  onSelectStylistForBooking: (stylist: Stylist) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onSelectStylistForBooking }) => {
  const [preferredStylistId, setPreferredStylistId] = useState<string>(
    () => getBeautyArchive().preferredStylistId
  );
  const [pinnedAlert, setPinnedAlert] = useState<string | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setPreferredStylistId(getBeautyArchive().preferredStylistId);
    };
    window.addEventListener('aurador_archive_updated', handleUpdate);
    return () => window.removeEventListener('aurador_archive_updated', handleUpdate);
  }, []);

  const handlePinStylist = (stylist: Stylist, e: React.MouseEvent) => {
    e.stopPropagation();
    updatePreferredStylist(stylist.id, stylist.name);
    setPreferredStylistId(stylist.id);
    setPinnedAlert(`Saved ${stylist.name} to your Personal Beauty Archive`);
    setTimeout(() => setPinnedAlert(null), 3500);
  };

  return (
    <section id="team" className="relative py-28 bg-[#080808] border-t border-[#1c1813]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#14100b] mb-4">
            <Sparkles className="w-3 h-3 text-[#c5a059]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37] font-medium">
              The Master Artisans
            </span>
          </div>

          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.15] mb-6">
            Pioneers of <span className="italic text-gold-gradient font-light">Haute Aesthetics</span>
          </h2>

          <p className="text-sm sm:text-base text-[#b5a896] leading-relaxed font-light">
            Our atelier brings together celebrated directors from the fashion capitals of Paris, Milan, and Beverly Hills. Save your preferred director to your Personal Beauty Archive for prioritized reservations.
          </p>

          {pinnedAlert && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs">
              <Check className="w-3.5 h-3.5" />
              <span>{pinnedAlert}</span>
            </div>
          )}
        </div>

        {/* Stylists Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {STYLISTS_DATA.map((stylist) => {
            const isPreferred = preferredStylistId === stylist.id;
            return (
              <Card3D key={stylist.id} intensity={12} glowColor="rgba(212, 175, 55, 0.2)">
                <div className={`h-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#130f0a] to-[#090705] border transition-all flex flex-col justify-between shadow-xl group ${
                  isPreferred ? 'border-[#c5a059] shadow-[0_0_20px_rgba(197,160,89,0.3)]' : 'border-[#2b2116] hover:border-[#c5a059]/50'
                }`}>
                  {/* Photo */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={stylist.image}
                      alt={stylist.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090705] via-transparent to-transparent opacity-85" />

                    {/* Pin to Archive and Social Badges */}
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => handlePinStylist(stylist, e)}
                        className={`p-2 rounded-full backdrop-blur-md border text-xs transition-all cursor-pointer ${
                          isPreferred
                            ? 'bg-[#c5a059] text-black border-[#dfba73] shadow-md'
                            : 'bg-black/60 border-[#c5a059]/40 text-[#d6cec0] hover:text-[#c5a059]'
                        }`}
                        title={isPreferred ? 'Preferred in Beauty Archive' : 'Pin to Personal Beauty Archive'}
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>

                      <a
                        href={`https://instagram.com/${stylist.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-[#c5a059]/40 text-[#d6cec0] hover:text-[#c5a059] transition-colors"
                        title={`Follow ${stylist.name} on Instagram`}
                      >
                        <Instagram className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* Specialty Pill */}
                    <div className="absolute bottom-3 left-4 right-4">
                      {isPreferred && (
                        <span className="inline-block px-2 py-0.5 rounded-full bg-[#c5a059]/90 text-black text-[9px] uppercase font-bold tracking-widest mb-1 shadow-sm">
                          ★ Your Preferred Director
                        </span>
                      )}
                      <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-semibold block">
                        {stylist.role}
                      </span>
                      <h3 className="font-cormorant text-2xl font-medium text-white">
                        {stylist.name}
                      </h3>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="text-[11px] text-[#a19584] mb-2 font-medium">
                        {stylist.experience}
                      </div>

                      <p className="text-xs text-[#b8ac9c] font-light leading-relaxed mb-4">
                        {stylist.bio}
                      </p>

                      {/* Accolades */}
                      <div className="space-y-1.5 pt-3 border-t border-[#1f1710]">
                        {stylist.awards.map((award, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#e0d6c7]">
                            <Award className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                            <span className="truncate">{award}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Request Stylist Button */}
                    <div className="pt-3 border-t border-[#1f1710]">
                      <button
                        onClick={() => onSelectStylistForBooking(stylist)}
                        className="btn-outline-luxury w-full py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 group cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#c5a059] group-hover:text-white group-hover:rotate-12 transition-transform duration-300" />
                        <span>Request {stylist.name.split(' ')[0]}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Card3D>
            );
          })}
        </div>

        {/* Last-Minute VIP Stylist Opening SMS Alerts Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#17100a] via-[#21160d] to-[#140d08] border border-[#c5a059]/40 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2a1d12] to-[#120c07] border border-[#c5a059]/50 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.25)]">
              <Zap className="w-6 h-6 text-[#e5c07b]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37] px-2 py-0.5 rounded-full bg-[#352312] border border-[#c5a059]/40">
                  Private Roster Access
                </span>
                <span className="text-[10px] text-[#91816f]">Last-Minute Opening Alerts</span>
              </div>
              <h3 className="font-cormorant text-xl sm:text-2xl text-white font-normal">
                Seeking a <span className="italic text-gold-gradient font-light">Master Director</span> on Short Notice?
              </h3>
              <p className="text-xs text-[#a89a87] font-light max-w-xl mt-0.5 leading-relaxed">
                When a VIP guest reschedules or an international guest artist adds an impromptu Beverly Hills chair, enrolled patrons receive instant SMS notifications before public slots open.
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <ExclusiveSmsAlertModal />
          </div>
        </div>
      </div>
    </section>
  );
};

