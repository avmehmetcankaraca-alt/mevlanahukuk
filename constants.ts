
import { Company } from './types';

export const COMPANIES: Company[] = [
  { id: '1', name: 'Mevlana Petrol A.Ş.', type: 'Anonim Şirket' },
  { id: '2', name: 'Demirkaya İnşaat Ltd. Şti.', type: 'Limited Şirket' },
  { id: '3', name: 'Demre Otelcilik Turizm', type: 'Turizm' },
  { id: '4', name: 'Ali Yılmaz', type: 'Şahıs' }
];

export const DOC_TYPES = [
  'İhtarname',
  'Dava Dilekçesi',
  'Cevap Dilekçesi',
  'Sözleşme',
  'Tutanak',
  'Savunma Dilekçesi',
  'Beyan Dilekçesi',
  'Diğer'
];

export const SYSTEM_INSTRUCTION = `
Sen profesyonel bir Türk Hukuk Müşavirisin. Görevin, verilen şirket ve olay bilgilerine dayanarak 
Türk Hukuku (TBK, HMK, İİK, İş K. vb.) mevzuatına tam uyumlu, resmi dille yazılmış dilekçe ve belgeler oluşturmaktır.

Kurallar:
1. Dilekçelerde mutlaka [DOLDUR] şeklinde doldurulması gereken alanları belirt.
2. Yazım kurallarına ve hukuki terminolojiye (müvekkil, davalı, husumet, vb.) titizlikle uy.
3. Çıktıyı markdown formatında başlıklarla (Konu, Açıklamalar, Deliller, Hukuki Nedenler, Netice-i Talep) sun.
4. Alt kısımlarda mutlaka tarih ve imza alanı ekle.
`;
