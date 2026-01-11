
import React, { useState } from 'react';
import { GeneratedDocument } from '../types';

interface HistoryProps {
  history: GeneratedDocument[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<GeneratedDocument | null>(null);

  const filteredHistory = history.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-gray-900">Belge Arşivi</h3>
        <div className="relative max-w-sm w-full">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input 
            type="text" 
            placeholder="Dilekçe veya şirket ara..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHistory.map((doc) => (
          <div 
            key={doc.id}
            onClick={() => setSelectedDoc(doc)}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-50 p-3 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <i className="fa-solid fa-file-lines text-xl"></i>
              </div>
              <span className="text-[10px] font-black uppercase text-gray-400 bg-gray-50 px-3 py-1 rounded-full border">
                {new Date(doc.createdAt).toLocaleDateString('tr-TR')}
              </span>
            </div>
            <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">{doc.title}</h4>
            <p className="text-xs text-gray-500 font-medium mb-4">{doc.company}</p>
            <div className="flex gap-2">
              <span className="text-[10px] bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg font-bold">{doc.type}</span>
            </div>
          </div>
        ))}

        {filteredHistory.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <i className="fa-solid fa-folder-open text-6xl text-gray-200 mb-4"></i>
            <p className="text-gray-400 font-bold">Herhangi bir kayıt bulunamadı.</p>
          </div>
        )}
      </div>

      {/* Document Detail Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-2xl font-black text-gray-900">{selectedDoc.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{selectedDoc.company} • {new Date(selectedDoc.createdAt).toLocaleString('tr-TR')}</p>
              </div>
              <button onClick={() => setSelectedDoc(null)} className="w-12 h-12 rounded-2xl bg-white border shadow-sm hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-12 bg-gray-100">
              <div className="bg-white p-16 shadow-2xl rounded-lg mx-auto max-w-3xl whitespace-pre-wrap font-serif text-gray-800 leading-relaxed min-h-full border border-gray-200">
                {selectedDoc.content}
              </div>
            </div>
            <div className="p-8 border-t bg-gray-50 flex justify-end gap-4">
              <button className="px-8 py-3 rounded-2xl bg-white border border-gray-200 font-bold text-gray-700 hover:bg-gray-100 transition shadow-sm">
                Kopyala
              </button>
              <button className="px-8 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                Word Olarak İndir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
