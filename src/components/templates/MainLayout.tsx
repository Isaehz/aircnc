import React from 'react';
import { Compass, Globe, Heart, Shield, Sparkles } from 'lucide-react';
import { Navbar } from '../organisms/Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
  onOpenFavorites?: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, onOpenFavorites }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans antialiased">
      {/* Navigation Header */}
      <Navbar onOpenFavorites={onOpenFavorites} />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">{children}</main>

      {/* Modern Footer */}
      <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-sm">
            {/* Brand column */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-xs">
                  <Compass size={18} />
                </div>
                <span className="text-lg font-black tracking-tight text-slate-900 dark:text-slate-100">
                  Air<span className="text-emerald-600 dark:text-emerald-400">CnC</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Plataforma de alojamientos únicos, cabañas de cristal y estancias inolvidables.
              </p>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3 text-xs uppercase tracking-wider">
                Asistencia
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:underline">Centro de ayuda</a></li>
                <li><a href="#" className="hover:underline">AirCnC Cover</a></li>
                <li><a href="#" className="hover:underline">Opciones de cancelación</a></li>
                <li><a href="#" className="hover:underline">Respuesta a COVID-19</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3 text-xs uppercase tracking-wider">
                Comunidad
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:underline">AirCnC.org: refugios de emergencia</a></li>
                <li><a href="#" className="hover:underline">Apoya la integración de los refugiados</a></li>
                <li><a href="#" className="hover:underline">Diversidad e inclusión</a></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3 text-xs uppercase tracking-wider">
                Modo Anfitrión
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li><a href="#" className="hover:underline">Pon tu espacio en AirCnC</a></li>
                <li><a href="#" className="hover:underline">AirCnC Cover para anfitriones</a></li>
                <li><a href="#" className="hover:underline">Recursos para anfitriones</a></li>
                <li><a href="#" className="hover:underline">Foro de la comunidad</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div>
              © 2026 AirCnC, Inc. • Privacidad • Términos • Mapa del sitio
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                <Globe size={14} /> Español (MX)
              </span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                $ MXN
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
