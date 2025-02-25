import React from 'react';
import { ArtworkCard } from './ArtworkCard';
import { topSellers } from '../data/topSellers';
import { Artwork, ArtworkType } from '../types';

interface TopSellersProps {
  onAddToCart: (artwork: Artwork, type: ArtworkType) => void;
}

export const TopSellers: React.FC<TopSellersProps> = ({ onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {topSellers.map(artwork => (
        <ArtworkCard
          key={artwork.id}
          artwork={artwork}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};