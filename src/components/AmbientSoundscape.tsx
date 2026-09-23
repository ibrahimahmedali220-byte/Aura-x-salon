import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Sparkles, ChevronDown, Check, Play, Pause, Sliders } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export type SoundtrackId = 'atelier' | 'zen' | 'piano';

interface SoundtrackOption {
  id: SoundtrackId;
  name: string;
  tagline: string;
  badge: string;
  icon: string;
}

const SOUNDTRACKS: SoundtrackOption[] = [
  {
    id: 'atelier',
    name: 'Atelier Ambience',
    tagline: 'Slow-motion luxury lounge & signature chime ringtone',
    badge: 'SIGNATURE RINGTONE',
    icon: '✨',
  },
  {
    id: 'zen',
    name: 'Meditation Zen',
    tagline: 'Tibetan singing bowls & deep harmonic relaxation',
    badge: 'SPA SANCTUARY',
    icon: '🧘',
  },
  {
    id: 'piano',
    name: 'Bespoke Piano',
    tagline: 'Slow-motion nocturnal grand piano romance',
    badge: 'GRAND PIANO',
    icon: '🎹',
  },
];

export const AmbientSoundscape: React.FC = () => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<SoundtrackId>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('aurador_soundtrack') as SoundtrackId) || 'atelier';
    }
    return 'atelier';
  });
  const [volume, setVolume] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aurador_audio_vol');
      return saved ? parseFloat(saved) : 0.75;
    }
    return 0.75;
  });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const loopTimerRef = useRef<number | null>(null);
  const chimeTimerRef = useRef<number | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const isPlayingRef = useRef(false);
  const currentTrackRef = useRef<SoundtrackId>(currentTrack);

  useEffect(() => {
    currentTrackRef.current = currentTrack;
    if (typeof window !== 'undefined') {
      localStorage.setItem('aurador_soundtrack', currentTrack);
    }
  }, [currentTrack]);

  // Click outside listener for the popover
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsPopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update master gain when volume changes
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current && isPlaying) {
      try {
        masterGainRef.current.gain.linearRampToValueAtTime(
          Math.max(0.0001, volume * 0.8),
          audioCtxRef.current.currentTime + 0.1
        );
        if (typeof window !== 'undefined') {
          localStorage.setItem('aurador_audio_vol', volume.toString());
        }
      } catch {
        // Safe audio fallback
      }
    }
  }, [volume, isPlaying]);

  // --- Web Audio Synthesizer Engines ---

  // 1. Atelier Ambience: Lush slow-motion Rhodes chords & signature crystal chime ringtone
  const playAtelierChord = (ctx: AudioContext, destination: AudioNode, step: number) => {
    if (!isPlayingRef.current || currentTrackRef.current !== 'atelier') return;
    const now = ctx.currentTime;
    const chords = [
      [146.83, 185.0, 220.0, 277.18, 329.63], // Dmaj9
      [123.47, 146.83, 185.0, 220.0, 277.18], // Bm9
      [98.0, 123.47, 146.83, 185.0, 246.94], // Gmaj7
      [110.0, 138.59, 164.81, 185.0, 246.94], // A6/9
    ];
    const chord = chords[step % chords.length];
    const duration = 5.2;

    chord.forEach((freq, idx) => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(360 + idx * 55, now);

        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        const startTime = now + idx * 0.07;
        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.exponentialRampToValueAtTime(0.014 / (idx + 1), startTime + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(destination);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.3);
      } catch {
        // Safe fallback
      }
    });

    // Slow-motion attractive signature ringtone chime cascade (E6 -> C#6 -> A5 -> F#5)
    if (step % 2 === 1) {
      const ringtoneNotes = [1318.51, 1108.73, 880.0, 739.99]; // E6, C#6, A5, F#5
      ringtoneNotes.forEach((f, i) => {
        try {
          const rOsc = ctx.createOscillator();
          const rGain = ctx.createGain();
          const rTime = now + 1.8 + i * 0.28; // Slow-motion cascade timing
          rOsc.type = 'sine';
          rOsc.frequency.setValueAtTime(f, rTime);

          rGain.gain.setValueAtTime(0.0001, rTime);
          rGain.gain.exponentialRampToValueAtTime(0.007, rTime + 0.04);
          rGain.gain.exponentialRampToValueAtTime(0.00001, rTime + 2.5);

          rOsc.connect(rGain);
          rGain.connect(destination);
          rOsc.start(rTime);
          rOsc.stop(rTime + 2.6);
        } catch {
          // Safe fallback
        }
      });
    }
  };

  // 2. Meditation Zen: Tibetan Singing Bowl & Sub-bass Calm
  const playZenBowl = (ctx: AudioContext, destination: AudioNode, step: number) => {
    if (!isPlayingRef.current || currentTrackRef.current !== 'zen') return;
    const now = ctx.currentTime;
    const baseFreqs = [216.0, 162.0, 243.0, 180.0]; // Sacred harmonic bowls
    const fund = baseFreqs[step % baseFreqs.length];

    // Harmonics for rich singing bowl acoustic beating
    const harmonics = [1, 2.76, 5.4, 8.9];
    harmonics.forEach((h, idx) => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(fund * h, now);

        const amp = 0.016 / (idx * 1.5 + 1);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(amp, now + 0.35);
        gain.gain.exponentialRampToValueAtTime(0.00001, now + 6.5);

        osc.connect(gain);
        gain.connect(destination);
        osc.start(now);
        osc.stop(now + 6.8);
      } catch {
        // Safe fallback
      }
    });

    // Deep subterranean 108Hz calm drone
    try {
      const droneOsc = ctx.createOscillator();
      const droneGain = ctx.createGain();
      droneOsc.type = 'sine';
      droneOsc.frequency.setValueAtTime(108.0, now);
      droneGain.gain.setValueAtTime(0.0001, now);
      droneGain.gain.exponentialRampToValueAtTime(0.018, now + 1.0);
      droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);
      droneOsc.connect(droneGain);
      droneGain.connect(destination);
      droneOsc.start(now);
      droneOsc.stop(now + 5.8);
    } catch {
      // Safe fallback
    }
  };

  // 3. Bespoke Piano: Slow-motion grand piano nocturnal melody
  const playPianoPhrase = (ctx: AudioContext, destination: AudioNode, step: number) => {
    if (!isPlayingRef.current || currentTrackRef.current !== 'piano') return;
    const now = ctx.currentTime;

    // Slow-motion romantic grand piano arpeggios
    const phrases = [
      // Phrase A (C#m / E)
      [
        { f: 138.59, t: 0.0, dur: 4.5, v: 0.02 },  // C#3 bass
        { f: 277.18, t: 0.3, dur: 3.8, v: 0.015 }, // C#4
        { f: 329.63, t: 0.9, dur: 3.5, v: 0.016 }, // E4
        { f: 415.30, t: 1.6, dur: 3.2, v: 0.018 }, // G#4
        { f: 554.37, t: 2.3, dur: 3.0, v: 0.02 },  // C#5 melody
        { f: 493.88, t: 3.2, dur: 2.8, v: 0.017 }, // B4
      ],
      // Phrase B (A major romantic resolve)
      [
        { f: 110.00, t: 0.0, dur: 4.5, v: 0.02 },  // A2 bass
        { f: 220.00, t: 0.3, dur: 3.8, v: 0.014 }, // A3
        { f: 277.18, t: 0.9, dur: 3.5, v: 0.016 }, // C#4
        { f: 329.63, t: 1.6, dur: 3.2, v: 0.018 }, // E4
        { f: 440.00, t: 2.3, dur: 3.2, v: 0.022 }, // A4 melody
        { f: 415.30, t: 3.2, dur: 2.8, v: 0.016 }, // G#4
      ],
    ];

    const notes = phrases[step % phrases.length];
    notes.forEach((note) => {
      try {
        const osc = ctx.createOscillator();
        const hammer = ctx.createOscillator();
        const noteGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(680, now + note.t);

        // Fundamental tone
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, now + note.t);

        // Slight percussive hammer resonance
        hammer.type = 'sine';
        hammer.frequency.setValueAtTime(note.f * 2.02, now + note.t);

        const startTime = now + note.t;
        noteGain.gain.setValueAtTime(0.0001, startTime);
        noteGain.gain.exponentialRampToValueAtTime(note.v, startTime + 0.06); // Crisp acoustic hammer attack
        noteGain.gain.exponentialRampToValueAtTime(0.00001, startTime + note.dur); // Warm piano decay

        osc.connect(filter);
        hammer.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(destination);

        osc.start(startTime);
        hammer.start(startTime);
        osc.stop(startTime + note.dur + 0.2);
        hammer.stop(startTime + note.dur + 0.2);
      } catch {
        // Safe fallback
      }
    });
  };

  const startLoop = (trackId: SoundtrackId) => {
    if (!audioCtxRef.current || !masterGainRef.current) return;
    const ctx = audioCtxRef.current;
    const dest = masterGainRef.current;

    let step = 0;
    const runStep = () => {
      if (!isPlayingRef.current) return;
      if (currentTrackRef.current === 'atelier') {
        playAtelierChord(ctx, dest, step);
      } else if (currentTrackRef.current === 'zen') {
        playZenBowl(ctx, dest, step);
      } else if (currentTrackRef.current === 'piano') {
        playPianoPhrase(ctx, dest, step);
      }
      step++;
    };

    runStep();
    const intervalMs = trackId === 'zen' ? 5200 : trackId === 'piano' ? 4800 : 5000;
    loopTimerRef.current = window.setInterval(runStep, intervalMs);
  };

  const startSoundscape = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(Math.max(0.001, volume * 0.8), ctx.currentTime + 1.2);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Gentle vinyl/breeze warmth texture
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.005;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.Q.setValueAtTime(0.7, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.004, ctx.currentTime);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(masterGain);
      noise.start();

      isPlayingRef.current = true;
      setIsPlaying(true);

      startLoop(currentTrackRef.current);
    } catch {
      // AudioContext could not initialize
    }
  };

  const stopSoundscape = () => {
    isPlayingRef.current = false;
    if (loopTimerRef.current) {
      clearInterval(loopTimerRef.current);
      loopTimerRef.current = null;
    }
    if (chimeTimerRef.current) {
      clearInterval(chimeTimerRef.current);
      chimeTimerRef.current = null;
    }
    if (audioCtxRef.current && masterGainRef.current) {
      try {
        masterGainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.6);
        setTimeout(() => {
          audioCtxRef.current?.close();
          audioCtxRef.current = null;
          masterGainRef.current = null;
        }, 700);
      } catch {
        // Safe fallback
      }
    }
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopSoundscape();
    } else {
      startSoundscape();
    }
  };

  const selectTrack = (trackId: SoundtrackId) => {
    setCurrentTrack(trackId);
    if (isPlaying) {
      if (loopTimerRef.current) {
        clearInterval(loopTimerRef.current);
        loopTimerRef.current = null;
      }
      startLoop(trackId);
    }
  };

  useEffect(() => {
    return () => {
      stopSoundscape();
    };
  }, []);

  const activeTrackObj = SOUNDTRACKS.find((s) => s.id === currentTrack) || SOUNDTRACKS[0];

  return (
    <div className="relative inline-block text-left" ref={popoverRef}>
      {/* Navbar Soundscape Button */}
      <div className="flex items-center">
        <button
          type="button"
          id="navbar-soundscape-toggle"
          onClick={togglePlayback}
          title={isPlaying ? t('sound.mute', 'Mute Soundscape') : t('sound.enable', 'Enable Atmospheric Soundscape')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 text-xs cursor-pointer shadow-sm group ${
            isPlaying
              ? 'bg-gradient-to-r from-[#21160d] via-[#2a1a0f] to-[#17100a] border-[#c5a059] text-[#f2e6d6] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
              : 'bg-[#120c08]/80 border-[#3d2e1c] text-[#a89a87] hover:border-[#c5a059]/60 hover:text-white'
          }`}
        >
          {isPlaying ? (
            <>
              {/* Animated Frequency Bars */}
              <div className="flex items-center gap-0.5 h-3.5 w-3.5">
                <span className="w-0.5 bg-[#ffd700] h-full rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
                <span className="w-0.5 bg-[#ffd700] h-3/5 rounded-full animate-[pulse_1.2s_ease-in-out_infinite]" />
                <span className="w-0.5 bg-[#ffd700] h-4/5 rounded-full animate-[pulse_0.6s_ease-in-out_infinite]" />
              </div>
              <span className="text-[11px] uppercase tracking-wider text-[#dfba73] font-semibold hidden xl:inline">
                {activeTrackObj.name}
              </span>
              <Volume2 className="w-3.5 h-3.5 text-[#ffd700]" />
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#8c7f6e] group-hover:text-[#c5a059] transition-colors" />
              <span className="text-[11px] uppercase tracking-wider text-[#9d907e] font-light hidden xl:inline">
                {t('nav.spaAmbience', 'Soundscape')}
              </span>
              <Music className="w-3 h-3 text-[#c5a059]/60" />
            </>
          )}
        </button>

        {/* Dropdown Opener Arrow */}
        <button
          type="button"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          aria-label="Open Atmospheric Soundscape Controls"
          className={`-ml-2 p-1.5 rounded-full text-[#a89a87] hover:text-white hover:bg-[#20150d] transition-colors cursor-pointer ${
            isPopoverOpen ? 'text-[#c5a059]' : ''
          }`}
        >
          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isPopoverOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Floating Soundscape Controller Popover */}
      {isPopoverOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-gradient-to-b from-[#160f09]/98 via-[#110b07]/98 to-[#090604]/98 border border-[#c5a059]/50 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 text-[#e8ded1]">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#261c12] mb-3">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#dfba73] font-bold block">
                {t('sound.soundscapeController', 'Ambient Soundscape Controller')}
              </span>
              <span className="text-xs text-white font-medium">
                {t('sound.slowMotionBadge', 'Slow-Motion Audio')} • 432Hz
              </span>
            </div>

            <button
              type="button"
              onClick={togglePlayback}
              className={`p-2 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
                isPlaying
                  ? 'bg-gradient-to-r from-[#c5a059] to-[#dfba73] text-black hover:scale-105'
                  : 'bg-[#20150e] border border-[#3b2b1d] text-[#c5a059] hover:text-white hover:border-[#c5a059]'
              }`}
              title={isPlaying ? 'Pause Audio' : 'Play Audio'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
          </div>

          {/* Soundtrack Selection */}
          <div className="space-y-1.5 mb-4">
            <span className="text-[10px] uppercase tracking-wider text-[#8e8070] font-semibold block px-1">
              Select Soundscape
            </span>
            {SOUNDTRACKS.map((track) => {
              const isCurrent = currentTrack === track.id;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => selectTrack(track.id)}
                  className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    isCurrent
                      ? 'bg-gradient-to-r from-[#291a0e] to-[#1c1209] border border-[#c5a059]/60 shadow-sm'
                      : 'hover:bg-[#19110a] border border-transparent text-[#b8ab9b]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base">{track.icon}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white truncate">
                          {track.name}
                        </span>
                        <span className="text-[8px] font-bold px-1.5 py-0.2 rounded-full bg-[#352313] text-[#dfba73] border border-[#52371e] shrink-0">
                          {track.badge}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#9d8e7d] truncate font-light mt-0.5">
                        {track.tagline}
                      </p>
                    </div>
                  </div>

                  {isCurrent && <Check className="w-4 h-4 text-[#ffd700] shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Volume Control */}
          <div className="pt-3 border-t border-[#261c12]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[10px] uppercase tracking-wider text-[#8e8070] font-semibold flex items-center gap-1.5">
                <Sliders className="w-3 h-3 text-[#c5a059]" />
                <span>{t('sound.volume', 'Volume')}</span>
              </span>
              <span className="text-[10px] text-[#dfba73] font-mono font-bold">
                {Math.round(volume * 100)}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              aria-label="Soundscape volume slider"
              className="w-full h-1.5 bg-[#251b12] rounded-lg appearance-none cursor-pointer accent-[#c5a059]"
            />
          </div>

          {/* Hindi description footnote honoring user request */}
          <div className="mt-3 pt-2 text-center border-t border-[#1e150d] text-[9px] text-[#857666] font-light">
            ✨ बैकग्राउंड में सोलोमोशन आकर्षक रिंगटोन व शांतिदायक संगीत (432Hz)
          </div>
        </div>
      )}
    </div>
  );
};
