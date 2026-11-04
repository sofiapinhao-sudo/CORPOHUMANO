import React, { useState } from 'react';
import { Volume2, Info, ChevronRight, Play, RotateCcw } from 'lucide-react';
import { speakText, playPopSound } from '../../utils/soundEffects';

interface Props {
  onSelectOrgan?: (organName: string) => void;
}

export const DigestiveDiagram: React.FC<Props> = ({ onSelectOrgan }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [highlightMode, setHighlightMode] = useState<'all' | 'tubo' | 'glandulas'>('all');
  const [selectedOrgan, setSelectedOrgan] = useState<string>('Estômago');

  const steps = [
    {
      step: 1,
      title: '1. Boca',
      desc: 'Os dentes cortam e a saliva transforma o alimento no bolo alimentar.',
      organId: 'boca',
      color: '#f59e0b',
      x: 180,
      y: 70
    },
    {
      step: 2,
      title: '2. Faringe e Esófago',
      desc: 'O bolo alimentar é engolido e desliza pelo esófago até ao estômago.',
      organId: 'esofago',
      color: '#f59e0b',
      x: 180,
      y: 130
    },
    {
      step: 3,
      title: '3. Estômago',
      desc: 'O suco gástrico transforma o bolo alimentar no quimo (massa líquida).',
      organId: 'estomago',
      color: '#ea580c',
      x: 195,
      y: 200
    },
    {
      step: 4,
      title: '4. Intestino Delgado',
      desc: 'Recebe a bílis do fígado e o suco do pâncreas. Os nutrientes passam para o sangue!',
      organId: 'intestino_delgado',
      color: '#16a34a',
      x: 180,
      y: 290
    },
    {
      step: 5,
      title: '5. Intestino Grosso e Ânus',
      desc: 'As substâncias não digeridas formam as fezes, guardadas no reto e expelidas pelo ânus.',
      organId: 'intestino_grosso',
      color: '#b45309',
      x: 180,
      y: 350
    }
  ];

  const organDescriptions: Record<string, { tipo: string; func: string }> = {
    'Boca': { tipo: 'Tubo digestivo', func: 'Mastigação com os dentes e mistura com a saliva pelas glândulas salivares.' },
    'Glândulas Salivares': { tipo: 'Glândula anexa', func: 'Produzem a saliva que humedece e inicia a quebra dos alimentos.' },
    'Faringe': { tipo: 'Tubo digestivo', func: 'Canal em forma de tubo que conduz o alimento da boca para o esófago.' },
    'Esófago': { tipo: 'Tubo digestivo', func: 'Tubo com paredes musculares que empurram o bolo alimentar até ao estômago.' },
    'Estômago': { tipo: 'Tubo digestivo', func: 'Bolsa elástica onde o suco gástrico desfaz a comida, transformando-a em quimo.' },
    'Fígado': { tipo: 'Glândula anexa', func: 'Produz a bílis, que é enviada ao intestino delgado para digerir gorduras.' },
    'Pâncreas': { tipo: 'Glândula anexa', func: 'Produz o suco pancreático que ajuda a decompor os nutrientes.' },
    'Intestino Delgado': { tipo: 'Tubo digestivo', func: 'Absorve os nutrientes e passa-os para o sangue para nutrir todo o corpo!' },
    'Intestino Grosso': { tipo: 'Tubo digestivo', func: 'Absorve a água das substâncias não digeridas e forma as fezes.' },
    'Reto e Ânus': { tipo: 'Tubo digestivo', func: 'O reto armazena as fezes e o ânus é o orifício por onde são expulsas.' }
  };

  const handleSelect = (name: string) => {
    setSelectedOrgan(name);
    playPopSound();
    if (onSelectOrgan) onSelectOrgan(name);
  };

  const currentStepData = steps[activeStep - 1];

  return (
    <div className="bg-white rounded-2xl border border-amber-200/80 shadow-sm p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      {/* Visual Canvas Area */}
      <div className="lg:col-span-7 flex flex-col items-center">
        {/* Mode Filter Buttons */}
        <div className="flex items-center gap-2 p-1.5 bg-amber-50 rounded-xl border border-amber-200 text-xs font-semibold text-amber-900 mb-3 self-center sm:self-start">
          <button
            onClick={() => { setHighlightMode('all'); playPopSound(); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${highlightMode === 'all' ? 'bg-amber-500 text-white shadow-sm' : 'hover:bg-amber-100 text-amber-800'}`}
          >
            Todos os Órgãos
          </button>
          <button
            onClick={() => { setHighlightMode('tubo'); playPopSound(); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${highlightMode === 'tubo' ? 'bg-amber-500 text-white shadow-sm' : 'hover:bg-amber-100 text-amber-800'}`}
          >
            Apenas Tubo Digestivo
          </button>
          <button
            onClick={() => { setHighlightMode('glandulas'); playPopSound(); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${highlightMode === 'glandulas' ? 'bg-amber-500 text-white shadow-sm' : 'hover:bg-amber-100 text-amber-800'}`}
          >
            Glândulas Anexas
          </button>
        </div>

        {/* Interactive SVG Diagram */}
        <div className="relative w-full max-w-[360px] h-[420px] bg-gradient-to-b from-amber-50/60 to-white rounded-2xl border border-amber-100 flex items-center justify-center p-2">
          <svg viewBox="0 0 360 420" className="w-full h-full select-none">
            <defs>
              <linearGradient id="bodyOutline" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#fef3c7" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="stomachGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
              <linearGradient id="liverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b45309" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Silhouette of upper human body */}
            <path
              d="M180 20 C155 20, 140 40, 140 65 C140 85, 155 105, 160 110 C120 120, 95 145, 80 180 C70 205, 65 240, 65 280 C65 340, 80 390, 100 410 L260 410 C280 390, 295 340, 295 280 C295 240, 290 205, 280 180 C265 145, 240 120, 200 110 C205 105, 220 85, 220 65 C220 40, 205 20, 180 20 Z"
              fill="url(#bodyOutline)"
              stroke="#fdba74"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* Boca */}
            <g
              onClick={() => handleSelect('Boca')}
              className="cursor-pointer transition-transform hover:scale-105"
              opacity={highlightMode === 'glandulas' ? 0.35 : 1}
            >
              <ellipse cx="180" cy="65" rx="18" ry="12" fill={selectedOrgan === 'Boca' ? '#f59e0b' : '#fed7aa'} stroke="#f97316" strokeWidth="2.5" />
              <text x="180" y="68" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7c2d12">Boca</text>
            </g>

            {/* Glândulas Salivares */}
            <g
              onClick={() => handleSelect('Glândulas Salivares')}
              className="cursor-pointer transition-transform hover:scale-105"
              opacity={highlightMode === 'tubo' ? 0.35 : 1}
            >
              <circle cx="205" cy="72" r="8" fill={selectedOrgan === 'Glândulas Salivares' ? '#fbbf24' : '#fef08a'} stroke="#d97706" strokeWidth="2" />
              <line x1="205" y1="72" x2="260" y2="72" stroke="#d97706" strokeWidth="1" strokeDasharray="2 2" />
              <text x="264" y="75" fontSize="10" fill="#92400e" fontWeight="600">Glândulas Salivares</text>
            </g>

            {/* Faringe e Esófago */}
            <g
              onClick={() => handleSelect('Esófago')}
              className="cursor-pointer"
              opacity={highlightMode === 'glandulas' ? 0.35 : 1}
            >
              <path
                d="M180 77 L180 160"
                stroke={selectedOrgan === 'Esófago' || selectedOrgan === 'Faringe' ? '#ea580c' : '#fb923c'}
                strokeWidth="10"
                strokeLinecap="round"
              />
              <line x1="175" y1="120" x2="105" y2="120" stroke="#ea580c" strokeWidth="1" strokeDasharray="2 2" />
              <text x="100" y="123" textAnchor="end" fontSize="10" fill="#9a3412" fontWeight="600">Esófago</text>
            </g>

            {/* Fígado (Glândula Anexa) */}
            <g
              onClick={() => handleSelect('Fígado')}
              className="cursor-pointer transition-transform hover:scale-105"
              opacity={highlightMode === 'tubo' ? 0.35 : 1}
            >
              <path
                d="M130 165 C130 155, 175 160, 185 170 C185 185, 175 210, 145 205 C125 200, 125 180, 130 165 Z"
                fill={selectedOrgan === 'Fígado' ? '#92400e' : 'url(#liverGrad)'}
                stroke="#451a03"
                strokeWidth="2"
              />
              <line x1="130" y1="185" x2="80" y2="185" stroke="#78350f" strokeWidth="1" strokeDasharray="2 2" />
              <text x="75" y="188" textAnchor="end" fontSize="10" fill="#78350f" fontWeight="700">Fígado (Bílis)</text>
            </g>

            {/* Estômago */}
            <g
              onClick={() => handleSelect('Estômago')}
              className="cursor-pointer transition-transform hover:scale-105"
              opacity={highlightMode === 'glandulas' ? 0.35 : 1}
            >
              <path
                d="M180 160 C195 160, 225 170, 225 195 C225 220, 195 230, 175 220 C165 210, 170 190, 180 160 Z"
                fill={selectedOrgan === 'Estômago' ? '#f97316' : 'url(#stomachGrad)'}
                stroke="#c2410c"
                strokeWidth="2.5"
                filter={selectedOrgan === 'Estômago' ? 'url(#glow)' : undefined}
              />
              <line x1="225" y1="195" x2="275" y2="195" stroke="#ea580c" strokeWidth="1" strokeDasharray="2 2" />
              <text x="279" y="198" fontSize="10" fill="#9a3412" fontWeight="700">Estômago (Quimo)</text>
            </g>

            {/* Pâncreas (Glândula anexa atrás do estômago) */}
            <g
              onClick={() => handleSelect('Pâncreas')}
              className="cursor-pointer"
              opacity={highlightMode === 'tubo' ? 0.35 : 1}
            >
              <ellipse cx="185" cy="225" rx="20" ry="6" fill={selectedOrgan === 'Pâncreas' ? '#facc15' : '#fde047'} stroke="#ca8a04" strokeWidth="1.8" />
              <line x1="205" y1="225" x2="275" y2="225" stroke="#ca8a04" strokeWidth="1" strokeDasharray="2 2" />
              <text x="279" y="228" fontSize="10" fill="#854d0e" fontWeight="600">Pâncreas</text>
            </g>

            {/* Intestino Grosso (Contorno em moldura) */}
            <g
              onClick={() => handleSelect('Intestino Grosso')}
              className="cursor-pointer"
              opacity={highlightMode === 'glandulas' ? 0.35 : 1}
            >
              <path
                d="M140 240 L140 330 C140 345, 155 350, 180 350 C205 350, 220 345, 220 330 L220 240 C220 235, 140 235, 140 240 Z"
                fill="none"
                stroke={selectedOrgan === 'Intestino Grosso' ? '#a16207' : '#d97706'}
                strokeWidth="18"
                strokeLinejoin="round"
                strokeLinecap="round"
                opacity="0.8"
              />
              <line x1="225" y1="300" x2="275" y2="300" stroke="#b45309" strokeWidth="1" strokeDasharray="2 2" />
              <text x="279" y="303" fontSize="10" fill="#78350f" fontWeight="600">Intestino Grosso</text>
            </g>

            {/* Intestino Delgado (Novelo no centro) */}
            <g
              onClick={() => handleSelect('Intestino Delgado')}
              className="cursor-pointer"
              opacity={highlightMode === 'glandulas' ? 0.35 : 1}
            >
              <path
                d="M160 255 Q180 245 200 255 Q160 270 200 280 Q160 295 200 305 Q170 315 190 325"
                fill="none"
                stroke={selectedOrgan === 'Intestino Delgado' ? '#16a34a' : '#fb923c'}
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line x1="145" y1="285" x2="70" y2="285" stroke="#16a34a" strokeWidth="1" strokeDasharray="2 2" />
              <text x="65" y="288" textAnchor="end" fontSize="10" fill="#15803d" fontWeight="700">Intestino Delgado</text>
            </g>

            {/* Reto e Ânus */}
            <g
              onClick={() => handleSelect('Reto e Ânus')}
              className="cursor-pointer"
              opacity={highlightMode === 'glandulas' ? 0.35 : 1}
            >
              <line x1="180" y1="350" x2="180" y2="390" stroke={selectedOrgan === 'Reto e Ânus' ? '#78350f' : '#92400e'} strokeWidth="10" strokeLinecap="round" />
              <circle cx="180" cy="392" r="5" fill="#451a03" />
              <line x1="180" y1="385" x2="105" y2="385" stroke="#78350f" strokeWidth="1" strokeDasharray="2 2" />
              <text x="100" y="388" textAnchor="end" fontSize="10" fill="#451a03" fontWeight="600">Reto e Ânus</text>
            </g>

            {/* Animated Food Particle / Bolo Alimentar along current step */}
            <g className="animate-float">
              <circle
                cx={currentStepData.x}
                cy={currentStepData.y}
                r="9"
                fill={currentStepData.color}
                stroke="#ffffff"
                strokeWidth="3"
                filter="url(#glow)"
              />
              <circle cx={currentStepData.x} cy={currentStepData.y} r="3" fill="#ffffff" />
            </g>
          </svg>
        </div>

        {/* Step-by-Step Food Journey Bar */}
        <div className="w-full mt-4 flex items-center justify-between gap-1 sm:gap-2">
          {steps.map((st) => (
            <button
              key={st.step}
              onClick={() => {
                setActiveStep(st.step);
                playPopSound();
              }}
              className={`flex-1 py-1.5 px-1 text-center rounded-lg text-xs font-semibold transition-all ${
                activeStep === st.step
                  ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-300'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
            >
              Etapa {st.step}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Concept Card */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        {/* Step details banner */}
        <div className="bg-amber-500/10 border border-amber-300 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Viagem do Alimento ({activeStep} de 5)
            </span>
            <button
              onClick={() => speakText(`${currentStepData.title}. ${currentStepData.desc}`)}
              className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors"
              title="Ouvir explicação em voz alta"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <h4 className="text-base font-bold text-amber-950 mb-1">{currentStepData.title}</h4>
          <p className="text-sm text-amber-900 leading-relaxed">{currentStepData.desc}</p>
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => {
                const next = activeStep < 5 ? activeStep + 1 : 1;
                setActiveStep(next);
                playPopSound();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium rounded-lg shadow-sm transition-colors"
            >
              {activeStep < 5 ? 'Avançar Etapa' : 'Recomeçar Viagem'}
              {activeStep < 5 ? <ChevronRight className="w-3.5 h-3.5" /> : <RotateCcw className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Selected Organ Inspector */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-amber-100 text-amber-700 rounded-md">
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
            {organDescriptions[selectedOrgan]?.func || 'Clica num órgão no desenho para saber a sua função na digestão.'}
          </p>

          <button
            onClick={() => speakText(`${selectedOrgan}: ${organDescriptions[selectedOrgan]?.func}`)}
            className="inline-flex items-center gap-1.5 text-xs text-amber-700 hover:text-amber-800 font-medium"
          >
            <Volume2 className="w-3.5 h-3.5" />
            Ouvir detalhes deste órgão
          </button>
        </div>

        {/* Quick Quiz Tip for 4th Graders */}
        <div className="bg-white border border-amber-200 rounded-xl p-3 text-xs text-amber-950 flex items-start gap-2.5">
          <span className="text-base">💡</span>
          <div>
            <strong className="font-semibold text-amber-900">Dica para os testes:</strong> O bolo alimentar forma-se na boca, no estômago chama-se <strong>quimo</strong> e a absorção para o sangue faz-se no <strong>intestino delgado</strong>!
          </div>
        </div>
      </div>
    </div>
  );
};
