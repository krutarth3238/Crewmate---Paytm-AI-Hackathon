import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { TeammateProfile, AutonomyLevelId } from '../types';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  User, 
  Briefcase, 
  Sliders, 
  Cpu,
  Clock,
  Zap,
  Shield,
  Layers
} from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  teammate: TeammateProfile;
  onSaveTeammate: (updated: Partial<TeammateProfile>) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  teammate,
  onSaveTeammate,
}) => {
  const [step, setStep] = useState<number>(1);
  const [businessType, setBusinessType] = useState("Meera's Artisan Bakery (Fresh Baked Goods & Cafe)");
  const [timeDrain, setTimeDrain] = useState('Late supplier deliveries & ruined morning prep');
  const [firstPriority, setFirstPriority] = useState('Alert me when supplier ingredient van is delayed past 6:00 AM');
  const [name, setName] = useState(teammate.name || 'Ren');
  const [visualMark, setVisualMark] = useState(teammate.visualMark || '⚡');
  const [initialLevel, setInitialLevel] = useState<AutonomyLevelId>(1); // Shadow mode default!

  if (!isOpen) return null;

  const readinessPercent = step * 25;

  const handleFinish = () => {
    onSaveTeammate({
      name: name.trim() || 'Ren',
      avatarSeed: name.trim().slice(0, 2).toUpperCase() || 'RN',
      visualMark,
      businessType,
      currentLevel: initialLevel,
      currentXp: initialLevel === 1 ? 14 : 78,
      nextLevelXp: initialLevel === 1 ? 25 : 110,
    });

    try {
      confetti({
        particleCount: 80,
        spread: 75,
        origin: { y: 0.5 },
        colors: ['#1842FF', '#D8F040', '#38BDF8', '#00C853']
      });
    } catch {
      // ignore
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080A0F]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0D111C] border border-[#1E2B48] shadow-[0_0_50px_rgba(24,66,255,0.25)] rounded-2xl w-full max-w-xl overflow-hidden relative text-white">
        
        {/* Modal Header */}
        <div className="bg-[#080A0F] border-b border-[#182030] p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D8F040] animate-pulse" />
            <span className="font-mono text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
              CHAPTER 2 & 3 · HIRE YOUR AI TEAMMATE
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-[#141B2D] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Readiness Meter */}
        <div className="bg-[#0B0E17] border-b border-[#182030] p-3 px-6">
          <div className="flex justify-between items-center font-mono text-xs mb-1.5">
            <span className="text-neutral-400">
              {readinessPercent === 100 ? 'Teammate Activated!' : `Teammate Readiness: ${readinessPercent}%`}
            </span>
            <span className="font-bold text-[#D8F040]">
              STEP {step} OF 4
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#141B2D] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#1842FF] via-[#38BDF8] to-[#D8F040] transition-all duration-300"
              style={{ width: `${readinessPercent}%` }}
            />
          </div>
        </div>

        {/* Step Body */}
        <div className="p-6 sm:p-8">
          
          {/* Question 1: What is your business? */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#38BDF8] uppercase">
                <span>01 // BUSINESS CONTEXT</span>
              </div>
              <div>
                <h3 className="font-bricolage font-bold text-2xl text-white">
                  What kind of business do you run?
                </h3>
                <p className="text-sm text-neutral-300 mt-1">
                  Ren tunes its observations and checks to your real daily workflows — no complex API keys required.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 pt-1">
                {[
                  "Meera's Artisan Bakery (Fresh Baked Goods & Cafe)",
                  'Retail & Local Distribution (SMB / Shop)',
                  'Direct-to-Consumer (D2C) E-Commerce Store',
                  'Independent Service / Agency'
                ].map((bType) => (
                  <button
                    key={bType}
                    onClick={() => setBusinessType(bType)}
                    className={`text-left p-3.5 rounded-xl border text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                      businessType === bType
                        ? 'border-[#1842FF] bg-[#141B2D] text-white shadow-[0_0_15px_rgba(24,66,255,0.3)]'
                        : 'border-[#1E2B48] bg-[#0B0E16] text-neutral-300 hover:bg-[#101626]'
                    }`}
                  >
                    <span>{bType}</span>
                    {businessType === bType && (
                      <span className="w-2 h-2 rounded-full bg-[#D8F040]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 2: What's eating your time? */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#38BDF8] uppercase">
                <span>02 // OPERATIONAL FRICTION</span>
              </div>
              <div>
                <h3 className="font-bricolage font-bold text-2xl text-white">
                  What's eating most of your time?
                </h3>
                <p className="text-sm text-neutral-300 mt-1">
                  Select the recurring operational headache you wish someone reliable would watch for you.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 pt-1">
                {[
                  'Late supplier deliveries & ruined morning prep',
                  'Reconciling card payments & chasing invoice discrepancies',
                  'Checking inventory buffers before morning rush',
                  'Repetitive customer inquiries about order status and delivery delays'
                ].map((drain) => (
                  <button
                    key={drain}
                    onClick={() => setTimeDrain(drain)}
                    className={`text-left p-3.5 rounded-xl border text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                      timeDrain === drain
                        ? 'border-[#1842FF] bg-[#141B2D] text-white shadow-[0_0_15px_rgba(24,66,255,0.3)]'
                        : 'border-[#1E2B48] bg-[#0B0E16] text-neutral-300 hover:bg-[#101626]'
                    }`}
                  >
                    <span>{drain}</span>
                    {timeDrain === drain && (
                      <span className="w-2 h-2 rounded-full bg-[#D8F040]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 3: What do you want handled first? */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#38BDF8] uppercase">
                <span>03 // FIRST ASSIGNMENT</span>
              </div>
              <div>
                <h3 className="font-bricolage font-bold text-2xl text-white">
                  What would you want handled first?
                </h3>
                <p className="text-sm text-neutral-300 mt-1">
                  Your teammate starts in Shadow mode: it observes and suggests, but cannot touch customers or money without you.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 pt-1">
                {[
                  'Alert me when supplier ingredient van is delayed past 6:00 AM',
                  'Auto-balance POS settlements against bank ledger ($0.00 variance)',
                  'Draft empathetic replies for delayed orders (needs my tap to send)',
                  'Flag quiet price hikes on supplier invoices before payment'
                ].map((priority) => (
                  <button
                    key={priority}
                    onClick={() => setFirstPriority(priority)}
                    className={`text-left p-3.5 rounded-xl border text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                      firstPriority === priority
                        ? 'border-[#1842FF] bg-[#141B2D] text-white shadow-[0_0_15px_rgba(24,66,255,0.3)]'
                        : 'border-[#1E2B48] bg-[#0B0E16] text-neutral-300 hover:bg-[#101626]'
                    }`}
                  >
                    <span>{priority}</span>
                    {firstPriority === priority && (
                      <span className="w-2 h-2 rounded-full bg-[#D8F040]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 4: Give it a name & mark (Chapter 3 + 4: Feature H + B) */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#38BDF8] uppercase">
                <span>04 // IDENTITY & CLEARANCE</span>
              </div>
              <div>
                <h3 className="font-bricolage font-bold text-2xl text-white">
                  Give your teammate a name.
                </h3>
                <p className="text-sm text-neutral-300 mt-1">
                  From now on, every notification says "<strong className="text-[#D8F040]">{name || 'Ren'} flagged something</strong>", not "System alert". You have a teammate, not a tool.
                </p>
              </div>

              <div className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Teammate Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ren"
                    className="w-full bg-[#080A0F] border border-[#1E2B48] focus:border-[#1842FF] focus:outline-none rounded-xl px-4 py-3 text-white font-bricolage font-bold text-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Pick a Visual Mark
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { mark: '⚡', label: 'Volt' },
                      { mark: '◈', label: 'Diamond' },
                      { mark: '⬡', label: 'Hex' },
                      { mark: 'RN', label: 'Monogram' },
                      { mark: '✦', label: 'Spark' }
                    ].map((item) => (
                      <button
                        key={item.mark}
                        type="button"
                        onClick={() => setVisualMark(item.mark)}
                        className={`p-3 rounded-xl border text-center font-mono font-bold transition-all cursor-pointer ${
                          visualMark === item.mark
                            ? 'border-[#D8F040] bg-[#141B2D] text-[#D8F040] shadow-[0_0_15px_rgba(216,240,64,0.3)]'
                            : 'border-[#1E2B48] bg-[#080A0F] text-neutral-400 hover:text-white'
                        }`}
                      >
                        <div className="text-lg">{item.mark}</div>
                        <div className="text-[10px] text-neutral-400">{item.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Starting Level Callout (Chapter 4) */}
                <div className="p-3.5 bg-[#080A0F] border border-[#1E2B48] rounded-xl flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
                  <div className="text-xs text-neutral-300">
                    <strong className="text-white">Starts at Level 1 — Shadow Mode.</strong>
                    <div className="text-neutral-400 mt-0.5">
                      Zero mutation access. It observes orders and flags findings, but cannot send an email or touch customer money. Unlocks Assistant after 14 verified tasks.
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="bg-[#080A0F] border-t border-[#182030] p-4 sm:p-5 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-xs font-mono font-bold text-neutral-400 hover:text-white uppercase transition-colors cursor-pointer"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 bg-[#1842FF] hover:bg-[#2855FF] text-white font-semibold text-xs rounded-xl shadow-[0_0_20px_rgba(24,66,255,0.4)] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Next Question</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-6 py-2.5 bg-[#D8F040] hover:bg-[#cbf026] text-[#080A0F] font-bold text-xs rounded-xl shadow-[0_0_25px_rgba(216,240,64,0.35)] transition-all flex items-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <Sparkles className="w-4 h-4 text-[#080A0F]" />
              <span>Activate {name || 'Ren'} & Enter Console</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
