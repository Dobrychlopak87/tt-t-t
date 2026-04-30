import React from 'react';
import { motion } from 'framer-motion';
import BeatLine, { BeatLineProps } from './BeatLine';

export interface BeatConfig {
  id: string;
  startMs: number;
  entryMs: number;
  holdMs: number;
  exitMs: number;
  lines: BeatLineProps[];
  bgImage?: string;
  textAlignment?: 'top' | 'center' | 'bottom';
}

interface BeatCardProps {
  key?: string | number;
  beat: BeatConfig;
  isActive: boolean;
  isExiting: boolean;
}

export default function BeatCard({ beat, isActive, isExiting }: BeatCardProps) {
  let alignmentClass = "justify-center";
  if (beat.textAlignment === 'top') alignmentClass = "justify-start pt-12";
  if (beat.textAlignment === 'bottom') alignmentClass = "justify-end pb-12";

  return (
    <motion.div
      initial={{ opacity: 0, y: -15, filter: 'blur(8px)', scale: 0.98 }}
      animate={{ 
        opacity: isExiting ? 0 : 1, 
        y: isExiting ? 10 : 0, 
        filter: isExiting ? 'blur(10px)' : 'blur(0px)',
        scale: isExiting ? 0.95 : 1 
      }}
      exit={{ opacity: 0, y: 20, filter: 'blur(12px)' }}
      transition={{ 
        duration: isExiting ? (beat.exitMs / 1000) : 1.2,
        ease: [0.215, 0.61, 0.355, 1] 
      }}
      className={`absolute inset-0 flex flex-col ${alignmentClass} gap-3 px-6 pointer-events-none`}
      style={{
        maxWidth: 380,
        margin: '0 auto'
      }}
    >
      {beat.lines.map((line, i) => (
        <BeatLine key={i} {...line} />
      ))}
    </motion.div>
  );
}
