import React from 'react';
import { Product } from '../types';
import { ArrowDown, MessageCircle, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  heroProduct: Product;
  onExploreClick: () => void;
  onProductClick: (product: Product) => void;
  onOrderWhatsApp: (product: Product) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroProduct,
  onExploreClick,
  onProductClick,
  onOrderWhatsApp,
}) => {
  return (
    <section className="relative pt-4 pb-10 md:pt-10 md:pb-20 max-w-7xl mx-auto px-3 sm:px-6">
      {/* Ambient background glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-72 bg-gradient-to-r from-[#FCE7EB]/50 via-[#FDF2F4]/60 to-[#FCE7EB]/40 blur-3xl pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Editorial Content */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-4 sm:space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-[#FCE7EB]/90 border border-[#F4C2CE]/70 text-[10px] sm:text-[11px] font-semibold tracking-wider sm:tracking-[0.18em] uppercase text-[#9A3C53]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9A3C53] animate-pulse" />
            <span className="hidden sm:inline">Curated Artisanal Goods • Direct WhatsApp Concierge</span>
            <span className="sm:hidden">Artisanal Goods • WhatsApp Concierge</span>
          </div>

          {/* Headline with serif and italic */}
          <h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.14] sm:leading-[1.12] text-[#1B1B20] font-normal tracking-[-0.02em]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Beautiful products, <br />
            <span className="italic font-light text-[#9A3C53]">simply discovered.</span>
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-base md:text-lg text-[#554245] max-w-xl leading-relaxed font-light">
            Explore our curated lifestyle collection and order directly through WhatsApp with
            personal concierge service. No tedious checkout forms—just effortless bespoke shopping.
          </p>

          {/* CTA Buttons */}
          <div className="grid grid-cols-2 sm:flex items-center gap-2.5 sm:gap-3.5 pt-1 w-full sm:w-auto">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-[#9A3C53] hover:bg-[#832E43] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-[0_4px_14px_rgba(154,60,83,0.25)] hover:shadow-[0_6px_20px_rgba(154,60,83,0.35)] transition-all active:scale-98 cursor-pointer"
            >
              <span>Explore Shop</span>
              <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <button
              onClick={() => onOrderWhatsApp(heroProduct)}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3.5 rounded-full bg-white/90 hover:bg-[#FCE7EB]/80 border border-[#F4C2CE] text-[#9A3C53] text-xs sm:text-sm font-semibold tracking-wide shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#9A3C53]" />
              <span className="truncate">WhatsApp Order</span>
            </button>
          </div>

          {/* Value Props Row */}
          <div className="pt-3 sm:pt-4 grid grid-cols-3 sm:flex sm:flex-wrap items-center gap-2 sm:gap-6 text-[10px] sm:text-xs text-[#554245] border-t border-[#F4C2CE]/40 w-full text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#9A3C53] shrink-0" />
              <span>100% Authentic</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9A3C53] shrink-0" />
              <span>WhatsApp Order</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9A3C53] shrink-0" />
              <span>Fast Delivery BD</span>
            </div>
          </div>
        </div>

        {/* Right Hero Visual Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            onClick={() => onProductClick(heroProduct)}
            className="group relative w-full max-w-md bg-white/85 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-[#F4C2CE]/70 shadow-[0_15px_40px_rgba(196,93,116,0.12)] transition-all duration-300 hover:shadow-[0_24px_60px_rgba(196,93,116,0.18)] hover:-translate-y-1 cursor-pointer"
          >
            {/* Soft decorative tag */}
            <div className="absolute top-5 left-5 sm:top-7 sm:left-7 z-10">
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#F4C2CE]/60 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-[#9A3C53] shadow-xs">
                Featured Essence
              </span>
            </div>

            {/* Product Image Frame */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FBF8FF] mb-4">
              <img
                src={heroProduct.image}
                alt={heroProduct.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Product Details Bar */}
            <div className="px-2 pb-1 flex items-end justify-between">
              <div>
                <h3
                  className="text-lg font-normal text-[#1B1B20] tracking-tight group-hover:text-[#9A3C53] transition-colors"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {heroProduct.name}
                </h3>
                <p className="text-xs text-[#877275] font-light mt-0.5">
                  {heroProduct.subtitle}
                </p>
              </div>

              <div className="text-right flex flex-col items-end">
                <span className="text-base font-semibold text-[#1B1B20]">
                  ৳ {heroProduct.price.toLocaleString()}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[#9A3C53] group-hover:translate-x-0.5 transition-transform mt-0.5">
                  Direct Inquire <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
