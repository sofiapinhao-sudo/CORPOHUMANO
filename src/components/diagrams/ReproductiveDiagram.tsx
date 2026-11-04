import React, { useState } from 'react';
import { Volume2, Info, Users, Sparkles, Heart } from 'lucide-react';
import { speakText, playPopSound } from '../../utils/soundEffects';

interface Props {
  onSelectOrgan?: (organName: string) => void;
}

export const ReproductiveDiagram: React.FC<Props> = ({ onSelectOrgan }) => {
  const [activeView, setActiveView] = useState<'masculino' | 'feminino' | 'fecundacao' | 'puberdade'>('feminino');
  const [selectedOrgan, setSelectedOrgan] = useState<string>('Útero');

  const descriptions: Record<string, { tipo: string; func: string }> = {
    // Feminino
    'Ovários': {
      tipo: 'Órgão Reprodutor Feminino',
      func: 'Produzem as células sexuais femininas: os oócitos (ou óvulos).'
    },
    'Útero': {
      tipo: 'Órgão Reprodutor Feminino',
      func: 'Órgão muscular oco onde o novo ser humano se desenvolve e cresce com proteção e carinho durante os 9 meses de gestação.'
    },
    'Vagina': {
      tipo: 'Órgão Reprodutor Feminino',
      func: 'Canal muscular e elástico que faz a ligação entre o útero e o exterior do corpo feminino.'
    },
    'Vulva': {
      tipo: 'Órgão Reprodutor Feminino',
      func: 'Conjunto dos órgãos genitais externos femininos que protegem as vias genitais.'
    },
    // Masculino
    'Testículos': {
      tipo: 'Órgão Reprodutor Masculino',
      func: 'Dois órgãos externos que produzem as células sexuais masculinas: os espermatozoides.'
    },
    'Pénis': {
      tipo: 'Órgão Reprodutor Masculino',
      func: 'Órgão genital externo masculino por onde passa a uretra.'
    },
    'Uretra (masculina)': {
      tipo: 'Órgão Misto',
      func: 'Canal por onde passa tanto a urina como as células reprodutoras masculinas.'
    },
    // Fecundação
    'Fecundação': {
      tipo: 'Início da Vida',
      func: 'Quando um espermatozoide se une com um oócito, ocorre a fecundação, dando origem a um novo ser humano!'
    }
  };

  const handleSelect = (name: string) => {
    setSelectedOrgan(name);
    playPopSound();
    if (onSelectOrgan) onSelectOrgan(name);
  };

  return (
    <div className="bg-white rounded-2xl border border-pink-200/80 shadow-sm p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      {/* Visual Canvas Area */}
      <div className="lg:col-span-7 flex flex-col items-center">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-pink-50 rounded-xl border border-pink-200 text-xs font-semibold mb-3">
          <button
            onClick={() => { setActiveView('feminino'); handleSelect('Útero'); }}
            className={`px-2.5 py-1.5 rounded-lg transition-all ${
              activeView === 'feminino' ? 'bg-pink-600 text-white shadow-sm' : 'text-pink-800 hover:bg-pink-100'
            }`}
          >
            Sistema Feminino
          </button>
          <button
            onClick={() => { setActiveView('masculino'); handleSelect('Testículos'); }}
            className={`px-2.5 py-1.5 rounded-lg transition-all ${
              activeView === 'masculino' ? 'bg-pink-600 text-white shadow-sm' : 'text-pink-800 hover:bg-pink-100'
            }`}
          >
            Sistema Masculino
          </button>
          <button
            onClick={() => { setActiveView('fecundacao'); handleSelect('Fecundação'); }}
            className={`px-2.5 py-1.5 rounded-lg transition-all ${
              activeView === 'fecundacao' ? 'bg-pink-600 text-white shadow-sm' : 'text-pink-800 hover:bg-pink-100'
            }`}
          >
            A Fecundação
          </button>
          <button
            onClick={() => { setActiveView('puberdade'); playPopSound(); }}
            className={`px-2.5 py-1.5 rounded-lg transition-all ${
              activeView === 'puberdade' ? 'bg-pink-600 text-white shadow-sm' : 'text-pink-800 hover:bg-pink-100'
            }`}
          >
            Puberdade & Mudanças
          </button>
        </div>

        {/* Dynamic Display per Tab */}
        <div className="relative w-full max-w-[360px] h-[400px] bg-gradient-to-b from-pink-50/50 via-white to-purple-50/30 rounded-2xl border border-pink-100 flex items-center justify-center p-3">
          {activeView === 'feminino' && (
            <svg viewBox="0 0 360 380" className="w-full h-full select-none">
              <defs>
                <linearGradient id="uterusGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#e11d48" />
                </linearGradient>
              </defs>

              {/* Trompas e Ovários Esquerdo e Direito */}
              <g
                onClick={() => handleSelect('Ovários')}
                className="cursor-pointer transition-transform hover:scale-105"
              >
                {/* Trompa esquerda */}
                <path d="M180 130 C130 90, 80 110, 75 140" stroke="#fda4af" strokeWidth="10" fill="none" strokeLinecap="round" />
                {/* Ovário esquerdo */}
                <ellipse cx="65" cy="145" rx="14" ry="11" fill={selectedOrgan === 'Ovários' ? '#e11d48' : '#fecdd3'} stroke="#be123c" strokeWidth="2.5" />
                <line x1="65" y1="145" x2="25" y2="145" stroke="#be123c" strokeWidth="1" strokeDasharray="2 2" />
                <text x="20" y="148" textAnchor="end" fontSize="11" fill="#9f1239" fontWeight="bold">Ovário</text>

                {/* Trompa direita */}
                <path d="M180 130 C230 90, 280 110, 285 140" stroke="#fda4af" strokeWidth="10" fill="none" strokeLinecap="round" />
                {/* Ovário direito */}
                <ellipse cx="295" cy="145" rx="14" ry="11" fill={selectedOrgan === 'Ovários' ? '#e11d48' : '#fecdd3'} stroke="#be123c" strokeWidth="2.5" />
                <line x1="295" y1="145" x2="335" y2="145" stroke="#be123c" strokeWidth="1" strokeDasharray="2 2" />
                <text x="340" y="148" fontSize="11" fill="#9f1239" fontWeight="bold">Ovário</text>
              </g>

              {/* Útero (Forma de pera invertida) */}
              <g
                onClick={() => handleSelect('Útero')}
                className="cursor-pointer transition-transform hover:scale-105"
              >
                <path
                  d="M140 120 C140 100, 220 100, 220 120 C220 170, 195 210, 190 230 L170 230 C165 210, 140 170, 140 120 Z"
                  fill="url(#uterusGrad)"
                  stroke="#9f1239"
                  strokeWidth="3"
                />
                <circle cx="180" cy="160" r="14" fill="#ffffff" opacity="0.25" />
                <line x1="220" y1="160" x2="280" y2="160" stroke="#be123c" strokeWidth="1" strokeDasharray="2 2" />
                <text x="285" y="163" fontSize="11" fill="#881337" fontWeight="bold">Útero</text>
              </g>

              {/* Vagina */}
              <g
                onClick={() => handleSelect('Vagina')}
                className="cursor-pointer"
              >
                <rect x="165" y="230" width="30" height="70" rx="6" fill={selectedOrgan === 'Vagina' ? '#fda4af' : '#fbcfe8'} stroke="#db2777" strokeWidth="2.5" />
                <line x1="165" y1="265" x2="95" y2="265" stroke="#db2777" strokeWidth="1" strokeDasharray="2 2" />
                <text x="90" y="268" textAnchor="end" fontSize="11" fill="#9d174d" fontWeight="bold">Vagina</text>
              </g>

              {/* Vulva */}
              <g
                onClick={() => handleSelect('Vulva')}
                className="cursor-pointer"
              >
                <ellipse cx="180" cy="315" rx="20" ry="12" fill="#fdf2f8" stroke="#db2777" strokeWidth="2" />
                <line x1="180" y1="327" x2="180" y2="355" stroke="#db2777" strokeWidth="1" strokeDasharray="2 2" />
                <text x="180" y="370" textAnchor="middle" fontSize="11" fill="#9d174d" fontWeight="bold">Vulva (Genitais externos)</text>
              </g>
            </svg>
          )}

          {activeView === 'masculino' && (
            <svg viewBox="0 0 360 380" className="w-full h-full select-none">
              {/* Bexiga e uretra no topo */}
              <ellipse cx="180" cy="90" rx="35" ry="25" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
              <text x="180" y="93" textAnchor="middle" fontSize="9" fill="#713f12">Bexiga</text>

              {/* Próstata e canais */}
              <path d="M165 115 C165 110, 195 110, 195 115 L190 145 L170 145 Z" fill="#fbcfe8" stroke="#db2777" strokeWidth="2" />

              {/* Pénis e Uretra */}
              <g
                onClick={() => handleSelect('Pénis')}
                className="cursor-pointer"
              >
                <path d="M170 145 L170 250 C170 265, 190 265, 190 250 L190 145 Z" fill="#fed7aa" stroke="#ea580c" strokeWidth="2.5" />
                {/* Uretra central */}
                <line x1="180" y1="115" x2="180" y2="258" stroke="#ca8a04" strokeWidth="3" strokeDasharray="2 2" />
                <line x1="190" y1="200" x2="265" y2="200" stroke="#ea580c" strokeWidth="1" strokeDasharray="2 2" />
                <text x="270" y="203" fontSize="11" fill="#9a3412" fontWeight="bold">Pénis</text>
                <text x="270" y="218" fontSize="10" fill="#713f12">Uretra (no interior)</text>
              </g>

              {/* Testículos */}
              <g
                onClick={() => handleSelect('Testículos')}
                className="cursor-pointer transition-transform hover:scale-105"
              >
                {/* Bolsa escrotal com os dois testículos */}
                <path
                  d="M150 210 C130 230, 140 280, 165 285 C175 285, 180 275, 180 270 C180 275, 185 285, 195 285 C220 280, 230 230, 210 210"
                  fill="#ffedd5"
                  stroke="#c2410c"
                  strokeWidth="2"
                />
                {/* Testículo esquerdo e direito */}
                <ellipse cx="160" cy="250" rx="14" ry="18" fill={selectedOrgan === 'Testículos' ? '#ea580c' : '#fed7aa'} stroke="#9a3412" strokeWidth="2" />
                <ellipse cx="200" cy="250" rx="14" ry="18" fill={selectedOrgan === 'Testículos' ? '#ea580c' : '#fed7aa'} stroke="#9a3412" strokeWidth="2" />

                <line x1="150" y1="250" x2="80" y2="250" stroke="#9a3412" strokeWidth="1" strokeDasharray="2 2" />
                <text x="75" y="253" textAnchor="end" fontSize="11" fill="#7c2d12" fontWeight="bold">Testículos</text>
                <text x="75" y="268" textAnchor="end" fontSize="9" fill="#9a3412">Produzem espermatozoides</text>
              </g>
            </svg>
          )}

          {activeView === 'fecundacao' && (
            <div className="flex flex-col items-center justify-center p-3 text-center">
              <div className="relative w-44 h-44 flex items-center justify-center mb-3">
                {/* Oócito (Grande célula feminina) */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-pink-300 via-rose-200 to-pink-100 border-4 border-rose-400 flex items-center justify-center shadow-lg relative">
                  <div className="w-12 h-12 rounded-full bg-rose-400/30 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-rose-900">Núcleo</span>
                  </div>
                  <span className="absolute -top-6 text-xs font-bold text-pink-900 bg-pink-100 px-2 py-0.5 rounded-full border border-pink-300">
                    Oócito (Feminino)
                  </span>
                </div>

                {/* Espermatozoides a nadar (Célula masculina) */}
                <div className="absolute -left-2 top-8 flex items-center gap-1 animate-pulse">
                  <div className="w-4 h-2.5 rounded-full bg-blue-600" />
                  <div className="w-8 h-0.5 bg-blue-500 rounded-full" />
                </div>
                <div className="absolute right-0 bottom-8 flex items-center gap-1 animate-pulse">
                  <div className="w-8 h-0.5 bg-blue-500 rounded-full" />
                  <div className="w-4 h-2.5 rounded-full bg-blue-600" />
                </div>
              </div>

              <div className="p-3 bg-pink-100/70 border border-pink-300 rounded-xl max-w-xs">
                <h5 className="text-sm font-bold text-pink-950 mb-1 flex items-center justify-center gap-1">
                  <Heart className="w-4 h-4 text-rose-600 fill-rose-500" />
                  União que dá origem à vida!
                </h5>
                <p className="text-xs text-pink-900 leading-relaxed">
                  Quando <strong>1 espermatozoide</strong> entra no <strong>oócito</strong>, dá-se a <strong>fecundação</strong>. É aí que começa uma nova vida humana!
                </p>
              </div>
            </div>
          )}

          {activeView === 'puberdade' && (
            <div className="w-full h-full flex flex-col justify-between py-2 overflow-y-auto">
              <div className="text-center mb-2">
                <span className="text-xs font-bold text-purple-900 uppercase tracking-wide">
                  O que é a Puberdade?
                </span>
                <p className="text-xs text-slate-600 mt-0.5">
                  Fase de transformações físicas e emocionais entre a infância e a adolescência!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Rapazes */}
                <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1 font-bold text-blue-900">
                    <span className="text-base">👦</span> Nos Rapazes:
                  </div>
                  <ul className="text-[11px] text-blue-800 space-y-1 list-disc list-inside">
                    <li>Pelos na face (a barba)</li>
                    <li>Músculos e ombros alargam</li>
                    <li>Laringe aumenta e voz engrossa</li>
                    <li>Crescimento rápido (estatura)</li>
                  </ul>
                </div>

                {/* Raparigas */}
                <div className="p-2.5 rounded-xl bg-pink-50 border border-pink-200 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1 font-bold text-pink-900">
                    <span className="text-base">👧</span> Nas Raparigas:
                  </div>
                  <ul className="text-[11px] text-pink-800 space-y-1 list-disc list-inside">
                    <li>Glândulas mamárias desenvolvem-se</li>
                    <li>Ancas e bacia alargam</li>
                    <li>Desenvolvimento dos órgãos sexuais</li>
                    <li>Início da menstruação</li>
                  </ul>
                </div>
              </div>

              <div className="mt-2 p-2 bg-purple-50 rounded-xl border border-purple-200 text-center text-[11px] text-purple-900 font-medium">
                🌱 Cada pessoa cresce ao seu próprio ritmo e todas as transformações são perfeitamente naturais!
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Control & Concept Deck */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        {/* Reproductive System Mission */}
        <div className="bg-pink-500/10 border border-pink-300 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-900">
              Função: Continuidade da Espécie
            </span>
            <button
              onClick={() =>
                speakText(
                  'O sistema reprodutor é formado por um conjunto de órgãos responsáveis pela produção das células sexuais, permitindo a continuidade da espécie humana!'
                )
              }
              className="p-1.5 rounded-lg bg-pink-100 hover:bg-pink-200 text-pink-900 transition-colors"
              title="Ouvir explicação em voz alta"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-pink-950 leading-relaxed mb-2">
            Produz as células sexuais (<strong>espermatozoides</strong> nos testículos e <strong>oócitos</strong> nos ovários) e cria as condições perfeitas para dar origem a um novo ser no útero.
          </p>
        </div>

        {/* Selected Organ Inspector */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-pink-100 text-pink-800 rounded-md">
                <Info className="w-4 h-4" />
              </span>
              <span className="text-xs font-semibold text-slate-500">Elemento Selecionado</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 font-medium text-slate-700">
              {descriptions[selectedOrgan]?.tipo || 'Órgão'}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-1">{selectedOrgan}</h3>
          <p className="text-sm text-slate-700 leading-relaxed mb-3">
            {descriptions[selectedOrgan]?.func || 'Clica num elemento do diagrama para ler a sua função.'}
          </p>

          <button
            onClick={() => speakText(`${selectedOrgan}: ${descriptions[selectedOrgan]?.func}`)}
            className="inline-flex items-center gap-1.5 text-xs text-pink-800 hover:text-pink-900 font-medium"
          >
            <Volume2 className="w-3.5 h-3.5" />
            Ouvir detalhes
          </button>
        </div>

        {/* 4th grade hygiene rules */}
        <div className="bg-white border border-pink-200 rounded-xl p-3 text-xs text-pink-950">
          <strong className="font-semibold text-pink-900 block mb-1">🧼 Cuidados essenciais de higiene:</strong>
          <span className="text-slate-700">
            Higiene diária dos órgãos genitais, mudar de roupa interior todos os dias, usar roupa confortável e utilizar sanitários públicos com cuidado!
          </span>
        </div>
      </div>
    </div>
  );
};
