export type ArtworkType = 'physical' | 'digital' | 'giclee';
export type SaleStatus = 'upcoming' | 'active' | 'ended';

export interface EditionInfo {
  current: number;
  total: number;
}

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  price: number;
  imageUrl: string;
  description: string;
  dimensions: string;
  medium: string;
  type: ArtworkType;
  gicleePrice?: number;
  editions: {
    original: EditionInfo;
    giclee?: EditionInfo;
  };
  tokenId?: string;
  contractAddress?: string;
}

export interface AuctionLot extends Artwork {
  estimatedPrice: {
    low: number;
    high: number;
  };
  currentBid?: number;
  status: SaleStatus;
  auctionEndDate: string;
}

export interface ApparelItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  sizes: string[];
}

export interface CartItem {
  artwork: Artwork;
  quantity: number;
}