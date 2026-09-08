import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  onClick?: () => void;
}

export const NandonikLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true,
  onClick,
}) => {
  const iconSize = size === 'sm' ? 32 : size === 'lg' ? 52 : 40;
  const textSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-lg';
  const subtextSize = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs' : 'text-[11px]';

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={`inline-flex items-center gap-2.5 select-none ${
        onClick ? 'cursor-pointer hover:opacity-90 transition-opacity focus:outline-none' : ''
      } ${className}`}
    >
      {/* Exact rounded pink badge with N mark */}
      <div
        className="relative flex items-center justify-center shrink-0 rounded-[11px] border border-[#F4C2CE] bg-[#FCE7EB]/80 shadow-[0_2px_8px_rgba(196,93,116,0.08)] transition-transform hover:scale-105"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-3/5 h-3/5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized N with pin bulb at top right */}
          <path
            d="M26 76V24"
            stroke="#9A3C53"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M26 24L74 76"
            stroke="#9A3C53"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M74 76V32"
            stroke="#9A3C53"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Bulb/dropper pin at top of right stem */}
          <circle
            cx="74"
            cy="24"
            r="6.5"
            fill="#9A3C53"
          />
        </svg>
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-serif tracking-[0.22em] font-semibold text-[#1B1B20] uppercase ${textSize}`}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            NANDONIK
          </span>
          <span
            className={`tracking-[0.38em] font-medium text-[#9A3C53] uppercase mt-0.5 ${subtextSize}`}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            BAZAR
          </span>
        </div>
      )}
    </div>
  );
};
