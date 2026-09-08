import React, { useState, useRef, useEffect } from 'react';
import { NandonikLogo } from './NandonikLogo';
import { ActiveScreen } from '../types';
import { Search, MessageCircle, User, Menu, X, LogIn, LogOut, ShieldCheck, ChevronDown } from 'lucide-react';
import { WHATSAPP_DISPLAY } from '../data/products';
import { AuthUserProfile } from '../services/authService';

interface NavbarProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  onOpenWhatsAppConcierge: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currentUser: AuthUserProfile | null;
  isAdmin: boolean;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeScreen,
  onNavigate,
  onOpenWhatsAppConcierge,
  searchQuery,
  onSearchChange,
  currentUser,
  isAdmin,
  onOpenLogin,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Show "Admin Panel" in navigation links ONLY if user is logged in as mehdihimel@yahoo.com
  const navItems: { label: string; screen: ActiveScreen }[] = [
    { label: 'Home', screen: 'home' },
    { label: 'Products', screen: 'products' },
    { label: 'Categories', screen: 'categories' },
    { label: 'How to Order', screen: 'how-to-order' },
    ...(isAdmin ? [{ label: 'Admin Panel', screen: 'admin' as ActiveScreen }] : []),
  ];

  return (
    <header className="sticky top-3 z-40 px-3 sm:px-6 max-w-7xl mx-auto w-full transition-all duration-300">
      <nav className="glass-surface-elevated rounded-full px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F4C2CE]/60">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => {
            onNavigate('home');
            setMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="focus:outline-none transition-all duration-200 hover:opacity-90 active:scale-95 flex items-center cursor-pointer group"
          title="Nandonik Bazar - Return to Home"
          aria-label="Nandonik Bazar - Return to Home"
        >
          <NandonikLogo size="sm" />
        </button>

        {/* Desktop Navigation Links (Admin Panel is completely hidden unless mehdihimel@yahoo.com) */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeScreen === item.screen;
            return (
              <button
                key={item.screen}
                onClick={() => onNavigate(item.screen)}
                className={`px-3.5 py-1.5 rounded-full text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#FCE7EB] text-[#9A3C53] font-semibold shadow-xs'
                    : 'text-[#554245] hover:text-[#1B1B20] hover:bg-white/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center relative flex-1 max-w-[180px] xl:max-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3.5 text-[#877275] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => {
              if (activeScreen === 'home') {
                onNavigate('products');
              }
            }}
            placeholder="Search catalog..."
            className="w-full bg-white/70 hover:bg-white focus:bg-white border border-[#F4C2CE]/50 focus:border-[#9A3C53]/50 rounded-full pl-9 pr-4 py-1.5 text-xs text-[#1B1B20] placeholder-[#877275] outline-none transition-all"
          />
        </div>

        {/* Right Actions: Direct WhatsApp, Search Trigger & User Login/Logout */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mobile Search Button */}
          <button
            type="button"
            onClick={() => {
              if (activeScreen !== 'products') {
                onNavigate('products');
              }
              setMobileMenuOpen(true);
            }}
            className="md:hidden p-2 rounded-full text-[#554245] hover:text-[#1B1B20] hover:bg-white/80 transition-colors cursor-pointer"
            aria-label="Search"
            title="Search catalog"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Direct WhatsApp Concierge Button */}
          <button
            onClick={onOpenWhatsAppConcierge}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 rounded-full bg-white/85 hover:bg-[#FCE7EB]/80 border border-[#F4C2CE] text-[#9A3C53] text-[11px] sm:text-xs font-semibold shadow-xs transition-all hover:scale-[1.02] cursor-pointer"
            title={`Direct Concierge: ${WHATSAPP_DISPLAY}`}
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#9A3C53]" />
            <span className="hidden sm:inline">Direct WhatsApp</span>
            <span className="sm:hidden font-medium">Concierge</span>
          </button>

          {/* User Profile / Login / Logout Flow (Desktop & Tablet) */}
          {currentUser ? (
            <div className="relative hidden sm:block" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/90 hover:bg-[#FCE7EB]/60 border border-[#F4C2CE] text-[#1B1B20] text-xs transition-all cursor-pointer shadow-xs"
                title={currentUser.email || 'User Profile'}
              >
                <div className="w-6 h-6 rounded-full bg-[#9A3C53] text-white flex items-center justify-center font-bold text-[11px]">
                  {currentUser.email ? currentUser.email.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="hidden md:inline max-w-[90px] truncate text-[11px] font-medium text-[#554245]">
                  {currentUser.email?.split('@')[0]}
                </span>
                {isAdmin && (
                  <span className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded-md bg-[#FCE7EB] text-[#9A3C53] text-[9px] font-bold">
                    Admin
                  </span>
                )}
                <ChevronDown className="w-3 h-3 text-[#877275]" />
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl p-2 shadow-xl border border-[#F4C2CE]/60 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-[#F4C2CE]/40">
                    <span className="text-[10px] text-[#877275] block uppercase font-semibold">Signed in as</span>
                    <span className="text-xs font-medium text-[#1B1B20] truncate block font-mono">
                      {currentUser.email}
                    </span>
                    {isAdmin && (
                      <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <ShieldCheck className="w-3 h-3" />
                        Authorized Admin
                      </span>
                    )}
                  </div>

                  <div className="py-1 space-y-1">
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onNavigate('admin');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#9A3C53] font-semibold hover:bg-[#FCE7EB]/60 rounded-xl transition-colors text-left cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Open Admin Panel</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenLogin}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#9A3C53] hover:bg-[#832E43] text-white text-xs font-semibold shadow-xs transition-all hover:scale-[1.02] cursor-pointer"
              title="Login to Nandonik Bazar"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#554245] hover:text-[#1B1B20] rounded-full hover:bg-white/80 active:scale-95 transition-all"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Full Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 bg-white/98 backdrop-blur-2xl rounded-3xl border border-[#F4C2CE]/70 shadow-[0_20px_40px_rgba(154,60,83,0.14)] flex flex-col gap-3 animate-in fade-in slide-in-from-top-3 duration-200">
          {/* Search box inside mobile menu */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#877275]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search catalog, perfumes, ceramics..."
              className="w-full bg-[#FBF8FF] border border-[#F4C2CE]/60 focus:border-[#9A3C53] rounded-full pl-10 pr-4 py-2.5 text-xs text-[#1B1B20] placeholder-[#877275] outline-none transition-all"
            />
          </div>

          {/* Nav links */}
          <div className="grid grid-cols-2 gap-2 py-1">
            {navItems.map((item) => {
              const isActive = activeScreen === item.screen;
              return (
                <button
                  key={item.screen}
                  onClick={() => {
                    onNavigate(item.screen);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-[#FCE7EB] text-[#9A3C53] font-bold shadow-2xs border border-[#F4C2CE]'
                      : 'bg-[#FBF8FF]/70 text-[#554245] hover:bg-white border border-[#F4C2CE]/30'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.screen === 'admin' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9A3C53]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Direct WhatsApp Concierge Quick Card */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-[#FCE7EB]/60 to-[#FDF2F4] border border-[#F4C2CE]/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#9A3C53] text-white flex items-center justify-center shrink-0 shadow-xs">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#1B1B20]">Concierge Hotline</p>
                <p className="text-[10px] text-[#877275]">{WHATSAPP_DISPLAY}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWhatsAppConcierge();
              }}
              className="px-3 py-1.5 rounded-full bg-[#9A3C53] text-white text-[11px] font-semibold hover:bg-[#832E43] transition-colors cursor-pointer shadow-2xs"
            >
              Order Now
            </button>
          </div>

          {/* Mobile User Authentication section */}
          <div className="pt-2 border-t border-[#F4C2CE]/40 flex items-center justify-between">
            {currentUser ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#9A3C53] text-white flex items-center justify-center font-bold text-xs">
                    {currentUser.email?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#1B1B20] block leading-tight truncate max-w-[150px]">
                      {currentUser.email}
                    </span>
                    {isAdmin && (
                      <span className="text-[10px] font-bold text-emerald-700">
                        Authorized Admin
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="px-3 py-1.5 text-xs text-red-600 bg-red-50 hover:bg-red-100 rounded-full font-medium transition-colors cursor-pointer flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-[#877275] font-light">
                  Sign in for orders & admin desk
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="px-4 py-1.5 rounded-full bg-[#9A3C53] text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login / Register</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
