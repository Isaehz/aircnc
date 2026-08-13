import React from 'react';
import { Search } from 'lucide-react';
import { SearchField } from '../molecules/SearchField';
import { Button } from '../atoms/Button';

interface FloatingSearchBarProps {
  location: string;
  onLocationChange: (val: string) => void;
  checkIn: string;
  onCheckInChange: (val: string) => void;
  guests: number;
  onGuestsChange: (count: number) => void;
  onSearch: () => void;
}

export const FloatingSearchBar: React.FC<FloatingSearchBarProps> = ({
  location,
  onLocationChange,
  checkIn,
  onCheckInChange,
  guests,
  onGuestsChange,
  onSearch,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-2">
      <div className="relative flex flex-col md:flex-row items-center gap-2">
        <SearchField
          location={location}
          onLocationChange={onLocationChange}
          checkIn={checkIn}
          onCheckInChange={onCheckInChange}
          guests={guests}
          onGuestsChange={onGuestsChange}
        />
        <div className="w-full md:w-auto md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2">
          <Button
            variant="primary"
            size="md"
            onClick={onSearch}
            className="w-full md:w-auto rounded-xl md:rounded-full py-3 px-6 shadow-emerald-500/20 font-bold"
            icon={<Search size={18} />}
          >
            <span>Buscar</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
