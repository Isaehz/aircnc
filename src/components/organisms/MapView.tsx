import React, { useState } from 'react';
import { Listing } from '../../types/listing';
import { MapPin, Navigation, Star, Layers } from 'lucide-react';
import { ListingCard } from '../molecules/ListingCard';
import { Button } from '../atoms/Button';

interface MapViewProps {
  listings: Listing[];
  showTaxes: boolean;
  onSelectListing: (listing: Listing) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  listings,
  showTaxes,
  onSelectListing,
}) => {
  const [activeListingId, setActiveListingId] = useState<string | null>(
    listings.length > 0 ? listings[0].id : null
  );

  const activeListing = listings.find((l) => l.id === activeListingId) || listings[0];

  const formatPrice = (val: number) =>
    new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(val);

  // Simulated coordinate offsets for visual map grid
  const pinPositions = [
    { top: '28%', left: '35%' },
    { top: '45%', left: '60%' },
    { top: '65%', left: '40%' },
    { top: '38%', left: '75%' },
    { top: '55%', left: '25%' },
    { top: '72%', left: '68%' },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-14rem)] w-full overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shadow-inner">
      {/* Left Pane: Scrollable Listing Cards List */}
      <div className="w-full lg:w-5/12 h-full overflow-y-auto p-4 space-y-4 border-r border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between px-2 pb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {listings.length} estancias encontradas
          </span>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <Navigation size={12} /> Mapa interactivo
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {listings.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setActiveListingId(item.id)}
              className={`transition-all duration-200 rounded-2xl ${
                activeListingId === item.id ? 'ring-2 ring-emerald-500 scale-[1.01]' : ''
              }`}
            >
              <ListingCard
                listing={item}
                showTaxes={showTaxes}
                onSelect={onSelectListing}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Pane: Simulated Map Canvas */}
      <div className="relative w-full lg:w-7/12 h-full bg-slate-200 dark:bg-slate-950 overflow-hidden flex items-center justify-center">
        {/* Map Background Pattern */}
        <div className="absolute inset-0 bg-[radial-[#059669_1px,transparent_1px backdrop-blur-md opacity-20 dark:opacity-30] [background-size:24px_24px]" />
        
        {/* Simulated Map Topo Contour Lines Graphic */}
        <svg className="absolute inset-0 w-full h-full opacity-15 stroke-emerald-600 dark:stroke-emerald-400" fill="none">
          <path d="M0,100 Q300,50 600,200 T1200,100" strokeWidth="2" />
          <path d="M0,300 Q400,250 700,450 T1200,300" strokeWidth="1.5" />
          <path d="M0,500 Q200,450 800,600 T1200,500" strokeWidth="1" />
        </svg>

        <div className="absolute top-4 right-4 z-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md text-xs flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
          <Layers size={14} className="text-emerald-500" />
          <span>Vista Satelital Simulación</span>
        </div>

        {/* Map Marker Pins */}
        {listings.map((item, idx) => {
          const pos = pinPositions[idx % pinPositions.length];
          const isActive = activeListingId === item.id;

          return (
            <div
              key={item.id}
              style={{ top: pos.top, left: pos.left }}
              className="absolute z-20 transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2"
            >
              <button
                type="button"
                onClick={() => {
                  setActiveListingId(item.id);
                  onSelectListing(item);
                }}
                onMouseEnter={() => setActiveListingId(item.id)}
                className={`px-3 py-1.5 rounded-full font-bold text-xs shadow-xl transition-all duration-200 flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-slate-900 text-white border-emerald-400 scale-110 ring-4 ring-emerald-500/30'
                    : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700 hover:scale-105'
                }`}
              >
                <MapPin size={12} className={isActive ? 'text-emerald-400' : 'text-emerald-600'} />
                <span>{formatPrice(item.pricePerNight)}</span>
              </button>

              {/* Hover Popover Preview */}
              {isActive && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-30 animate-in fade-in zoom-in-95">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-24 object-cover rounded-lg mb-1.5"
                  />
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                    {item.title}
                  </p>
                  <div className="flex items-center justify-between text-[11px] mt-1 text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-0.5">
                      <Star size={10} className="fill-amber-400 text-amber-400" />
                      {item.rating}
                    </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      Ver detalle
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
