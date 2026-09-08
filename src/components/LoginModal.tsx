import React, { useState } from 'react';
import { X, Lock, Mail, Eye, EyeOff, CheckCircle2, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import { loginWithEmail, registerWithEmail, ADMIN_EMAIL, AuthUserProfile } from '../services/authService';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUserProfile) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    try {
      let user: AuthUserProfile;
      if (isSignUp) {
        user = await registerWithEmail(email, password);
        setSuccessMsg('Account created successfully!');
      } else {
        user = await loginWithEmail(email, password);
        setSuccessMsg('Logged in successfully!');
      }

      setTimeout(() => {
        onLoginSuccess(user);
        onClose();
      }, 500);
    } catch (err: any) {
      console.error('Authentication error:', err);
      if (err.code === 'auth/wrong-password') {
        setErrorMsg('Incorrect password. Please try again.');
      } else if (err.code === 'auth/email-already-in-use') {
        setErrorMsg('This email is already registered. Please sign in instead.');
      } else if (err.code === 'auth/invalid-email') {
        setErrorMsg('Please enter a valid email format.');
      } else {
        setErrorMsg(err.message || 'Login failed. Please check your credentials.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAdminSelect = () => {
    setEmail(ADMIN_EMAIL);
    setPassword('admin123456');
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#F4C2CE]/60 relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 p-1.5 rounded-full text-[#877275] hover:text-[#1B1B20] hover:bg-[#FCE7EB]/50 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#FCE7EB] text-[#9A3C53] flex items-center justify-center mx-auto mb-3 border border-[#F4C2CE]">
            <Lock className="w-6 h-6" />
          </div>
          <h3
            className="text-2xl text-[#1B1B20] font-normal"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {isSignUp ? 'Create Account' : 'Welcome to Nandonik'}
          </h3>
          <p className="text-xs text-[#877275] font-light mt-1">
            {isSignUp
              ? 'Register with your email to access curations and orders'
              : 'Sign in to access your profile and personalized concierge'}
          </p>
        </div>

        {/* Quick Admin Credential Helper Chip */}
        <div className="mb-5 p-3 rounded-2xl bg-[#FAF6F0] border border-[#F4C2CE]/60 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#9A3C53] shrink-0" />
            <div className="text-[11px] text-[#554245]">
              <span className="font-semibold block text-[#1B1B20]">Authorized Admin Access</span>
              <span className="font-mono text-[10px] text-[#9A3C53]">{ADMIN_EMAIL}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleQuickAdminSelect}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#FCE7EB] text-[#9A3C53] text-[10px] font-bold border border-[#F4C2CE] transition-colors cursor-pointer shrink-0"
          >
            Auto-fill
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Email input */}
          <div>
            <label className="block font-semibold text-[#1B1B20] mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#877275]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-white border border-[#F4C2CE]/70 rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1B1B20] outline-none focus:border-[#9A3C53]"
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <label className="block font-semibold text-[#1B1B20] mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#877275]" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-[#F4C2CE]/70 rounded-xl pl-9 pr-9 py-2.5 text-xs text-[#1B1B20] outline-none focus:border-[#9A3C53]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#877275] hover:text-[#1B1B20]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <span className="text-[10px] text-[#877275] mt-1 block">Minimum 6 characters</span>
          </div>

          {/* Error / Success Feedback */}
          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[11px] leading-snug">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-full bg-[#9A3C53] hover:bg-[#832E43] text-white font-semibold text-xs transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : isSignUp ? (
              <span>Create Account</span>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        {/* Toggle Sign Up / Sign In */}
        <div className="mt-5 text-center text-xs text-[#554245]">
          {isSignUp ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false);
                  setErrorMsg(null);
                }}
                className="text-[#9A3C53] font-semibold hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true);
                  setErrorMsg(null);
                }}
                className="text-[#9A3C53] font-semibold hover:underline cursor-pointer"
              >
                Sign Up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
