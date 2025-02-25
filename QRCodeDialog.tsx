import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X } from 'lucide-react';
import { Artwork } from '../types';

interface QRCodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  artwork: Artwork;
}

export const QRCodeDialog: React.FC<QRCodeDialogProps> = ({ isOpen, onClose, artwork }) => {
  if (!isOpen) return null;

  // Create a URL-friendly string for the artwork data
  const artworkData = {
    id: artwork.id,
    title: artwork.title,
    artist: artwork.artist,
    price: artwork.price,
    gicleePrice: artwork.gicleePrice,
    imageUrl: artwork.imageUrl,
    medium: artwork.medium,
    dimensions: artwork.dimensions
  };

  const qrValue = `${window.location.origin}/artwork/${artwork.id}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-[#2C1810]">{artwork.title}</h3>
          <button
            onClick={onClose}
            className="text-[#8B7355] hover:text-[#2C1810]"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <QRCodeSVG
            value={qrValue}
            size={200}
            level="H"
            includeMargin
            fgColor="#2C1810"
          />
          <p className="text-[#8B7355] text-center text-sm">
            Scan this QR code to view detailed information about this artwork
          </p>
        </div>
      </div>
    </div>
  );
};