import React from 'react';
import { ShoppingCart as CartIcon } from 'lucide-react';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick, onLogoClick, children }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-24 flex items-center justify-end gap-6">
          {children}
          <button
            onClick={onCartClick}
            className="relative p-2 text-[#2C1810]/80 hover:text-[#2C1810] transition-colors"
            aria-label="Shopping Cart"
          >
            <CartIcon size={22} strokeWidth={1.5} />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D2B48C] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};