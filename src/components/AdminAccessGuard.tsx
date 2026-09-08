import React from 'react';
import { ShieldAlert, LogIn, ArrowLeft, Lock } from 'lucide-react';
import { ADMIN_EMAIL, AuthUserProfile } from '../services/authService';

interface AdminAccessGuardProps {
  currentUser: AuthUserProfile | null;
  onOpenLogin: () => void;
  onReturnToStore: () => void;
}

export const AdminAccessGuard: React.FC<AdminAccessGuardProps> = ({
  currentUser,
  onOpenLogin,
  onReturnToStore,
}) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-[#F4C2CE]/60 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-3xl bg-[#FCE7EB] text-[#9A3C53] flex items-center justify-center mx-auto mb-5 border border-[#F4C2CE]">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FAF6F0] border border-[#F4C2CE]/60 text-[10px] font-bold text-[#9A3C53] uppercase tracking-wider mb-2">
          <Lock className="w-3 h-3" />
          Restricted Zone
        </span>

        <h2
          className="text-2xl text-[#1B1B20] font-normal mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          অ্যাডমিন অ্যাক্সেস সংরক্ষিত
        </h2>

        <p className="text-xs text-[#554245] leading-relaxed mb-6 font-light">
          এই অ্যাডমিন প্যানেলটি শুধুমাত্র অনুমোদিত অ্যাডমিন{' '}
          <strong className="font-semibold text-[#9A3C53] font-mono">{ADMIN_EMAIL}</strong>-এর জন্য
          নির্ধারিত। অন্য কোনো ব্যবহারকারী এই প্যানেল পরিচালনা করতে পারবেন না।
        </p>

        {currentUser ? (
          <div className="mb-6 p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-left text-xs">
            <span className="block font-semibold text-amber-900 text-[11px]">বর্তমান অ্যাকাউন্ট:</span>
            <span className="font-mono text-amber-800 text-[11px] break-all">{currentUser.email}</span>
            <p className="text-[10px] text-amber-700 mt-1">
              এই অ্যাকাউন্টটির অ্যাডমিন সুবিধা নেই। অ্যাডমিন প্যানেলে ঢুকতে হলে দয়া করে লগআউট করে{' '}
              <span className="font-bold">{ADMIN_EMAIL}</span> দিয়ে সাইন ইন করুন।
            </p>
          </div>
        ) : (
          <div className="mb-6 p-3 rounded-2xl bg-[#FBF8FF] border border-[#F4C2CE]/60 text-xs text-[#877275]">
            বর্তমানে আপনি কোনো অ্যাকাউন্টে সাইন ইন করেননি।
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onReturnToStore}
            className="flex-1 py-2.5 px-4 rounded-full bg-white hover:bg-stone-50 border border-[#F4C2CE] text-[#554245] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Storefront-এ ফিরুন</span>
          </button>

          <button
            type="button"
            onClick={onOpenLogin}
            className="flex-1 py-2.5 px-4 rounded-full bg-[#9A3C53] hover:bg-[#832E43] text-white font-semibold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>অ্যাডমিন লগইন</span>
          </button>
        </div>
      </div>
    </div>
  );
};
