import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function analyze() {
  const images = ['public/bg1.png', 'public/bg2.png', 'public/bg3.png', 'public/bg4.png', 'public/bg5.png'];
  for (const imgPath of images) {
    if (!fs.existsSync(imgPath)) {
      console.log(`${imgPath} does not exist.`);
      continue;
    }
    const data = fs.readFileSync(imgPath);
    const base64 = data.toString('base64');
    try {
        const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            { role: 'user', parts: [
            { inlineData: { data: base64, mimeType: 'image/png' } },
            { text: 'Analyze this image. Tell me exactly where the "safe zones" are for placing white text, i.e. where is it darkest or least busy. Options: top, middle, bottom. Keep it to 1 sentence.' }
            ]}
        ]
        });
        console.log(`--- ${imgPath} ---`);
        console.log(response.text);
    } catch (e) {
        console.log(`Failed for ${imgPath}:`, e);
    }
  }
}
analyze();
