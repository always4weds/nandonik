import React from 'react';
import { Search, MessageCircle, ShieldCheck, Headphones, Zap, Banknote, Check } from 'lucide-react';

interface HowToOrderSectionProps {
  onOpenCatalogue: () => void;
  onOpenWhatsAppConcierge: () => void;
}

export const HowToOrderSection: React.FC<HowToOrderSectionProps> = ({
  onOpenCatalogue,
  onOpenWhatsAppConcierge,
}) => {
  const steps = [
    {
      num: '01',
      title: 'Discover & Select',
      description:
        'Browse our curated seasonal boutique and select any handcrafted piece or fragrance you adore.',
      tag: 'Refined Lookbook',
      icon: <Search className="w-3.5 h-3.5" />,
      onClick: onOpenCatalogue,
    },
    {
      num: '02',
      title: 'Tap Order on WhatsApp',
      description:
        'A single tap instantly opens WhatsApp with the product name, SKU reference, and price already pre-filled.',
      tag: 'Pre-formatted Link',
      icon: <MessageCircle className="w-3.5 h-3.5" />,
      onClick: onOpenWhatsAppConcierge,
    },
    {
      num: '03',
      title: 'Confirm with Concierge',
      description:
        'Our personal concierge confirms your delivery address, shares real-time tracking, and packages your order.',
      tag: 'Swift Doorstep Delivery',
      icon: <Check className="w-3.5 h-3.5" />,
      onClick: onOpenWhatsAppConcierge,
    },
  ];

  const features = [
    {
      title: 'Curated Craftsmanship',
      subtitle: 'Rare batches & authentic origins',
      icon: <ShieldCheck className="w-5 h-5 text-[#9A3C53]" />,
    },
    {
      title: 'Direct Human Support',
      subtitle: 'Real concierge on WhatsApp',
      icon: <Headphones className="w-5 h-5 text-[#9A3C53]" />,
    },
    {
      title: 'Express Delivery in BD',
      subtitle: '24–48 hrs inside Dhaka',
      icon: <Zap className="w-5 h-5 text-[#9A3C53]" />,
    },
    {
      title: 'Cash on Delivery',
      subtitle: 'Pay upon inspect & receive',
      icon: <Banknote className="w-5 h-5 text-[#9A3C53]" />,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9A3C53] block mb-2">
          Effortless Shopping
        </span>
        <h2
          className="text-3xl sm:text-4xl text-[#1B1B20] font-normal tracking-tight mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          How to Order in 3 Simple Steps
        </h2>
        <p className="text-xs sm:text-sm text-[#877275] font-light leading-relaxed">
          No complex carts, account logins, or tedious forms. Experience concierge retail via WhatsApp.
        </p>
      </div>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {steps.map((step) => (
          <div
            key={step.num}
            onClick={step.onClick}
            className="group bg-white/70 hover:bg-white backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-[#F4C2CE]/50 hover:border-[#9A3C53]/40 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div>
              {/* Step number badge */}
              <div className="w-10 h-10 rounded-full bg-[#FCE7EB] text-[#9A3C53] font-serif font-bold text-sm flex items-center justify-center mb-5 group-hover:bg-[#9A3C53] group-hover:text-white transition-colors">
                {step.num}
              </div>

              <h3
                className="text-lg font-normal text-[#1B1B20] mb-2 group-hover:text-[#9A3C53] transition-colors"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {step.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#877275] font-light leading-relaxed mb-6">
                {step.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#F4C2CE]/30 flex items-center gap-1.5 text-xs font-medium text-[#554245] group-hover:text-[#9A3C53] transition-colors">
              {step.icon}
              <span>{step.tag}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 4 Feature Badges Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-[#F4C2CE]/50">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-3.5 p-2">
            <div className="w-11 h-11 rounded-xl bg-[#FCE7EB]/80 border border-[#F4C2CE]/60 flex items-center justify-center shrink-0">
              {feature.icon}
            </div>
            <div>
              <h4 className="text-xs font-semibold text-[#1B1B20] tracking-tight">
                {feature.title}
              </h4>
              <p className="text-[11px] text-[#877275] font-light mt-0.5">
                {feature.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
