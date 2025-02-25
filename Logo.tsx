import React from 'react';
import { CircleDot } from 'lucide-react';

interface LogoProps {
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center text-center hover:opacity-80 transition-opacity"
    >
      <CircleDot size={32} className="text-[#D2B48C] mb-1" strokeWidth={1.5} />
      <div className="flex flex-col">
        <span className="text-2xl font-light tracking-wider text-[#2C1810]">R3</span>
        <span className="text-sm uppercase tracking-[0.2em] text-[#8B7355]">Gallery</span>
      </div>
    </button>
  );
};