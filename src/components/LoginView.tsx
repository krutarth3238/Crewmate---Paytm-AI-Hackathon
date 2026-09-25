import React, { useState } from 'react';
import { 
  ShieldCheck, 
  KeyRound, 
  ArrowRight, 
  Building2, 
  Lock, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles,
  ArrowLeft,
  UserCheck
} from 'lucide-react';
import { CrewmateLogo, CrewmateMark } from './CrewmateLogo';

interface LoginViewProps {
  onLoginSuccess: (workspaceName: string, founderName: string) => void;
  onBackToLanding: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  onBackToLanding,
}) => {
  const [workspace, setWorkspace] = useState("Meera's Artisan Bakery (SMB)");
  const [founderName, setFounderName] = useState('Meera Patel');
  const [sessionKey, setSessionKey] = useState('CRM-AUTH-REN-STRICT');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStep, setAuthStep] = useState<string>('');

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsAuthenticating(true);
    setAuthStep('Validating ECDSA cryptographic token...');

    setTimeout(() => {
      setAuthStep('Checking fail-closed invariant boundaries...');
    }, 600);

    setTimeout(() => {
      setAuthStep('Establishing air-gapped ledger connection...');
    }, 1200);

    setTimeout(() => {
      setIsAuthenticating(false);
      onLoginSuccess(workspace, founderName || 'Founder');
    }, 1800);
  };

  const handleQuickDemo = () => {
    setWorkspace("Meera's Artisan Bakery (SMB)");
    setFounderName('Meera Patel');
    setSessionKey('CRM-AUTH-REN-STRICT');
    handleLogin();
  };

  return (
    <div className="min-h-screen bg-[#080A0F] text-white flex flex-col justify-between selection:bg-[#D8F040] selection:text-[#080A0F]">
      
      {/* 0. Top Hackathon Banner */}
      <div className="bg-[#0B0F19] border-b border-[#182030] px-4 py-2 text-xs font-mono text-neutral-300 flex items-center justify-center gap-2 flex-wrap text-center">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#141B2D] border border-[#1E2B48] text-[#D8F040] font-bold text-[11px] uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C853] animate-pulse" />
          Paytm AI Hackathon
        </span>
        <span className="text-neutral-500 hidden sm:inline">·</span>
        <span className="text-neutral-300">
          Made by <strong className="text-white font-semibold">Krutarth Ashar</strong> and <strong className="text-white font-semibold">Raghav Arora</strong> for the <strong className="text-[#38BDF8] font-semibold">Paytm AI Hackathon</strong>
        </span>
      </div>

      {/* Top Bar */}
      <header className="border-b border-[#182030] bg-[#0B0E17]/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={onBackToLanding}
            className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-400 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform text-[#38BDF8]" />
            <span>RETURN TO PUBLIC STORY</span>
          </button>

          <div className="flex items-center gap-2">
            <CrewmateMark size={22} variant="color" />
            <span className="font-bricolage font-bold text-sm text-white tracking-tight">
              CREWMATE KERNEL ACCESS
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse" />
            <span>AIR-GAPPED SECURITY LEVEL 4</span>
          </div>
        </div>
      </header>

      {/* Main Login Window */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-xl bg-[#0D111C] border border-[#1E2B48] shadow-[0_0_50px_rgba(24,66,255,0.2)] rounded-2xl p-8 sm:p-10 relative">
          
          {/* Accent Ribbon */}
          <div className="absolute -top-3.5 left-8 px-3 py-1 bg-[#1842FF] text-white font-mono text-xs font-bold uppercase tracking-wider rounded border border-[#38BDF8]/40 shadow-md">
            AUTHENTICATION GATEWAY · STRICT MODE
          </div>

          {/* Heading */}
          <div className="mb-8 mt-4 space-y-4">
            <div className="border-b border-[#182030] pb-5">
              <CrewmateLogo size="lg" variant="white" withTagline={true} />
            </div>
            <div>
              <h1 className="font-bricolage text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1.5">
                Sign In to Workspace
              </h1>
              <p className="text-neutral-300 text-sm leading-relaxed">
                Connect to your autonomous operations console. All operational mutations require cryptographic founder authorization.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Workspace Select */}
            <div>
              <label className="block font-mono text-xs font-bold uppercase text-[#38BDF8] mb-2 flex items-center justify-between">
                <span>Select Operational Business Domain:</span>
                <Building2 className="w-3.5 h-3.5 text-neutral-400" />
              </label>
              <select
                value={workspace}
                onChange={(e) => setWorkspace(e.target.value)}
                disabled={isAuthenticating}
                className="w-full bg-[#080A0F] border border-[#1E2B48] rounded-xl p-3 font-mono text-xs font-bold text-white focus:outline-none focus:border-[#1842FF] cursor-pointer"
              >
                <option value="Meera's Artisan Bakery (SMB)">
                  Meera's Artisan Bakery · Fresh Baked Goods & Cafe (SMB)
                </option>
                <option value="Apex Hypercommerce (D2C Retail)">
                  Apex Hypercommerce Ltd · D2C Retail & Distribution
                </option>
                <option value="Pulse Supply Chain & Freight">
                  Pulse Logistics · Inventory, Warehousing & Fleet
                </option>
                <option value="Matrix Cloud Technologies (B2B SaaS)">
                  Matrix Cloud · Enterprise B2B SaaS Subscriptions
                </option>
              </select>
            </div>

            {/* Founder Identity */}
            <div>
              <label className="block font-mono text-xs font-bold uppercase text-[#38BDF8] mb-2">
                Executive / Founder Name:
              </label>
              <input
                type="text"
                value={founderName}
                onChange={(e) => setFounderName(e.target.value)}
                placeholder="e.g. Meera Patel"
                disabled={isAuthenticating}
                className="w-full bg-[#080A0F] border border-[#1E2B48] rounded-xl p-3 font-mono text-xs text-white focus:outline-none focus:border-[#1842FF]"
                required
              />
            </div>

            {/* Session Token */}
            <div>
              <label className="block font-mono text-xs font-bold uppercase text-[#38BDF8] mb-2 flex items-center justify-between">
                <span>Cryptographic Session Token:</span>
                <span className="text-[10px] text-[#00C853] font-bold">SHA-256 ARMED</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={sessionKey}
                  onChange={(e) => setSessionKey(e.target.value)}
                  disabled={isAuthenticating}
                  className="w-full bg-[#080A0F] border border-[#1E2B48] rounded-xl p-3 font-mono text-xs text-white focus:outline-none focus:border-[#1842FF]"
                  required
                />
                <KeyRound className="w-4 h-4 text-neutral-400 absolute right-3 top-3.5" />
              </div>
            </div>

            {/* Invariant Note */}
            <div className="p-3.5 bg-[#080A0F] border border-[#182236] rounded-xl font-mono text-xs text-neutral-300 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="text-white">Strict Invariant Rule:</strong> Autonomous teammate clearance levels are enforced at runtime. Unapproved mutations trigger fail-closed quarantine.
              </div>
            </div>

            {/* Authentication Progress Feedback */}
            {isAuthenticating && (
              <div className="p-3 bg-[#141B2D] border border-[#1842FF] text-white font-mono text-xs rounded-xl flex items-center gap-3 animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D8F040] animate-ping" />
                <span>{authStep}</span>
              </div>
            )}

            {/* Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full py-3.5 bg-[#1842FF] hover:bg-[#2855FF] disabled:opacity-50 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(24,66,255,0.4)] flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
              >
                <span>{isAuthenticating ? 'Authorizing Cryptographic Channel...' : 'Enter Autonomous Console'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleQuickDemo}
                disabled={isAuthenticating}
                className="w-full py-3 bg-[#D8F040] hover:bg-[#cbf026] text-[#080A0F] font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(216,240,64,0.35)] flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#080A0F]" />
                <span>Instant 1-Click Founder Demo Access</span>
              </button>
            </div>

          </form>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#182030] bg-[#080A0F] px-6 py-4 text-center font-mono text-xs text-neutral-400 space-y-1">
        <div>
          Made by <strong className="text-neutral-200">Krutarth Ashar</strong> and <strong className="text-neutral-200">Raghav Arora</strong> for the <strong className="text-[#38BDF8]">Paytm AI Hackathon</strong>
        </div>
        <div className="text-[11px] text-neutral-500">
          CREWMATE RUNTIME · DETERMINISTIC AGENTIC CO-FOUNDER · AIR-GAPPED &amp; BOUNDED
        </div>
      </footer>

    </div>
  );
};
