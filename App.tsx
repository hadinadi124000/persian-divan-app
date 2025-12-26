
import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import PoemDisplay from './components/PoemDisplay';
import FalSection from './components/FalSection';
import { POETS, SAMPLE_POEMS } from './constants';
import { searchAiPoems } from './services/geminiService';

const App: React.FC = () => {
  const [selectedPoetId, setSelectedPoetId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [aiSearchResults, setAiSearchResults] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const filteredPoems = useMemo(() => {
    if (!selectedPoetId) return [];
    return SAMPLE_POEMS.filter(p => p.poetId === selectedPoetId);
  }, [selectedPoetId]);

  const currentPoet = useMemo(() => {
    return POETS.find(p => p.id === selectedPoetId);
  }, [selectedPoetId]);

  const handleAiSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setIsSearching(true);
    setAiSearchResults(null);
    try {
      const result = await searchAiPoems(searchTerm);
      setAiSearchResults(result);
      setSelectedPoetId(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#fdfaf3] text-slate-900 selection:bg-orange-200 selection:text-red-900">
      <Sidebar 
        selectedPoetId={selectedPoetId} 
        onSelectPoet={(id) => {
          setSelectedPoetId(id);
          setAiSearchResults(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onHome={() => {
          setSelectedPoetId(null);
          setAiSearchResults(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <main className="flex-1 overflow-y-auto px-4 md:px-12 py-10">
        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-16">
          <form onSubmit={handleAiSearch} className="relative group">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="در گنجینه ادب تفحص کنید یا موضوعی برای سرودن بنویسید..."
              className="w-full py-5 px-8 pr-16 bg-white rounded-full shadow-2xl border-2 border-orange-50 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-lg"
            />
            <button 
              type="submit"
              className="absolute left-5 top-1/2 -translate-y-1/2 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white p-3 rounded-full hover:scale-110 transition-transform shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-orange-500 hidden md:block">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
            </div>
          </form>
        </div>

        {/* Hero Section / Dashboard */}
        {!selectedPoetId && !aiSearchResults && !isSearching && (
          <div className="space-y-16 animate-fade-in">
            <header className="text-center space-y-6">
              <h2 className="text-7xl font-nastaliq text-emerald-900 drop-shadow-sm">گلستان سخن پارسی</h2>
              <p className="text-orange-800 text-xl max-w-3xl mx-auto leading-loose font-light">
                خوش آمدید به درگاه زرین ادب ایران زمین. جایی که کلمات با عطر گل سرخ و جادوی خط نستعلیق در هم می‌آمیزند.
              </p>
              <div className="flex justify-center gap-4">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </header>
            
            <FalSection />

            <section>
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-3xl font-bold text-slate-800 border-r-8 border-red-600 pr-4">سرآمدان شعر و ادب</h3>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-200 mx-8" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {POETS.slice(0, 3).map(poet => (
                  <div 
                    key={poet.id} 
                    onClick={() => setSelectedPoetId(poet.id)}
                    className="bg-white p-5 rounded-[2.5rem] shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all cursor-pointer group border border-orange-50 relative overflow-hidden"
                  >
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      مشاهده آثار
                    </div>
                    <div className="aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 shadow-inner">
                      <img src={poet.image} alt={poet.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-red-700 transition-colors">{poet.name}</h4>
                    <p className="text-sm font-bold text-emerald-600 mb-3">{poet.century}</p>
                    <p className="text-slate-500 line-clamp-2 leading-relaxed">{poet.bio}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* AI Search Loading */}
        {isSearching && (
          <div className="flex flex-col items-center justify-center py-32 animate-pulse text-center">
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 border-4 border-orange-100 rounded-full" />
              <div className="absolute inset-0 border-4 border-t-red-600 border-r-emerald-600 rounded-full animate-spin" />
            </div>
            <p className="text-red-900 font-nastaliq text-4xl">در حال ورق زدن دیوان‌های کهن...</p>
            <p className="text-orange-600 mt-4">لحظاتی تامل بفرمایید</p>
          </div>
        )}

        {/* AI Search Results */}
        {aiSearchResults && (
          <div className="animate-fade-in pb-20">
            <button 
              onClick={() => setAiSearchResults(null)}
              className="mb-10 px-6 py-2 bg-emerald-100 text-emerald-800 rounded-full hover:bg-emerald-200 transition-all flex items-center gap-2 group"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              <span className="font-bold">بازگشت به بوستان</span>
            </button>
            <div className="max-w-4xl mx-auto bg-white p-16 rounded-[4rem] shadow-2xl border-t-[12px] border-red-700 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-0 opacity-50" />
              
              <h2 className="text-center text-5xl font-nastaliq text-red-950 mb-6 relative z-10">{aiSearchResults.poet || "ره‌آورد تفحص"}</h2>
              <div className="w-24 h-1 bg-emerald-600 mx-auto mb-12 rounded-full" />
              
              <div className="space-y-10 my-12 relative z-10">
                {aiSearchResults.verses?.map((v: string[], idx: number) => (
                  <div key={idx} className="flex flex-col md:flex-row gap-8 justify-center items-center font-nastaliq text-3xl text-slate-800 hover:text-emerald-700 transition-colors">
                    <span className="flex-1 text-center md:text-left">{v[0]}</span>
                    <span className="hidden md:inline text-orange-200 text-4xl">✽</span>
                    <span className="flex-1 text-center md:text-right">{v[1]}</span>
                  </div>
                ))}
              </div>
              
              <div className="p-10 bg-gradient-to-r from-emerald-50 to-orange-50 rounded-[2.5rem] border-r-8 border-emerald-600 text-lg text-slate-700 leading-relaxed shadow-inner">
                <span className="font-bold text-emerald-900 block mb-2">شرح یافته:</span>
                {aiSearchResults.explanation}
              </div>
            </div>
          </div>
        )}

        {/* Poet View */}
        {selectedPoetId && currentPoet && (
          <div className="animate-fade-in space-y-16 pb-20">
            <div className="relative h-80 md:h-[450px] rounded-[4rem] overflow-hidden shadow-2xl group">
              <img src={currentPoet.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" alt={currentPoet.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-red-950 via-red-950/40 to-transparent flex flex-col justify-end p-12 md:p-20">
                <div className="bg-orange-500 w-16 h-1 mb-6" />
                <h2 className="text-6xl md:text-8xl font-nastaliq text-amber-300 mb-4 drop-shadow-xl">{currentPoet.name}</h2>
                <p className="text-orange-100/90 text-lg md:text-2xl max-w-3xl leading-relaxed font-light">{currentPoet.bio}</p>
              </div>
            </div>

            <div className="space-y-12">
              <div className="flex items-center gap-6">
                <h3 className="text-4xl font-bold text-slate-800">جواهرات منظوم</h3>
                <div className="h-px flex-1 bg-gradient-to-r from-orange-400 to-transparent" />
              </div>
              {filteredPoems.length > 0 ? (
                filteredPoems.map(poem => <PoemDisplay key={poem.id} poem={poem} />)
              ) : (
                <div className="text-center py-24 bg-white/50 rounded-[3rem] border-4 border-dashed border-orange-100 shadow-inner">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-500">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  </div>
                  <p className="text-slate-600 mb-6 text-2xl font-nastaliq">هنوز در این بخش جواهری قرار نگرفته است.</p>
                  <button 
                    onClick={() => setSearchTerm(`یک غزل زیبا و دلنشین از ${currentPoet.name}`)}
                    className="px-8 py-3 bg-red-700 text-white rounded-full hover:bg-red-800 transition-all shadow-lg font-bold"
                  >
                    تفحص در دیوان با یاری اندیشه
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
