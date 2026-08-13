import React, { useState } from 'react';
import { Compass, Globe, Menu, User, Sparkles, Heart, HelpCircle } from 'lucide-react';
import { Button } from '../atoms/Button';

interface NavbarProps {
  onOpenFavorites?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenFavorites }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Compass size={24} className="animate-spin-slow" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1">
              Air<span className="text-emerald-600 dark:text-emerald-400">CnC</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-400 -mt-1">
              Stays & Cabins
            </span>
          </div>
        </a>

        {/* Center Host Message */}
        <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
          <Sparkles size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>¿Tienes un espacio único? <strong className="underline cursor-pointer hover:text-emerald-900">Hazte Anfitrión AirCnC</strong></span>
        </div>

        {/* User Navigation Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden sm:inline-flex items-center justify-center p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Idioma y Moneda"
          >
            <Globe size={18} />
          </button>

          {/* User Profile Dropdown Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-3 p-1.5 pl-3 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-md transition-all text-slate-700 dark:text-slate-200"
            >
              <Menu size={18} />
              <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs">
                <User size={16} />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div
                onMouseLeave={() => setIsMenuOpen(false)}
                className="absolute right-0 mt-2 w-60 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl py-2 text-sm z-50 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                  <p className="font-bold text-slate-900 dark:text-slate-100">¡Bienvenido a AirCnC!</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Descubre estancias increíbles</p>
                </div>

                <a
                  href="#signin"
                  className="flex items-center gap-2 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 font-semibold text-slate-800 dark:text-slate-200"
                >
                  Iniciar sesión
                </a>
                <a
                  href="#signup"
                  className="flex items-center gap-2 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300"
                >
                  Registrarse
                </a>

                <div className="border-t border-slate-100 dark:border-slate-700 my-1" />

                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (onOpenFavorites) onOpenFavorites();
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300 text-left"
                >
                  <Heart size={16} className="text-rose-500" />
                  <span>Mis Favoritos</span>
                </button>

                <a
                  href="#help"
                  className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300"
                >
                  <HelpCircle size={16} />
                  <span>Centro de ayuda</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
