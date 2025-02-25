import React from 'react';
import { ArtworkType } from '../types';

interface ArtworkTypeSelectorProps {
  type: ArtworkType;
  onTypeChange: (type: ArtworkType) => void;
  originalPrice: number;
  gicleePrice?: number;
}

export const ArtworkTypeSelector: React.FC<ArtworkTypeSelectorProps> = ({
  type,
  onTypeChange,
  originalPrice,
  gicleePrice,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-[#8B7355]">Select Type:</label>
      <div className="flex gap-4">
        <label className="flex items-center">
          <input
            type="radio"
            checked={type === 'original'}
            onChange={() => onTypeChange('original')}
            className="mr-2 text-[#D2B48C] focus:ring-[#D2B48C]"
          />
          <span className="text-[#2C1810]">
            Original (${originalPrice.toLocaleString()})
          </span>
        </label>
        {gicleePrice && (
          <label className="flex items-center">
            <input
              type="radio"
              checked={type === 'giclee'}
              onChange={() => onTypeChange('giclee')}
              className="mr-2 text-[#D2B48C] focus:ring-[#D2B48C]"
            />
            <span className="text-[#2C1810]">
              Giclée Print (${gicleePrice.toLocaleString()})
            </span>
          </label>
        )}
      </div>
    </div>
  );
};