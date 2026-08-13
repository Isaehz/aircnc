import React from 'react';
import { Listing } from '../../types/listing';
import { ListingCard } from '../molecules/ListingCard';
import { Compass } from 'lucide-react';
import { Button } from '../atoms/Button';

interface ListingGridProps {
  listings: Listing[];
  showTaxes: boolean;
  onSelectListing: (listing: Listing) => void;
  onResetFilters?: () => void;
}

export const ListingGrid: React.FC<ListingGridProps> = ({
  listings,
  showTaxes,
  onSelectListing,
  onResetFilters,
}) => {
  if (listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
          <Compass size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          No se encontraron propiedades
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6">
          Intenta ajustar tu búsqueda cambiando el destino, reduciendo el número de huéspedes o seleccionando otra categoría.
        </p>
        {onResetFilters && (
          <Button variant="secondary" onClick={onResetFilters}>
            Restablecer Filtros
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          showTaxes={showTaxes}
          onSelect={onSelectListing}
        />
      ))}
    </div>
  );
};
