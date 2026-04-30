import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import BeatCard, { BeatConfig } from './BeatCard';
import { BeatLineProps } from './BeatLine';

interface BeatDef {
  entryMs?: number;
  holdMs?: number;
  exitMs?: number;
  lines: BeatLineProps[];
  bgImage?: string;
  textAlignment?: 'top' | 'center' | 'bottom';
}

const BEAT_DEFINITIONS: BeatDef[] = [
  {
    entryMs: 1200,
    holdMs: 8500,
    exitMs: 400,
    bgImage: '/bg5.png',
    textAlignment: 'bottom',
    lines: [
      { text: "Akt o Usługach Cyfrowych reguluje co platformy mogą pokazywać. Nie reguluje którędy płyną bity danych zanim w ogóle dotrą do platformy.", weight: 500, scale: 0.85, delay: 0 },
      { text: "To jakby wprowadzić rygorystyczne przepisy dotyczące etykiet na butelkach wody,", weight: 700, scale: 0.9, delay: 200 },
      { text: "ignorując fakt że wodociągi należą do kogoś innego i przebiegają przez cudze terytorium.", weight: 800, scale: 1.0, delay: 500, wordSnapTarget: "cudze terytorium.", wordSnapDelay: 700 }
    ]
  },
  {
    entryMs: 800,
    holdMs: 11000,
    exitMs: 500,
    bgImage: '/bg1.png',
    textAlignment: 'bottom',
    lines: [
      { text: "Wszystko zaczęło się od jednej linii kodu — skryptu Beacon od Cloudflare wstrzykiwanego bez zgody przez platformę AI do cudzej aplikacji. Jeden niepozorny skrypt. A pociągnięcie za tę nitkę ujawniło architekturę globalnego internetu, decyzje polityczne Komisji Europejskiej i dostęp izraelskich służb do danych 450 milionów Europejczyków.", weight: 500, scale: 0.7, delay: 0 },
      { text: "Czasem największe odkrycia zaczynają się od najmniejszego szczegółu", weight: 700, scale: 1.0, delay: 300 },
      { text: "który nie powinien tam być.", weight: 800, scale: 1.4, delay: 600, wordSnapTarget: "nie powinien tam być.", wordSnapDelay: 750 }
    ]
  },
  {
    entryMs: 1000,
    holdMs: 8000,
    exitMs: 400,
    bgImage: '/bg2.png',
    textAlignment: 'bottom',
    lines: [
      { text: "Płacisz za RODO jak za polisę ubezpieczeniową, która chroni Cię przed kradzieżą w domu —", weight: 500, scale: 0.95, delay: 0 },
      { text: "ale Twoje okno jest otwarte od strony ogrodu i wszyscy o tym wiedzą. Składka jest realna.", weight: 500, scale: 0.95, delay: 200 },
      { text: "Ochrona jest papierowa.", weight: 800, scale: 1.5, delay: 500, wordSnapTarget: "Ochrona jest papierowa.", wordSnapDelay: 650 }
    ]
  },
  {
    entryMs: 1100,
    holdMs: 9000,
    exitMs: 500,
    bgImage: '/bg3.png',
    textAlignment: 'bottom',
    lines: [
      { text: "Europa stworzyła najbardziej rygorystyczne prawo ochrony danych na świecie, a następnie oficjalnie uznała za \"bezpieczny\" kraj,", weight: 500, scale: 0.85, delay: 0 },
      { text: "w którym służby wywiadowcze mają ustawowy dostęp do cudzych danych bez nakazu sądowego.", weight: 700, scale: 0.85, delay: 200 },
      { text: "To jakby wprowadzić zakaz palenia i otworzyć okno nad popielniczką.", weight: 800, scale: 1.1, delay: 500, wordSnapTarget: "okno nad popielniczką.", wordSnapDelay: 700 }
    ]
  },
  {
    entryMs: 900,
    holdMs: 9000,
    exitMs: 400,
    bgImage: '/bg5.png',
    textAlignment: 'bottom',
    lines: [
      { text: "Nie możesz mieć cyfrowej suwerenności jeśli 20% internetu przepływa przez jedną firmę,", weight: 500, scale: 0.9, delay: 0 },
      { text: "która rozpakowuje Twoje szyfrowanie w jurysdykcji której nie kontrolujesz.", weight: 700, scale: 0.9, delay: 200 },
      { text: "Suwerenność kończy się tam gdzie kończy się własna infrastruktura — a Europa tej infrastruktury nie posiada.", weight: 800, scale: 1.0, delay: 500, typewriter: true, charInterval: 25, startDelay: 700 }
    ]
  },
  {
    entryMs: 1200,
    holdMs: 8500,
    exitMs: 500,
    bgImage: '/bg4.png',
    textAlignment: 'bottom',
    lines: [
      { text: "Komisja Europejska utrzymuje że Izrael zapewnia \"zasadniczo równoważną\" ochronę danych co RODO. W tym samym czasie izraelskie służby otrzymały ustawowe prawo do danych bez nakazów sądowych.", weight: 500, scale: 0.8, delay: 0 },
      { text: "To nie jest błąd analityczny.", weight: 700, scale: 1.2, delay: 300 },
      { text: "To jest wybór polityczny ukryty za językiem prawniczym.", weight: 800, scale: 1.2, delay: 600, wordSnapTarget: "wybór polityczny", wordSnapDelay: 700 }
    ]
  },
  {
    entryMs: 900,
    holdMs: 8500,
    exitMs: 400,
    bgImage: '/bg4.png',
    textAlignment: 'bottom',
    lines: [
      { text: "Jeśli Microsoft — korporacja z budżetem bezpieczeństwa większym niż PKB wielu państw —", weight: 500, scale: 0.85, delay: 0 },
      { text: "nie był w stanie skontrolować co robią byli oficerowie wywiadu z danymi na jego platformie,", weight: 700, scale: 0.85, delay: 200 },
      { text: "to jaką ochronę ma szpital w Gdańsku, szkoła w Rzeszowie albo przychodnia w Lublinie?", weight: 800, scale: 1.1, delay: 500 }
    ]
  },
  {
    entryMs: 1300,
    holdMs: 9000,
    exitMs: 500,
    bgImage: '/bg2.png',
    textAlignment: 'bottom',
    lines: [
      { text: "86% europejskich firm zatrudnia ludzi wyłącznie do sprawdzania zgodności z przepisami. To znaczy że co dziesiąty pracownik w wielu organizacjach nie tworzy żadnej wartości — tylko pilnuje żeby ktoś inny nie zapłacił kary.", weight: 500, scale: 0.75, delay: 0 },
      { text: "Ten koszt nie spada na regulatora.", weight: 700, scale: 1.1, delay: 300 },
      { text: "Spada na cenę produktu który kupujesz.", weight: 800, scale: 1.2, delay: 600, wordSnapTarget: "który kupujesz.", wordSnapDelay: 700 }
    ]
  },
  {
    entryMs: 1000,
    holdMs: 8500,
    exitMs: 400,
    bgImage: '/bg5.png',
    textAlignment: 'bottom',
    lines: [
      { text: "Cloudflare oferuje narzędzie które chroni Twoje dane przed przetwarzaniem poza UE. Jest dostępne wyłącznie w planie Enterprise, którego cena nie jest publiczna i wymaga negocjacji.", weight: 500, scale: 0.8, delay: 0 },
      { text: "Ochrona prywatności stała się produktem premium —", weight: 700, scale: 1.1, delay: 300 },
      { text: "dla reszty pozostaje marketing w postaci ikony kłódki w przeglądarce.", weight: 800, scale: 1.0, delay: 600, typewriter: true, charInterval: 25, startDelay: 800 }
    ]
  },
  {
    entryMs: 1200,
    holdMs: 9000,
    exitMs: 700,
    bgImage: '/bg5.png',
    textAlignment: 'bottom',
    lines: [
      { text: "Europa posiada mniej niż 5% globalnej mocy obliczeniowej potrzebnej do trenowania modeli sztucznej inteligencji. Jednocześnie dane europejskich obywateli — rozpakowane przez Cloudflare w Tel Awiwie — mogą służyć do trenowania modeli konkurencji.", weight: 500, scale: 0.75, delay: 0 },
      { text: "Europa eksportuje dane wejściowe i importuje gotowe produkty.", weight: 700, scale: 1.0, delay: 200 },
      { text: "To jest definicja kolonii.", weight: 800, scale: 1.6, delay: 500, wordSnapTarget: "definicja kolonii.", wordSnapDelay: 600 }
    ]
  },
  {
    entryMs: 1100,
    holdMs: 8500,
    exitMs: 500,
    bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    textAlignment: 'center',
    lines: [
      { text: "Niewidzialne granice decydują o kształcie świata w którym pracujemy, rozmawiamy i płacimy.", weight: 500, scale: 0.85, delay: 0 },
      { text: "Dopóki nie zrozumiemy jak przepływają nasze dane,", weight: 700, scale: 0.9, delay: 200 },
      { text: "będziemy tylko najemcami we własnym cyfrowym państwie.", weight: 800, scale: 1.0, delay: 500, wordSnapTarget: "cyfrowym państwie.", wordSnapDelay: 700 }
    ]
  },
  {
    entryMs: 1500,
    holdMs: 9000,
    exitMs: 1200,
    bgImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    textAlignment: 'bottom',
    lines: [
      { text: "Technologia dawno przestała być neutralnym narzędziem.", weight: 500, scale: 0.9, delay: 0 },
      { text: "Infrastruktura to dzisiaj instrument geopolityki i projekcji władzy.", weight: 700, scale: 0.9, delay: 200 },
      { text: "Czas zacząć budować własną.", weight: 800, scale: 1.2, delay: 500, typewriter: true, charInterval: 30, startDelay: 700 }
    ]
  }
];

