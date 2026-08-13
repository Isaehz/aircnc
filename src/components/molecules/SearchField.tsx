import React, { useState } from 'react';
import { MapPin, Calendar, Users, Minus, Plus } from 'lucide-react';

interface SearchFieldProps {
  location: string;
  onLocationChange: (val: string) => void;
  checkIn: string;
  onCheckInChange: (val: string) => void;
  guests: number;
  onGuestsChange: (count: number) => void;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  location,
  onLocationChange,
  checkIn,
  onCheckInChange,
  guests,
  onGuestsChange,
}) => {
  const [activeTab, setActiveTab] = useState<'location' | 'date' | 'guests' | null>(null);

  return (
    <div className="flex flex-col md:flex-row items-center w-full bg-white dark:bg-slate-800 rounded-2xl md:rounded-full border border-slate-200/80 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-700">
      {/* Location Field */}
      <div
        onClick={() => setActiveTab('location')}
        className="flex items-center gap-3 px-6 py-3 w-full md:w-1/3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 md:rounded-l-full transition-colors"
      >
        <MapPin size={20} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
        <div className="flex flex-col text-left overflow-hidden">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Dónde
          </span>
          <input
            type="text"
            placeholder="Buscar destinos..."
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            className="bg-transparent text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none placeholder-slate-400 truncate"
          />
        </div>
      </div>

      {/* Date Field */}
      <div
        onClick={() => setActiveTab('date')}
        className="flex items-center gap-3 px-6 py-3 w-full md:w-1/3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
      >
        <Calendar size={20} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
        <div className="flex flex-col text-left overflow-hidden">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Fechas
          </span>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => onCheckInChange(e.target.value)}
            className="bg-transparent text-sm font-semibold text-slate-800 dark:text-slate-100 focus:outline-none placeholder-slate-400 cursor-pointer"
          />
        </div>
      </div>

      {/* Guests Field */}
      <div className="flex items-center justify-between px-6 py-3 w-full md:w-1/3 md:rounded-r-full hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors">
        <div className="flex items-center gap-3 overflow-hidden">
          <Users size={20} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Quién
            </span>
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              {guests === 1 ? '1 huésped' : `${guests} huéspedes`}
            </span>
          </div>
        </div>

        {/* Counter controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (guests > 1) onGuestsChange(guests - 1);
            }}
            disabled={guests <= 1}
            className="w-7 h-7 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="text-xs font-bold w-4 text-center text-slate-800 dark:text-slate-200">
            {guests}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onGuestsChange(guests + 1);
            }}
            className="w-7 h-7 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
