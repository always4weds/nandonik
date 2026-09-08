import React, { useState, useMemo } from 'react';
import { Product, CategoryId } from '../types';
import { Search, MessageCircle, ChevronDown, Sparkles, Gem } from 'lucide-react';
import { createGeneralWhatsAppLink } from '../data/products';

interface AllCurationsViewProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onOrderWhatsApp: (product: Product) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const AllCurationsView: React.FC<AllCurationsViewProps> = ({
  products,
  onProductClick,
  onOrderWhatsApp,
  searchQuery,
  onSearchChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filterTabs: { id: CategoryId; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: 48 },
    { id: 'fragrance', label: 'Fragrance', count: 12 },
    { id: 'skincare', label: 'Skincare', count: 14 },
    { id: 'ceramics', label: 'Ceramics & Home', count: 10 },
    { id: 'jewelry', label: 'Jewelry', count: 12 },
  ];

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCE7EB]/70 border border-[#F4C2CE]/60 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9A3C53] mb-2 sm:mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9A3C53]" />
          Curated Atelier Collection
        </span>

        <h1
          className="text-2xl sm:text-5xl text-[#1B1B20] font-normal tracking-tight mb-2 sm:mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          All Curations
        </h1>

        <p className="text-xs sm:text-sm text-[#877275] font-light leading-relaxed">
          Explore timeless lifestyle essentials curated for elevated living, artisanal rarity, and quiet poise.
        </p>
      </div>

      {/* Main Search Bar */}
      <div className="max-w-3xl mx-auto relative mb-4 sm:mb-6">
        <Search className="w-4 h-4 absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-[#877275]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search luxury perfumes, ceramics, jewelry, skincare..."
          className="w-full bg-white/80 hover:bg-white focus:bg-white border border-[#F4C2CE]/60 focus:border-[#9A3C53] rounded-full pl-10 sm:pl-11 pr-4 sm:pr-5 py-2.5 sm:py-3 text-xs sm:text-sm text-[#1B1B20] placeholder-[#877275] outline-none shadow-xs transition-all"
        />
      </div>

      {/* Filter Tabs & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 pb-3 sm:pb-4 border-b border-[#F4C2CE]/30">
        {/* Category Pills: mobile edge-to-edge scroll */}
        <div className="-mx-3 sm:mx-0 px-3 sm:px-0 flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`whitespace-nowrap shrink-0 px-3 sm:px-4 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#FCE7EB] border border-[#9A3C53] text-[#9A3C53] font-semibold'
                    : 'bg-white/70 hover:bg-white border border-[#F4C2CE]/40 text-[#554245]'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            );
          })}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 text-xs text-[#554245] self-end sm:self-auto">
          <span className="uppercase tracking-wider font-semibold text-[10px] text-[#877275]">
            Sort:
          </span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-white/80 border border-[#F4C2CE]/60 rounded-full pl-3 pr-7 py-1.5 text-xs text-[#1B1B20] font-medium outline-none cursor-pointer hover:border-[#9A3C53]"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ChevronDown className="w-3 h-3 text-[#877275] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Meta indicator row */}
      <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#877275] mb-4 sm:mb-6">
        <span className="font-medium tracking-wide">
          {filteredProducts.length} Objects Found
        </span>
        <span className="inline-flex items-center gap-1 font-medium text-[#9A3C53]">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Instant WhatsApp Reservation Enabled</span>
          <span className="sm:hidden">WhatsApp Order</span>
        </span>
      </div>

      {/* Products Grid: 2 columns on mobile, 4 columns on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 mb-12 sm:mb-16">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white/75 hover:bg-white backdrop-blur-md rounded-xl sm:rounded-2xl p-2 sm:p-3.5 border border-[#F4C2CE]/50 hover:border-[#9A3C53]/40 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Product Image Frame */}
              <div
                onClick={() => onProductClick(product)}
                className="relative aspect-square w-full rounded-lg sm:rounded-xl overflow-hidden bg-[#FBF8FF] cursor-pointer mb-2 sm:mb-3.5"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {product.badge && (
                  <span className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 px-1.5 sm:px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs border border-[#F4C2CE]/60 text-[#554245] text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider shadow-xs">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="px-0.5 sm:px-1">
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.16em] text-[#877275] uppercase block mb-0.5 sm:mb-1">
                  {product.department}
                </span>

                <h3
                  onClick={() => onProductClick(product)}
                  className="text-xs sm:text-base font-normal text-[#1B1B20] hover:text-[#9A3C53] transition-colors cursor-pointer line-clamp-1"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {product.name}
                </h3>

                {/* Price formatted with BDT */}
                <div className="mt-0.5 sm:mt-1 mb-2 sm:mb-3">
                  <span className="text-xs sm:text-sm font-bold text-[#1B1B20]">
                    ৳ {product.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions: Order on WhatsApp & View Details */}
            <div className="pt-1.5 sm:pt-2 border-t border-[#F4C2CE]/30 flex flex-col gap-1 sm:gap-1.5 px-0.5 sm:px-1">
              <button
                onClick={() => onOrderWhatsApp(product)}
                className="w-full py-1.5 sm:py-2 px-2 sm:px-3 rounded-full bg-[#FCE7EB]/70 hover:bg-[#FCE7EB] border border-[#F4C2CE] text-[#9A3C53] text-[10px] sm:text-xs font-semibold flex items-center justify-center gap-1 sm:gap-1.5 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#9A3C53]" />
                <span className="sm:hidden">WhatsApp</span>
                <span className="hidden sm:inline">Order on WhatsApp</span>
              </button>

              <button
                onClick={() => onProductClick(product)}
                className="hidden sm:block w-full py-1 text-center text-[11px] text-[#877275] hover:text-[#1B1B20] font-medium transition-colors cursor-pointer"
              >
                View Details • SKU: {product.sku}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bespoke Sourcing Banner matching Image 9 */}
      <div className="rounded-3xl bg-white/80 backdrop-blur-md border border-[#F4C2CE]/60 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FCE7EB] border border-[#F4C2CE] flex items-center justify-center shrink-0">
            <Gem className="w-6 h-6 text-[#9A3C53]" />
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9A3C53] block mb-1">
              Personal Concierge Service
            </span>
            <h3
              className="text-xl sm:text-2xl text-[#1B1B20] font-normal tracking-tight mb-1"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Looking for a custom gift set or bespoke sourcing?
            </h3>
            <p className="text-xs sm:text-sm text-[#877275] font-light max-w-xl">
              Chat directly with our founder on WhatsApp for tailored curation boxes, wedding registry consultations, or limited-run artisan commissions.
            </p>
          </div>
        </div>

        <a
          href={createGeneralWhatsAppLink('Hello Nandonik Founder, I would like to inquire about bespoke sourcing and custom gift sets.')}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap px-6 py-3 rounded-full bg-[#9A3C53] hover:bg-[#832E43] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-xs hover:shadow-md transition-all shrink-0"
        >
          Start WhatsApp Chat
        </a>
      </div>
    </div>
  );
};
