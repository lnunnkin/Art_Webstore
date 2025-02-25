import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowUpLeft, Wallet, ExternalLink, CreditCard, CircleDot } from 'lucide-react';
import { artworks } from '../data/artworks';
import { useWeb3 } from '../context/Web3Context';
import { ArtworkType } from '../types';

interface ArtworkPageProps {
  onAddToCart: (artworkId: string, type: ArtworkType) => void;
}

export const ArtworkPage: React.FC<ArtworkPageProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { connectWallet, isConnected } = useWeb3();
  const [showCardForm, setShowCardForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto'>('card');

  const artwork = artworks.find(a => a.id === id);

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light text-[#2C1810] mb-4">Artwork not found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-[#4ECDC4] hover:text-[#4ECDC4]/80 transition-colors"
          >
            Return to Gallery
          </button>
        </div>
      </div>
    );
  }

  const handlePurchase = async () => {
    if (paymentMethod === 'crypto') {
      if (!isConnected) {
        await connectWallet();
        return;
      }
      onAddToCart(artwork.id, artwork.type);
    } else {
      setShowCardForm(true);
    }
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your payment processor
    alert('Payment processing would be integrated here');
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Return Button */}
        <div className="absolute top-8 left-8">
          <button
            onClick={() => navigate('/')}
            className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-500 shadow-lg hover:shadow-xl"
          >
            <ArrowUpLeft 
              size={24} 
              className="text-[#2C1810] transform transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1" 
            />
            <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-sm text-[#2C1810]/60">
              Return
            </span>
          </button>
        </div>

        {/* Centered Logo */}
        <div className="flex justify-center mb-16">
          <button 
            onClick={() => navigate('/')}
            className="group flex flex-col items-center text-center transition-transform duration-500 hover:scale-110"
          >
            <div className="relative">
              <CircleDot 
                size={48} 
                className="text-[#D2B48C] mb-2 transform transition-transform duration-500 group-hover:rotate-180" 
                strokeWidth={1.5} 
              />
              <div className="absolute inset-0 bg-[#D2B48C]/10 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-light tracking-wider text-[#2C1810]">R3</span>
              <span className="text-sm uppercase tracking-[0.2em] text-[#8B7355]">Gallery</span>
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="relative">
            <div className="sticky top-24">
              <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)]">
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-light text-[#2C1810] mb-4">{artwork.title}</h1>
              <p className="text-2xl text-[#4ECDC4]">by {artwork.artist}</p>
            </div>

            <div className="prose prose-lg">
              <p className="text-[#2C1810]/80 leading-relaxed">
                {artwork.description}
              </p>
            </div>

            <div className="space-y-2 text-[#2C1810]/60">
              <p>{artwork.medium}</p>
              <p>{artwork.dimensions}</p>
              {artwork.editions.original && (
                <p>
                  Edition {artwork.editions.original.current} of {artwork.editions.original.total}
                </p>
              )}
            </div>

            <div className="pt-8 border-t border-[#2C1810]/10">
              <p className="text-4xl font-light text-[#2C1810] mb-8">
                {artwork.type === 'digital' 
                  ? `${artwork.price} ETH`
                  : `$${artwork.price.toLocaleString()}`
                }
              </p>

              {showCardForm ? (
                <form onSubmit={handleCardSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2C1810] mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 rounded-lg border border-[#2C1810]/20 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#2C1810] mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 rounded-lg border border-[#2C1810]/20 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2C1810] mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-2 rounded-lg border border-[#2C1810]/20 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2C1810] mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-2 rounded-lg border border-[#2C1810]/20 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
                      required
                    />
                  </div>
                  <div className="pt-4 flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-[#4ECDC4] text-white py-4 rounded-xl hover:bg-[#4ECDC4]/90 transition-colors flex items-center justify-center gap-2 text-lg"
                    >
                      <CreditCard size={20} />
                      Complete Purchase
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCardForm(false)}
                      className="flex-1 border-2 border-[#2C1810]/20 text-[#2C1810] py-4 rounded-xl hover:bg-[#2C1810]/5 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        setPaymentMethod('card');
                        handlePurchase();
                      }}
                      className="w-full bg-[#4ECDC4] text-white py-4 rounded-xl hover:bg-[#4ECDC4]/90 transition-colors flex items-center justify-center gap-2 text-lg"
                    >
                      <CreditCard size={20} />
                      Pay with Card
                    </button>
                    <button
                      onClick={() => {
                        setPaymentMethod('crypto');
                        handlePurchase();
                      }}
                      className="w-full border-2 border-[#4ECDC4] text-[#2C1810] py-4 rounded-xl hover:bg-[#4ECDC4]/10 transition-colors flex items-center justify-center gap-2 text-lg"
                    >
                      <Wallet size={20} />
                      Pay with ETH
                    </button>
                  </div>
                  {artwork.tokenId && (
                    <a
                      href={`https://opensea.io/assets/${artwork.contractAddress}/${artwork.tokenId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 text-[#4ECDC4] hover:text-[#4ECDC4]/80 transition-colors"
                    >
                      View on OpenSea
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};