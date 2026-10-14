import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  className?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Studio Fryzur Prestige',
  fallbackTitle,
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`bg-[#F3EFEA] border border-[#EAE4DC] flex flex-col items-center justify-center text-center p-6 text-[#54575F] ${className}`}
        style={{ minHeight: '140px' }}
      >
        <Sparkles className="w-6 h-6 text-[#1D4ED8] mb-2 opacity-80" />
        <span className="font-serif text-sm tracking-wide text-[#121316] font-medium">
          {fallbackTitle || alt || 'Studio Fryzur Prestige'}
        </span>
        <span className="text-[11px] uppercase tracking-widest text-[#747686] mt-1">
          Salon Fryzjerski Zamość
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#F3EFEA] ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#EAE4DC]/40 animate-pulse flex items-center justify-center">
          <span className="w-5 h-5 rounded-full border-2 border-[#1D4ED8] border-t-transparent animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
