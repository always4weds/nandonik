import React from 'react';
import { CategoryId } from '../types';
import { Flower2, Sparkles, Home, Scissors, Gem, ArrowRight } from 'lucide-react';

interface CategoriesViewProps {
  onSelectCategory: (cat: CategoryId) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({ onSelectCategory }) => {
  const departments = [
    {
      id: 'fragrance' as CategoryId,
      title: 'Fine Fragrance & Parfumerie',
      subtitle: 'Extraits de Parfum, Botanical Sprays & Rare Attars',
      description:
        'Slow-macerated botanicals, Grasse jasmine, aged Mysore sandalwood, and amber compounds blended in strictly numbered small-batch flacons.',
      count: '12 Formulations',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop',
      icon: <Flower2 className="w-5 h-5 text-[#9A3C53]" />,
    },
    {
      id: 'skincare' as CategoryId,
      title: 'Bio-Active Skincare & Elixirs',
      subtitle: 'Cold-Pressed Oils, Active Serums & Stone Contouring',
      description:
        'Cold-pressed seed elixirs, squalane infusions, and genuine Brazilian rose quartz facial tools for quiet, restorative morning rituals.',
      count: '14 Curations',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop',
      icon: <Sparkles className="w-5 h-5 text-[#9A3C53]" />,
    },
    {
      id: 'ceramics' as CategoryId,
      title: 'Studio Ceramics & Artisanal Home',
      subtitle: 'Hand-Thrown Stoneware, Terra Cotta & Vessel Sets',
      description:
        'Individually wheel-thrown terracotta and reduction-fired stoneware bearing natural throwing rings and chalk matte glazes.',
      count: '10 Hand-Thrown Pieces',
      image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=1000&auto=format&fit=crop',
      icon: <Home className="w-5 h-5 text-[#9A3C53]" />,
    },
    {
      id: 'jewelry' as CategoryId,
      title: 'Fine Adornments & Handcrafted Jewelry',
      subtitle: 'Organic Baroque Pearls & 18k Rose Vermeil',
      description:
        'Hand-strung freshwater baroque pearls and vermeil adornments celebrating natural asymmetry and understated, timeless elegance.',
      count: '12 Bespoke Pieces',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
      icon: <Gem className="w-5 h-5 text-[#9A3C53]" />,
    },
    {
      id: 'linen' as CategoryId,
      title: 'Pure Mulberry Silk & Natural Linens',
      subtitle: 'Heritage Pit-Loom Weaves & Plant-Dyed Textiles',
      description:
        'Woven on traditional Rajshahi wooden pit looms, utilizing organically dyed raw silk and breathable unbleached natural linens.',
      count: '8 Heritage Textiles',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
      icon: <Scissors className="w-5 h-5 text-[#9A3C53]" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCE7EB]/70 border border-[#F4C2CE]/60 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9A3C53] mb-2 sm:mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9A3C53]" />
          Curated Atelier Departments
        </span>
        <h1
          className="text-2xl sm:text-5xl text-[#1B1B20] font-normal tracking-tight mb-2 sm:mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Departments of Rare Living
        </h1>
        <p className="text-xs sm:text-sm text-[#877275] font-light leading-relaxed">
          Each department represents an enduring devotion to singular materials, slow patience, and human craftsmanship.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-12 sm:mb-16">
        {departments.map((dept) => (
          <div
            key={dept.id}
            onClick={() => onSelectCategory(dept.id)}
            className="group bg-white/75 hover:bg-white backdrop-blur-md rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-[#F4C2CE]/50 hover:border-[#9A3C53]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="relative aspect-[16/9] w-full rounded-xl sm:rounded-2xl overflow-hidden mb-3.5 sm:mb-5 bg-[#FBF8FF]">
                <img
                  src={dept.image}
                  alt={dept.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/90 backdrop-blur-xs text-[9px] sm:text-[10px] font-semibold uppercase text-[#9A3C53] border border-[#F4C2CE]/60 shadow-xs">
                  {dept.count}
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5 mb-1.5 sm:mb-2">
                <div className="p-1.5 rounded-lg bg-[#FCE7EB]/70 text-[#9A3C53]">
                  {dept.icon}
                </div>
                <h2
                  className="text-base sm:text-xl text-[#1B1B20] font-normal group-hover:text-[#9A3C53] transition-colors"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {dept.title}
                </h2>
              </div>

              <p className="text-xs text-[#9A3C53] font-medium mb-1.5 sm:mb-2">
                {dept.subtitle}
              </p>

              <p className="text-xs text-[#554245] font-light leading-relaxed line-clamp-2">
                {dept.description}
              </p>
            </div>

            <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-[#F4C2CE]/30 flex items-center justify-between text-xs font-semibold text-[#9A3C53] group-hover:text-[#832E43]">
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
