import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, SlidersHorizontal, Map, LayoutGrid } from 'lucide-react';
import { CATEGORIES } from '../../data/mockListings';
import { ListingCategory } from '../../types/listing';
import { CategoryItem } from '../molecules/CategoryItem';
import { ToggleSwitch } from '../atoms/ToggleSwitch';

interface CategoryBarProps {
  selectedCategory: ListingCategory;
  onSelectCategory: (id: ListingCategory) => void;
  showTaxes: boolean;
  onToggleTaxes: (show: boolean) => void;
  viewMode: 'grid' | 'map';
  onToggleViewMode: (mode: 'grid' | 'map') => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
  showTaxes,
  onToggleTaxes,
  viewMode,
  onToggleViewMode,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 py-3 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Scrollable Categories List */}
        <div className="relative flex items-center w-full md:w-auto overflow-hidden">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:shadow-md transition-shadow shrink-0 mr-2"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Slider Content */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-4 overflow-x-auto scrollbar-none scroll-smooth w-full py-1"
          >
            {CATEGORIES.map((cat) => (
              <CategoryItem
                key={cat.id}
                category={cat}
                isActive={selectedCategory === cat.id}
                onSelect={onSelectCategory}
              />
            ))}
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:shadow-md transition-shadow shrink-0 ml-2"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Action Controls (Taxes & Grid/Map switch) */}
        <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-100 dark:border-slate-800 pt-3 md:pt-0">
          {/* Tax Inclusive Switch */}
          <div className="hidden lg:flex items-center px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <ToggleSwitch
              checked={showTaxes}
              onChange={onToggleTaxes}
              label="Ver total con impuestos"
              size="sm"
            />
          </div>

          {/* Grid / Map View Mode Switcher */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => onToggleViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <LayoutGrid size={16} />
              <span>Grid</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'map'
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <Map size={16} />
              <span>Mapa</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
