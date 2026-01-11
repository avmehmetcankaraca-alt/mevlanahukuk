
import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';

const Research: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ text: string; sources: any[] } | null>(null);

  const handleSearch = async () => {
    if (!query) return;
    setIsLoading(true);
    try {
      const service = new GeminiService();
      const res = await service.performLegalResearch(query);
      setResult(res);
    } catch (err) {
      console.error(err);
      alert("Araştırma hatası: Servis şu an meşgul.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in zoom-in-95 duration-700">
      <div className="bg-[#0a192f] p-12 rounded-[48px] shadow-2xl relative overflow-hidden group">
        <div className="relative z-10">
          <h3 className="text-3xl font-black text-white tracking-tighter mb-4">Akıllı İçtihat Taraması</h3>
          <p className="text-blue-200/60 mb-10 max-w-lg leading-relaxed font-medium">
            Türk hukuk sistemi, güncel Yargıtay ilamları ve doktrin görüşleri arasında yapay zeka destekli profesyonel arama yapın.
          </p>
          
          <div className="relative group/input">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Dava konusu veya hukuki uyuşmazlığı yazın..."
              className="w-full p-6 pr-44 rounded-[28px] bg-white/10 border-2 border-white/5 focus:border-blue-500 focus:bg-white focus:text-slate-900 outline-none transition-all text-lg placeholder:text-white/20"
            />
            <button 
              onClick={handleSearch}
              disabled={isLoading || !query}
              className={`absolute right-3 top-3 bottom-3 px-10 rounded-2xl font-black shadow-xl flex items-center gap-3 transition-all active:scale-95 ${
                isLoading || !query ? 'bg-white/10 text-white/20' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/40'
              }`}
            >
              {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <><i className="fa-solid fa-magnifying-glass"></i> ARA</>}
            </button>
          </div>
        </div>
        <i className="fa-solid fa-gavel absolute -right-10 -bottom-10 text-[240px] text-white/5 -rotate-12"></i>
      </div>

      {result && (
        <div className="space-y-8 animate-in slide-in-from-top-10 duration-500">
          <div className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <i className="fa-solid fa-book-bookmark text-xl"></i>
              </div>
              <h4 className="text-xl font-black text-slate-800 tracking-tight">Uzman Mütalaası & Tespitler</h4>
            </div>
            <div className="text-slate-700 leading-[1.8] text-lg font-medium whitespace-pre-wrap">
              {result.text}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.sources.map((source, idx) => (
              <a 
                key={idx} 
                href={source.uri} 
                target="_blank" 
                className="p-6 rounded-[24px] bg-white border border-slate-100 hover:border-blue-500 hover:shadow-xl transition-all group flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <i className="fa-solid fa-link text-sm"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-blue-500 uppercase tracking-widest mb-1">Dış Kaynak</p>
                  <p className="text-sm font-bold text-slate-800 truncate">{source.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Research;
