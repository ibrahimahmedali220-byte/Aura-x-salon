import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Sparkles, CheckCircle2, ShieldCheck, Zap, AlertCircle, Phone, ArrowRight } from 'lucide-react';

interface AlertSubscriber {
  phone: string;
  preferences: string[];
  subscribedAt: string;
}

export const ExclusiveSmsAlertModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'apothecary_drops',
    'last_minute_stylist'
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      if (selectedTopics.length > 1) {
        setSelectedTopics(selectedTopics.filter((t) => t !== topic));
      }
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const digitsOnly = phone.replace(/\D/g, '');

    if (digitsOnly.length < 10) {
      setErrorMessage('कृपया वैध 10 अंकों का मोबाइल नंबर दर्ज करें (Please enter a valid 10-digit mobile number).');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    setTimeout(() => {
      // Store in localStorage for simulated client-side persistence
      try {
        const existing = JSON.parse(localStorage.getItem('aura_dor_sms_subscribers') || '[]');
        const newSubscriber: AlertSubscriber = {
          phone: digitsOnly,
          preferences: selectedTopics,
          subscribedAt: new Date().toISOString()
        };
        localStorage.setItem('aura_dor_sms_subscribers', JSON.stringify([...existing, newSubscriber]));
      } catch (err) {
        console.error('Could not save SMS subscriber:', err);
      }

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  const resetForm = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsSuccess(false);
      setPhone('');
      setFullName('');
      setErrorMessage(null);
    }, 300);
  };

  return (
    <>
      {/* Trigger Button inside sections */}
      <button
        type="button"
        id="open-sms-alerts-modal-btn"
        onClick={() => setIsOpen(true)}
        className="group relative inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#20150b] via-[#2a1c0e] to-[#1a1209] border border-[#c5a059]/60 hover:border-[#e5c07b] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] cursor-pointer"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e5c07b] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]" />
        </span>
        <Bell className="w-3.5 h-3.5 text-[#e5c07b] group-hover:rotate-12 transition-transform duration-300" />
        <span className="text-[#f7ebd4]">Join Exclusive SMS Alerts</span>
      </button>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetForm}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#18110b] via-[#120d08] to-[#0c0805] border border-[#c5a059]/50 shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-6 sm:p-8 overflow-hidden z-10"
            >
              {/* Gold Ambient Glow Top */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#d4af37]/10 blur-3xl pointer-events-none" />

              {!isSuccess ? (
                <>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24170d] border border-[#c5a059]/40 text-[#e5c07b] text-[10px] uppercase tracking-widest font-semibold mb-3">
                      <Zap className="w-3 h-3 text-[#d4af37]" />
                      <span>Privileged Dispatch Service</span>
                    </div>

                    <h3 className="font-cormorant text-2xl sm:text-3xl text-white font-normal tracking-tight">
                      Exclusive VIP <span className="italic text-gold-gradient font-light">SMS Alerts</span>
                    </h3>

                    <p className="text-xs text-[#b8a994] font-light mt-2 max-w-sm mx-auto leading-relaxed">
                      Be the first to receive real-time text alerts for ultra-limited Swiss apothecary drops and rare last-minute opening slots from our Master Stylists.
                    </p>
                  </div>

                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div>
                      <label className="block text-[11px] text-[#938573] uppercase tracking-wider mb-1.5 font-medium">
                        Patron Name (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Lady Alexandra Sterling"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-[#1b150f] border border-[#3b2d1c] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-2.5 text-xs text-[#e6decb]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-[11px] text-[#938573] uppercase tracking-wider font-medium">
                          Mobile Number (10 Digits Required) *
                        </label>
                        {phone && (
                          <span className={`text-[10px] font-mono ${phone.replace(/\D/g, '').length >= 10 ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {phone.replace(/\D/g, '').length >= 10 ? '✓ 10+ digits' : `${phone.replace(/\D/g, '').length}/10 digits`}
                          </span>
                        )}
                      </div>

                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#8f816f] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9876543210 or (310) 555-0192"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (errorMessage && e.target.value.replace(/\D/g, '').length >= 10) {
                              setErrorMessage(null);
                            }
                          }}
                          className={`w-full bg-[#1b150f] border ${
                            errorMessage ? 'border-rose-500/80 ring-1 ring-rose-500/50' : 'border-[#3b2d1c] focus:border-[#c5a059]'
                          } focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#e6decb]`}
                        />
                      </div>
                      {errorMessage && (
                        <p className="mt-1.5 text-[11px] text-rose-400 font-medium flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errorMessage}</span>
                        </p>
                      )}
                    </div>

                    {/* Alert Preference Toggles */}
                    <div className="pt-2">
                      <label className="block text-[10px] text-[#938573] uppercase tracking-widest mb-2 font-medium">
                        Alert Preferences:
                      </label>
                      <div className="space-y-2">
                        <div
                          onClick={() => toggleTopic('apothecary_drops')}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                            selectedTopics.includes('apothecary_drops')
                              ? 'bg-[#22160d] border-[#c5a059]/60 text-white'
                              : 'bg-[#150f0a] border-[#291e13] text-[#a69986] hover:border-[#3b2c1b]'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center shrink-0 border ${
                            selectedTopics.includes('apothecary_drops')
                              ? 'bg-[#c5a059] border-[#c5a059] text-black'
                              : 'border-[#4a3926]'
                          }`}>
                            {selectedTopics.includes('apothecary_drops') && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                          <div className="text-xs">
                            <span className="font-semibold block text-[#e5c07b]">
                              Limited-Edition Apothecary Drops
                            </span>
                            <span className="text-[11px] text-[#9c8e7e] font-light">
                              Alerts for small-batch Swiss cellular elixirs, 24K gold masks & rare botanical serums.
                            </span>
                          </div>
                        </div>

                        <div
                          onClick={() => toggleTopic('last_minute_stylist')}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                            selectedTopics.includes('last_minute_stylist')
                              ? 'bg-[#22160d] border-[#c5a059]/60 text-white'
                              : 'bg-[#150f0a] border-[#291e13] text-[#a69986] hover:border-[#3b2c1b]'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center shrink-0 border ${
                            selectedTopics.includes('last_minute_stylist')
                              ? 'bg-[#c5a059] border-[#c5a059] text-black'
                              : 'border-[#4a3926]'
                          }`}>
                            {selectedTopics.includes('last_minute_stylist') && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                          <div className="text-xs">
                            <span className="font-semibold block text-[#e5c07b]">
                              Last-Minute VIP Stylist Openings
                            </span>
                            <span className="text-[11px] text-[#9c8e7e] font-light">
                              Same-day cancellations & priority access to Master Directors & International Guest Artists.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-2 text-[10px] text-[#8a7b6b]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                      <span>Zero spam guarantee. Max 2 priority alerts per month. Reply STOP anytime.</span>
                    </div>

                    <div className="pt-3 flex gap-3">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="flex-1 py-3 rounded-full border border-[#3d2e1c] hover:bg-[#1a120b] text-xs text-[#a89a87] font-medium transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 btn-gold-luxury py-3 rounded-full text-xs flex items-center justify-center gap-2 cursor-pointer font-bold disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Enrolling...</span>
                        ) : (
                          <>
                            <span>Enroll in SMS Alerts</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-full bg-[#24170d] border border-[#c5a059] text-[#e5c07b] flex items-center justify-center mx-auto mb-4 shadow-[0_0_25px_rgba(212,175,55,0.4)]">
                    <CheckCircle2 className="w-7 h-7 text-[#d4af37]" />
                  </div>

                  <h3 className="font-cormorant text-3xl text-white font-medium mb-2">
                    Priority Enrollment Secured
                  </h3>

                  <p className="text-xs text-[#cfc2b0] leading-relaxed max-w-sm mx-auto mb-6">
                    Mobile number <span className="text-[#e5c07b] font-mono font-medium">+{phone.replace(/\D/g, '')}</span> has been granted access to the AURA & D'OR Private Dispatch list. You will receive priority SMS pings when drops or openings happen.
                  </p>

                  <div className="p-4 rounded-2xl bg-[#140e09] border border-[#2b2014] text-left text-xs space-y-2 mb-6 text-[#9e907f]">
                    <div className="flex items-center gap-2 text-[#e5c07b] text-[11px] font-semibold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Active Alert Channels</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-[11px]">
                      {selectedTopics.includes('apothecary_drops') && (
                        <li>Limited-Edition Alpine Apothecary product releases</li>
                      )}
                      {selectedTopics.includes('last_minute_stylist') && (
                        <li>Last-minute cancellation slots with Master Stylists</li>
                      )}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn-gold-luxury w-full py-3 rounded-full text-xs font-bold cursor-pointer"
                  >
                    Done & Return to Atelier
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
