import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AmbientSoundscape: React.FC = () => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);
  const isPlayingRef = useRef(false);

  // Warm, soothing luxury spa & low-fi lounge chords (Frequencies in Hz)
  // Chord 1: Dmaj9 (D3, F#3, A3, C#4, E4)
  // Chord 2: Bm9 (B2, D3, F#3, A3, C#4)
  // Chord 3: Gmaj7 (G2, B2, D3, F#3)
  // Chord 4: A6/9 (A2, C#3, E3, F#3, B3)
  const LOUNGE_CHORDS = [
    [146.83, 185.00, 220.00, 277.18, 329.63], // Dmaj9
    [123.47, 146.83, 185.00, 220.00, 277.18], // Bm9
    [98.00, 123.47, 146.83, 185.00, 246.94],  // Gmaj7
    [110.00, 138.59, 164.81, 185.00, 246.94]  // A6/9
  ];

  const playChord = (chordIdx: number, ctx: AudioContext, destination: AudioNode) => {
    if (!isPlayingRef.current) return;
    const chord = LOUNGE_CHORDS[chordIdx % LOUNGE_CHORDS.length];
    const now = ctx.currentTime;
    const duration = 5.5; // 5.5 second breathing chord transition

    chord.forEach((freq, idx) => {
      try {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        const noteFilter = ctx.createBiquadFilter();

        // Warm electric piano / Rhodes lowpass warmth
        noteFilter.type = 'lowpass';
        noteFilter.frequency.setValueAtTime(380 + idx * 60, now);

        // Gentle sine/triangle harmonic mix
        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Stagger note attack slightly for authentic low-fi lounge feel
        const stagger = idx * 0.08;
        const noteStartTime = now + stagger;

        noteGain.gain.setValueAtTime(0.0001, noteStartTime);
        // Soft, blooming swell
        noteGain.gain.exponentialRampToValueAtTime(0.015 / (idx + 1), noteStartTime + 1.2);
        // Long relaxing decay
        noteGain.gain.exponentialRampToValueAtTime(0.0001, noteStartTime + duration);

        osc.connect(noteFilter);
        noteFilter.connect(noteGain);
        noteGain.connect(destination);

        osc.start(noteStartTime);
        osc.stop(noteStartTime + duration + 0.5);
      } catch {
        // Safe audio fallback
      }
    });

    // Occasional gentle Tibetan singing bowl chime (high crystalline harmonic)
    if (Math.random() > 0.45) {
      try {
        const chimeOsc = ctx.createOscillator();
        const chimeGain = ctx.createGain();
        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(880 + Math.random() * 220, now + 1.5);
        chimeGain.gain.setValueAtTime(0.0001, now + 1.5);
        chimeGain.gain.exponentialRampToValueAtTime(0.004, now + 1.6);
        chimeGain.gain.exponentialRampToValueAtTime(0.00001, now + 4.5);
        chimeOsc.connect(chimeGain);
        chimeGain.connect(destination);
        chimeOsc.start(now + 1.5);
        chimeOsc.stop(now + 4.8);
      } catch {
        // Safe fallback
      }
    }
  };

  const startSoundscape = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.85, ctx.currentTime + 2); // Warm audible ambient level
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Warm vinyl tape hiss / gentle breeze background layer
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.008; // Very subtle vinyl warmth
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(900, ctx.currentTime);
      noiseFilter.Q.setValueAtTime(0.8, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.006, ctx.currentTime);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      whiteNoise.start();

      isPlayingRef.current = true;
      setIsPlaying(true);

      // Start the relaxing chord progression loop (every ~5 seconds)
      let chordIndex = 0;
      playChord(chordIndex, ctx, masterGain);

      intervalRef.current = window.setInterval(() => {
        chordIndex++;
        if (audioCtxRef.current && masterGainRef.current && isPlayingRef.current) {
          playChord(chordIndex, audioCtxRef.current, masterGainRef.current);
        }
      }, 5000);
    } catch {
      // AudioContext could not be initialized
    }
  };

  const stopSoundscape = () => {
    isPlayingRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (audioCtxRef.current && masterGainRef.current) {
      try {
        masterGainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.8);
        setTimeout(() => {
          audioCtxRef.current?.close();
          audioCtxRef.current = null;
        }, 900);
      } catch {
        // Safe fallback
      }
    }
    setIsPlaying(false);
  };

  const toggleSoundscape = () => {
    if (isPlaying) {
      stopSoundscape();
    } else {
      startSoundscape();
    }
  };

  useEffect(() => {
    return () => {
      stopSoundscape();
    };
  }, []);

  return (
    <button
      type="button"
      id="navbar-soundscape-toggle"
      onClick={toggleSoundscape}
      title={isPlaying ? t('sound.mute') : t('sound.enable')}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-xs cursor-pointer shadow-sm group ${
        isPlaying
          ? 'bg-gradient-to-r from-[#21160d] to-[#17100a] border-[#c5a059] text-[#f2e6d6] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
          : 'bg-[#120c08]/80 border-[#3d2e1c] text-[#a89a87] hover:border-[#c5a059]/60 hover:text-white'
      }`}
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-0.5 h-3.5 w-3.5">
            <span className="w-0.5 bg-[#c5a059] h-full rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
            <span className="w-0.5 bg-[#c5a059] h-3/5 rounded-full animate-[pulse_1.2s_ease-in-out_infinite]" />
            <span className="w-0.5 bg-[#c5a059] h-4/5 rounded-full animate-[pulse_0.6s_ease-in-out_infinite]" />
          </div>
          <span className="text-[11px] uppercase tracking-wider text-[#e5c07b] font-medium hidden sm:inline">
            {t('nav.spaAmbience')}
          </span>
          <Volume2 className="w-3.5 h-3.5 text-[#c5a059]" />
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-[#8c7f6e] group-hover:text-[#c5a059] transition-colors" />
          <span className="text-[11px] uppercase tracking-wider text-[#9d907e] font-light hidden sm:inline">
            {t('nav.spaAmbience')}
          </span>
          <Music className="w-3 h-3 text-[#c5a059]/60" />
        </>
      )}
    </button>
  );
};
