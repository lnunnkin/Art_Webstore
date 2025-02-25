import React from 'react';
import { privateSales } from '../data/privateSales';

export const PrivateSales: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {privateSales.map(sale => (
        <div key={sale.id} className="bg-white rounded-lg shadow-lg p-6">
          <img src={sale.imageUrl} alt={sale.title} className="w-full h-64 object-cover rounded-lg mb-4" />
          <h3 className="text-xl font-semibold text-[#2C1810] mb-2">{sale.title}</h3>
          <p className="text-[#8B7355] mb-4">{sale.artist}</p>
          <p className="text-[#2C1810] mb-4">{sale.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-[#8B7355]">
              {sale.inquiryOnly ? 'Price upon request' : `$${sale.price.toLocaleString()}`}
            </span>
            <button className="bg-[#D2B48C] text-white px-4 py-2 rounded hover:bg-[#8B7355]">
              Inquire
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};