import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PrivateSale } from '../types';

interface PrivateSaleCardProps {
  sale: PrivateSale;
  onInquire: (sale: PrivateSale) => void;
}

export const PrivateSaleCard: React.FC<PrivateSaleCardProps> = ({ sale, onInquire }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <img
        src={sale.imageUrl}
        alt={sale.title}
        className="w-full h-72 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-serif font-semibold text-[#2C1810]">{sale.title}</h3>
        <p className="text-[#8B7355] mt-1">by {sale.artist}</p>
        
        <div className="mt-4 space-y-2">
          <p className="text-[#2C1810]">{sale.description}</p>
          <p className="text-[#8B7355] text-sm">{sale.medium} | {sale.dimensions}</p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            {sale.inquiryOnly ? (
              <span className="text-[#8B7355]">Price upon request</span>
            ) : (
              <span className="text-xl font-bold text-[#2C1810]">
                ${sale.price.toLocaleString()}
              </span>
            )}
          </div>
          <button
            onClick={() => onInquire(sale)}
            className="flex items-center gap-2 bg-[#D2B48C] text-white px-4 py-2 rounded-md hover:bg-[#8B7355] transition-colors"
          >
            Inquire <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};