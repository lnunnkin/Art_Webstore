import React from 'react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabs = [
  { id: 'all', label: 'Gallery' },
  { id: 'auctions', label: 'Auctions' },
  { id: 'top-sellers', label: 'Top Sellers' },
  { id: 'apparel', label: 'Apparel' }
];

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="mb-16">
      <div className="flex justify-center space-x-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative py-2 px-1
              text-lg tracking-wide transition-colors duration-300
              ${activeTab === tab.id ? 'text-[#2C1810]' : 'text-[#8B7355] hover:text-[#2C1810]'}
            `}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D2B48C]" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};