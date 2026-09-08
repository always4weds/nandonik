import React from 'react';
import { CategoryId } from '../types';
import { Sparkles, Flower2, Home, Scissors, Gem, Compass } from 'lucide-react';

interface ExploreEssenceProps {
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
}

export const ExploreEssence: React.FC<ExploreEssenceProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories: { id: CategoryId; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Collections', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'fragrance', label: 'Fragrance & Beauty', icon: <Flower2 className="w-3.5 h-3.5" /> },
    { id: 'ceramics', label: 'Artisanal Home', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'linen', label: 'Fine Silk & Linen', icon: <Scissors className="w-3.5 h-3.5" /> },
    { id: 'jewelry', label: 'Handcrafted Jewelry', icon: <Gem className="w-3.5 h-3.5" /> },
    { id: 'skincare', label: 'Lifestyle Editions', icon: <Compass className="w-3.5 h-3.5" /> },
  ];

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-[#F4C2CE]/30 gap-2 sm:gap-3">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9A3C53] block mb-1">
            Department Curations
          </span>
          <h2
            className="text-xl sm:text-3xl text-[#1B1B20] font-normal tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Explore by Essence
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#877275] font-light max-w-md">
          Carefully selected artisanal aesthetics for mind, home, and wear.
        </p>
      </div>

      {/* Category Pills Bar: edge-to-edge scroll on phone */}
      <div className="-mx-3 sm:mx-0 px-3 sm:px-0 flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-xs transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#FCE7EB] border border-[#9A3C53] text-[#9A3C53] font-semibold shadow-xs'
                  : 'bg-white/80 hover:bg-white border border-[#F4C2CE]/50 text-[#554245] hover:text-[#1B1B20]'
              }`}
            >
              <span className={isActive ? 'text-[#9A3C53]' : 'text-[#877275]'}>
                {cat.icon}
              </span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
