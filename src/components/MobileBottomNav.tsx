import React from 'react';
import { Home, ShoppingBag, LayoutGrid, MessageCircle, User, ShieldCheck } from 'lucide-react';
import { ActiveScreen } from '../types';
import { AuthUserProfile } from '../services/authService';

interface MobileBottomNavProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  onOpenWhatsAppConcierge: () => void;
  currentUser: AuthUserProfile | null;
  isAdmin: boolean;
  onOpenLogin: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeScreen,
  onNavigate,
  onOpenWhatsAppConcierge,
  currentUser,
  isAdmin,
  onOpenLogin,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#F4C2CE]/70 shadow-[0_-8px_25px_rgba(154,60,83,0.08)] px-2 py-1.5 transition-all">
      <div className="max-w-md mx-auto grid grid-cols-5 items-center">
        {/* 1. Home */}
        <button
          type="button"
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
            activeScreen === 'home'
              ? 'text-[#9A3C53] font-semibold scale-105'
              : 'text-[#877275] hover:text-[#1B1B20]'
          }`}
          aria-label="Home"
        >
          <div className={`p-1 rounded-full ${activeScreen === 'home' ? 'bg-[#FCE7EB]' : ''}`}>
            <Home className="w-4 h-4" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Home</span>
        </button>

        {/* 2. Catalog / Products */}
        <button
          type="button"
          onClick={() => {
            onNavigate('products');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
            activeScreen === 'products'
              ? 'text-[#9A3C53] font-semibold scale-105'
              : 'text-[#877275] hover:text-[#1B1B20]'
          }`}
          aria-label="Shop Catalog"
        >
          <div className={`p-1 rounded-full ${activeScreen === 'products' ? 'bg-[#FCE7EB]' : ''}`}>
            <ShoppingBag className="w-4 h-4" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Shop</span>
        </button>

        {/* 3. Central WhatsApp Concierge Action */}
        <button
          type="button"
          onClick={onOpenWhatsAppConcierge}
          className="flex flex-col items-center justify-center -mt-3.5 group cursor-pointer"
          aria-label="WhatsApp Concierge"
        >
          <div className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-[#9A3C53] to-[#C45D74] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(154,60,83,0.35)] group-active:scale-95 transition-transform border-2 border-white">
            <MessageCircle className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
          </div>
          <span className="text-[10px] font-semibold text-[#9A3C53] mt-0.5 tracking-tight">
            Order
          </span>
        </button>

        {/* 4. Categories */}
        <button
          type="button"
          onClick={() => {
            onNavigate('categories');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
            activeScreen === 'categories'
              ? 'text-[#9A3C53] font-semibold scale-105'
              : 'text-[#877275] hover:text-[#1B1B20]'
          }`}
          aria-label="Categories"
        >
          <div className={`p-1 rounded-full ${activeScreen === 'categories' ? 'bg-[#FCE7EB]' : ''}`}>
            <LayoutGrid className="w-4 h-4" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Curations</span>
        </button>

        {/* 5. Account or Admin */}
        {isAdmin ? (
          <button
            type="button"
            onClick={() => {
              onNavigate('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
              activeScreen === 'admin'
                ? 'text-[#9A3C53] font-semibold scale-105'
                : 'text-[#877275] hover:text-[#1B1B20]'
            }`}
            aria-label="Admin Console"
          >
            <div className={`p-1 rounded-full ${activeScreen === 'admin' ? 'bg-[#FCE7EB]' : ''}`}>
              <ShieldCheck className="w-4 h-4 text-[#9A3C53]" />
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight text-[#9A3C53] font-semibold">Admin</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              if (currentUser) {
                // If logged in, navigate to how-to-order or toggle menu
                onNavigate('how-to-order');
              } else {
                onOpenLogin();
              }
            }}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
              activeScreen === 'how-to-order'
                ? 'text-[#9A3C53] font-semibold scale-105'
                : 'text-[#877275] hover:text-[#1B1B20]'
            }`}
            aria-label={currentUser ? 'Account' : 'Login'}
          >
            <div className={`p-1 rounded-full ${activeScreen === 'how-to-order' ? 'bg-[#FCE7EB]' : ''}`}>
              {currentUser ? (
                <div className="w-4 h-4 rounded-full bg-[#9A3C53] text-white flex items-center justify-center text-[9px] font-bold">
                  {currentUser.email?.charAt(0).toUpperCase()}
                </div>
              ) : (
                <User className="w-4 h-4" />
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">
              {currentUser ? 'Guide' : 'Login'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
