import React, { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Listing } from '../../types/listing';
import { Badge } from '../atoms/Badge';
import { RatingStar } from '../atoms/RatingStar';

interface ListingCardProps {
  listing: Listing;
  showTaxes?: boolean;
  onSelect: (listing: Listing) => void;
  onToggleFavorite?: (id: string) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  showTaxes = false,
  onSelect,
  onToggleFavorite,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFav, setIsFav] = useState(listing.isFavorite || false);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % listing.images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  const handleFavClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFav(!isFav);
    if (onToggleFavorite) onToggleFavorite(listing.id);
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Estimate total for 3 nights if taxes/total is enabled
  const nights = 3;
  const totalPrice = (listing.pricePerNight * nights) + listing.cleaningFee + listing.serviceFee;

  return (
    <div
      onClick={() => onSelect(listing)}
      className="group cursor-pointer flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
    >
      {/* Image Carousel Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
        <img
          src={listing.images[currentImageIndex]}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={handleFavClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/30 backdrop-blur-md text-white hover:scale-110 transition-transform active:scale-95"
        >
          <Heart
            size={18}
            className={isFav ? 'fill-rose-500 text-rose-500' : 'text-white'}
          />
        </button>

        {/* Badge tag */}
        {listing.badge && (
          <div className="absolute top-3 left-3">
            <Badge variant="glass" size="sm">
              {listing.badge}
            </Badge>
          </div>
        )}

        {/* Carousel Navigation Arrows (visible on hover) */}
        {listing.images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-105 shadow-md"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-105 shadow-md"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* Carousel Dots */}
        {listing.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-950/40 backdrop-blur-xs">
            {listing.images.map((_, idx) => (
              <span
                key={idx}
                className={`block rounded-full transition-all duration-300 ${
                  idx === currentImageIndex
                    ? 'w-2 h-2 bg-white'
                    : 'w-1.5 h-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Details */}
      <div className="p-4 flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {listing.location.city}, {listing.location.state}
          </h3>
          <RatingStar rating={listing.rating} reviewCount={listing.reviewCount} size="sm" />
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
          {listing.propertyType} • {listing.bedrooms} hab.
        </p>

        <p className="text-xs text-slate-400 dark:text-slate-500">
          Disponible a partir del 15 de Ag.
        </p>

        {/* Pricing */}
        <div className="mt-1 pt-1 flex items-baseline justify-between border-t border-slate-100 dark:border-slate-800/80">
          <div>
            <span className="font-bold text-base text-slate-900 dark:text-slate-100">
              {formatPrice(listing.pricePerNight)}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400"> / noche</span>
          </div>

          {showTaxes && (
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium underline">
              {formatPrice(totalPrice)} total ({nights} noches)
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
