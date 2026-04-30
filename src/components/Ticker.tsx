import React, { useLayoutEffect, useRef, Fragment } from 'react';

const TICKER_TEXT = "EU - FABRYKA ABSURDÓW - szczegóły znajdziesz w dostępnym artykule.";

const TickerContent = ({ text }: { text: string }) => {
  // Headings: Pure White
  // Details: Elegant Silver for depth and contrast
  const silverDetail = '#E5E5E5'; 
  
  return (
    <div className="flex items-center">
      <span className="text-white font-bold">EU -</span>
      <span className="text-white font-extrabold uppercase tracking-[0.1em] px-2">FABRYKA ABSURDÓW</span>
      <span style={{ color: silverDetail }} className="font-light">
        - szczegóły znajdziesz w dostępnym artykule.
      </span>
    </div>
  );
};

export default function Ticker() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (scrollRef.current) {
      // scrollWidth of the content to calculate duration
      const width = scrollRef.current.scrollWidth / 2; // Real text width since it's duplicated
      const duration = width / 60; // Slightly slower for better readability
      scrollRef.current.style.animationDuration = `${duration}s`;
    }
  }, []);

  return (
    <div 
      className="relative w-full h-full bg-[#C8102E] flex flex-col shadow-[0_-5px_20px_rgba(200,16,46,0.3)]"
      style={{
        borderTop: '2px solid #FFFFFF'
      }}
    >
      <div className="flex items-center h-[55px] w-full">
        {/* Info box with red background preserved */}
        <div className="h-full bg-[#C8102E] flex items-center shrink-0">
          <div className="w-[3px] h-full bg-[#FF1A1A] shrink-0"></div>
          <div 
            className="text-white h-full flex items-center shrink-0 px-3 pr-4"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: '0.05em',
              textTransform: 'none'
            }}
          >
            {"info".split('').map((char, i) => (
              <span
                key={i}
                style={{
                  opacity: 0,
                  animation: 'charIn 100ms ease-out forwards',
                  animationDelay: `${i * 50}ms`,
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        <div 
          className="flex-1 h-full overflow-hidden flex items-center"
          style={{
            maskImage: 'linear-gradient(90deg, transparent 0%, black 2%, black 98%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 2%, black 98%, transparent 100%)'
          }}
        >
          <div 
            ref={scrollRef}
            className="flex whitespace-nowrap will-change-transform gap-16 px-8"
            style={{
              animation: 'marquee linear infinite',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: '0.02em',
              marginTop: '2px'
            }}
          >
            {/* Duplicate text inside for seamless scroll */}
            <TickerContent text={TICKER_TEXT} />
            <TickerContent text={TICKER_TEXT} />
          </div>
        </div>
      </div>
    </div>
  );
}
