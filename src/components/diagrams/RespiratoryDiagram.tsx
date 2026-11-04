import React, { useState, useEffect } from 'react';
import { Volume2, Info, Wind, Play, Pause, ArrowDown, ArrowUp } from 'lucide-react';
import { speakText, playPopSound } from '../../utils/soundEffects';

interface Props {
  onSelectOrgan?: (organName: string) => void;
}

export const RespiratoryDiagram: React.FC<Props> = ({ onSelectOrgan }) => {
  const [breathingPhase, setBreathingPhase] = useState<'inspiracao' | 'expiracao'>('inspiracao');
  const [isAutoBreathing, setIsAutoBreathing] = useState<boolean>(true);
  const [selectedOrgan, setSelectedOrgan] = useState<string>('Pulmões');

  // Auto breathe cycle
  useEffect(() => {
    if (!isAutoBreathing) return;
    const interval = setInterval(() => {
      setBreathingPhase((prev) => (prev === 'inspiracao' ? 'expiracao' : 'inspiracao'));
    }, 3200);
    return () => clearInterval(interval);
  }, [isAutoBreathing]);

  const organDescriptions: Record<string, { tipo: string; func: string }> = {
    'Fossas Nasais': {
      tipo: 'Via Respiratória',
      func: 'O ar entra pelo nariz, onde é filtrado pelos pelinhos, humedecido e aquecido à temperatura do corpo.'
    },
    'Faringe': {
      tipo: 'Via Respiratória',
      func: 'Canal comum ao sistema digestivo e respiratório, conduz o ar até à laringe.'
    },
    'Laringe': {
      tipo: 'Via Respiratória',
      func: 'Liga a faringe à traqueia e contém as cordas vocais que vibram quando falamos e cantamos.'
    },
    'Traqueia': {
      tipo: 'Via Respiratória',
      func: 'Tubo anelado e flexível que transporta o ar até se dividir nos dois brônquios principais.'
    },
    'Brônquios e Bronquíolos': {
      tipo: 'Via Respiratória',
      func: 'Ramificam-se como ramos de uma árvore dentro de cada pulmão para levar o ar até aos alvéolos.'
    },
    'Pulmões': {
      tipo: 'Órgão de Respiração',
      func: 'Dois órgãos esponjosos, moles e elásticos onde o oxigénio (O2) passa para o sangue e o dióxido de carbono (CO2) é libertado.'
    },
    'Diafragma': {
      tipo: 'Músculo Respiratório Auxiliar',
      func: 'Músculo crucial abaixo dos pulmões. Na inspiração contrai e desce; na expiração descontrai e sobe!'
    }
  };

  const handleSelect = (name: string) => {
    setSelectedOrgan(name);
    playPopSound();
    if (onSelectOrgan) onSelectOrgan(name);
  };

  const isInspiration = breathingPhase === 'inspiracao';

  return (
    <div className="bg-white rounded-2xl border border-sky-200/80 shadow-sm p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      {/* Visual Canvas Area */}
      <div className="lg:col-span-7 flex flex-col items-center">
        {/* Phase Switch Controls */}
        <div className="flex flex-wrap items-center justify-between w-full max-w-[380px] gap-2 mb-3">
          <div className="flex items-center gap-1.5 p-1 bg-sky-50 rounded-xl border border-sky-200 text-xs font-semibold">
            <button
              onClick={() => {
                setBreathingPhase('inspiracao');
                setIsAutoBreathing(false);
                playPopSound();
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
                isInspiration ? 'bg-sky-600 text-white shadow-sm' : 'text-sky-800 hover:bg-sky-100'
              }`}
            >
              <ArrowDown className="w-3.5 h-3.5" />
              Inspiração (Ar entra)
            </button>
            <button
              onClick={() => {
                setBreathingPhase('expiracao');
                setIsAutoBreathing(false);
                playPopSound();
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
                !isInspiration ? 'bg-sky-600 text-white shadow-sm' : 'text-sky-800 hover:bg-sky-100'
              }`}
            >
              <ArrowUp className="w-3.5 h-3.5" />
              Expiração (Ar sai)
            </button>
          </div>

          <button
            onClick={() => {
              setIsAutoBreathing(!isAutoBreathing);
              playPopSound();
            }}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1 transition-colors ${
              isAutoBreathing
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
            title="Animar respiração automaticamente"
          >
            {isAutoBreathing ? <Pause className="w-3.5 h-3.5 text-emerald-600" /> : <Play className="w-3.5 h-3.5" />}
            {isAutoBreathing ? 'Ciclo Ativo' : 'Pausado'}
          </button>
        </div>

        {/* Dynamic Respiratory SVG */}
        <div className="relative w-full max-w-[360px] h-[420px] bg-gradient-to-b from-sky-50/70 to-white rounded-2xl border border-sky-100 flex items-center justify-center p-2 overflow-hidden">
          <svg viewBox="0 0 360 420" className="w-full h-full select-none">
            <defs>
              <linearGradient id="lungLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              <linearGradient id="lungRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>

            {/* Silhouette */}
            <path
              d="M180 20 C155 20, 140 40, 140 65 C140 85, 155 105, 160 110 C120 120, 95 145, 80 180 C70 205, 65 240, 65 280 C65 340, 80 390, 100 410 L260 410 C280 390, 295 340, 295 280 C295 240, 290 205, 280 180 C265 145, 240 120, 200 110 C205 105, 220 85, 220 65 C220 40, 205 20, 180 20 Z"
              fill="#f0f9ff"
              stroke="#bae6fd"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* Fossas Nasais */}
            <g
              onClick={() => handleSelect('Fossas Nasais')}
              className="cursor-pointer"
            >
              <ellipse cx="180" cy="55" rx="8" ry="6" fill={selectedOrgan === 'Fossas Nasais' ? '#0284c7' : '#bae6fd'} stroke="#0369a1" strokeWidth="2" />
              <line x1="180" y1="55" x2="250" y2="55" stroke="#0284c7" strokeWidth="1" strokeDasharray="2 2" />
              <text x="254" y="58" fontSize="10" fill="#0369a1" fontWeight="600">Fossas Nasais</text>
            </g>

            {/* Faringe */}
            <g
              onClick={() => handleSelect('Faringe')}
              className="cursor-pointer"
            >
              <rect x="176" y="65" width="8" height="15" fill={selectedOrgan === 'Faringe' ? '#0284c7' : '#93c5fd'} rx="3" />
              <line x1="176" y1="72" x2="110" y2="72" stroke="#0284c7" strokeWidth="1" strokeDasharray="2 2" />
              <text x="105" y="75" textAnchor="end" fontSize="10" fill="#0369a1" fontWeight="600">Faringe</text>
            </g>

            {/* Laringe */}
            <g
              onClick={() => handleSelect('Laringe')}
              className="cursor-pointer"
            >
              <polygon points="174,85 186,85 183,105 177,105" fill={selectedOrgan === 'Laringe' ? '#0284c7' : '#60a5fa'} stroke="#1d4ed8" strokeWidth="1.5" />
              <line x1="186" y1="95" x2="250" y2="95" stroke="#0284c7" strokeWidth="1" strokeDasharray="2 2" />
              <text x="254" y="98" fontSize="10" fill="#0369a1" fontWeight="600">Laringe</text>
            </g>

            {/* Traqueia (Anéis) */}
            <g
              onClick={() => handleSelect('Traqueia')}
              className="cursor-pointer"
            >
              <rect x="175" y="105" width="10" height="55" fill="#e2e8f0" stroke="#0284c7" strokeWidth="2" rx="4" />
              {/* Ring marks */}
              <line x1="175" y1="115" x2="185" y2="115" stroke="#0284c7" strokeWidth="1.5" />
              <line x1="175" y1="125" x2="185" y2="125" stroke="#0284c7" strokeWidth="1.5" />
              <line x1="175" y1="135" x2="185" y2="135" stroke="#0284c7" strokeWidth="1.5" />
              <line x1="175" y1="145" x2="185" y2="145" stroke="#0284c7" strokeWidth="1.5" />
              <line x1="175" y1="130" x2="110" y2="130" stroke="#0284c7" strokeWidth="1" strokeDasharray="2 2" />
              <text x="105" y="133" textAnchor="end" fontSize="10" fill="#0369a1" fontWeight="700">Traqueia</text>
            </g>

            {/* Brônquios Branching */}
            <g
              onClick={() => handleSelect('Brônquios e Bronquíolos')}
              className="cursor-pointer"
            >
              <path d="M180 160 Q160 175 145 190 M180 160 Q200 175 215 190" stroke="#1e40af" strokeWidth="5" fill="none" strokeLinecap="round" />
              {/* Bronchioles branches */}
              <path d="M145 190 Q130 205 125 230 M145 190 Q150 215 140 240 M215 190 Q230 205 235 230 M215 190 Q210 215 220 240" stroke="#3b82f6" strokeWidth="2.5" fill="none" />
              <line x1="215" y1="185" x2="270" y2="185" stroke="#1d4ed8" strokeWidth="1" strokeDasharray="2 2" />
              <text x="274" y="188" fontSize="10" fill="#1e40af" fontWeight="600">Brônquios</text>
            </g>

            {/* Left and Right Lungs with Dynamic Scale according to Breathing Phase */}
            <g
              onClick={() => handleSelect('Pulmões')}
              className="cursor-pointer transition-transform duration-700 ease-in-out"
              style={{
                transformOrigin: '180px 230px',
                transform: isInspiration ? 'scale(1.08)' : 'scale(0.92)'
              }}
            >
              {/* Left Lung (from viewer perspective, anatomical right) */}
              <path
                d="M172 175 C160 175, 120 185, 110 215 C100 245, 105 285, 125 305 C145 320, 168 315, 172 295 Z"
                fill="url(#lungLeft)"
                stroke="#b91c1c"
                strokeWidth="2.5"
                opacity={selectedOrgan === 'Pulmões' ? '1' : '0.9'}
              />
              {/* Right Lung (anatomical left, slightly indented for heart) */}
              <path
                d="M188 175 C200 175, 240 185, 250 215 C260 245, 255 285, 235 305 C215 320, 192 315, 188 295 Z"
                fill="url(#lungRight)"
                stroke="#b91c1c"
                strokeWidth="2.5"
                opacity={selectedOrgan === 'Pulmões' ? '1' : '0.9'}
              />

              <line x1="110" y1="260" x2="60" y2="260" stroke="#b91c1c" strokeWidth="1" strokeDasharray="2 2" />
              <text x="55" y="263" textAnchor="end" fontSize="10" fill="#991b1b" fontWeight="700">Pulmões</text>
            </g>

            {/* Diafragma - Moves down and flattens during inspiration, curves up during expiration */}
            <g
              onClick={() => handleSelect('Diafragma')}
              className="cursor-pointer transition-all duration-700 ease-in-out"
            >
              {isInspiration ? (
                // Contracted & lowered
                <path
                  d="M95 340 Q180 355 265 340"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              ) : (
                // Relaxed & curved up
                <path
                  d="M95 340 Q180 305 265 340"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              )}
              <line x1="180" y1={isInspiration ? 348 : 318} x2="180" y2="390" stroke="#059669" strokeWidth="1.5" strokeDasharray="2 2" />
              <text x="180" y="405" textAnchor="middle" fontSize="11" fill="#065f46" fontWeight="bold">
                Diafragma ({isInspiration ? 'Contrai e desce ↓' : 'Descontrai e sobe ↑'})
              </text>
            </g>

            {/* Animated Air Bubbles */}
            {isInspiration ? (
              // Inhaling blue O2 bubbles downward
              <g className="animate-pulse">
                <circle cx="180" cy="80" r="4" fill="#38bdf8" />
                <circle cx="180" cy="115" r="5" fill="#38bdf8" />
                <circle cx="160" cy="185" r="4.5" fill="#38bdf8" />
                <circle cx="200" cy="185" r="4.5" fill="#38bdf8" />
                <text x="180" y="35" textAnchor="middle" fontSize="11" fill="#0284c7" fontWeight="bold">
                  Entrada de Oxigénio (O2) ↓
                </text>
              </g>
            ) : (
              // Exhaling reddish/orange CO2 bubbles upward
              <g className="animate-pulse">
                <circle cx="160" cy="195" r="4.5" fill="#f97316" />
                <circle cx="200" cy="195" r="4.5" fill="#f97316" />
                <circle cx="180" cy="120" r="5" fill="#f97316" />
                <circle cx="180" cy="75" r="4" fill="#f97316" />
                <text x="180" y="35" textAnchor="middle" fontSize="11" fill="#c2410c" fontWeight="bold">
                  Saída de Dióxido de Carbono (CO2) ↑
                </text>
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Control & Concept Deck */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        {/* Active Breathing State Box */}
        <div
          className={`border rounded-2xl p-4 transition-colors ${
            isInspiration ? 'bg-sky-50 border-sky-300' : 'bg-amber-50 border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
              Movimento Respiratório
            </span>
            <button
              onClick={() =>
                speakText(
                  isInspiration
                    ? 'Inspiração: O ar entra nos pulmões. O diafragma contrai e desce, o peito aumenta de tamanho!'
                    : 'Expiração: O ar sai dos pulmões com dióxido de carbono. O diafragma descontrai e sobe!'
                )
              }
              className="p-1.5 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-800 transition-colors"
              title="Ouvir explicação em voz alta"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <h4 className="text-lg font-bold text-slate-900 mb-1">
            {isInspiration ? '1. INSPIRAÇÃO (O ar entra)' : '2. EXPIRAÇÃO (O ar sai)'}
          </h4>

          <ul className="text-sm text-slate-700 space-y-1.5 mt-2">
            <li className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isInspiration ? 'bg-sky-500' : 'bg-amber-500'}`} />
              <span>
                <strong>Ar:</strong> {isInspiration ? 'Entra rico em Oxigénio (O2)' : 'Sai rico em Dióxido de Carbono (CO2)'}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isInspiration ? 'bg-sky-500' : 'bg-amber-500'}`} />
              <span>
                <strong>Pulmões:</strong> {isInspiration ? 'Enchem-se e expandem' : 'Esvaziam e encolhem'}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isInspiration ? 'bg-sky-500' : 'bg-amber-500'}`} />
              <span>
                <strong>Diafragma:</strong>{' '}
                {isInspiration ? (
                  <span className="text-sky-700 font-semibold">Contrai e desce ↓</span>
                ) : (
                  <span className="text-amber-700 font-semibold">Descontrai e sobe ↑</span>
                )}
              </span>
            </li>
          </ul>
        </div>

        {/* Selected Organ Inspector */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-sky-100 text-sky-700 rounded-md">
                <Info className="w-4 h-4" />
              </span>
              <span className="text-xs font-semibold text-slate-500">Órgão Selecionado</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 font-medium text-slate-700">
              {organDescriptions[selectedOrgan]?.tipo || 'Órgão'}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-1">{selectedOrgan}</h3>
          <p className="text-sm text-slate-700 leading-relaxed mb-3">
            {organDescriptions[selectedOrgan]?.func || 'Clica num órgão no desenho para saber a sua função.'}
          </p>

          <button
            onClick={() => speakText(`${selectedOrgan}: ${organDescriptions[selectedOrgan]?.func}`)}
            className="inline-flex items-center gap-1.5 text-xs text-sky-700 hover:text-sky-800 font-medium"
          >
            <Volume2 className="w-3.5 h-3.5" />
            Ouvir detalhes deste órgão
          </button>
        </div>

        {/* 4th grade curriculum note */}
        <div className="bg-white border border-sky-200 rounded-xl p-3 text-xs text-sky-950 flex items-start gap-2.5">
          <Wind className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold text-sky-900">Atenção no 4.º ano:</strong> O diafragma <strong>não faz parte</strong> do sistema respiratório, mas é fundamental para o seu funcionamento!
          </div>
        </div>
      </div>
    </div>
  );
};
