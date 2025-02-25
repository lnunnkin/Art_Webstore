import React from 'react';
import { Clock, ArrowUpRight } from 'lucide-react';
import { AuctionLot } from '../types';

interface AuctionLotCardProps {
  lot: AuctionLot;
  onInquire: (lot: AuctionLot) => void;
}

export const AuctionLotCard: React.FC<AuctionLotCardProps> = ({ lot, onInquire }) => {
  const formatPrice = (price: number) => `$${price.toLocaleString()}`;
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <img
        src={lot.imageUrl}
        alt={lot.title}
        className="w-full h-72 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-serif font-semibold text-[#2C1810]">{lot.title}</h3>
            <p className="text-[#8B7355] mt-1">by {lot.artist}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${
            lot.status === 'active' ? 'bg-green-100 text-green-800' :
            lot.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {lot.status.charAt(0).toUpperCase() + lot.status.slice(1)}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-[#2C1810]">{lot.description}</p>
          <p className="text-[#8B7355] text-sm">{lot.medium} | {lot.dimensions}</p>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#8B7355]">Estimate</span>
            <span className="text-[#2C1810] font-medium">
              {formatPrice(lot.estimatedPrice.low)} - {formatPrice(lot.estimatedPrice.high)}
            </span>
          </div>
          
          {lot.currentBid && (
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#8B7355]">Current Bid</span>
              <span className="text-[#2C1810] font-bold">{formatPrice(lot.currentBid)}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center text-[#8B7355]">
              <Clock size={16} className="mr-1" />
              <span className="text-sm">
                {new Date(lot.auctionEndDate).toLocaleDateString()}
              </span>
            </div>
            <button
              onClick={() => onInquire(lot)}
              className="flex items-center gap-2 bg-[#D2B48C] text-white px-4 py-2 rounded-md hover:bg-[#8B7355] transition-colors"
            >
              Inquire <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};