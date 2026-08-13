import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'cyan' | 'slate' | 'amber' | 'violet' | 'glass';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'emerald',
  size = 'sm',
  icon,
  className = '',
}) => {
  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs font-semibold rounded-full gap-1',
    md: 'px-3 py-1 text-xs font-bold rounded-full gap-1.5',
  };

  const variantStyles = {
    emerald: 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/40',
    cyan: 'bg-cyan-100 dark:bg-cyan-950/70 text-cyan-800 dark:text-cyan-300 border border-cyan-200/50 dark:border-cyan-800/40',
    slate: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
    amber: 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/40',
    violet: 'bg-violet-100 dark:bg-violet-950/70 text-violet-800 dark:text-violet-300 border border-violet-200/50 dark:border-violet-800/40',
    glass: 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-800 dark:text-slate-100 border border-white/20 dark:border-slate-700/50 shadow-sm',
  };

  return (
    <span className={`inline-flex items-center tracking-wide ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
