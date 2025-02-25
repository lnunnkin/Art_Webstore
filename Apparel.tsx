import React from 'react';
import { apparel } from '../data/apparel';

export const Apparel: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {apparel.map(item => (
        <div key={item.id} className="bg-white rounded-lg shadow-lg p-6">
          <img src={item.imageUrl} alt={item.name} className="w-full h-64 object-cover rounded-lg mb-4" />
          <h3 className="text-xl font-semibold text-[#2C1810] mb-2">{item.name}</h3>
          <p className="text-[#8B7355] mb-4">{item.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold text-[#2C1810]">${item.price}</span>
            <button className="bg-[#D2B48C] text-white px-4 py-2 rounded hover:bg-[#8B7355]">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};