
import React, { useState } from 'react';

interface SettingsProps {
  apiKey: string;
  setApiKey: (key: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ apiKey, setApiKey }) => {
  const [tempKey, setTempKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);

  const handleSave = () => {
    setApiKey(tempKey);
    alert("Ayarlar başarıyla kaydedildi.");
  };

  return (
    <div className="max-w-3xl mx-auto animate-in slide-in-from-right-4 duration-500">
      <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-[#0e2a47] p-10 text-white">
          <h2 className="text-3xl font-black mb-2">Sistem Ayarları</h2>
          <p className="text-blue-200/70">Uygulama tercihlerini ve yapay zeka yapılandırmasını yönetin.</p>
        </div>
        
        <div className="p-10 space-y-10">
          <section className="space-y-6">
            <div className="flex items-center gap-4 text-gray-900">
              <i className="fa-solid fa-key text-2xl text-blue-600"></i>
              <h3 className="text-xl font-bold">API Konfigürasyonu</h3>
            </div>
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 space-y-4">
              <label className="block text-sm font-bold text-gray-600 uppercase tracking-widest">Google Gemini API Anahtarı</label>
              <div className="relative">
                <input 
                  type={showKey ? "text" : "password"}
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full p-4 pr-16 rounded-2xl border-2 border-transparent focus:border-blue-500 outline-none transition-all font-mono"
                />
                <button 
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition"
                >
                  <i className={`fa-solid ${showKey ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              <div className="flex items-start gap-3 mt-4 text-gray-500">
                <i className="fa-solid fa-circle-info mt-1"></i>
                <p className="text-xs leading-relaxed">
                  API anahtarınız yerel tarayıcınızda (localStorage) saklanır ve hiçbir üçüncü taraf sunucuyla paylaşılmaz. 
                  Bir anahtarınız yoksa <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-blue-600 font-bold hover:underline">Google AI Studio</a> üzerinden ücretsiz alabilirsiniz.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4 text-gray-900">
              <i className="fa-solid fa-briefcase text-2xl text-blue-600"></i>
              <h3 className="text-xl font-bold">Kurumsal Profil</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Hukuk Bürosu Adı</label>
                <input type="text" defaultValue="Mevlana Hukuk & Danışmanlık" className="w-full p-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 transition-all outline-none font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Sorumlu Avukat</label>
                <input type="text" defaultValue="Av. Mevlana" className="w-full p-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 transition-all outline-none font-medium" />
              </div>
            </div>
          </section>

          <div className="pt-6 border-t flex justify-end gap-4">
            <button className="px-10 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition uppercase tracking-widest text-sm">Vazgeç</button>
            <button 
              onClick={handleSave}
              className="px-10 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black shadow-xl shadow-blue-200 transition-all active:scale-95 uppercase tracking-widest text-sm"
            >
              Kaydet ve Uygula
            </button>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-center text-gray-400 text-xs font-medium uppercase tracking-[0.2em]">
        Mevlana Hukuk Otomasyonu v4.0.0 (Gemini 3 Pro Engine)
      </p>
    </div>
  );
};

export default Settings;
