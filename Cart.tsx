import React from 'react';
import { X, Wallet, ExternalLink } from 'lucide-react';
import { CartItem, ArtworkType } from '../types';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';

interface CartProps {
  items: CartItem[];
  onRemoveItem: (id: string, type: ArtworkType) => void;
  onClose: () => void;
  isOpen: boolean;
}

export const Cart: React.FC<CartProps> = ({ items, onRemoveItem, onClose, isOpen }) => {
  const { isConnected, signer } = useWeb3();
  const total = items.reduce((sum, item) => sum + item.artwork.price * item.quantity, 0);

  const handleCryptoCheckout = async () => {
    if (!isConnected || !signer) {
      alert('Please connect your wallet first!');
      return;
    }

    try {
      // Convert total to ETH (assuming prices are in USD)
      const ethPrice = ethers.parseEther((total / 2000).toString()); // Using a mock ETH/USD rate of 2000
      
      // Create transaction
      const tx = {
        to: '0xYourGalleryAddress', // Replace with your gallery's ETH address
        value: ethPrice
      };

      // Send transaction
      const transaction = await signer.sendTransaction(tx);
      await transaction.wait();

      alert('Payment successful! Transaction hash: ' + transaction.hash);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  const openOpenSea = (artworkId: string) => {
    window.open(`https://opensea.io/collection/r3-gallery/${artworkId}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif font-semibold text-[#2C1810]">Shopping Cart</h2>
          <button onClick={onClose} className="text-[#8B7355] hover:text-[#2C1810]">
            <X size={24} />
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-[#8B7355] text-center mt-8">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.artwork.id}-${item.artwork.type}`} className="flex gap-4 border-b pb-4">
                  <img
                    src={item.artwork.imageUrl}
                    alt={item.artwork.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-[#2C1810]">{item.artwork.title}</h3>
                    <p className="text-[#8B7355] text-sm">{item.artwork.artist}</p>
                    <p className="text-[#8B7355] text-sm">
                      {item.artwork.type === 'original' ? 'Original' : 'Giclée Print'}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-[#2C1810] font-medium">
                        ${item.artwork.price.toLocaleString()}
                      </p>
                      <button
                        onClick={() => openOpenSea(item.artwork.id)}
                        className="text-[#8B7355] hover:text-[#2C1810] flex items-center gap-1 text-sm"
                      >
                        View on OpenSea <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.artwork.id, item.artwork.type)}
                    className="text-[#8B7355] hover:text-[#2C1810]"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-[#2C1810]">Total:</span>
                <div className="text-right">
                  <span className="font-bold text-xl text-[#2C1810]">${total.toLocaleString()}</span>
                  <p className="text-sm text-[#8B7355]">≈ {(total / 2000).toFixed(4)} ETH</p>
                </div>
              </div>
              <div className="space-y-3">
                <button className="w-full bg-[#D2B48C] text-white py-3 rounded-md hover:bg-[#8B7355] transition-colors">
                  Proceed to Checkout
                </button>
                <button 
                  onClick={handleCryptoCheckout}
                  className="w-full border-2 border-[#D2B48C] text-[#2C1810] py-3 rounded-md hover:bg-[#D2B48C] hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <Wallet size={20} />
                  Pay with ETH
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};