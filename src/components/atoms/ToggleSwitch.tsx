import React from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  sublabel?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  label,
  sublabel,
  size = 'md',
  className = '',
}) => {
  return (
    <label className={`inline-flex items-center cursor-pointer select-none gap-3 ${className}`}>
      {(label || sublabel) && (
        <div className="flex flex-col text-right">
          {label && <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{label}</span>}
          {sublabel && <span className="text-xs text-slate-500 dark:text-slate-400">{sublabel}</span>}
        </div>
      )}
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
            checked ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
          }`}
        />
        <div
          className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out shadow-md ${
            checked ? 'transform translate-x-5' : ''
          }`}
        />
      </div>
    </label>
  );
};
