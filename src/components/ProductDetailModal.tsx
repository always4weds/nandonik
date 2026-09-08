import React, { useState } from 'react';
import { Product } from '../types';
import {
  X,
  Star,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Clock,
  ShieldCheck,
  CreditCard,
  Maximize2,
  Flower2,
  Share2,
} from 'lucide-react';
import { createWhatsAppOrderLink, createGeneralWhatsAppLink } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  allProducts: Product[];
  onClose: () => void;
  onSelectProduct: (p: Product) => void;
  onOrderWhatsApp: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  allProducts,
  onClose,
  onSelectProduct,
  onOrderWhatsApp,
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'evolution' | 'shipping'>('specs');
  const [isZoomed, setIsZoomed] = useState(false);

  const images = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image];

  const companions = allProducts.filter(
    (p) => product.companionIds?.includes(p.id) || (p.id !== product.id && p.category === product.category)
  ).slice(0, 2);

  const prefilledQuery = `Hello Nandonik Bazar, I'd like to order ${product.name} (৳ ${product.price.toLocaleString()})`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden bg-black/45 backdrop-blur-xs">
      <div className="relative w-full max-w-5xl bg-white/95 backdrop-blur-2xl rounded-t-3xl sm:rounded-3xl border border-[#F4C2CE]/60 shadow-[0_25px_70px_rgba(154,60,83,0.18)] overflow-hidden max-h-[94vh] sm:max-h-[92vh] flex flex-col">
        {/* Mobile Pull Indicator */}
        <div className="sm:hidden w-12 h-1 bg-[#F4C2CE] rounded-full mx-auto mt-2" />

        {/* Top Floating Control Bar */}
        <div className="sticky top-0 z-20 px-4 sm:px-6 py-3 sm:py-3.5 bg-white/90 backdrop-blur-md border-b border-[#F4C2CE]/30 flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-[#877275]">
            <button
              type="button"
              onClick={onClose}
              className="hover:text-[#9A3C53] transition-colors cursor-pointer font-medium"
              title="Return to Home"
            >
              Home
            </button>
            <span>›</span>
            <span className="capitalize">{product.category}</span>
            <span>›</span>
            <span className="font-medium text-[#1B1B20] truncate max-w-[120px] sm:max-w-[200px]">
              {product.name}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#9A3C53] bg-[#FCE7EB]/60 px-3 py-1 rounded-full border border-[#F4C2CE]/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9A3C53] animate-pulse" />
              Direct Concierge Active
            </span>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#FCE7EB]/60 hover:bg-[#FCE7EB] text-[#554245] hover:text-[#1B1B20] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Product View"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-10">
          {/* Main 2-Column Product Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Gallery & Olfactory Architecture */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FBF8FF] border border-[#F4C2CE]/40">
                <img
                  src={images[activeImageIndex] || product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover object-center transition-transform duration-500 ${
                    isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />

                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs border border-[#F4C2CE]/60 text-[10px] font-semibold uppercase tracking-wider text-[#9A3C53]">
                  Pure Parfumerie
                </span>

                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-[#F4C2CE]/60 text-xs font-medium text-[#554245] flex items-center gap-1.5 hover:bg-white transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Enlarge View</span>
                </button>
              </div>

              {/* Thumbnails Row */}
              {images.length > 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#9A3C53] ring-2 ring-[#FCE7EB]'
                          : 'border-[#F4C2CE]/40 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-semibold uppercase tracking-wider text-white bg-black/60 px-2 py-0.5 rounded-xs">
                        {idx === 0 ? 'Flacon' : idx === 1 ? 'Extract' : 'Adornment'}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Olfactory Architecture Card */}
              {product.olfactoryArchitecture && (
                <div className="p-4 rounded-2xl bg-[#FDF2F4]/70 border border-[#F4C2CE]/50 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#9A3C53] shrink-0 border border-[#F4C2CE]/40">
                    <Flower2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#877275] block">
                      Olfactory Architecture
                    </span>
                    <h4 className="text-sm font-semibold text-[#1B1B20] mb-2">
                      {product.olfactoryArchitecture.family}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {product.olfactoryArchitecture.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-full bg-white/90 border border-[#F4C2CE]/60 text-[10px] text-[#554245] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Title, Price, Description, Harmonic Notes, CTA */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9A3C53]">
                    Nandonik Botanicals
                  </span>
                  {product.batchNumber && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FCE7EB] border border-[#F4C2CE] text-[10px] font-semibold text-[#9A3C53]">
                      {product.batchNumber}
                    </span>
                  )}
                </div>

                <h2
                  className="text-2xl sm:text-3xl text-[#1B1B20] font-normal tracking-tight mb-1"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {product.name}
                </h2>

                <p className="text-xs text-[#877275] font-light mb-3">
                  {product.subtitle}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#F4C2CE]/30">
                  <div className="flex items-center text-[#9A3C53]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#9A3C53]" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#1B1B20]">{product.rating}</span>
                  <span className="text-xs text-[#877275]">
                    • {product.reviewCount} verified notes via WhatsApp concierge
                  </span>
                </div>

                {/* Price block */}
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-2xl sm:text-3xl font-bold text-[#1B1B20]">
                    ৳ {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#877275] line-through font-light">
                      ৳ {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="px-2 py-0.5 rounded-full bg-[#FCE7EB] text-[#9A3C53] text-[11px] font-bold">
                      Save ৳ {(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  )}
                </div>

                {/* In Stock Indicator */}
                <div className="flex items-center gap-2 text-xs text-[#554245] mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#9A3C53] animate-pulse" />
                  <span className="font-medium">
                    In Stock — Only {product.stockCount} flacons remaining from {product.batchNumber || 'this batch'}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#554245] font-light leading-relaxed mb-5">
                  {product.description}
                </p>

                {/* Harmonic Notes (if available) */}
                {product.harmonicNotes && (
                  <div className="p-3.5 rounded-2xl bg-white border border-[#F4C2CE]/50 mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#877275] block mb-2">
                      Harmonic Notes
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs text-[#554245]">
                      {product.harmonicNotes.top && (
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-[#9A3C53]" />
                          <span>Top: {product.harmonicNotes.top}</span>
                        </div>
                      )}
                      {product.harmonicNotes.heart && (
                        <div className="flex items-center gap-1.5">
                          <Flower2 className="w-3 h-3 text-[#9A3C53]" />
                          <span>Heart: {product.harmonicNotes.heart}</span>
                        </div>
                      )}
                      {product.harmonicNotes.base1 && (
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-[#9A3C53]" />
                          <span>Base: {product.harmonicNotes.base1}</span>
                        </div>
                      )}
                      {product.harmonicNotes.base2 && (
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-[#9A3C53]" />
                          <span>Base: {product.harmonicNotes.base2}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Order on WhatsApp CTA & Pre-fill Note */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => onOrderWhatsApp(product)}
                  className="w-full py-3.5 px-6 rounded-full bg-[#9A3C53] hover:bg-[#832E43] text-white text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(154,60,83,0.25)] hover:shadow-[0_6px_22px_rgba(154,60,83,0.35)] transition-all hover:scale-[1.01] cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="p-3 rounded-xl bg-[#FDF2F4]/80 border border-[#F4C2CE]/50 text-center">
                  <span className="text-[11px] text-[#877275] block">
                    <span className="font-semibold text-[#9A3C53]">Pre-filled query: </span>
                    "{prefilledQuery}"
                  </span>
                </div>

                {/* 3 Trust Assurances */}
                <div className="space-y-1.5 pt-2 text-xs text-[#554245]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#9A3C53]" />
                    <span>Immediate WhatsApp response (Usually within 10 mins)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#9A3C53]" />
                    <span>Verified insured delivery nationwide across Bangladesh</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-3.5 h-3.5 text-[#9A3C53]" />
                    <span>Default Payment: 100% Cash on Delivery (COD) upon doorstep inspection</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabbed Specifications & Craftsmanship */}
          <div className="pt-6 border-t border-[#F4C2CE]/40">
            {/* Tabs Bar */}
            <div className="flex items-center gap-2 mb-6 border-b border-[#F4C2CE]/30 pb-3">
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeTab === 'specs'
                    ? 'bg-[#FCE7EB] text-[#9A3C53]'
                    : 'text-[#554245] hover:bg-white'
                }`}
              >
                Product Specifications
              </button>
              <button
                onClick={() => setActiveTab('evolution')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeTab === 'evolution'
                    ? 'bg-[#FCE7EB] text-[#9A3C53]'
                    : 'text-[#554245] hover:bg-white'
                }`}
              >
                Scent Evolution & Notes
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeTab === 'shipping'
                    ? 'bg-[#FCE7EB] text-[#9A3C53]'
                    : 'text-[#554245] hover:bg-white'
                }`}
              >
                Delivery, COD & Returns
              </button>
            </div>

            {/* Tab 1: Specs & Craftsmanship */}
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-7 space-y-4">
                  <h4
                    className="text-xl text-[#1B1B20] font-normal"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    The Craftsmanship
                  </h4>
                  <p className="text-xs sm:text-sm text-[#554245] font-light leading-relaxed">
                    Every bottle of {product.name} is formulated in micro-batches of under fifty flacons.
                    Sourced from sustainable botanical farms and artisan workshops, our curations undergo
                    slow meticulous aging to preserve fragile aromatic and natural compounds.
                  </p>

                  {/* 4 Spec Boxes */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-white border border-[#F4C2CE]/50">
                      <span className="text-[10px] uppercase font-bold text-[#877275] tracking-wider block">
                        Volume / Size
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-[#1B1B20]">
                        {product.specifications.volumeOrSize}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-[#F4C2CE]/50">
                      <span className="text-[10px] uppercase font-bold text-[#877275] tracking-wider block">
                        Concentration / Material
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-[#1B1B20]">
                        {product.specifications.concentrationOrMaterial}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-[#F4C2CE]/50">
                      <span className="text-[10px] uppercase font-bold text-[#877275] tracking-wider block">
                        Longevity / Care
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-[#1B1B20]">
                        {product.specifications.longevityOrCare}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-[#F4C2CE]/50">
                      <span className="text-[10px] uppercase font-bold text-[#877275] tracking-wider block">
                        Provenance
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-[#1B1B20]">
                        {product.specifications.provenance}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 space-y-4">
                  {/* Scenting / Care Ritual Card */}
                  {product.scentingRitual && (
                    <div className="p-4 rounded-2xl bg-[#FDF2F4]/80 border border-[#F4C2CE]/50">
                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9A3C53] block mb-1">
                        Artisan Ritual
                      </span>
                      <p className="text-xs text-[#554245] font-light leading-relaxed">
                        {product.scentingRitual}
                      </p>
                    </div>
                  )}

                  {product.packagingNote && (
                    <div className="p-3.5 rounded-xl bg-white/80 border border-[#F4C2CE]/40 flex items-center gap-2 text-xs text-[#554245]">
                      <Sparkles className="w-4 h-4 text-[#9A3C53] shrink-0" />
                      <span>{product.packagingNote}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Evolution */}
            {activeTab === 'evolution' && (
              <div className="space-y-4 max-w-2xl text-xs sm:text-sm text-[#554245] font-light leading-relaxed">
                <p>
                  <strong>Initial Opening (0–30 mins):</strong> Crisp top notes disperse with luminous energy, introducing the signature silhouette of the creation.
                </p>
                <p>
                  <strong>Heart Cadence (1–4 hours):</strong> Warm balsamic florals and nuanced botanicals meld with body temperature, developing intimate personal projection.
                </p>
                <p>
                  <strong>Dry Down (4–12+ hours):</strong> Deep aged woods, ambers, and clean musks settle close to the skin, creating an unforgettable quiet signature.
                </p>
              </div>
            )}

            {/* Tab 3: Shipping */}
            {activeTab === 'shipping' && (
              <div className="space-y-3 max-w-2xl text-xs sm:text-sm text-[#554245] font-light leading-relaxed">
                <p>
                  <strong>Dhaka Metropolitan Delivery:</strong> Dispatched via private courier within 24 to 48 hours. Insured handling guaranteed.
                </p>
                <p>
                  <strong>Chittagong, Sylhet & Nationwide:</strong> 48 to 72 hours via express registered courier services.
                </p>
                <p>
                  <strong>Payment Method:</strong> 100% Cash on Delivery (COD) across all 64 districts. You only pay after inspecting the parcel at your doorstep (other prepayment channels currently cancelled for buyer safety).
                </p>
              </div>
            )}
          </div>

          {/* Harmonious Pairings / Curated Companions */}
          {companions.length > 0 && (
            <div className="pt-6 border-t border-[#F4C2CE]/40">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9A3C53] block">
                    Harmonious Pairings
                  </span>
                  <h4
                    className="text-xl text-[#1B1B20] font-normal"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Curated Companions
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {companions.map((comp) => (
                  <div
                    key={comp.id}
                    className="p-3 rounded-2xl bg-white border border-[#F4C2CE]/50 flex items-center justify-between gap-4"
                  >
                    <div
                      onClick={() => onSelectProduct(comp)}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <img
                        src={comp.image}
                        alt={comp.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div>
                        <span className="text-[9px] uppercase font-bold text-[#877275]">
                          {comp.department}
                        </span>
                        <h5 className="text-xs font-semibold text-[#1B1B20] hover:text-[#9A3C53] line-clamp-1">
                          {comp.name}
                        </h5>
                        <span className="text-xs font-bold text-[#1B1B20]">
                          ৳ {comp.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onOrderWhatsApp(comp)}
                      className="px-3.5 py-1.5 rounded-full bg-[#FCE7EB] hover:bg-[#9A3C53] text-[#9A3C53] hover:text-white text-xs font-semibold transition-colors shrink-0 cursor-pointer"
                    >
                      Inquire
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Personal Fragrance Consultation Banner */}
          <div className="p-6 rounded-3xl bg-[#FDF2F4] border border-[#F4C2CE]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9A3C53] block mb-1">
                Personal Fragrance Consultation
              </span>
              <h4
                className="text-lg text-[#1B1B20] font-normal mb-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Uncertain if {product.name} is your signature?
              </h4>
              <p className="text-xs text-[#877275] font-light max-w-lg">
                Share your favorite scent notes or memory preferences with our Dhaka perfumery desk. We will guide your curation directly over WhatsApp.
              </p>
            </div>

            <a
              href={createGeneralWhatsAppLink(`Hello Nandonik Scent Stylist, I need advice on choosing between ${product.name} and other curations.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#9A3C53] hover:bg-[#832E43] text-white text-xs font-semibold tracking-wide shadow-xs shrink-0"
            >
              Speak with Scent Stylist
            </a>
          </div>
        </div>

        {/* Sticky Bottom Action Bar for Mobile Phones */}
        <div className="sm:hidden sticky bottom-0 left-0 right-0 px-4 py-2.5 bg-white/95 backdrop-blur-xl border-t border-[#F4C2CE]/70 flex items-center justify-between gap-3 shadow-[0_-6px_20px_rgba(0,0,0,0.06)] z-30">
          <div>
            <span className="text-[9px] text-[#877275] block uppercase font-medium">Bespoke Price</span>
            <span className="text-base font-bold text-[#1B1B20]">
              ৳ {product.price.toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => onOrderWhatsApp(product)}
            className="flex-1 max-w-[200px] py-2.5 px-4 rounded-full bg-[#9A3C53] active:bg-[#832E43] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-[0_4px_14px_rgba(154,60,83,0.3)] transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Order on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
