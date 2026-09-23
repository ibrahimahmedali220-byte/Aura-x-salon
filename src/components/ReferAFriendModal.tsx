import React, { useState, useEffect } from 'react';
import {
  X,
  Crown,
  Share2,
  Copy,
  Check,
  Sparkles,
  Send,
  Mail,
  UserPlus,
  Gift,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Edit2
} from 'lucide-react';
import {
  REFERRAL_BASE_URL,
  getLoyaltyProfile,
  getOrCreateReferralCode,
  updateCustomReferralCode,
  recordNewReferral,
  simulateFriendBooking,
  LoyaltyProfile,
  ReferralRecord
} from '../utils/rewardsStorage';

interface ReferAFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPointsAwarded?: (points: number) => void;
}

export const ReferAFriendModal: React.FC<ReferAFriendModalProps> = ({
  isOpen,
  onClose,
  onPointsAwarded
}) => {
  const [profile, setProfile] = useState<LoyaltyProfile>(() => getLoyaltyProfile());
  const [referralCode, setReferralCode] = useState<string>('');
  const [isEditingCode, setIsEditingCode] = useState(false);
  const [editedCode, setEditedCode] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [friendName, setFriendName] = useState('');
  const [friendEmail, setFriendEmail] = useState('');
  const [inviteSentToast, setInviteSentToast] = useState(false);
  const [simulatedCelebration, setSimulatedCelebration] = useState<{ friendName: string; points: number } | null>(null);

  useEffect(() => {
    if (isOpen) {
      const p = getLoyaltyProfile();
      setProfile(p);
      const code = p.referralCode || getOrCreateReferralCode();
      setReferralCode(code);
      setEditedCode(code);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // The base link specified by user: https://aura-x-salon.vercel.app/
  const fullReferralLink = `${REFERRAL_BASE_URL}?ref=${referralCode}`;

  const shareMessage = `Greetings! I invite you to experience AURA & D'OR Haute Coiffure & Spa. Use my exclusive VIP invitation link to receive a complimentary $50 courtesy credit and welcoming elixir on your first salon reservation:\n${fullReferralLink}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullReferralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(shareMessage);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const handleSaveCustomCode = () => {
    if (!editedCode.trim()) return;
    const updated = updateCustomReferralCode(editedCode);
    setReferralCode(updated);
    setIsEditingCode(false);
    setProfile(getLoyaltyProfile());
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendName.trim()) return;

    recordNewReferral(friendName, friendEmail);
    setProfile(getLoyaltyProfile());
    setFriendName('');
    setFriendEmail('');
    setInviteSentToast(true);
    setTimeout(() => setInviteSentToast(false), 3000);
  };

  const handleSimulateBooking = (refId?: string) => {
    const result = simulateFriendBooking(refId);
    setProfile(result.profile);
    setSimulatedCelebration({
      friendName: result.friendName,
      points: result.pointsAwarded
    });
    if (onPointsAwarded) {
      onPointsAwarded(result.pointsAwarded);
    }
    setTimeout(() => {
      setSimulatedCelebration(null);
    }, 4500);
  };

  const completedReferrals = (profile.referrals || []).filter((r) => r.status === 'completed');
  const totalEarnedPoints = completedReferrals.reduce((sum, r) => sum + r.pointsEarned, 0);

  return (
    <div
      id="refer-a-friend-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="refer-a-friend-modal-card"
        className="relative w-full max-w-2xl my-auto rounded-3xl bg-gradient-to-b from-[#18110b]/98 via-[#110c07]/98 to-[#090604]/98 border border-[#c5a059]/60 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl p-6 sm:p-8 text-[#e8ded1] animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close refer a friend modal"
          className="absolute top-5 right-5 p-2 rounded-full text-[#8f806e] hover:text-white hover:bg-[#251a10] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#3b2a16] to-[#170e06] border border-[#ffd700] text-[#ffd700] shadow-[0_0_25px_rgba(212,175,55,0.4)] mb-3">
            <Crown className="w-7 h-7" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#c5a059] font-bold">
              VIP Companion Guild
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Refer a Friend, Earn 500 Crown Points
          </h2>
          <p className="text-xs sm:text-sm text-[#b3a492] font-light max-w-lg mx-auto mt-2 leading-relaxed">
            Invite your discerning circle to AURA & D'OR. When your referred friend books their first salon experience, they receive a <span className="text-[#ffd700] font-medium">$50 Welcome Privilege Courtesy</span>, and you receive <span className="text-[#ffd700] font-semibold">+500 Crown Points</span> automatically.
          </p>
        </div>

        {/* Simulated Instant Credit Alert Banner */}
        {simulatedCelebration && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#2a1c0d] to-[#1e1308] border border-[#ffd700] text-center shadow-[0_0_25px_rgba(212,175,55,0.5)] animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-center gap-2 text-sm font-bold text-[#ffd700]">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>+{simulatedCelebration.points} Crown Points Credited!</span>
            </div>
            <p className="text-xs text-[#e5d8c8] mt-1">
              {simulatedCelebration.friendName} just completed their first atelier booking with your referral link! Your new balance is <strong className="text-white">{profile.points.toLocaleString()} PTS</strong>.
            </p>
          </div>
        )}

        {/* Two Pillars: What You Get vs What Friend Gets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-[#140e08] border border-[#3b2a1a] flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#26190e] border border-[#c5a059]/40 text-[#ffd700] shrink-0">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#a89987] font-semibold block">
                Your Reward
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">
                +500 Crown Points
              </h4>
              <p className="text-[11px] text-[#9c8d7d] mt-1 font-light leading-snug">
                Credited directly to your Sovereign Guild balance for complimentary champagne flights, scalp detoxes, and 24K rituals.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#140e08] border border-[#3b2a1a] flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#26190e] border border-[#c5a059]/40 text-[#dfba73] shrink-0">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#a89987] font-semibold block">
                Your Friend Receives
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">
                $50 First-Visit Privilege
              </h4>
              <p className="text-[11px] text-[#9c8d7d] mt-1 font-light leading-snug">
                Applied automatically to their first salon or spa appointment alongside a VIP Welcome Elixir upon arrival.
              </p>
            </div>
          </div>
        </div>

        {/* Unique Referral Link Generator Section */}
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#1c130b] to-[#130d07] border border-[#c5a059]/50 shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-widest text-[#dfba73] font-bold flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5" />
              <span>Your Unique Referral Link</span>
            </span>

            {/* Customize Code toggle */}
            {!isEditingCode ? (
              <button
                type="button"
                onClick={() => setIsEditingCode(true)}
                className="text-[10px] text-[#c5a059] hover:text-[#ffd700] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Edit2 className="w-3 h-3" />
                <span>Customize Code</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveCustomCode}
                  className="text-[10px] text-emerald-400 font-bold hover:underline cursor-pointer"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingCode(false);
                    setEditedCode(referralCode);
                  }}
                  className="text-[10px] text-[#8f806e] hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Edit code input or display link */}
          {isEditingCode ? (
            <div className="flex items-center gap-2 mb-3">
              <input
                type="text"
                value={editedCode}
                onChange={(e) => setEditedCode(e.target.value.toUpperCase())}
                placeholder="e.g. AURA-VIP-SOLEMAN"
                className="flex-1 px-3 py-2 rounded-xl bg-[#0e0a06] border border-[#c5a059] text-white text-xs font-mono tracking-wider focus:outline-none focus:ring-1 focus:ring-[#ffd700]"
              />
              <button
                type="button"
                onClick={handleSaveCustomCode}
                className="btn-gold-luxury px-3.5 py-2 rounded-xl text-xs font-bold"
              >
                Apply
              </button>
            </div>
          ) : null}

          {/* Readonly Link Box with 1-Click Copy */}
          <div className="flex flex-col sm:flex-row items-stretch gap-2">
            <div className="flex-1 flex items-center px-3.5 py-2.5 rounded-xl bg-[#0b0805] border border-[#332214] font-mono text-xs text-[#dfba73] overflow-x-auto whitespace-nowrap scrollbar-none select-all">
              {fullReferralLink}
            </div>

            <button
              type="button"
              id="copy-referral-link-btn"
              onClick={handleCopyLink}
              className={`px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                copiedLink
                  ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                  : 'btn-gold-luxury text-black shadow-md'
              }`}
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Share Buttons */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-[#261a10]">
            <span className="text-[10px] text-[#8e7f6e] uppercase tracking-wider mr-1">
              Share Via:
            </span>

            {/* WhatsApp Share */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Email Share */}
            <a
              href={`mailto:?subject=${encodeURIComponent("Exclusive VIP Invitation: AURA & D'OR Atelier")}&body=${encodeURIComponent(shareMessage)}`}
              className="px-3 py-1.5 rounded-full bg-[#1e150d] hover:bg-[#2b1e12] border border-[#3f2a1b] text-[#dfba73] text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>

            {/* Copy Full Message */}
            <button
              type="button"
              onClick={handleCopyMessage}
              className="px-3 py-1.5 rounded-full bg-[#19110a] hover:bg-[#25180f] border border-[#3b2819] text-[#cfc1b0] text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedMessage ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedMessage ? 'Message Copied!' : 'Copy Dossier'}</span>
            </button>
          </div>
        </div>

        {/* Record Invite & Referral Tracking History */}
        <div className="space-y-4">
          {/* Quick Direct Invite Form */}
          <form onSubmit={handleSendInvite} className="p-4 rounded-2xl bg-[#120d08] border border-[#241a11]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <UserPlus className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Record a Companion Invite</span>
              </span>
              {inviteSentToast && (
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 animate-in fade-in">
                  <CheckCircle2 className="w-3 h-3" />
                  Invitation logged!
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                placeholder="Friend's Full Name"
                required
                className="px-3 py-2 rounded-xl bg-[#0b0805] border border-[#332316] text-white text-xs placeholder-[#756858] focus:outline-none focus:border-[#c5a059]"
              />
              <input
                type="email"
                value={friendEmail}
                onChange={(e) => setFriendEmail(e.target.value)}
                placeholder="Friend's Email (Optional)"
                className="px-3 py-2 rounded-xl bg-[#0b0805] border border-[#332316] text-white text-xs placeholder-[#756858] focus:outline-none focus:border-[#c5a059]"
              />
              <button
                type="submit"
                className="py-2 px-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#dfba73] hover:from-[#dfba73] hover:to-[#ffd700] text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                <span>Log Invite</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </form>

          {/* Referral History List & Summary */}
          <div className="p-4 rounded-2xl bg-[#0e0a06] border border-[#241a11]">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Referral Activity & Credited Points
                </h4>
                <span className="text-[10px] text-[#8e7e6e]">
                  {completedReferrals.length} friends booked • {totalEarnedPoints.toLocaleString()} PTS accrued
                </span>
              </div>

              {/* Simulation button for demo testing */}
              <button
                type="button"
                id="simulate-friend-booking-btn"
                onClick={() => handleSimulateBooking()}
                title="Test simulation: awards 500 Crown Points immediately"
                className="px-2.5 py-1.5 rounded-lg bg-[#24180d] hover:bg-[#332212] border border-[#c5a059]/50 text-[#ffd700] text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-sm hover:scale-105"
              >
                <Sparkles className="w-3 h-3 text-[#ffd700]" />
                <span>Simulate Friend Booking (+500 PTS)</span>
              </button>
            </div>

            {/* List */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {(profile.referrals && profile.referrals.length > 0) ? (
                profile.referrals.map((ref) => (
                  <div
                    key={ref.id}
                    className="p-2.5 rounded-xl bg-[#140e09] border border-[#261b11] flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        ref.status === 'completed'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-600/40'
                          : 'bg-[#21160c] text-[#a89987] border border-[#3d2a1b]'
                      }`}>
                        {ref.status === 'completed' ? <Check className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      </div>
                      <div className="min-w-0">
                        <span className="font-semibold text-white block truncate">
                          {ref.friendName}
                        </span>
                        <span className="text-[10px] text-[#8f806e]">
                          Invited {ref.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {ref.status === 'completed' ? (
                        <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          +{ref.pointsEarned} PTS Credited
                        </span>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-[#a89987] italic">
                            Pending First Booking
                          </span>
                          <button
                            type="button"
                            onClick={() => handleSimulateBooking(ref.id)}
                            className="text-[9px] text-[#ffd700] hover:underline cursor-pointer"
                          >
                            Mark Booked
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-xs text-[#7d6f5e] italic">
                  No referrals yet. Share your unique link to start earning +500 Crown Points!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer info note */}
        <div className="mt-5 pt-3 border-t border-[#1e150d] flex items-center justify-between text-[10px] text-[#8f806e]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Guaranteed Crown Points Guild Protocol</span>
          </div>
          <span>Valid at Beverly Hills Atelier & Worldwide Suites</span>
        </div>
      </div>
    </div>
  );
};
