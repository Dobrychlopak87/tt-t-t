import fs from 'fs';
import { PNG } from 'pngjs';

const images = [
  'public/bg1.png',
  'public/bg2.png',
  'public/bg3.png',
  'public/bg4.png',
  'public/bg5.png'
];

async function analyzeImages() {
  for (const img of images) {
    if (!fs.existsSync(img)) {
      console.log(`File not found: ${img}`);
      continue;
    }
    
    await new Promise((resolve) => {
      fs.createReadStream(img)
        .pipe(new PNG())
        .on('parsed', function() {
          const height = this.height;
          const width = this.width;
          const sectionHeight = Math.floor(height / 3);
          
          let sumTop = 0, sumMid = 0, sumBot = 0;
          let countTop = 0, countMid = 0, countBot = 0;

          for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
              const idx = (width * y + x) << 2;
              const r = this.data[idx];
              const g = this.data[idx + 1];
              const b = this.data[idx + 2];
              // const a = this.data[idx + 3];

              // perceived brightness
              const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
              
              if (y < sectionHeight) {
                sumTop += brightness;
                countTop++;
              } else if (y < sectionHeight * 2) {
                sumMid += brightness;
                countMid++;
              } else {
                sumBot += brightness;
                countBot++;
              }
            }
          }
          
          const avgTop = sumTop / countTop;
          const avgMid = sumMid / countMid;
          const avgBot = sumBot / countBot;
          
          let safest = 'top';
          let min = avgTop;
          if (avgMid < min) { min = avgMid; safest = 'center'; }
          if (avgBot < min) { min = avgBot; safest = 'bottom'; }
          
          console.log(`${img} -> Top: ${avgTop.toFixed(1)}, Mid: ${avgMid.toFixed(1)}, Bot: ${avgBot.toFixed(1)} >> Best (darkest): ${safest}`);
          resolve();
        });
    });
  }
}

analyzeImages();
