import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Cart } from './components/Cart';
import { CartItem, ArtworkType } from './types';
import { ConnectWallet } from './components/ConnectWallet';
import { Gallery } from './pages/Gallery';
import { ArtworkPage } from './pages/ArtworkPage';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (artworkId: string, type: ArtworkType) => {
    setCartItems(prev => {
      const artwork = prev.find(item => item.artwork.id === artworkId);
      if (artwork) {
        return prev.map(item =>
          item.artwork.id === artworkId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { artwork: { id: artworkId, type }, quantity: 1 }];
    });
  };

  const removeFromCart = (artworkId: string, type: ArtworkType) => {
    setCartItems(prev => prev.filter(item => 
      !(item.artwork.id === artworkId && item.artwork.type === type)
    ));
  };

  return (
    <div className="min-h-screen bg-[#F4ECE6]">
      <Header 
        cartItemsCount={cartItems.length}
        onCartClick={() => setIsCartOpen(true)}
      >
        <ConnectWallet />
      </Header>

      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/artwork/:id" element={<ArtworkPage onAddToCart={addToCart} />} />
      </Routes>

      <Cart
        items={cartItems}
        onRemoveItem={removeFromCart}
        onClose={() => setIsCartOpen(false)}
        isOpen={isCartOpen}
      />
    </div>
  );
}

export default App