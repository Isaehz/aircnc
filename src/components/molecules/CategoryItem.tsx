import React from 'react';
import {
  Sparkles,
  Trees,
  Building2,
  TentTree,
  Waves,
  Home,
  Crown,
  Sailboat,
  Mountain,
} from 'lucide-react';
import { CategoryInfo } from '../../types/listing';

interface CategoryItemProps {
  category: CategoryInfo;
  isActive: boolean;
  onSelect: (id: CategoryInfo['id']) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  Trees,
  Building2,
  TentTree,
  Waves,
  Home,
  Crown,
  Sailboat,
  Mountain,
};

export const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  isActive,
  onSelect,
}) => {
  const IconComponent = ICON_MAP[category.icon] || Sparkles;

  return (
    <button
      onClick={() => onSelect(category.id)}
      className={`group flex flex-col items-center gap-2 pb-2 pt-1 px-3 transition-all cursor-pointer border-b-2 shrink-0 select-none ${
        isActive
          ? 'border-emerald-600 dark:border-emerald-400 text-emerald-700 dark:text-emerald-300 font-semibold'
          : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:border-slate-300 dark:hover:border-slate-600'
      }`}
    >
      <IconComponent
        size={24}
        className={`transition-transform duration-200 group-hover:scale-110 ${
          isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200'
        }`}
      />
      <span className="text-xs tracking-tight whitespace-nowrap">{category.label}</span>
    </button>
  );
};