export const UNIQUE_BG_IMAGES = Array.from(new Set(BEAT_DEFINITIONS.map(d => d.bgImage).filter(Boolean))) as string[];

if (typeof window !== 'undefined') {
  // Preload images into browser cache instantly
  UNIQUE_BG_IMAGES.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

let currentTime = 400;
const BEATS: BeatConfig[] = BEAT_DEFINITIONS.map((def, i) => {
  const entryMs = def.entryMs || 1000;
  const holdMs = def.holdMs || 8000;
  const exitMs = def.exitMs || 280;
  
  const beat = {
    id: `beat${i+1}`,
    startMs: currentTime,
    entryMs,
    holdMs,
    exitMs,
    lines: def.lines,
    bgImage: def.bgImage,
    textAlignment: def.textAlignment
  };
  
  currentTime += entryMs + holdMs; 
  return beat;
});

interface SequenceProps {
  onBgChange?: (url: string) => void;
}

export default function Sequence({ onBgChange }: SequenceProps) {
  const [activeBeats, setActiveBeats] = useState<{ id: string; isExiting: boolean }[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    let isCancelled = false;

    const startSequence = () => {
      if (isCancelled) return;
      setActiveBeats([]);
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];

      BEATS.forEach((beat) => {
        // Enter
        const enterTimeout = setTimeout(() => {
          setActiveBeats(prev => [...prev, { id: beat.id, isExiting: false }]);
          if (onBgChange && beat.bgImage) {
            onBgChange(beat.bgImage);
          }
        }, beat.startMs);
        timeoutsRef.current.push(enterTimeout);

        // Exit
        const exitMs = beat.startMs + beat.entryMs + beat.holdMs;
        const exitTimeout = setTimeout(() => {
          setActiveBeats(prev => prev.map(b => b.id === beat.id ? { ...b, isExiting: true } : b));
        }, exitMs);
        timeoutsRef.current.push(exitTimeout);

        // Remove
        const removeMs = exitMs + beat.exitMs;
        const removeTimeout = setTimeout(() => {
          setActiveBeats(prev => prev.filter(b => b.id !== beat.id));
        }, removeMs);
        timeoutsRef.current.push(removeTimeout);
      });

      // Restart sequence
      const lastBeat = BEATS[BEATS.length - 1];
      const totalTime = lastBeat.startMs + lastBeat.entryMs + lastBeat.holdMs + lastBeat.exitMs + 700;
      
      const restartTimeout = setTimeout(() => {
        startSequence();
      }, totalTime);
      timeoutsRef.current.push(restartTimeout);
    };

    startSequence();

    return () => {
      isCancelled = true;
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {BEATS.map(beat => {
          const activeState = activeBeats.find(b => b.id === beat.id);
          if (!activeState) return null;
          
          return (
            <BeatCard
              key={beat.id}
              beat={beat}
              isActive={true}
              isExiting={activeState.isExiting}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
