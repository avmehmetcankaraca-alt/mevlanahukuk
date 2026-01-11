// @ts-nocheck
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Research from './pages/Research';
import { Page, GeneratedDocument } from './types';

// =================================================================
// 1. ADIM: API ANAHTARINI BURADAKİ TIRNAKLARIN İÇİNE YAPIŞTIR
// =================================================================
const API_KEY = "AIzaSyCjaMUvejcuSiG6IFeb-dvVUR2R_QWLjSc";
// =================================================================

// --- İÇERİYE MONTE EDİLMİŞ JENERATÖR MODÜLÜ (MOTOR) ---
const InternalGenerator = ({ onSave }: { onSave: (doc: GeneratedDocument) => void }) => {
  const [company, setCompany] = useState('Mevlana Petrol');
  const [docType, setDocType] = useState('İhtarname');
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!API_KEY || API_KEY.includes("BURAYA")) {
      alert("Lütfen App.tsx dosyasındaki API_KEY kısmına şifrenizi girin!");
      return;
    }
    if (!prompt) {
      alert("Lütfen hukuki olayı veya talimatı yazın.");
      return;
    }

    setLoading(true);
    setOutput("Yapay zeka hukuk kütüphanesini tarıyor, içtihatları inceliyor ve belgeyi hazırlıyor...\nLütfen bekleyin.");

    const systemPrompt = `
      ROL: Sen Mevlana Grup Hukuk Müşavirliği'nin kıdemli yapay zeka asistanısın.
      MÜVEKKİL: ${company}
      BELGE TÜRÜ: ${docType}
      KONU: ${prompt}
      GÖREV: Yukarıdaki bilgilere göre, Türk Hukuku'na (TBK, HMK, İş Kanunu, İİK vb.) tam uyumlu, resmi, profesyonel ve Yargıtay formatında bir hukuki belge yaz. 
      Eksik yerleri [TARİH], [ADRES] şeklinde doldurulacak alan olarak bırak.
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
        setOutput("HATA: " + data.error.message);
      } else if (data.candidates && data.candidates[0].content) {
        const text = data.candidates[0].content.parts[0].text;
        setOutput(text);
        
        // Geçmişe Kaydet
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
      setOutput("Bağlantı Hatası: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-140px)] animate-fade-in">
      {/* SOL PANEL: GİRDİLER */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-5 overflow-y-auto">
        <h3 className="font-bold text-slate-800 border-b pb-2">Belge Detayları</h3>
        
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Şirket Seçimi</label>
          <select 
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          >
            <option>Mevlana Petrol</option>
            <option>Demirkaya İnşaat</option>
            <option>Demre Otelcilik</option>
            <option>Şahıs (Ali Yılmaz)</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Belge Türü</label>
          <select 
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
          >
            <option>İhtarname</option>
            <option>Savunma Dilekçesi</option>
            <option>İcra Takibi Talebi</option>
            <option>İş Sözleşmesi Feshi</option>
            <option>Tutanak</option>
            <option>Sözleşme</option>
            <option>Diğer</option>
          </select>
        </div>

        <div className="flex-1 flex flex-col">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Olayın Özeti & Talimatlar</label>
          <textarea 
            className="flex-1 w-full p-4 bg-slate-50 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-emerald-500 outline-none text-sm leading-relaxed" 
            placeholder="Örn: Kiracı Ahmet Yılmaz 3 aydır kirayı ödemiyor. Tahliye ihtarnamesi hazırla..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
        </div>

        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-slate-900 hover:bg-emerald-600 disabled:bg-slate-400 text-white py-4 rounded-xl font-bold shadow-lg transition flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Hazırlanıyor...</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              <span>Yapay Zeka ile Oluştur</span>
            </>
          )}
        </button>
      </div>

      {/* SAĞ PANEL: ÇIKTI */}
      <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center px-6">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Önizleme</span>
        </div>
        <textarea 
          className="flex-1 w-full p-8 font-serif text-slate-800 focus:outline-none resize-none bg-white text-lg leading-loose" 
          placeholder="Oluşturulan belge burada görünecek..."
          value={output}
          readOnly
        ></textarea>
      </div>
    </div>
  );
};

// --- ANA UYGULAMA (APP) ---
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
        // BURADA ARTIK KENDİ YAZDIĞIMIZ JENERATÖRÜ KULLANIYORUZ
        return <InternalGenerator onSave={handleSaveDoc} />;
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
