import React from 'react';
import { X, Wallet, ExternalLink } from 'lucide-react';
import { Artwork } from '../types';
import { useWeb3 } from '../context/Web3Context';

interface ArtworkCardProps {
  artwork: Artwork;
}

interface ArtworkDetailDialogProps {
  artwork: Artwork;
  onClose: () => void;
}

const ArtworkDetailDialog: React.FC<ArtworkDetailDialogProps> = ({ artwork, onClose }) => {
  const { connectWallet, isConnected } = useWeb3();

  const handlePurchase = async () => {
    if (!isConnected) {
      await connectWallet();
    }
    // Handle purchase logic
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-lg flex items-center justify-center z-50">
      <div className="max-w-[90vw] w-full h-[90vh] flex flex-col">
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col lg:flex-row gap-8 overflow-y-auto p-4">
          {/* Image section */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative max-h-[70vh] w-full">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Info section */}
          <div className="lg:w-96 flex flex-col text-white">
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-light mb-2">{artwork.title}</h2>
                <p className="text-[#4ECDC4] text-xl">by {artwork.artist}</p>
              </div>

              <div className="space-y-4">
                <p className="text-white/80 leading-relaxed text-lg">
                  {artwork.description}
                </p>

                <div className="space-y-2">
                  <p className="text-white/60">{artwork.medium}</p>
                  <p className="text-white/60">{artwork.dimensions}</p>
                  {artwork.editions.original && (
                    <p className="text-white/60">
                      Edition {artwork.editions.original.current} of {artwork.editions.original.total}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-4xl font-light mb-8">
                  {artwork.type === 'digital' 
                    ? `${artwork.price} ETH`
                    : `$${artwork.price.toLocaleString()}`
                  }
                </p>

                {artwork.type === 'digital' ? (
                  <div className="space-y-4">
                    <button
                      onClick={handlePurchase}
                      className="w-full bg-[#4ECDC4] text-white py-4 rounded-xl hover:bg-[#4ECDC4]/90 transition-colors flex items-center justify-center gap-2 text-lg"
                    >
                      <Wallet size={20} />
                      {isConnected ? 'Purchase with ETH' : 'Connect Wallet to Purchase'}
                    </button>
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
                ) : (
                  <button
                    onClick={handlePurchase}
                    className="w-full bg-[#FFE66D] text-[#2C1810] py-4 rounded-xl hover:bg-[#FFE66D]/90 transition-colors text-lg font-medium"
                  >
                    Purchase
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <>
      <div 
        className="cursor-pointer group"
        onClick={() => setShowDetails(true)}
      >
        <div className="relative overflow-hidden rounded-2xl">
          <div className="relative pt-[100%]">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="absolute inset-0 w-full h-full object-contain bg-white transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-light text-[#2C1810] mb-2 group-hover:text-[#FF6B6B] transition-colors">
            {artwork.title}
          </h3>
          <p className="text-[#4A4A4A] group-hover:text-[#4ECDC4] transition-colors">
            by {artwork.artist}
          </p>
        </div>
      </div>

      {showDetails && (
        <ArtworkDetailDialog
          artwork={artwork}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

export default ArtworkCard;

export { ArtworkCard }