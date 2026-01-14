
import React, { useState, useRef } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { 
  Sparkles, 
  Send, 
  Volume2, 
  Zap, 
  BrainCircuit, 
  RefreshCcw, 
  Info,
  Play,
  Pause
} from 'lucide-react';

// Implementation for decoding raw PCM bytes
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const AIAssistantView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [mode, setMode] = useState<'fast' | 'think'>('fast');
  const [loading, setLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const handleAIQuery = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse('');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      
      const modelName = mode === 'fast' ? 'gemini-2.5-flash-lite-latest' : 'gemini-3-pro-preview';
      const config: any = mode === 'think' ? { thinkingConfig: { thinkingBudget: 32768 } } : {};

      const result = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config
      });

      setResponse(result.text || 'No response generated.');
    } catch (err: any) {
      setResponse(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTTS = async () => {
    if (!response) return;
    setAudioLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      const ttsResult = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: response }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = ttsResult.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        const ctx = audioContextRef.current;
        const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.start();
      }
    } catch (err: any) {
      console.error("TTS Error:", err);
    } finally {
      setAudioLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
            <Sparkles className="gold-accent" size={32} />
            <span>Sovereign Assistant</span>
          </h2>
          <p className="text-zinc-500 mt-2">AI-powered architectural guidance for the Elmahrosa ecosystem.</p>
        </div>
        <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-800">
          <button 
            onClick={() => setMode('fast')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              mode === 'fast' ? 'bg-zinc-800 text-white shadow-inner border border-zinc-700' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Zap size={14} className={mode === 'fast' ? 'gold-accent' : ''} />
            <span>Fast</span>
          </button>
          <button 
            onClick={() => setMode('think')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              mode === 'think' ? 'bg-zinc-800 text-white shadow-inner border border-zinc-700' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <BrainCircuit size={14} className={mode === 'think' ? 'gold-accent' : ''} />
            <span>Think</span>
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6">
        <div className="relative">
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={mode === 'fast' ? "Ask a quick architectural question..." : "Explain complex cross-chain governance logic..."}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 min-h-[140px] resize-none"
          />
          <button 
            onClick={handleAIQuery}
            disabled={loading || !prompt.trim()}
            className="absolute bottom-4 right-4 p-3 gold-bg text-black rounded-xl hover:opacity-90 disabled:opacity-30 transition-all shadow-xl"
          >
            {loading ? <RefreshCcw className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </div>

        {response && (
          <div className="space-y-4 animate-in slide-in-from-top-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center space-x-2">
                <Info size={12} />
                <span>Response ({mode})</span>
              </span>
              <button 
                onClick={handleTTS}
                disabled={audioLoading}
                className="flex items-center space-x-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
              >
                {audioLoading ? <RefreshCcw className="animate-spin" size={14} /> : <Volume2 size={16} />}
                <span>Narrate</span>
              </button>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-zinc-300 prose prose-invert max-w-none leading-relaxed">
              {response.split('\n').map((para, i) => <p key={i} className="mb-4 last:mb-0">{para}</p>)}
            </div>
          </div>
        )}

        {!response && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "How do I stake ERT tokens on TEOS?",
              "What is the difference between Pi and TEOS auth?",
              "Explain Egyptian data sovereignty compliance.",
              "Generate a sample civic governance petition."
            ].map((q, i) => (
              <button 
                key={i} 
                onClick={() => { setPrompt(q); setMode('fast'); }}
                className="text-left p-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-zinc-500 hover:text-white hover:border-zinc-700 transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex items-start space-x-4">
        <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center shrink-0">
          <BrainCircuit className="text-yellow-500" size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">AI Reasoning (Thinking Mode)</h4>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Switch to Thinking mode for complex queries. This uses <strong>Gemini 3 Pro</strong> with a high thinking budget 
            (32,768 tokens) to process deep logic, math, and architectural tradeoffs.
          </p>
        </div>
      </div>
    </div>
  );
};
