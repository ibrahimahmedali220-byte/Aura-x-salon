import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Lock, Key, Server, CheckCircle2, X, EyeOff, FileCheck2, Cpu } from 'lucide-react';

interface SecurityShieldModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityShieldModal: React.FC<SecurityShieldModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            className="w-full max-w-xl rounded-3xl bg-[#120e0a] border border-[#c5a059]/60 p-6 sm:p-8 relative shadow-2xl text-left overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1 text-[#8f806e] hover:text-white transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold block">
                Military-Grade Cryptographic Protection
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl text-white font-bold">
                Atelier Security & Privacy Charter
              </h3>
            </div>

            <div className="space-y-4 mb-6">
              {/* Feature 1: 256-Bit SSL */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#1a130c] border border-[#3b2b1a]">
                <div className="w-8 h-8 rounded-full bg-[#27190e] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] shrink-0 mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-white uppercase tracking-wider mb-0.5">
                    256-Bit TLS/SSL End-to-End Encryption
                  </h4>
                  <p className="text-[11px] text-[#9f907e] leading-relaxed">
                    All client reservations, phone numbers, and luxury preferences are encrypted in transit with strict HTTPS and TLS 1.3 cryptographic protocols.
                  </p>
                </div>
              </div>

              {/* Feature 2: Strict CSP & Anti-XSS */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#1a130c] border border-[#3b2b1a]">
                <div className="w-8 h-8 rounded-full bg-[#27190e] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] shrink-0 mt-0.5">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-white uppercase tracking-wider mb-0.5">
                    Content Security Policy (CSP) & XSS Shield
                  </h4>
                  <p className="text-[11px] text-[#9f907e] leading-relaxed">
                    Strict content security rules block unauthorized script execution, malicious iframe hijacks, clickjacking, and cross-site scripting (XSS) vectors.
                  </p>
                </div>
              </div>

              {/* Feature 3: Anti-Bot Rate Limiting */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#1a130c] border border-[#3b2b1a]">
                <div className="w-8 h-8 rounded-full bg-[#27190e] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] shrink-0 mt-0.5">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-white uppercase tracking-wider mb-0.5">
                    Real-Time Rate Limiter & Anti-Abuse Sentinel
                  </h4>
                  <p className="text-[11px] text-[#9f907e] leading-relaxed">
                    Intelligent sliding-window rate limiters prevent denial-of-service (DoS) attempts, automated brute-force attacks, and form spam.
                  </p>
                </div>
              </div>

              {/* Feature 4: Zero Plaintext Storage */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#1a130c] border border-[#3b2b1a]">
                <div className="w-8 h-8 rounded-full bg-[#27190e] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] shrink-0 mt-0.5">
                  <EyeOff className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-white uppercase tracking-wider mb-0.5">
                    Private Sovereign Data Protocol
                  </h4>
                  <p className="text-[11px] text-[#9f907e] leading-relaxed">
                    Your personal beauty archive, phone number, and preferences are stored exclusively in client-side secure sandbox partitions and never shared with third parties.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#c5a059] via-[#e5c07b] to-[#c5a059] text-black font-semibold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition-all cursor-pointer text-center"
            >
              Close Security Dossier
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
