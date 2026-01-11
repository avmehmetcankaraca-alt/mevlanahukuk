
import React from 'react';
import { Page } from '../types';

interface SidebarProps {
  activePage: Page;
  setPage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setPage }) => {
  const menuItems = [
    { id: Page.Dashboard, label: 'Ana Sayfa', icon: 'fa-house-chimney' },
    { id: Page.Generator, label: 'Dilekçe Hazırla', icon: 'fa-pen-nib' },
    { id: Page.Research, label: 'İçtihat Ara', icon: 'fa-magnifying-glass-chart' },
    { id: Page.History, label: 'Belge Arşivi', icon: 'fa-folder-tree' },
  ];

  return (
    <aside className="w-72 bg-[#0a192f] text-white flex flex-col shadow-2xl h-full relative z-30">
      <div className="p-10 border-b border-white/5 bg-[#112240]/50">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-blue-600/20 p-4 rounded-2xl border border-blue-500/30">
            <i className="fa-solid fa-scale-balanced text-4xl text-blue-400"></i>
          </div>
          <div className="text-center">
            <h1 className="font-black text-xl tracking-tighter">MEVLANA GRUP</h1>
            <p className="text-[10px] text-blue-300/50 uppercase tracking-[0.3em] font-bold">Hukuk Teknolojileri</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-10 px-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
              activePage === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20 translate-x-1' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <i className={`fa-solid ${item.icon} w-6 text-xl transition-transform group-hover:scale-110`}></i>
            <span className="font-bold tracking-tight">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-8 border-t border-white/5">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Gemini 3 Pro Active</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
