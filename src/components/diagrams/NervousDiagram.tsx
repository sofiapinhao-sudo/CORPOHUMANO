import React, { useState, useEffect } from 'react';
import { Volume2, Info, Zap, Brain, Eye, Sparkles } from 'lucide-react';
import { speakText, playPopSound, playSuccessSound } from '../../utils/soundEffects';

interface Props {
  onSelectOrgan?: (organName: string) => void;
}

export const NervousDiagram: React.FC<Props> = ({ onSelectOrgan }) => {
  const [pulseActive, setPulseActive] = useState<boolean>(false);
  const [selectedOrgan, setSelectedOrgan] = useState<string>('Cérebro');
  const [activeTab, setActiveTab] = useState<'anatomia' | 'sentidos' | 'reflexo'>('anatomia');

  // Mini reflex test state
  const [reflexState, setReflexState] = useState<'idle' | 'waiting' | 'ready' | 'success'>('idle');
  const [startTime, setStartTime] = useState<number>(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);

  const descriptions: Record<string, { tipo: string; func: string }> = {
    'Cérebro': {
      tipo: 'Centro de Comando',
      func: 'Protegido pelo crânio, guarda as tuas memórias, controla os pensamentos, sentimentos e toma todas as decisões do corpo!'
    },
    'Espinal Medula': {
      tipo: 'Autoestrada Central',
      func: 'Cabo principal que passa por dentro da coluna vertebral, ligando o cérebro a todos os nervos do corpo humano.'
    },
    'Nervos': {
      tipo: 'Fios Condutores Rápidos',
      func: 'Milhões de fios microscópicos que transmitem mensagens elétricas dos sentidos ao cérebro e ordens aos músculos a 400 km/h!'
    },
    'Os 5 Sentidos': {
      tipo: 'Recetores de Informação',
      func: 'Visão (olhos), Audição (ouvidos), Olfato (nariz), Paladar (língua) e Tato (pele) - captam tudo o que se passa à nossa volta.'
    }
  };

  const handleSelect = (name: string) => {
    setSelectedOrgan(name);
    playPopSound();
    if (onSelectOrgan) onSelectOrgan(name);
  };

  const triggerNeuralPulse = () => {
    setPulseActive(true);
    playPopSound();
    setTimeout(() => {
      setPulseActive(false);
    }, 1500);
  };

  // Reflex test logic
  const startReflexTest = () => {
    setReflexState('waiting');
    setReactionTime(null);
    const delay = 1500 + Math.random() * 2500;
    setTimeout(() => {
      setReflexState('ready');
      setStartTime(Date.now());
    }, delay);
  };

  const handleReflexClick = () => {
    if (reflexState === 'waiting') {
      // Clicked too soon
      setReflexState('idle');
      alert('Ainda não estava verde! Espera pelo sinal luminoso!');
      return;
    }
    if (reflexState === 'ready') {
      const timeTaken = Date.now() - startTime;
      setReactionTime(timeTaken);
      setReflexState('success');
      playSuccessSound();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-purple-200/80 shadow-sm p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      {/* Visual Canvas Area */}
      <div className="lg:col-span-7 flex flex-col items-center">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-purple-50 rounded-xl border border-purple-200 text-xs font-semibold mb-3">
          <button
            onClick={() => { setActiveTab('anatomia'); handleSelect('Cérebro'); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'anatomia' ? 'bg-purple-600 text-white shadow-sm' : 'text-purple-800 hover:bg-purple-100'
            }`}
          >
            Cérebro e Nervos
          </button>
          <button
            onClick={() => { setActiveTab('sentidos'); handleSelect('Os 5 Sentidos'); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'sentidos' ? 'bg-purple-600 text-white shadow-sm' : 'text-purple-800 hover:bg-purple-100'
            }`}
          >
            Os 5 Sentidos
          </button>
          <button
            onClick={() => { setActiveTab('reflexo'); playPopSound(); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'reflexo' ? 'bg-purple-600 text-white shadow-sm' : 'text-purple-800 hover:bg-purple-100'
            }`}
          >
            Teste dos Reflexos ⚡
          </button>
        </div>

        {activeTab === 'anatomia' && (
          <div className="relative w-full max-w-[360px] h-[400px] bg-gradient-to-b from-purple-50/70 via-white to-indigo-50/40 rounded-2xl border border-purple-100 flex items-center justify-center p-2">
            <svg viewBox="0 0 360 400" className="w-full h-full select-none">
              {/* Silhouette */}
              <path
                d="M180 20 C155 20, 140 40, 140 65 C140 85, 155 105, 160 110 C120 120, 95 145, 80 180 C70 205, 65 240, 65 280 C65 340, 80 390, 100 410 L260 410 C280 390, 295 340, 295 280 C295 240, 290 205, 280 180 C265 145, 240 120, 200 110 C205 105, 220 85, 220 65 C220 40, 205 20, 180 20 Z"
                fill="#f5f3ff"
                stroke="#ddd6fe"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Nervos dos braços e tronco */}
              <path d="M180 130 Q120 160 85 240 M180 130 Q240 160 275 240" stroke="#a855f7" strokeWidth="2.5" fill="none" opacity="0.7" />
              <path d="M180 200 Q110 230 75 320 M180 200 Q250 230 285 320" stroke="#a855f7" strokeWidth="2.5" fill="none" opacity="0.7" />
              <path d="M180 300 Q140 340 120 390 M180 300 Q220 340 240 390" stroke="#a855f7" strokeWidth="2.5" fill="none" opacity="0.7" />

              {/* Espinal Medula (Coluna) */}
              <g
                onClick={() => handleSelect('Espinal Medula')}
                className="cursor-pointer"
              >
                <line x1="180" y1="90" x2="180" y2="330" stroke="#7c3aed" strokeWidth="8" strokeLinecap="round" />
                <line x1="180" y1="90" x2="180" y2="330" stroke="#c084fc" strokeWidth="3" strokeDasharray="4 4" />
                <line x1="180" y1="200" x2="260" y2="200" stroke="#7c3aed" strokeWidth="1" strokeDasharray="2 2" />
                <text x="265" y="203" fontSize="11" fill="#6d28d9" fontWeight="bold">Espinal Medula</text>
              </g>

              {/* Nervos Rótulo */}
              <g
                onClick={() => handleSelect('Nervos')}
                className="cursor-pointer"
              >
                <line x1="85" y1="240" x2="35" y2="240" stroke="#9333ea" strokeWidth="1" strokeDasharray="2 2" />
                <text x="30" y="243" textAnchor="end" fontSize="11" fill="#7e22ce" fontWeight="bold">Nervos</text>
              </g>

              {/* Cérebro (Cabeça) */}
              <g
                onClick={() => handleSelect('Cérebro')}
                className="cursor-pointer transition-transform hover:scale-105"
              >
                {/* Crânio/Aura protetora */}
                <ellipse cx="180" cy="55" rx="36" ry="32" fill="#ede9fe" stroke="#a855f7" strokeWidth="2" />
                {/* Cérebro com circunvoluções */}
                <path
                  d="M152 50 C150 35, 170 30, 180 35 C190 30, 210 35, 208 50 C215 60, 205 75, 195 75 C185 75, 185 70, 180 70 C175 70, 175 75, 165 75 C155 75, 145 60, 152 50 Z"
                  fill="#7c3aed"
                />
                <circle cx="180" cy="80" r="8" fill="#6d28d9" /> {/* Cerebelo / Tronco */}
                <line x1="144" y1="50" x2="60" y2="50" stroke="#7c3aed" strokeWidth="1" strokeDasharray="2 2" />
                <text x="55" y="53" textAnchor="end" fontSize="11" fill="#5b21b6" fontWeight="bold">Cérebro</text>
              </g>

              {/* Animated Neural Lightning Impulse */}
              {pulseActive && (
                <g className="animate-pulse">
                  <circle cx="75" cy="320" r="6" fill="#facc15" />
                  <line x1="75" y1="320" x2="180" y2="200" stroke="#facc15" strokeWidth="4" />
                  <circle cx="180" cy="200" r="7" fill="#facc15" />
                  <line x1="180" y1="200" x2="180" y2="60" stroke="#facc15" strokeWidth="5" />
                  <circle cx="180" cy="60" r="10" fill="#facc15" />
                  <text x="180" y="25" textAnchor="middle" fontSize="11" fill="#ca8a04" fontWeight="bold">
                    ⚡ Sinal transmitido ao cérebro a 400 km/h!
                  </text>
                </g>
              )}
            </svg>
          </div>
        )}

        {activeTab === 'sentidos' && (
          <div className="w-full max-w-[360px] h-[400px] bg-purple-50/50 rounded-2xl border border-purple-200 p-4 flex flex-col justify-between">
            <h4 className="text-sm font-bold text-purple-950 text-center">
              Os 5 Portais de Informação do Cérebro
            </h4>
            <div className="grid grid-cols-1 gap-2">
              <div className="p-2.5 bg-white rounded-xl border border-purple-100 flex items-center gap-3">
                <span className="text-2xl">👁️</span>
                <div>
                  <strong className="text-xs font-bold text-purple-900 block">Visão (Olhos)</strong>
                  <span className="text-[11px] text-slate-600">Capta cores, luz, formas e distâncias.</span>
                </div>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-purple-100 flex items-center gap-3">
                <span className="text-2xl">👂</span>
                <div>
                  <strong className="text-xs font-bold text-purple-900 block">Audição (Ouvidos)</strong>
                  <span className="text-[11px] text-slate-600">Escuta sons graves, agudos e vozes.</span>
                </div>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-purple-100 flex items-center gap-3">
                <span className="text-2xl">👃</span>
                <div>
                  <strong className="text-xs font-bold text-purple-900 block">Olfato (Nariz)</strong>
                  <span className="text-[11px] text-slate-600">Sente cheiros agradáveis e avisa de fumo ou perigo.</span>
                </div>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-purple-100 flex items-center gap-3">
                <span className="text-2xl">👅</span>
                <div>
                  <strong className="text-xs font-bold text-purple-900 block">Paladar (Língua)</strong>
                  <span className="text-[11px] text-slate-600">Distingue doce, salgado, ácido, amargo.</span>
                </div>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-purple-100 flex items-center gap-3">
                <span className="text-2xl">✋</span>
                <div>
                  <strong className="text-xs font-bold text-purple-900 block">Tato (Pele)</strong>
                  <span className="text-[11px] text-slate-600">Sente calor, frio, dor, texturas suaves e rugosas.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reflexo' && (
          <div className="w-full max-w-[360px] h-[400px] bg-purple-50/50 rounded-2xl border border-purple-200 p-4 flex flex-col items-center justify-between text-center">
            <div>
              <h4 className="text-base font-bold text-purple-950 mb-1 flex items-center justify-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
                Laboratório dos Reflexos Rápidos
              </h4>
              <p className="text-xs text-slate-600">
                Quando clicares em "Começar", aguarda que a bola fique verde e clica nela o mais rápido que conseguires!
              </p>
            </div>

            {/* Reflex button indicator */}
            {reflexState === 'idle' && (
              <button
                onClick={startReflexTest}
                className="w-32 h-32 rounded-full bg-purple-600 text-white font-bold text-sm shadow-md hover:bg-purple-700 transition-transform active:scale-95 flex flex-col items-center justify-center gap-1"
              >
                <Zap className="w-6 h-6" />
                Começar Teste
              </button>
            )}

            {reflexState === 'waiting' && (
              <button
                onClick={handleReflexClick}
                className="w-32 h-32 rounded-full bg-amber-400 text-amber-950 font-bold text-xs shadow-md animate-pulse flex flex-col items-center justify-center p-2"
              >
                <span>Atenção...</span>
                <span>Espera pela cor verde!</span>
              </button>
            )}

            {reflexState === 'ready' && (
              <button
                onClick={handleReflexClick}
                className="w-32 h-32 rounded-full bg-emerald-500 text-white font-black text-lg shadow-xl animate-bounce flex flex-col items-center justify-center cursor-pointer ring-4 ring-emerald-300"
              >
                <span>CLICA JÁ!</span>
              </button>
            )}

            {reflexState === 'success' && (
              <div className="flex flex-col items-center gap-2">
                <div className="w-28 h-28 rounded-full bg-emerald-100 border-4 border-emerald-400 flex flex-col items-center justify-center text-emerald-950">
                  <span className="text-2xl font-black">{reactionTime}</span>
                  <span className="text-[11px] font-semibold">milissegundos</span>
                </div>
                <p className="text-xs font-semibold text-emerald-800">
                  {reactionTime && reactionTime < 280
                    ? '⚡ Incrível! Reflexos de relâmpago!'
                    : reactionTime && reactionTime < 450
                    ? '👏 Excelente velocidade de resposta!'
                    : '👍 Muito bem! O teu cérebro reagiu com precisão!'}
                </p>
                <button
                  onClick={startReflexTest}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-medium"
                >
                  Tentar Novamente
                </button>
              </div>
            )}

            <div className="p-2 bg-white rounded-xl border border-purple-100 text-[11px] text-purple-900">
              💡 Os reflexos são respostas ultra-rápidas coordenadas pela espinal medula e pelo cérebro para proteger o corpo de perigos!
            </div>
          </div>
        )}

        {/* Action simulator button */}
        {activeTab === 'anatomia' && (
          <button
            onClick={triggerNeuralPulse}
            className="w-full mt-3 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            Disparar Impulso Nervoso (400 km/h)
          </button>
        )}
      </div>

      {/* Control & Concept Deck */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        {/* Brain Role Card */}
        <div className="bg-purple-500/10 border border-purple-300 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-900">
              O Supercomputador do Corpo
            </span>
            <button
              onClick={() =>
                speakText(
                  'O sistema nervoso é o centro de comando do corpo humano. O cérebro processa os pensamentos e coordena tudo através da espinal medula e dos nervos!'
                )
              }
              className="p-1.5 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-900 transition-colors"
              title="Ouvir explicação em voz alta"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-purple-950 leading-relaxed mb-2">
            O <strong>cérebro</strong> recebe os sinais dos 5 sentidos, pensa, aprende na escola, e envia ordens aos músculos num piscar de olhos através da <strong>espinal medula</strong> e dos <strong>nervos</strong>.
          </p>
        </div>

        {/* Selected Organ Inspector */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-purple-100 text-purple-800 rounded-md">
                <Info className="w-4 h-4" />
              </span>
              <span className="text-xs font-semibold text-slate-500">Elemento Selecionado</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 font-medium text-slate-700">
              {descriptions[selectedOrgan]?.tipo || 'Estrutura'}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-1">{selectedOrgan}</h3>
          <p className="text-sm text-slate-700 leading-relaxed mb-3">
            {descriptions[selectedOrgan]?.func || 'Clica no cérebro ou nos nervos para aprender a sua função.'}
          </p>

          <button
            onClick={() => speakText(`${selectedOrgan}: ${descriptions[selectedOrgan]?.func}`)}
            className="inline-flex items-center gap-1.5 text-xs text-purple-800 hover:text-purple-900 font-medium"
          >
            <Volume2 className="w-3.5 h-3.5" />
            Ouvir detalhes
          </button>
        </div>

        {/* 4th grade brain health */}
        <div className="bg-white border border-purple-200 rounded-xl p-3 text-xs text-purple-950">
          <strong className="font-semibold text-purple-900 block mb-1">🚴 Protege sempre a tua cabeça:</strong>
          <span className="text-slate-700">
            Dorme 9 a 10 horas por noite, exercita o cérebro com leituras e brincadeiras, e usa <strong>sempre capacete</strong> quando andas de bicicleta ou trotinete!
          </span>
        </div>
      </div>
    </div>
  );
};
