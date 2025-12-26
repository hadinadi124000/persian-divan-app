
import React, { useState } from 'react';
import { Poem, Interpretation } from '../types';
import { getPoemInterpretation } from '../services/geminiService';
import { Patterns } from '../constants';

interface PoemDisplayProps {
  poem: Poem;
}

const PoemDisplay: React.FC<PoemDisplayProps> = ({ poem }) => {
  const [interpretation, setInterpretation] = useState<Interpretation | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInterpret = async () => {
    setLoading(true);
    try {
      const result = await getPoemInterpretation(poem.verses);
      setInterpretation(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-12 p-10 bg-white/70 backdrop-blur-md rounded-[3rem] shadow-2xl border-2 border-orange-100 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full">
        <Patterns.FloralBorder />
      </div>

      <div className="text-center mb-12 mt-6">
        <h2 className="text-4xl font-nastaliq text-red-900 mb-3 group-hover:scale-105 transition-transform duration-500">{poem.title}</h2>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto rounded-full" />
      </div>

      <div className="space-y-8 mb-14 px-4 md:px-10">
        {poem.verses.map((couplet, idx) => (
          <div key={idx} className="flex flex-col md:flex-row gap-6 md:gap-16 justify-center items-center font-nastaliq text-2xl md:text-3xl text-slate-800 leading-relaxed group/verse">
            <div className="flex-1 text-center md:text-left transition-all group-hover/verse:text-emerald-700">{couplet[0]}</div>
            <div className="hidden md:flex items-center justify-center">
               <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
            </div>
            <div className="flex-1 text-center md:text-right transition-all group-hover/verse:text-emerald-700">{couplet[1]}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mb-10">
        <button
          onClick={handleInterpret}
          disabled={loading}
          className="px-10 py-4 bg-gradient-to-r from-orange-600 to-red-700 text-white rounded-full hover:from-orange-500 hover:to-red-600 transition-all shadow-xl hover:shadow-orange-200 flex items-center gap-3 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          )}
          <span className="font-bold">کشف معنا و لایه‌های پنهان</span>
        </button>
      </div>

      {interpretation && (
        <div className="bg-emerald-50/90 p-8 rounded-[2rem] border-2 border-emerald-100 animate-fade-in shadow-inner">
          <h3 className="text-xl font-bold text-emerald-900 mb-4 border-b-2 border-emerald-200 pb-2 flex items-center gap-2">
            <span className="w-2 h-6 bg-red-600 rounded-full" />
            شرح و بسط معانی
          </h3>
          <p className="text-slate-700 leading-loose text-lg mb-6 text-justify">{interpretation.meaning}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/50 p-4 rounded-xl border border-orange-100">
              <h4 className="text-sm font-bold text-orange-700 uppercase mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 14.95a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707zM16 18a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                پیام اخلاقی و عرفانی
              </h4>
              <p className="text-sm text-slate-600 italic leading-relaxed">{interpretation.moral}</p>
            </div>
            <div className="bg-white/50 p-4 rounded-xl border border-emerald-100">
              <h4 className="text-sm font-bold text-emerald-700 uppercase mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.993 7.993 0 002 12a8 8 0 008 8 8 8 0 008-8 7.993 7.993 0 00-7-7.196V4a1 1 0 00-2 0v.804z" /></svg>
                زمینه ادبی و تاریخی
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">{interpretation.context}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="absolute bottom-0 right-0 w-full transform rotate-180">
        <Patterns.FloralBorder />
      </div>
    </div>
  );
};

export default PoemDisplay;
