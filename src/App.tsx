// @ts-nocheck
/* eslint-disable */
import { useState } from 'react';

// --------------------------------------------------------
// 1. ADIM: API ANAHTARINI AŞAĞIDAKİ TIRNAKLARIN İÇİNE YAPIŞTIR
// --------------------------------------------------------
const API_KEY = "AIzaSyCjaMUvejcuSiG6IFeb-dvVUR2R_QWLjSc"; 
// --------------------------------------------------------

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [company, setCompany] = useState('Mevlana Petrol');
  const [docType, setDocType] = useState('İhtarname');
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  // --- YAPAY ZEKA MOTORU ---
  const generateDocument = async () => {
    if (!API_KEY || API_KEY.includes("BURAYA")) {
      alert("Lütfen koddaki API_KEY kısmına şifrenizi girin!");
      return;
    }
    if (!prompt) {
      alert("Lütfen olay detaylarını yazın.");
      return;
    }

    setLoading(true);
    setOutput("Yapay zeka hukuk kütüphanesini tarıyor ve belgeyi hazırlıyor...");

    const fullPrompt = `
      ROL: Sen Mevlana Grup Hukuk Müşavirliği'nin kıdemli yapay zeka asistanısın.
      MÜVEKKİL: ${company}
      BELGE TÜRÜ: ${docType}
      KONU: ${prompt}
      GÖREV: Yukarıdaki bilgilere göre, Türk Hukuku'na (TBK, HMK, İş Kanunu vb.) tam uyumlu, resmi, profesyonel, Yargıtay formatında bir hukuki belge yaz. 
      Eksik yerleri [DOLDURULACAK] şeklinde bırak. 
      Sadece belge metnini ver, sohbet etme.
    `;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: fullPrompt }] }] }),
        }
      );

      const data = await response.json();
      if (data.error) {
        setOutput("HATA: " + data.error.message);
      } else if (data.candidates && data.candidates[0].content) {
        setOutput(data.candidates[0].content.parts[0].text);
      } else {
        setOutput("Beklenmedik bir hata oluştu.");
      }
    } catch (error) {
      setOutput("Bağlantı hatası: " + error);
    } finally {
      setLoading(false);
    }
  };

  // --- TASARIM BİLEŞENLERİ ---
  return (
    <div className="flex h-screen bg-gray-50 font-sans text-slate-800 overflow-hidden">
      
      {/* SOL MENÜ (SIDEBAR) */}
      <aside className="w-72 bg-[#0f172a] text-white flex flex-col shadow-2xl z-50">
        <div className="p-8 flex flex-col items-center border-b border-slate-800">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-900/50">
            <span className="text-3xl">⚖️</span>
          </div>
          <h1 className="text-lg font-bold tracking-wider text-center">MEVLANA GRUP</h1>
          <p className="text-xs text-blue-400 font-medium tracking-widest mt-1">HUKUK TEKNOLOJİLERİ</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <MenuButton 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
            icon="🏠" 
            text="Ana Sayfa" 
          />
          <MenuButton 
            active={activeTab === 'generator'} 
            onClick={() => setActiveTab('generator')} 
            icon="📝" 
            text="Dilekçe Hazırla" 
          />
          <MenuButton 
            active={activeTab === 'archive'} 
            onClick={() => alert('Arşiv modülü yakında aktif olacak.')} 
            icon="📂" 
            text="Belge Arşivi" 
          />
        </nav>

        <div className="p-4 bg-slate-900/50 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-semibold text-emerald-400">SİSTEM ÇEVRİMİÇİ</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">Av. Mevlana Demir • v5.0 Pro</p>
        </div>
      </aside>

      {/* SAĞ İÇERİK ALANI */}
      <main className="flex-1 overflow-y-auto bg-[#f8fafc] relative">
        
        {/* Üst Bar */}
        <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-10 sticky top-0 z-40 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800">
            {activeTab === 'dashboard' ? 'Genel Bakış' : 'Akıllı Belge Oluşturucu'}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-slate-600 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
              Av. Mevlana Demir
            </span>
            <div className="w-10 h-10 rounded-full bg-[#0f172a] text-white flex items-center justify-center font-bold">AV</div>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto">
          
          {/* DASHBOARD SAYFASI */}
          {activeTab === 'dashboard' && (
            <div className="animate-fade-in">
              <div className="mb-10">
                <h1 className="text-4xl font-bold text-slate-900 mb-3">Hoş Geldiniz, Üstadım 👋</h1>
                <p className="text-slate-500 text-lg">Hukuk otomasyon sisteminiz göreve hazır.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <DashboardCard 
                  onClick={() => setActiveTab('generator')}
                  color="blue"
                  icon="⚡"
                  title="Hızlı Dilekçe"
                  desc="Yapay zeka ile saniyeler içinde ihtarnameler ve dilekçeler oluşturun."
                />
                <DashboardCard 
                  onClick={() => {}}
                  color="emerald"
                  icon="🏛️"
                  title="İçtihat Araştırması"
                  desc="Yargıtay kararları arasında akıllı tarama yapın (Yakında)."
                />
                 <DashboardCard 
                  onClick={() => {}}
                  color="amber"
                  icon="📊"
                  title="Ofis İstatistikleri"
                  desc="Bu ay üretilen toplam belge sayısı: 0"
                />
              </div>
            </div>
          )}

          {/* GENERATOR SAYFASI */}
          {activeTab === 'generator' && (
            <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-180px)] animate-fade-in">
              
              {/* Sol Panel: Girdiler */}
              <div className="w-full lg:w-1/3 bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-6 overflow-y-auto">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Müvekkil Şirket</label>
                  <select 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-500 outline-none transition"
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
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-500 outline-none transition"
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                  >
                    <option>İhtarname (Noter)</option>
                    <option>Savunma Dilekçesi</option>
                    <option>İcra Takibi Talebi</option>
                    <option>İş Sözleşmesi Feshi</option>
                    <option>Tutanak</option>
                    <option>Sözleşme</option>
                  </select>
                </div>

                <div className="flex-1 flex flex-col">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Olayın Özeti & Talimatlar</label>
                  <textarea 
                    className="flex-1 w-full p-4 bg-slate-50 border border-slate-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 outline-none transition text-sm leading-relaxed" 
                    placeholder="Örn: Kiracı Ahmet Yılmaz kirayı 3 aydır ödemiyor. Tahliye ihtarnamesi hazırla. Borç toplamı 135.000 TL..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  ></textarea>
                </div>

                <button 
                  onClick={generateDocument}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-600/30 transition flex justify-center items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Hazırlanıyor...</span>
                    </>
                  ) : (
                    <>
                      <span>✨ Belgeyi Oluştur</span>
                    </>
                  )}
                </button>
              </div>

              {/* Sağ Panel: Çıktı */}
              <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center px-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Önizleme Modu</span>
                </div>
                <textarea 
                  className="flex-1 w-full p-10 font-serif text-slate-800 focus:outline-none resize-none bg-white text-lg leading-loose" 
                  placeholder="Yapay zeka çıktısı burada görünecek..."
                  value={output}
                  readOnly
                ></textarea>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}

// --- YARDIMCI BİLEŞENLER ---
function MenuButton({ active, onClick, icon, text }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl flex items-center gap-4 font-medium transition-all duration-200 ${
        active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 scale-[1.02]' 
        : 'text-slate-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span>{text}</span>
    </button>
  );
}

function DashboardCard({ onClick, color, icon, title, desc }) {
  const colors = {
    blue: 'border-blue-500 bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
    emerald: 'border-emerald-500 bg-emerald-50 text-emerald-600',
    amber: 'border-amber-500 bg-amber-50 text-amber-600',
  };

  return (
    <div onClick={onClick} className={`bg-white p-8 rounded-2xl cursor-pointer hover:-translate-y-1 transition-all duration-300 group shadow-sm hover:shadow-xl border-l-4 ${colors[color].split(' ')[0]}`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`p-4 rounded-xl transition-colors duration-300 ${colors[color].split(' ').slice(1).join(' ')}`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}
