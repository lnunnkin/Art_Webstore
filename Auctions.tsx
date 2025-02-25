import React from 'react';
import { AuctionCard } from './AuctionCard';
import { auctions } from '../data/auctions';

export const Auctions: React.FC = () => {
  const handleBid = (auctionId: string) => {
    // Implement bidding logic
    console.log(`Placing bid for auction ${auctionId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {auctions.map(auction => (
        <AuctionCard
          key={auction.id}
          auction={auction}
          onBid={handleBid}
        />
      ))}
    </div>
  );
};