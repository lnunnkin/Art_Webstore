import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleDot, Move } from 'lucide-react';
import { artworks } from '../data/artworks';
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'physical' | 'digital'>('all');
  const [hoveredArtwork, setHoveredArtwork] = useState<string | null>(null);
  const [visibleArtworks, setVisibleArtworks] = useState<Set<string>>(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [draggedArtwork, setDraggedArtwork] = useState<string | null>(null);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const galleryRef = useRef<HTMLDivElement>(null);
  const artworkRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const navigate = useNavigate();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const artworkId = entry.target.getAttribute('data-artwork-id');
            if (artworkId) {
              setVisibleArtworks((prev) => new Set([...prev, artworkId]));
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '50px',
      }
    );

    artworkRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const filteredArtworks = artworks.filter(artwork => 
    activeCategory === 'all' ? true : artwork.type === activeCategory
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setIsDragging(true);
    setDraggedArtwork(active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    setIsDragging(false);
    setDraggedArtwork(null);

    setPositions(prev => ({
      ...prev,
      [active.id]: {
        x: (prev[active.id]?.x || 0) + delta.x,
        y: (prev[active.id]?.y || 0) + delta.y,
      },
    }));
  };

  const resetPositions = () => {
    setPositions({});
  };

  return (
    <div className="relative">
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#F4ECE6]">
        <div className="absolute inset-0 bg-[#2C1810] mix-blend-multiply opacity-10" />
        
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${6 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
                opacity: 0.1,
              }}
            >
              <CircleDot
                size={100 + i * 50}
                className="text-[#D2B48C]"
                strokeWidth={1}
              />
            </div>
          ))}
        </div>
        
        <div className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        
        <div className="relative z-10 text-center">
          <div className="flex flex-col items-center">
            <div className="relative mb-4 animate-pulse">
              <CircleDot
                size={64}
                className="text-[#D2B48C]"
                strokeWidth={1.5}
              />
              <div className="absolute inset-0 bg-[#D2B48C]/20 rounded-full blur-xl scale-150" />
            </div>
            
            <div className="flex flex-col items-center relative">
              <h1 className="text-8xl font-light tracking-wider text-[#2C1810] mb-2 animate-fade-in">
                R3
              </h1>
              <div className="overflow-hidden">
                <p className="text-2xl uppercase tracking-[0.2em] text-[#8B7355] animate-slide-up">
                  Gallery
                </p>
              </div>
              
              <div className="absolute -left-20 top-1/2 w-16 h-px bg-[#D2B48C] animate-expand" />
              <div className="absolute -right-20 top-1/2 w-16 h-px bg-[#D2B48C] animate-expand" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-[#2C1810]/30 flex items-start justify-center p-2 backdrop-blur-sm">
            <div className="w-1 h-3 bg-[#2C1810]/30 rounded-full animate-scroll" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent backdrop-blur-sm" />
      </section>

      <main className="relative px-4 sm:px-6 lg:px-8 py-16 -mt-32 bg-white" ref={galleryRef}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-16">
            <div className="flex gap-12">
              {['all', 'physical', 'digital'].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category as any)}
                  className={`
                    relative text-xl font-light tracking-wide transition-all duration-500
                    ${activeCategory === category 
                      ? 'text-[#2C1810]' 
                      : 'text-[#2C1810]/60 hover:text-[#2C1810]'
                    }
                    group
                  `}
                >
                  <span className="relative z-10">
                    {category === 'all' ? 'All Works' :
                     category === 'physical' ? 'Fine Art' :
                     'Digital Art'}
                  </span>
                  <div 
                    className={`
                      absolute inset-0 -inset-x-6 -inset-y-3 rounded-full transition-all duration-500
                      ${activeCategory === category 
                        ? 'bg-[#2C1810]/5 scale-100' 
                        : 'bg-[#2C1810]/0 scale-90 group-hover:bg-[#2C1810]/5 group-hover:scale-100'
                      }
                    `}
                  />
                </button>
              ))}
            </div>
            <button
              onClick={resetPositions}
              className="flex items-center gap-2 px-4 py-2 text-[#2C1810]/60 hover:text-[#2C1810] transition-colors"
            >
              <Move size={20} />
              Reset Layout
            </button>
          </div>

          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArtworks.map((artwork) => (
                <div
                  key={artwork.id}
                  ref={(el) => {
                    if (el) artworkRefs.current.set(artwork.id, el);
                  }}
                  data-artwork-id={artwork.id}
                  style={{
                    transform: positions[artwork.id] 
                      ? `translate3d(${positions[artwork.id].x}px, ${positions[artwork.id].y}px, 0)` 
                      : undefined,
                    zIndex: draggedArtwork === artwork.id ? 50 : 1,
                    cursor: isDragging ? 'grabbing' : 'grab',
                  }}
                  className={`
                    artwork-card
                    relative rounded-2xl overflow-hidden bg-white
                    shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)]
                    hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]
                    transition-all duration-500 ease-in-out
                    ${isDragging ? 'touch-none' : ''}
                  `}
                >
                  <div className="absolute inset-0 opacity-10 mix-blend-overlay" 
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}
                  />
                  <div 
                    className="relative cursor-grab active:cursor-grabbing"
                    onMouseEnter={() => setHoveredArtwork(artwork.id)}
                    onMouseLeave={() => setHoveredArtwork(null)}
                    onClick={(e) => {
                      if (!isDragging) {
                        navigate(`/artwork/${artwork.id}`);
                      }
                    }}
                  >
                    <div className="relative overflow-hidden rounded-2xl">
                      <div className="relative pt-[100%]">
                        <img
                          src={artwork.imageUrl}
                          alt={artwork.title}
                          className="artwork-image absolute inset-0 w-full h-full object-contain bg-white"
                          draggable={false}
                        />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-light text-[#2C1810] mb-2">
                        {artwork.title}
                      </h3>
                      <p className="text-[#4A4A4A]">
                        by {artwork.artist}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DndContext>
        </div>
      </main>
    </div>
  );
};