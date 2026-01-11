// @ts-nocheck
/* eslint-disable */
import React, { useState } from 'react';

// ==========================================
// API ANAHTARI (Sistemin Kalbi)
// ==========================================
const API_KEY = "AIzaSyCjaMUvejcuSiG6IFeb-dvVUR2R_QWLjSc";
// ==========================================

export default function App() {
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
        setOutput("HATA: " + data.error.message);
      } else if (data.candidates && data.candidates[0].content) {
        setOutput(data.candidates[0].content.parts[0].text);
      } else {
        setOutput("Beklenmedik bir cevap alındı.");
      }
    } catch (error) {
      setOutput("BAĞLANTI HATASI: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex">
      {/* SOL MENÜ */}
      <div className="w-64 bg-[#0f172a] text-white p-6 flex flex-col gap-6">
        <div className="text-center border-b border-slate-700 pb-4">
          <h1 className="text-xl font-bold">MEVLANA GRUP</h1>
          <p className="text-xs text-emerald-400">HUKUK OTOMASYONU v7.0</p>
        </div>
        <div className="p-3 bg-blue-600 rounded-lg text-center font-bold cursor-pointer">
          📝 Dilekçe Hazırla
        </div>
        <div className="mt-auto text-xs text-slate-500 text-center">
          Av. Mevlana Demir
        </div>
      </div>

      {/* ANA EKRAN */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">Akıllı Belge Oluşturucu</h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* GİRDİ PANELİ */}
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-md border border-slate-200 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Şirket</label>
              <select className="w-full p-3 border rounded-lg bg-slate-50" value={company} onChange={(e) => setCompany(e.target.value)}>
                <option>Mevlana Petrol</option>
                <option>Demirkaya İnşaat</option>
                <option>Demre Otelcilik</option>
                <option>Şahıs (Ali Yılmaz)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Belge Türü</label>
              <select className="w-full p-3 border rounded-lg bg-slate-50" value={docType} onChange={(e) => setDocType(e.target.value)}>
                <option>İhtarname</option>
                <option>Savunma Dilekçesi</option>
                <option>İcra Takibi</option>
                <option>Tutanak</option>
                <option>Sözleşme</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Olay / Talimat</label>
              <textarea 
                className="w-full h-40 p-3 border rounded-lg bg-slate-50 text-sm"
                placeholder="Örn: Kiracı 3 aydır ödeme yapmıyor, tahliye ihtarnamesi hazırla..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              ></textarea>
            </div>

            <button 
              onClick={handleGenerate} 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition"
            >
              {loading ? 'Yazılıyor...' : '✨ Belgeyi Oluştur'}
            </button>
          </div>

          {/* SONUÇ PANELİ */}
          <div className="w-full lg:w-2/3 bg-white p-6 rounded-xl shadow-md border border-slate-200 min-h-[500px] flex flex-col">
            <div className="text-xs font-bold text-slate-400 uppercase border-b pb-2 mb-4">SONUÇ EKRANI</div>
            <textarea 
              className="flex-1 w-full p-4 text-lg font-serif leading-relaxed focus:outline-none resize-none"
              value={output}
              readOnly
              placeholder="Belge burada görünecek..."
            ></textarea>
          </div>

        </div>
      </div>
    </div>
  );
}
