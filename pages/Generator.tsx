
import React, { useState } from 'react';
import { GeminiService } from '../services/geminiService';
import { COMPANIES, DOC_TYPES } from '../constants';
import { GeneratedDocument } from '../types';

interface GeneratorProps {
  onSave: (doc: GeneratedDocument) => void;
}

const Generator: React.FC<GeneratorProps> = ({ onSave }) => {
  const [selectedCompany, setSelectedCompany] = useState(COMPANIES[0].name);
  const [docType, setDocType] = useState(DOC_TYPES[0]);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState('');

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setOutput("");
    
    try {
      const service = new GeminiService();
      const text = await service.generateLegalDocument(selectedCompany, docType, prompt);
      setOutput(text);
      
      const newDoc: GeneratedDocument = {
        id: Date.now().toString(),
        title: `${docType} - ${selectedCompany}`,
        type: docType,
        content: text,
        company: selectedCompany,
        createdAt: new Date().toISOString()
      };
      onSave(newDoc);
    } catch (err) {
      console.error(err);
      setOutput("Sistem hatası: Yapay zeka servislerine şu an ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in duration-500 h-[calc(100vh-180px)]">
      <div className="lg:col-span-4 space-y-6 overflow-y-auto pr-4 custom-scrollbar">
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-8">
          <section>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] block mb-4">Müvekkil Bilgisi</label>
            <select 
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full p-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 outline-none font-bold text-slate-700 transition-all cursor-pointer"
            >
              {COMPANIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </section>

          <section>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] block mb-4">Evrak Türü</label>
            <div className="grid grid-cols-2 gap-2">
              {DOC_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => setDocType(type)}
                  className={`p-3 text-xs rounded-xl font-bold border-2 transition-all ${
                    docType === type 
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' 
                      : 'border-slate-50 text-slate-400 hover:border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </section>

          <section>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] block mb-4">Vaka Detayları</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-40 p-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 outline-none text-sm resize-none transition-all placeholder:text-slate-300"
              placeholder="Olayı, tarihleri ve karşı tarafı kısaca anlatın..."
            ></textarea>
          </section>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            className={`w-full py-5 rounded-2xl font-black text-white shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-95 ${
              isGenerating || !prompt ? 'bg-slate-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
            }`}
          >
            {isGenerating ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <><i className="fa-solid fa-feather-pointed"></i> Taslak Hazırla</>
            )}
          </button>
        </div>
      </div>

      <div className="lg:col-span-8 flex flex-col h-full">
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm flex flex-col h-full overflow-hidden">
          <div className="bg-slate-50 border-b px-10 py-5 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <i className="fa-solid fa-file-invoice text-slate-400"></i>
              <span className="font-bold text-slate-500 text-sm uppercase tracking-widest">Dijital Önizleme</span>
            </div>
            {output && (
              <div className="flex gap-3">
                <button 
                  onClick={() => {navigator.clipboard.writeText(output); alert("Kopyalandı!");}}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition shadow-sm"
                >
                  Kopyala
                </button>
                <button className="px-4 py-2 bg-[#0a192f] rounded-xl text-xs font-bold text-white hover:bg-black transition shadow-sm">
                  Yazdır / PDF
                </button>
              </div>
            )}
          </div>
          
          <div className="flex-1 p-10 overflow-y-auto bg-[#e2e8f0]/30 custom-scrollbar flex justify-center">
            <div className="w-full max-w-[800px] bg-white min-h-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200 p-16 font-serif text-slate-800 leading-[1.8] whitespace-pre-wrap text-[15px] relative">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-400">
                  <i className="fa-solid fa-spinner animate-spin text-4xl"></i>
                  <p className="font-bold uppercase tracking-widest text-xs">Hukuki Formülasyon Oluşturuluyor...</p>
                </div>
              ) : (
                output || (
                  <div className="flex flex-col items-center justify-center h-full text-center opacity-10">
                    <i className="fa-solid fa-scale-unbalanced text-9xl mb-8"></i>
                    <h4 className="text-3xl font-black">HAZIRLANIYOR</h4>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;
