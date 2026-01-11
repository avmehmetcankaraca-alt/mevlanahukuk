
import React from 'react';
import { Page, GeneratedDocument } from '../types';

interface DashboardProps {
  setPage: (page: Page) => void;
  history: GeneratedDocument[];
}

const Dashboard: React.FC<DashboardProps> = ({ setPage, history }) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Hoş Geldiniz, Üstadım</h1>
          <p className="text-slate-500 mt-2 text-lg">Hukuk otomasyon sisteminiz tüm modülleriyle hazır.</p>
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          onClick={() => setPage(Page.Generator)}
          className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
        >
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <i className="fa-solid fa-file-pen text-2xl"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-800">Hızlı Dilekçe</h3>
          <p className="text-slate-500 text-sm mt-2">Saniyeler içinde mevzuata uygun ihtarname ve dilekçe taslakları hazırlayın.</p>
        </div>

        <div 
          onClick={() => setPage(Page.Research)}
          className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
        >
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
            <i className="fa-solid fa-building-columns text-2xl"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-800">İçtihat Araştırması</h3>
          <p className="text-slate-500 text-sm mt-2">Yargıtay ve Danıştay kararları arasında akıllı arama yaparak dayanak oluşturun.</p>
        </div>

        <div className="bg-[#0a192f] p-8 rounded-[32px] text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold">Ofis İstatistikleri</h3>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-5xl font-black">{history.length}</span>
              <span className="text-slate-400 text-sm">Toplam Belge</span>
            </div>
            <p className="text-slate-400 text-xs mt-4">Bu ay üretilen: <strong>{history.length} adet</strong></p>
          </div>
          <i className="fa-solid fa-chart-line absolute -right-4 -bottom-4 text-9xl text-white/5"></i>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <i className="fa-solid fa-circle-question text-blue-500"></i> Nasıl Çalışır?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Belge Seçimi', desc: 'İhtarname, Dava veya Cevap dilekçesi türünü seçin.' },
            { step: '02', title: 'Talimat Girişi', desc: 'Olay özetini ve taleplerinizi doğal dille yazın.' },
            { step: '03', title: 'Yapay Zeka', desc: 'Gemini 3 Pro hukuk kütüphanesini tarayarak metni oluşturur.' },
            { step: '04', title: 'Onay & Arşiv', desc: 'Önizleme yapın, kopyalayın ve arşive kaydedin.' }
          ].map((item, idx) => (
            <div key={idx} className="relative">
              <span className="text-4xl font-black text-slate-100 absolute -top-4 -left-2 z-0">{item.step}</span>
              <div className="relative z-10">
                <h4 className="font-bold text-slate-800">{item.title}</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
