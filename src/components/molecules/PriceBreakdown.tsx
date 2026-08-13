import React, { useState } from 'react';
import { Minus, Plus, ShieldCheck, Sparkles } from 'lucide-react';
import { Listing } from '../../types/listing';
import { Button } from '../atoms/Button';

interface PriceBreakdownProps {
  listing: Listing;
  onReserve: (nights: number, total: number) => void;
}

export const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  listing,
  onReserve,
}) => {
  const [nights, setNights] = useState(3);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(val);

  const subtotal = listing.pricePerNight * nights;
  const grandTotal = subtotal + listing.cleaningFee + listing.serviceFee;

  return (
    <div className="flex flex-col gap-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
      {/* Rate Header */}
      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-2xl font-black text-slate-900 dark:text-slate-100">
            {formatCurrency(listing.pricePerNight)}
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-400"> / noche</span>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
          ★ {listing.rating.toFixed(2)}
        </span>
      </div>

      {/* Nights selector */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Duración del hospedaje
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setNights((n) => Math.max(1, n - 1))}
            className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-650 transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="text-sm font-bold w-12 text-center text-slate-900 dark:text-slate-100">
            {nights} {nights === 1 ? 'noche' : 'noches'}
          </span>
          <button
            type="button"
            onClick={() => setNights((n) => n + 1)}
            className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-650 transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Detailed breakdown list */}
      <div className="flex flex-col gap-2.5 text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-4">
        <div className="flex justify-between">
          <span>
            {formatCurrency(listing.pricePerNight)} × {nights} noches
          </span>
          <span className="font-semibold">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tarifa de limpieza</span>
          <span className="font-semibold">{formatCurrency(listing.cleaningFee)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tarifa de servicio AirCnC</span>
          <span className="font-semibold">{formatCurrency(listing.serviceFee)}</span>
        </div>
      </div>

      {/* Grand Total */}
      <div className="flex justify-between items-baseline border-t border-slate-200 dark:border-slate-700 pt-4">
        <span className="text-base font-bold text-slate-900 dark:text-slate-100">Total (MXN)</span>
        <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
          {formatCurrency(grandTotal)}
        </span>
      </div>

      {/* Reserve Button */}
      <Button
        variant="primary"
        size="lg"
        onClick={() => onReserve(nights, grandTotal)}
        className="w-full font-bold shadow-emerald-500/20"
        icon={<Sparkles size={18} />}
      >
        Reservar Ahora
      </Button>

      <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 text-center">
        <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
        <span>Garantía de reembolso total y pago seguro</span>
      </div>
    </div>
  );
};
