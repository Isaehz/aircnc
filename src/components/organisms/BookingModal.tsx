import React, { useState } from 'react';
import { CheckCircle, Calendar, ShieldCheck, Sparkles, X, MapPin } from 'lucide-react';
import { Listing } from '../../types/listing';
import { Button } from '../atoms/Button';

interface BookingModalProps {
  isOpen: boolean;
  listing: Listing | null;
  nights: number;
  totalPrice: number;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  listing,
  nights,
  totalPrice,
  onClose,
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!isOpen || !listing) return null;

  const formatPrice = (val: number) =>
    new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(val);

  const handlePay = () => {
    setIsConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex justify-center items-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 p-6 md:p-8 animate-in zoom-in-95 duration-200">
        
        {/* Close X Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
        >
          <X size={20} />
        </button>

        {!isConfirmed ? (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Sparkles size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Confirmar y Pagar Reserva
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Estás a un paso de confirmar tu estadía en AirCnC
              </p>
            </div>

            {/* Listing Summary Card */}
            <div className="flex gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
              <img
                src={listing.images[0]}
                alt={listing.title}
                className="w-20 h-20 object-cover rounded-xl shrink-0"
              />
              <div className="flex flex-col justify-center overflow-hidden">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                  {listing.propertyType}
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">
                  {listing.title}
                </h4>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin size={12} /> {listing.location.city}, {listing.location.state}
                </p>
              </div>
            </div>

            {/* Stay Details */}
            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-4">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-xs font-semibold">
                  <Calendar size={16} className="text-emerald-500" /> Duración
                </span>
                <span className="font-bold">{nights} noches</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold">Anfitrión</span>
                <span className="font-bold">{listing.host.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold">Total a pagar</span>
                <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            {/* Pay Action Button */}
            <Button
              variant="primary"
              size="lg"
              onClick={handlePay}
              className="w-full font-bold shadow-emerald-500/20 py-3.5"
            >
              Confirmar Reserva de {formatPrice(totalPrice)}
            </Button>

            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 text-center">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Cancelación gratuita antes de 48 horas</span>
            </div>
          </div>
        ) : (
          /* Confirmation Celebration State */
          <div className="text-center space-y-5 py-4 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <CheckCircle size={36} />
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                ¡Reserva Confirmada!
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Código de confirmación: <strong className="text-emerald-600 dark:text-emerald-400 font-mono">CNC-9824-MX</strong>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs leading-relaxed">
              Hemos enviado los detalles completos de la reserva y las instrucciones de llegada al correo electrónico registrado. {listing.host.name} ya está preparando tu espacio.
            </div>

            <Button
              variant="dark"
              size="md"
              onClick={() => {
                setIsConfirmed(false);
                onClose();
              }}
              className="w-full font-bold"
            >
              Volver a la Página Principal
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
