
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getPoemInterpretation = async (verses: string[][]) => {
  const poemText = verses.map(v => v.join(' / ')).join('\n');
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `لطفاً این شعر را تفسیر کنید و معنی و مفهوم آن را به زبان ساده بیان کنید:\n\n${poemText}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          meaning: { type: Type.STRING, description: 'تفسیر کلی شعر' },
          moral: { type: Type.STRING, description: 'پیام اخلاقی یا عرفانی' },
          context: { type: Type.STRING, description: 'زمینه تاریخی یا ادبی' }
        },
        required: ['meaning', 'moral', 'context']
      }
    }
  });

  return JSON.parse(response.text);
};

export const getDailyFal = async () => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "یک غزل از حافظ انتخاب کن و یک 'فال' کوتاه بر اساس آن بنویس. پاسخ باید در قالب JSON باشد.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          poemTitle: { type: Type.STRING },
          verses: {
            type: Type.ARRAY,
            items: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          interpretation: { type: Type.STRING }
        },
        required: ['poemTitle', 'verses', 'interpretation']
      }
    }
  });

  return JSON.parse(response.text);
};

export const searchAiPoems = async (query: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `در مورد موضوع زیر چند بیت شعر از شاعران بزرگ پارسی پیدا کن یا بنویس: ${query}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          poet: { type: Type.STRING },
          verses: {
            type: Type.ARRAY,
            items: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          explanation: { type: Type.STRING }
        }
      }
    }
  });
  return JSON.parse(response.text);
};
