import React from 'react';
import { Clock } from 'lucide-react';
import { AuctionLot } from '../types';

interface AuctionCardProps {
  auction: AuctionLot;
  onBid: (auctionId: string) => void;
}

export const AuctionCard: React.FC<AuctionCardProps> = ({ auction, onBid }) => {
  const timeRemaining = new Date(auction.auctionEndDate).getTime() - new Date().getTime();
  const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        src={auction.imageUrl}
        alt={auction.title}
        className="w-full h-72 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-serif font-semibold text-[#2C1810]">{auction.title}</h3>
            <p className="text-[#8B7355] mt-1">by {auction.artist}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${
            auction.status === 'active' ? 'bg-green-100 text-green-800' : 
            auction.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
            'bg-gray-100 text-gray-800'
          }`}>
            {auction.status.charAt(0).toUpperCase() + auction.status.slice(1)}
          </span>
        </div>

        <p className="text-[#2C1810] mb-4">{auction.description}</p>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[#8B7355]">Estimate</span>
            <span className="font-medium text-[#2C1810]">
              ${auction.estimatedPrice.low.toLocaleString()} - ${auction.estimatedPrice.high.toLocaleString()}
            </span>
          </div>
          
          {auction.currentBid && (
            <div className="flex justify-between items-center">
              <span className="text-[#8B7355]">Current Bid</span>
              <span className="font-bold text-[#2C1810]">${auction.currentBid.toLocaleString()}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center text-[#8B7355]">
              <Clock size={16} className="mr-1" />
              <span className="text-sm">{daysRemaining} days left</span>
            </div>
            <button
              onClick={() => onBid(auction.id)}
              className="bg-[#D2B48C] text-white px-6 py-2 rounded-md hover:bg-[#8B7355] transition-colors"
            >
              Place Bid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};