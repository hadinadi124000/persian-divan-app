
import React from 'react';
import { POETS } from '../constants';
import { Poet } from '../types';

interface SidebarProps {
  selectedPoetId: string | null;
  onSelectPoet: (id: string) => void;
  onHome: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedPoetId, onSelectPoet, onHome }) => {
  return (
    <aside className="w-full md:w-80 bg-emerald-950 text-orange-50 flex flex-col h-full border-l-4 border-red-900/50 overflow-y-auto">
      <div 
        onClick={onHome}
        className="p-10 border-b border-orange-900/30 cursor-pointer hover:bg-emerald-900 transition-all group"
      >
        <h1 className="text-4xl font-nastaliq text-center mb-2 text-orange-400 group-hover:text-red-500 transition-colors">دیوان پارسی</h1>
        <p className="text-[10px] text-center text-emerald-500 tracking-[0.3em] uppercase font-bold">The Golden Treasure</p>
      </div>
      
      <nav className="flex-1 p-6 space-y-3">
        <h2 className="text-xs font-bold text-red-500 mb-6 px-3 tracking-widest uppercase flex items-center gap-2">
          <span className="w-4 h-px bg-red-500" />
          فهرست سخنوران
        </h2>
        {POETS.map((poet) => (
          <button
            key={poet.id}
            onClick={() => onSelectPoet(poet.id)}
            className={`w-full text-right p-5 rounded-2xl transition-all flex items-center justify-between group ${
              selectedPoetId === poet.id 
                ? 'bg-gradient-to-l from-red-900/40 to-orange-900/20 text-orange-400 border border-red-800/50 shadow-lg' 
                : 'hover:bg-emerald-900/50 hover:text-white'
            }`}
          >
            <div className="flex flex-col">
              <span className={`text-xl font-medium ${selectedPoetId === poet.id ? 'font-bold' : ''}`}>{poet.name}</span>
              <span className="text-[10px] opacity-40 font-sans tracking-wider">{poet.englishName}</span>
            </div>
            <div className={`w-3 h-3 rounded-full border-2 border-red-500 transition-all ${selectedPoetId === poet.id ? 'bg-red-500 scale-125' : 'bg-transparent scale-0 group-hover:scale-75'}`} />
          </button>
        ))}
      </nav>

      <div className="p-8 bg-black/20 text-[11px] text-center space-y-3 border-t border-white/5">
        <p className="font-nastaliq text-emerald-400 text-lg">هنر برتر از گوهر آمد پدید</p>
        <div className="flex justify-center gap-2 opacity-30">
          <div className="w-1 h-1 rounded-full bg-red-500" />
          <div className="w-1 h-1 rounded-full bg-orange-500" />
          <div className="w-1 h-1 rounded-full bg-emerald-500" />
        </div>
        <p className="opacity-40">۱۴۰۳ هجری شمسی</p>
      </div>
    </aside>
  );
};

export default Sidebar;
