import React from 'react';
import { MessageCircle, ShieldCheck, Check, Truck, CreditCard, Sparkles, HelpCircle } from 'lucide-react';
import { WHATSAPP_DISPLAY, createGeneralWhatsAppLink } from '../data/products';

interface HowToOrderViewProps {
  onOpenWhatsAppConcierge: () => void;
  onExploreCatalogue: () => void;
}

export const HowToOrderView: React.FC<HowToOrderViewProps> = ({
  onOpenWhatsAppConcierge,
  onExploreCatalogue,
}) => {
  const faqs = [
    {
      q: 'Why do you take orders via WhatsApp instead of an automated cart?',
      a: 'Nandonik Bazar curates limited-run artisan pieces and small-batch perfumes. WhatsApp allows our concierge to confirm batch freshness, share real unboxing photographs, coordinate delivery timing with your schedule, and provide bespoke gifting touches.',
    },
    {
      q: 'What payment methods are supported?',
      a: 'We operate exclusively with 100% Cash on Delivery (COD) across all 64 districts in Bangladesh. You pay only after receiving and inspecting your sealed signature package at your doorstep. Advance prepayments (bKash/Nagad) are cancelled for your complete peace of mind.',
    },
    {
      q: 'How fast is delivery within Bangladesh?',
      a: 'Orders inside Dhaka metropolitan area are delivered within 24 to 48 hours via private courier. Deliveries to Chittagong, Sylhet, Rajshahi, and other divisions arrive within 48 to 72 hours with insured tracking.',
    },
    {
      q: 'Are all products authentic and locally inspected?',
      a: '100% authentic. Every perfume flacon, ceramic piece, and silk scarf is personally inspected, batch-certified, and hand-packaged at our Gulshan atelier.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCE7EB]/70 border border-[#F4C2CE]/60 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9A3C53] mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9A3C53]" />
          Concierge Protocol
        </span>
        <h1
          className="text-3xl sm:text-5xl text-[#1B1B20] font-normal tracking-tight mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Effortless Ordering via WhatsApp
        </h1>
        <p className="text-xs sm:text-sm text-[#877275] font-light leading-relaxed">
          No signups, complex passwords, or checkout obstacles. Enjoy high-touch personal luxury directly on your phone.
        </p>
      </div>

      {/* 3 Step Deep Dive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white/80 border border-[#F4C2CE]/60 shadow-xs">
          <div className="w-10 h-10 rounded-full bg-[#FCE7EB] text-[#9A3C53] font-serif font-bold text-sm flex items-center justify-center mb-4">
            01
          </div>
          <h3
            className="text-lg font-normal text-[#1B1B20] mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Select Your Object
          </h3>
          <p className="text-xs text-[#554245] font-light leading-relaxed mb-4">
            Explore our artisanal lookbook. When you find a piece you love, click "Order on WhatsApp" on any card or product page.
          </p>
          <span className="text-[11px] font-medium text-[#9A3C53]">
            Automatic SKU & Price Pre-fill
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white/80 border border-[#F4C2CE]/60 shadow-xs">
          <div className="w-10 h-10 rounded-full bg-[#9A3C53] text-white font-serif font-bold text-sm flex items-center justify-center mb-4">
            02
          </div>
          <h3
            className="text-lg font-normal text-[#1B1B20] mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Connect with Concierge
          </h3>
          <p className="text-xs text-[#554245] font-light leading-relaxed mb-4">
            WhatsApp opens instantly with your request pre-formatted. A dedicated concierge verifies stock availability and answers any scent or sizing queries.
          </p>
          <span className="text-[11px] font-medium text-[#9A3C53]">
            Average Response: ~4 Minutes
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white/80 border border-[#F4C2CE]/60 shadow-xs">
          <div className="w-10 h-10 rounded-full bg-[#FCE7EB] text-[#9A3C53] font-serif font-bold text-sm flex items-center justify-center mb-4">
            03
          </div>
          <h3
            className="text-lg font-normal text-[#1B1B20] mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Doorstep Delivery
          </h3>
          <p className="text-xs text-[#554245] font-light leading-relaxed mb-4">
            We confirm your preferred delivery address and dispatch your order in signature kraft & ribbon boxing. Pay cash strictly via COD upon doorstep arrival.
          </p>
          <span className="text-[11px] font-medium text-[#9A3C53]">
            Insured Nationwide Tracking
          </span>
        </div>
      </div>

      {/* Payment & Logistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-[#FDF2F4]/80 border border-[#F4C2CE]/60 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#9A3C53]">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#1B1B20]">Verified Payment Policy</h4>
              <span className="text-[11px] text-[#877275]">100% Cash on Delivery (COD)</span>
            </div>
          </div>
          <ul className="space-y-2 text-xs text-[#554245]">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#9A3C53]" />
              <span><strong>Cash on Delivery (COD) — Active Default:</strong> Inspect the sealed package before paying the courier. Zero prepayment risk.</span>
            </li>
            <li className="flex items-center gap-2 text-gray-400">
              <span className="w-4 h-4 flex items-center justify-center text-xs">✕</span>
              <span className="line-through"><strong>bKash Pre-payment:</strong> Cancelled in favor of 100% Doorstep COD.</span>
            </li>
            <li className="flex items-center gap-2 text-gray-400">
              <span className="w-4 h-4 flex items-center justify-center text-xs">✕</span>
              <span className="line-through"><strong>Nagad / Online:</strong> Cancelled in favor of 100% Doorstep COD.</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-[#FDF2F4]/80 border border-[#F4C2CE]/60 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#9A3C53]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#1B1B20]">Delivery Timeframes</h4>
              <span className="text-[11px] text-[#877275]">Carefully insulated packaging</span>
            </div>
          </div>
          <ul className="space-y-2 text-xs text-[#554245]">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#9A3C53]" />
              <span><strong>Inside Dhaka:</strong> 24–48 hours (Flat delivery rate ৳ 80).</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#9A3C53]" />
              <span><strong>Outside Dhaka / Nationwide:</strong> 48–72 hours (Standard rate ৳ 140).</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#9A3C53]" />
              <span><strong>Fragile Protection:</strong> Double-walled corrugated boxing with shock absorption.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#9A3C53]" />
          <h3
            className="text-2xl text-[#1B1B20] font-normal"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Concierge FAQ
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white border border-[#F4C2CE]/50">
              <h4 className="text-xs font-semibold text-[#1B1B20] mb-2">{faq.q}</h4>
              <p className="text-xs text-[#877275] font-light leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final Action CTA */}
      <div className="p-8 rounded-3xl bg-white border border-[#F4C2CE]/60 text-center space-y-4 shadow-sm">
        <h3
          className="text-2xl text-[#1B1B20] font-normal"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Ready to discover your next signature piece?
        </h3>
        <p className="text-xs text-[#877275] max-w-md mx-auto">
          Our Dhaka concierge desk is active and welcoming your inquiries on WhatsApp right now.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onExploreCatalogue}
            className="px-6 py-3 rounded-full bg-[#9A3C53] hover:bg-[#832E43] text-white text-xs font-semibold transition-all cursor-pointer"
          >
            Explore Catalogue
          </button>
          <button
            onClick={onOpenWhatsAppConcierge}
            className="px-6 py-3 rounded-full bg-[#FCE7EB] hover:bg-[#FCE7EB]/80 text-[#9A3C53] text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open WhatsApp Desk</span>
          </button>
        </div>
      </div>
    </div>
  );
};
