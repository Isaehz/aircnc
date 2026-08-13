import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarProps {
  rating: number;
  reviewCount?: number;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const RatingStar: React.FC<RatingStarProps> = ({
  rating,
  reviewCount,
  showText = true,
  size = 'sm',
  className = '',
}) => {
  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 20,
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base font-semibold',
  };

  return (
    <div className={`inline-flex items-center gap-1 text-slate-800 dark:text-slate-200 ${className}`}>
      <Star size={iconSizes[size]} className="fill-amber-400 text-amber-400 shrink-0" />
      {showText && (
        <span className={`font-semibold ${textSizes[size]}`}>
          {rating.toFixed(2)}
          {reviewCount !== undefined && (
            <span className="font-normal text-slate-500 dark:text-slate-400 ml-1">
              ({reviewCount})
            </span>
          )}
        </span>
      )}
    </div>
  );
};
