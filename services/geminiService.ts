
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // API anahtarı artık sistemden otomatik alınır
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  async generateLegalDocument(company: string, type: string, prompt: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview', // Hızlı üretim için flash
      contents: `Müvekkil Şirket: ${company}\nBelge Türü: ${type}\nOlay Özeti/Talimat: ${prompt}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text || "Belge oluşturulamadı.";
  }

  async performLegalResearch(query: string): Promise<{ text: string; sources: any[] }> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Derin araştırma için pro
      contents: `Hukuki Soru: ${query}\nLütfen güncel Türk mevzuatı, Yargıtay kararları ve doktrin ışığında detaylı bir araştırma sun.`,
      config: {
        systemInstruction: "Sen kıdemli bir hukuk araştırmacısısın. Yanıtlarını madde madde, gerekçeli ve kaynak göstererek ver.",
        tools: [{ googleSearch: {} }],
      },
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || "Hukuki Kaynak",
      uri: chunk.web?.uri || "#",
    })) || [];

    return {
      text: response.text || "Araştırma sonuçlanamadı.",
      sources: sources
    };
  }
}
