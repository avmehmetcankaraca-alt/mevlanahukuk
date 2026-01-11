// @ts-nocheck
import { useState, useEffect } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [apiKey, setApiKey] = useState('');
  const [company, setCompany] = useState('Mevlana Petrol');
  const [docType, setDocType] = useState('İhtarname');
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  // Uygulama açılınca anahtarı hafızadan al
  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) setApiKey(storedKey);
  }, []);

  // Anahtarı kaydet
  const saveKey = () => {
    localStorage.setItem('gemini_api_key', apiKey);
    alert('Anahtar kaydedildi! Artık belge oluşturabilirsiniz.');
  };

  // Belge Oluşturma Fonksiyonu
  const generateDoc = async () => {
    if (!apiKey) {
      alert('Lütfen önce Ayarlar menüsünden API Anahtarınızı girin.');
      setActiveTab('settings');
      return;
    }
    if (!prompt) {
      alert('Lütfen bir talimat yazın.');
      return;
    }

    setLoading(true);
    setOutput('Yapay zeka belgeyi hazırlıyor, lütfen bekleyin...');

    const fullPrompt = `Sen Mevlana Grup hukukçususun. Müvekkil: ${company}. Belge Türü: ${docType}. Konu: ${prompt}. Türk hukukuna uygun, resmi bir dille, boşlukları doldurulmuş bir belge yaz.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: fullPrompt }] }] }),
        }
      );

      const data = await response.json();
      if (data.candidates && data.candidates[0].content) {
        setOutput(data.candidates[0].content.parts[0].text);
      } else {
        setOutput('Hata: ' + JSON.stringify(data));
      }
    } catch (error) {
      setOutput('Bağlantı hatası: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-gray-800">
      {/* SOL MENÜ */}
      <div className="w-64 bg-slate-900 text-white flex flex-col p-6">
        <h1 className="text-xl font-bold mb-8 border-b border-slate-700 pb-4">MEVLANA GRUP</h1>
        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left p-3 rounded ${activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
          >
            🏠 Ana Sayfa
          </button>
          <button
            onClick={() => setActiveTab('generator')}
            className={`w-full text-left p-3 rounded ${activeTab === 'generator' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
          >
            📝 Belge Oluştur
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left p-3 rounded ${activeTab === 'settings' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
          >
            ⚙️ Ayarlar
          </button>
        </nav>
        <div className="text-xs text-slate-500 mt-4">v4.0 React System</div>
      </div>

      {/* SAĞ İÇERİK */}
      <div className="flex-1 p-8 overflow-y-auto">
        
        {/* API UYARISI */}
        {!apiKey && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-70
