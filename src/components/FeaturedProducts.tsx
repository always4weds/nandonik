import React from 'react';
import { Product } from '../types';
import { MessageCircle, Eye } from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onOrderWhatsApp: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onProductClick,
  onOrderWhatsApp,
}) => {
  // Show first 4 signature pieces as in Image 7
  const displayProducts = products.slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 py-6 md:py-14">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-8 pb-3 border-b border-[#F4C2CE]/30 gap-2">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9A3C53] block mb-1">
            Exclusive Selection
          </span>
          <h2
            className="text-xl sm:text-3xl text-[#1B1B20] font-normal tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Featured Products
          </h2>
          <p className="text-xs text-[#877275] font-light mt-0.5 sm:mt-1">
            Discover our latest collection, crafted with patience and precision.
          </p>
        </div>

        <div className="text-[11px] sm:text-xs text-[#877275] font-medium tracking-wide">
          Showing {displayProducts.length} Signature Pieces
        </div>
      </div>

      {/* 2-Column Mobile Grid, 4-Column Desktop Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
        {displayProducts.map((product) => {
          return (
            <div
              key={product.id}
              className="group bg-white/75 hover:bg-white backdrop-blur-md rounded-xl sm:rounded-2xl p-2 sm:p-3 border border-[#F4C2CE]/50 hover:border-[#9A3C53]/40 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Frame with Badge */}
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
                  {/* Badge */}
                  {product.discountPercentage ? (
                    <span className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 px-1.5 sm:px-2 py-0.5 rounded-full bg-[#9A3C53] text-white text-[9px] sm:text-[10px] font-semibold tracking-wider">
                      {product.discountPercentage}% OFF
                    </span>
                  ) : product.badge ? (
                    <span className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 px-1.5 sm:px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs border border-[#F4C2CE]/60 text-[#554245] text-[9px] sm:text-[10px] font-medium tracking-wider">
                      {product.badge}
                    </span>
                  ) : null}
                </div>

                {/* Meta details */}
                <div className="px-0.5 sm:px-1">
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] text-[#877275] uppercase block mb-0.5 sm:mb-1">
                    {product.department}
                  </span>

                  <h3
                    onClick={() => onProductClick(product)}
                    className="text-xs sm:text-base font-normal text-[#1B1B20] hover:text-[#9A3C53] transition-colors cursor-pointer line-clamp-1"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#877275] font-light line-clamp-1 mt-0.5 mb-2 hidden sm:block">
                    {product.subtitle}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 sm:gap-2 mt-1 mb-2 sm:mb-3">
                    <span className="text-xs sm:text-base font-bold text-[#1B1B20]">
                      ৳ {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[10px] sm:text-xs text-[#877275] line-through font-light">
                        ৳ {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-1.5 sm:pt-2 border-t border-[#F4C2CE]/30 flex flex-col gap-1 sm:gap-1.5 px-0.5 sm:px-1">
                <button
                  onClick={() => onOrderWhatsApp(product)}
                  className="w-full py-1.5 sm:py-2 px-2 sm:px-3 rounded-full bg-[#FCE7EB]/70 hover:bg-[#FCE7EB] border border-[#F4C2CE] text-[#9A3C53] hover:text-[#832E43] text-[10px] sm:text-xs font-semibold flex items-center justify-center gap-1 sm:gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#9A3C53]" />
                  <span className="sm:hidden">WhatsApp</span>
                  <span className="hidden sm:inline">Order on WhatsApp</span>
                </button>

                <button
                  onClick={() => onProductClick(product)}
                  className="hidden sm:flex w-full py-1 text-center text-[11px] text-[#877275] hover:text-[#1B1B20] font-medium transition-colors cursor-pointer items-center justify-center gap-1"
                >
                  <Eye className="w-3 h-3" />
                  <span>Quick Look</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
