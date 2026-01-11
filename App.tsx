
import React, { useState, useEffect } from 'react';
import { Page, GeneratedDocument } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Generator from './pages/Generator';
import History from './pages/History';
import Research from './pages/Research';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);
  const [history, setHistory] = useState<GeneratedDocument[]>(() => {
    const saved = localStorage.getItem('doc_history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('doc_history', JSON.stringify(history));
  }, [history]);

  const handleSaveDoc = (doc: GeneratedDocument) => {
    setHistory(prev => [doc, ...prev]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.Dashboard:
        return <Dashboard setPage={setCurrentPage} history={history} />;
      case Page.Generator:
        return <Generator onSave={handleSaveDoc} />;
      case Page.Research:
        return <Research />;
      case Page.History:
        return <History history={history} />;
      default:
        return <Dashboard setPage={setCurrentPage} history={history} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans antialiased text-slate-900">
      <Sidebar activePage={currentPage} setPage={setCurrentPage} />
      <main className="flex-1 overflow-y-auto relative bg-[#f8fafc]">
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 h-20 flex items-center justify-between px-10 sticky top-0 z-20">
          <div className="flex flex-col">
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              {currentPage === Page.Dashboard && 'Dijital Hukuk Ofisi'}
              {currentPage === Page.Generator && 'Akıllı Dilekçe Oluşturucu'}
              {currentPage === Page.Research && 'Hukuki Literatür Taraması'}
              {currentPage === Page.History && 'Kurumsal Arşiv'}
            </h2>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest -mt-1">Mevlana Grup Otomasyon Sistemi</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-slate-700">Av. Mevlana Demir</span>
              <span className="text-[10px] text-emerald-500 font-bold uppercase">Sistem Çevrimiçi</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-slate-400">
              <i className="fa-solid fa-user-shield"></i>
            </div>
          </div>
        </header>
        <div className="p-10 max-w-7xl mx-auto">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default App;
