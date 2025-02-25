import React from 'react';
import { Wallet } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';

export const ConnectWallet: React.FC = () => {
  const { account, connectWallet, isConnected } = useWeb3();

  return (
    <button
      onClick={connectWallet}
      className="flex items-center gap-2 bg-[#2C1810]/10 backdrop-blur-sm text-[#2C1810]/80 hover:text-[#2C1810] hover:bg-[#2C1810]/20 px-4 py-2 rounded-full transition-all duration-300"
    >
      <Wallet size={20} />
      {isConnected
        ? `${account?.slice(0, 6)}...${account?.slice(-4)}`
        : 'Connect Wallet'}
    </button>
  );
};