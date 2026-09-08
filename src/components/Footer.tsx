import React from 'react';
import { NandonikLogo } from './NandonikLogo';
import { MessageCircle, Phone, MapPin } from 'lucide-react';
import { WHATSAPP_DISPLAY } from '../data/products';
import { ActiveScreen } from '../types';
import { AuthUserProfile } from '../services/authService';

interface FooterProps {
  onNavigate: (screen: ActiveScreen) => void;
  onOpenWhatsAppConcierge: () => void;
  isAdmin: boolean;
  currentUser: AuthUserProfile | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenWhatsAppConcierge,
  isAdmin,
  currentUser,
  onOpenLogin,
  onLogout,
}) => {
  return (
    <footer className="mt-20 border-t border-[#F4C2CE]/40 bg-[#FBF8FF]/90 backdrop-blur-md pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 pb-14 border-b border-[#F4C2CE]/30">
          {/* Brand Col */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left focus:outline-none transition-all duration-200 hover:opacity-90 active:scale-95 cursor-pointer block group"
              title="Nandonik Bazar - Return to Home"
              aria-label="Nandonik Bazar - Return to Home"
            >
              <NandonikLogo size="md" />
            </button>
            <p className="text-xs sm:text-sm text-[#554245] font-light max-w-md leading-relaxed">
              Curated luxury essentials. Order seamlessly with direct WhatsApp concierge.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCE7EB]/60 border border-[#F4C2CE]/60 text-[11px] font-semibold text-[#9A3C53]">
              <span className="w-2 h-2 rounded-full bg-[#9A3C53] animate-ping" />
              Bespoke Concierge Open
            </div>
          </div>

          {/* Concierge Desk Col */}
          <div className="md:justify-self-end">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1B1B20] mb-4">
              Concierge Desk
            </h4>
            <div className="space-y-2 text-xs text-[#554245]">
              <p className="flex items-start gap-1.5 font-light">
                <MapPin className="w-3.5 h-3.5 text-[#9A3C53] shrink-0 mt-0.5" />
                <span>Rayerbag, Dhaka, Bangladesh</span>
              </p>
              <p className="flex items-center gap-1.5 font-medium text-[#1B1B20]">
                <Phone className="w-3.5 h-3.5 text-[#9A3C53] shrink-0" />
                <span>{WHATSAPP_DISPLAY}</span>
              </p>
              <button
                onClick={onOpenWhatsAppConcierge}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9A3C53] hover:underline pt-1 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Message WhatsApp Desk</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#877275] font-light">
          <p>© 2024 Nandonik Bazar. Poetic luxury curation. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#1B1B20] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#1B1B20] cursor-pointer">Terms of Bespoke Retail</span>
            <span className="hover:text-[#1B1B20] cursor-pointer">Concierge Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
