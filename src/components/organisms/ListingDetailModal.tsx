import React, { useEffect } from 'react';
import { X, MapPin, Share2, Heart, ShieldCheck, CheckCircle2, Star } from 'lucide-react';
import { Listing } from '../../types/listing';
import { Badge } from '../atoms/Badge';
import { Avatar } from '../atoms/Avatar';
import { RatingStar } from '../atoms/RatingStar';
import { PriceBreakdown } from '../molecules/PriceBreakdown';

interface ListingDetailModalProps {
  listing: Listing | null;
  onClose: () => void;
  onConfirmReservation: (listing: Listing, nights: number, total: number) => void;
}

export const ListingDetailModal: React.FC<ListingDetailModalProps> = ({
  listing,
  onClose,
  onConfirmReservation,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!listing) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex justify-center items-start p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 my-4 md:my-8 animate-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 overflow-hidden">
            {listing.badge && <Badge variant="emerald">{listing.badge}</Badge>}
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 truncate">
              {listing.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              title="Compartir"
            >
              <Share2 size={18} />
            </button>
            <button
              type="button"
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              title="Guardar"
            >
              <Heart size={18} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Scroll Body */}
        <div className="p-6 md:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9]">
            <div className="md:col-span-2 relative h-full bg-slate-200 dark:bg-slate-800">
              <img
                src={listing.images[0]}
                alt={listing.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="hidden md:grid grid-cols-2 col-span-2 gap-3 h-full">
              {listing.images.slice(1, 5).map((img, idx) => (
                <div key={idx} className="relative h-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={img}
                    alt={`${listing.title} ${idx + 2}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Main Details Layout (2 Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title & Host info */}
              <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-6">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-2">
                    {listing.propertyType} en {listing.location.city}
                  </h1>
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <span>{listing.maxGuests} huéspedes</span>
                    <span>•</span>
                    <span>{listing.bedrooms} habitaciones</span>
                    <span>•</span>
                    <span>{listing.beds} camas</span>
                    <span>•</span>
                    <span>{listing.baths} baños</span>
                  </div>
                </div>

                <Avatar
                  src={listing.host.avatar}
                  alt={listing.host.name}
                  size="lg"
                  isSuperhost={listing.host.isSuperhost}
                />
              </div>

              {/* Host Highlight Banner */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40">
                <ShieldCheck size={28} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">
                    Anfitrión: {listing.host.name}
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400">
                    {listing.host.isSuperhost ? 'Superhost verificado' : 'Anfitrión experimentado'} • Respuesta: {listing.host.responseRate}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">
                  Acerca de este espacio
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                  {listing.description}
                </p>
              </div>

              {/* Amenities Grid */}
              <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
                  Lo que ofrece este lugar
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {listing.amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 text-sm font-medium"
                    >
                      <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guest Reviews Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    Reseñas de huéspedes
                  </h3>
                  <RatingStar rating={listing.rating} reviewCount={listing.reviewCount} size="md" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {listing.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 space-y-2"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar src={rev.authorAvatar} alt={rev.authorName} size="sm" />
                        <div>
                          <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                            {rev.authorName}
                          </p>
                          <p className="text-xs text-slate-400">{rev.date}</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sticky Booking Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <PriceBreakdown
                  listing={listing}
                  onReserve={(nights, total) => onConfirmReservation(listing, nights, total)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
