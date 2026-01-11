// @ts-nocheck
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Research from './pages/Research';
import { Page, GeneratedDocument } from './types';

// =================================================================
// ŞİFRENİZ BURAYA GÖMÜLDÜ (Artık Vercel ayarına gerek yok)
// =================================================================
const API_KEY = "AIzaSyCjaMUvejcuSiG6IFeb-dvVUR2R_QWLjSc";
// =================================================================

// --- YENİ DİLEKÇE MOTORU (Şifreyi Gören Motor) ---
const InternalGenerator = ({ onSave }: { onSave: (doc: GeneratedDocument) => void }) => {
  const [company, setCompany] = useState('Mevlana Petrol');
  const [docType, setDocType] = useState('İhtarname');
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) {
      alert("Lütfen bir talimat yazın.");
      return;
    }

    setLoading(true);
    setOutput("Yapay zeka hukuk sistemine bağlanılıyor... Lütfen bekleyin...");

    const systemPrompt = `
      ROL: Sen Mevlana Grup Hukuk Müşavirliği'nin kıdemli yapay zeka asistanısın.
      MÜVEKKİL: ${company}
      BELGE TÜRÜ: ${docType}
      KONU: ${prompt}
      GÖREV: Yukarıdaki bilgilere göre, Türk Hukuku'na tam uyumlu, resmi ve profesyonel bir hukuki belge yaz. 
      Sadece belge metnini ver, sohbet etme.
    `;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: systemPrompt }] }] }),
        }
      );

      const data = await response.json();
      
      if (data.error) {
        setOutput("GOOGLE HATASI: " + data.error.message);
      } else if (data.candidates && data.candidates[0].content) {
        const text = data.candidates[0].content.parts[0].text;
        setOutput(text);
        
        onSave({
          id: Date.now().toString(),
          title: `${docType} - ${company}`,
          date: new Date().toISOString(),
          type: docType,
          preview: text.substring(0, 100) + "..."
        });
      } else {
        setOutput("Beklenmedik bir cevap alındı. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      setOutput("BAĞLANTI HATASI: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-140px)] animate-fade-in">
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-5 overflow-y-auto">
        <h3 className="font-bold text-slate-800 border-b pb-2">Belge Detayları</h3>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Şirket</label>
          <select className="w-full p-3 border rounded-xl" value={company} onChange={(e) => setCompany(e.target.value)}>
            <option>Mevlana Petrol</option>
            <option>Demirkaya İnşaat</option>
            <option>Demre Otelcilik</option>
            <option>Şahıs (Ali Yılmaz)</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Tür</label>
          <select className="w-full p-3 border rounded-xl" value={docType} onChange={(e) => setDocType(e.target.value)}>
            <option>İhtarname</option>
            <option>Savunma Dilekçesi</option>
            <option>İcra Takibi</option>
            <option>Tutanak</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Olay / Talimat</label>
          <textarea 
            className="w-full h-40 p-4 border rounded-xl text-sm" 
            placeholder="Örn: Kiracı kirayı ödemiyor..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
        </div>
        <button onClick={handleGenerate} disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition">
          {loading ? 'Yazılıyor...' : '✨ Belgeyi Oluştur'}
        </button>
      </div>

      <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col">
        <div className="bg-slate-50 border-b p-4 text-xs font-bold text-slate-400">SONUÇ EKRANI</div>
        <textarea className="flex-1 w-full p-8 font-serif text-lg leading-loose resize-none focus:outline-none" value={output} readOnly placeholder="Belge burada görünecek..."></textarea>
      </div>
    </div>
  );
};

// --- ANA PROGRAM ---
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);
  const [history, setHistory] = useState<GeneratedDocument[]>(() => {
    const saved = localStorage.getItem('doc_history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => { localStorage.setItem('doc_history', JSON.stringify(history)); }, [history]);
  const handleSaveDoc = (doc: GeneratedDocument) => { setHistory(prev => [doc, ...prev]); };

  const renderPage = () => {
    switch (currentPage) {
      case Page.Dashboard: return <Dashboard setPage={setCurrentPage} history={history} />;
      // DİKKAT: BURASI ARTIK ESKİ "Generator" DEĞİL, YENİ "InternalGenerator" KULLANIYOR
      case Page.Generator: return <InternalGenerator onSave={handleSaveDoc} />;
      case Page.Research: return <Research />;
      case Page.History: return <History history={history} />;
      default: return <Dashboard setPage={setCurrentPage} history={history} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      <Sidebar activePage={currentPage} setPage={setCurrentPage} />
      <main className="flex-1 overflow-y-auto bg-[#f8fafc]">
        <header className="bg-white/80 backdrop-blur-md border-b h-20 flex items-center justify-between px-10 sticky top-0 z-20">
          <div>
            <h2 className="text-xl font-black text-slate-800">Mevlana Grup Hukuk</h2>
            <span className="text-xs text-emerald-500 font-bold">SİSTEM AKTİF (v7.0 Final)</span>
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
