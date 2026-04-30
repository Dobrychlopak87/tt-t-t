import React, { useMemo, Fragment } from 'react';

export interface BeatLineProps {
  key?: string | number;
  text: string;
  weight: 400 | 500 | 700 | 800;
  scale: number;
  delay: number; // For lineIn stagger base
  typewriter?: boolean;
  charInterval?: number;
  startDelay?: number;
  wordSnapTarget?: string;
  wordSnapDelay?: number;
}

export default function BeatLine({ text, weight, scale, delay, typewriter, charInterval = 40, startDelay = 0, wordSnapTarget, wordSnapDelay }: BeatLineProps) {
  const content = useMemo(() => {
    if (typewriter) {
      const chars = text.split('');
      return chars.map((char, i) => {
        if (char === ' ') {
          return <span key={i}> </span>;
        }
        const charDelay = startDelay + i * charInterval;
        return (
          <span
            key={i}
            className="inline"
            style={{
              animation: `charIn 1ms linear both`,
              animationDelay: `${charDelay}ms`,
              opacity: 0,
            }}
          >
            {char}
          </span>
        );
      });
    }

    const words = text.split(' ');
    const snapStartIdx = wordSnapTarget ? text.indexOf(wordSnapTarget) : -1;
    let snapWordStartIdx = -1;
    let snapWordEndIdx = -1;

    if (wordSnapTarget && snapStartIdx !== -1) {
      const beforeString = text.substring(0, snapStartIdx);
      snapWordStartIdx = beforeString === "" ? 0 : beforeString.split(' ').length - 1;
      snapWordEndIdx = snapWordStartIdx + wordSnapTarget.split(' ').length;
    }

    return words.map((word, i) => {
      const isSnap = snapWordStartIdx !== -1 && i >= snapWordStartIdx && i < snapWordEndIdx;

      if (isSnap) {
        return (
          <Fragment key={i}>
            <span
              className="inline-block will-change-transform transform-gpu"
              style={{
                color: 'var(--accent)',
                animation: `wordSnap 380ms ease-out both`,
                animationDelay: `${wordSnapDelay}ms`,
                opacity: 0,
                textShadow: '0 0 20px rgba(255, 45, 85, 0.4), 0 2px 4px rgba(0,0,0,0.8)'
              }}
            >
              {word}
            </span>
            {i < words.length - 1 && ' '}
          </Fragment>
        );
      }

      return (
        <Fragment key={i}>
          <span
            className="inline-block will-change-transform transform-gpu"
            style={{
              animation: `lineIn 400ms cubic-bezier(0.22, 1, 0.36, 1) both`,
              animationDelay: `${delay + (i * 35)}ms`,
            }}
          >
            {word}
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      );
    });
  }, [text, typewriter, charInterval, startDelay, wordSnapTarget, wordSnapDelay, delay]);

  return (
    <div
      className="will-change-transform transform-gpu relative z-10"
      style={{
        fontWeight: weight,
        fontSize: `calc(var(--base-size) * ${scale})`,
        letterSpacing: weight >= 800 ? '-0.025em' : 'normal',
        lineHeight: 1.18,
        maxWidth: '100%',
        whiteSpace: 'pre-line',
        wordBreak: 'normal',
        overflowWrap: 'break-word',
        textWrap: 'pretty',
        WebkitTextStroke: '0.5px rgba(0, 0, 0, 0.5)',
        textShadow: '0 2px 16px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.7), 0 0 4px rgba(0,0,0,0.5)',
      }}
    >
      {content}
    </div>
  );
}
