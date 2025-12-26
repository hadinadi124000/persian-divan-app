
import React, { useState } from 'react';
import { getDailyFal } from '../services/geminiService';

const FalSection: React.FC = () => {
  const [fal, setFal] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const takeFal = async () => {
    setLoading(true);
    try {
      const result = await getDailyFal();
      setFal(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 bg-gradient-to-br from-red-900 via-orange-900 to-emerald-900 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group border-4 border-orange-400/20">
      <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-125 transition-transform duration-1000">
        <svg width="180" height="180" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"/></svg>
      </div>

      <div className="relative z-10 text-center">
        <h2 className="text-5xl font-nastaliq mb-6 text-orange-400 drop-shadow-lg">تفألی به دیوان لسان‌الغیب</h2>
        <p className="text-orange-100/80 mb-10 max-w-xl mx-auto text-lg">نیت پاک کنید و برای دریافت رهنمودی از عالم غیب، بر آستان حضرت حافظ دست بگشایید.</p>
        
        {!fal && (
          <button
            onClick={takeFal}
            disabled={loading}
            className="px-16 py-5 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white text-xl font-bold rounded-full transition-all transform hover:scale-110 shadow-[0_0_30px_rgba(249,115,22,0.4)] disabled:opacity-50"
          >
            {loading ? "در حال گشودن رموز..." : "یا علی، نیت کردم"}
          </button>
        )}

        {fal && (
          <div className="animate-fade-in bg-white/10 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/20 mt-6 text-right shadow-2xl">
            <h3 className="text-3xl font-nastaliq text-orange-300 text-center mb-8 border-b border-white/10 pb-4">{fal.poemTitle}</h3>
            <div className="space-y-6 mb-12">
              {fal.verses.map((couplet: string[], i: number) => (
                <div key={i} className="flex flex-col md:flex-row justify-center items-center gap-6 text-2xl font-nastaliq text-white/90">
                  <span>{couplet[0]}</span>
                  <span className="hidden md:inline text-red-500 text-3xl">❦</span>
                  <span>{couplet[1]}</span>
                </div>
              ))}
            </div>
            <div className="p-8 bg-black/30 rounded-3xl border-r-8 border-emerald-500">
              <h4 className="text-orange-400 font-bold mb-3 text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                تفسیر و راهنما:
              </h4>
              <p className="text-lg text-slate-100 leading-relaxed text-justify">{fal.interpretation}</p>
            </div>
            <div className="flex justify-center mt-8">
               <button 
                onClick={() => setFal(null)}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-orange-200 text-sm transition-all"
              >
                دوباره نیت کنید
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FalSection;
