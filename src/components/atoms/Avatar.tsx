import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isSuperhost?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  isSuperhost = false,
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`${sizeMap[size]} rounded-full object-cover ring-2 ring-emerald-500/20 dark:ring-emerald-400/20 shadow-sm`}
      />
      {isSuperhost && (
        <span
          className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 p-1 rounded-full text-[10px] font-bold shadow ring-2 ring-white dark:ring-slate-900"
          title="Superhost Verificado"
        >
          ★
        </span>
      )}
    </div>
  );
};
