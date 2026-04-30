/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Ticker from './components/Ticker';
import Sequence, { UNIQUE_BG_IMAGES } from './components/Sequence';

export default function App() {
  const [currentBg, setCurrentBg] = useState<string>('');

  const handleBgChange = (url: string) => {
    setCurrentBg(url);
  };

  return (
    <div className="relative w-full max-w-[430px] h-[100dvh] bg-black overflow-hidden mx-auto shadow-2xl">
      {/* Dynamic Backgrounds with Crossfade using AnimatePresence */}
      <AnimatePresence mode="popLayout">
        <motion.div 
          key={currentBg}
          initial={{ opacity: 0, scale: 1.1, filter: 'blur(30px) brightness(1.8) saturate(0)' }}
          animate={{ opacity: 1, scale: 1.05, filter: 'blur(0px) brightness(1) saturate(1)' }}
          exit={{ opacity: 0, scale: 1.0, filter: 'blur(15px) brightness(0.6) saturate(0.5)' }}
          transition={{ 
            opacity: { duration: 2.8, ease: [0.4, 0, 0.2, 1] },
            scale: { duration: 4.5, ease: "linear" },
            filter: { duration: 2.5, ease: "easeInOut" }
          }}
          className="absolute inset-0 z-0"
        >
          {/* Blurred background to fill screen */}
          <div 
            className="absolute inset-0 bg-cover bg-top blur-3xl opacity-40 animate-ken-burns-blur"
            style={{ backgroundImage: `url('${currentBg.startsWith('http') || currentBg.startsWith('/') ? currentBg : `/${currentBg}`}')` }}
          />
          {/* Sharp, fully contained image */}
          <div 
            className="absolute inset-0 bg-contain bg-no-repeat opacity-90 animate-ken-burns"
            style={{ 
              backgroundImage: `url('${currentBg.startsWith('http') || currentBg.startsWith('/') ? currentBg : `/${currentBg}`}')`,
              backgroundPosition: 'top center',
            }}
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Subtle overlay gradient to ensure text legibility */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.9) 100%)'
        }}
      />

      {/* Background Effects */}
      <div 
        className="absolute inset-[-5%] z-0 pointer-events-none will-change-transform mix-blend-screen opacity-[0.038]"
        style={{
          background: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="1" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>')`,
          backgroundSize: '180px 180px',
          animation: 'grain 2s steps(6, end) infinite'
        }}
      />
      
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.018) 3px, rgba(0,0,0,0.018) 4px)'
        }}
      />

      {/* Safe Area / Content Zone */}
      <div className="absolute inset-0 z-30 transition-opacity duration-1000 opacity-100">
        
        {/* TikTok Text Safe Zone */}
        {/* Roughly: left 8%, right 18%, top 9%, bottom 26% */}
        <div className="absolute top-[9%] bottom-[26%] left-[8%] right-[18%] pointer-events-none">
          <Sequence onBgChange={handleBgChange} />
        </div>
        
        {/* Ticker area covers bottom and extends downwards */}
        <div className="absolute bottom-0 w-full h-[26%]">
          <Ticker />
        </div>
      </div>
    </div>
  );
}
