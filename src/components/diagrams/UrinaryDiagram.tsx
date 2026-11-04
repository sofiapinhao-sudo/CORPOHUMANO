import React, { useState } from 'react';
import { Volume2, Info, Droplets, Sun, Sparkles } from 'lucide-react';
import { speakText, playPopSound } from '../../utils/soundEffects';

interface Props {
  onSelectOrgan?: (organName: string) => void;
}

export const UrinaryDiagram: React.FC<Props> = ({ onSelectOrgan }) => {
  const [activeTab, setActiveTab] = useState<'urinario' | 'pele'>('urinario');
  const [bladderLevel, setBladderLevel] = useState<number>(45); // percentage
  const [selectedOrgan, setSelectedOrgan] = useState<string>('Rins');

  const descriptions: Record<string, { tipo: string; func: string }> = {
    'Rins': {
      tipo: 'Filtros do Sangue',
      func: 'Dois órgãos em forma de feijão que limpam todo o sangue do corpo. Devolvem os nutrientes bons e transformam as impurezas em urina.'
    },
    'Ureteres': {
      tipo: 'Vias Urinárias',
      func: 'Dois canais estreitos que transportam a urina formada nos rins, gota a gota, até à bexiga.'
    },
    'Bexiga': {
      tipo: 'Vias Urinárias',
      func: 'Bolsa muscular elástica que guarda a urina. À medida que se enche, avisa o cérebro que precisamos de urinar.'
    },
    'Uretra': {
      tipo: 'Vias Urinárias',
      func: 'Canal por onde a urina é expulsa da bexiga para o exterior do corpo.'
    },
    'Pele': {
      tipo: 'Órgão Excretor e Protetor',
      func: 'Maior órgão do corpo humano! Elimina impurezas através do suor e mantém a temperatura do corpo fresca e equilibrada.'
    },
    'Glândulas Sudoríparas': {
      tipo: 'Glândulas da Pele',
      func: 'Glândulas em forma de novelo que produzem o suor quando o corpo aquece ou quando praticamos exercício.'
    },
    'Poros': {
      tipo: 'Aberturas na Pele',
      func: 'Minúsculos buraquinhos na pele por onde o suor sai para a superfície e evapora, arrefecendo o corpo.'
    }
  };

  const handleSelect = (name: string) => {
    setSelectedOrgan(name);
    playPopSound();
    if (onSelectOrgan) onSelectOrgan(name);
  };

  const handleDrinkWater = () => {
    playPopSound();
    setBladderLevel((prev) => (prev >= 90 ? 20 : prev + 25));
  };

  return (
    <div className="bg-white rounded-2xl border border-yellow-200/80 shadow-sm p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      {/* Visual Canvas Area */}
      <div className="lg:col-span-7 flex flex-col items-center">
        {/* Tab switch: Urinário vs Pele */}
        <div className="flex items-center gap-2 p-1.5 bg-amber-50 rounded-xl border border-amber-200 text-xs font-semibold mb-3">
          <button
            onClick={() => { setActiveTab('urinario'); handleSelect('Rins'); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'urinario' ? 'bg-amber-600 text-white shadow-sm' : 'text-amber-800 hover:bg-amber-100'
            }`}
          >
            Sistema Urinário (Rins e Vias)
          </button>
          <button
            onClick={() => { setActiveTab('pele'); handleSelect('Pele'); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'pele' ? 'bg-amber-600 text-white shadow-sm' : 'text-amber-800 hover:bg-amber-100'
            }`}
          >
            A Pele (Transpiração)
          </button>
        </div>

        {activeTab === 'urinario' ? (
          /* SVG Urinary System */
          <div className="relative w-full max-w-[360px] h-[400px] bg-gradient-to-b from-amber-50/40 via-white to-sky-50/30 rounded-2xl border border-amber-100 flex items-center justify-center p-2">
            <svg viewBox="0 0 360 400" className="w-full h-full select-none">
              <defs>
                <linearGradient id="kidneyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#b91c1c" />
                  <stop offset="100%" stopColor="#7f1d1d" />
                </linearGradient>
                <linearGradient id="bladderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="100%" stopColor="#facc15" />
                </linearGradient>
              </defs>

              {/* Silhouette */}
              <path
                d="M180 20 C140 20, 110 50, 95 100 C80 150, 75 220, 75 300 C75 360, 100 390, 180 390 C260 390, 285 360, 285 300 C285 220, 280 150, 265 100 C250 50, 220 20, 180 20 Z"
                fill="#fefce8"
                stroke="#fef08a"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Vasos Principais: Artéria Renal (Vermelho) e Veia Renal (Azul) */}
              <line x1="172" y1="40" x2="172" y2="280" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
              <line x1="188" y1="40" x2="188" y2="280" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round" />

              {/* Ramificações renais */}
              <path d="M172 130 L130 130 M172 145 L130 145" stroke="#ef4444" strokeWidth="4" />
              <path d="M188 130 L230 130 M188 145 L230 145" stroke="#3b82f6" strokeWidth="4" />

              {/* Rim Esquerdo (Direito na anatomia) */}
              <g
                onClick={() => handleSelect('Rins')}
                className="cursor-pointer transition-transform hover:scale-105"
              >
                <path
                  d="M130 100 C110 100, 90 120, 90 145 C90 170, 110 190, 130 190 C140 170, 140 120, 130 100 Z"
                  fill={selectedOrgan === 'Rins' ? '#dc2626' : 'url(#kidneyGrad)'}
                  stroke="#450a0a"
                  strokeWidth="2.5"
                />
                <line x1="90" y1="145" x2="40" y2="145" stroke="#b91c1c" strokeWidth="1" strokeDasharray="2 2" />
                <text x="35" y="148" textAnchor="end" fontSize="11" fill="#7f1d1d" fontWeight="700">Rim</text>
              </g>

              {/* Rim Direito */}
              <g
                onClick={() => handleSelect('Rins')}
                className="cursor-pointer transition-transform hover:scale-105"
              >
                <path
                  d="M230 100 C250 100, 270 120, 270 145 C270 170, 250 190, 230 190 C220 170, 220 120, 230 100 Z"
                  fill={selectedOrgan === 'Rins' ? '#dc2626' : 'url(#kidneyGrad)'}
                  stroke="#450a0a"
                  strokeWidth="2.5"
                />
                <line x1="270" y1="145" x2="315" y2="145" stroke="#b91c1c" strokeWidth="1" strokeDasharray="2 2" />
                <text x="320" y="148" fontSize="11" fill="#7f1d1d" fontWeight="700">Rim</text>
              </g>

              {/* Ureteres (Canais amarelos a transportar a urina) */}
              <g
                onClick={() => handleSelect('Ureteres')}
                className="cursor-pointer"
              >
                <path
                  d="M130 180 C135 220, 155 250, 168 280"
                  stroke="#eab308"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M230 180 C225 220, 205 250, 192 280"
                  stroke="#eab308"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Gotas animadas descendo */}
                <circle cx="145" cy="220" r="3" fill="#facc15" className="animate-pulse" />
                <circle cx="215" cy="220" r="3" fill="#facc15" className="animate-pulse" />
                <line x1="225" y1="210" x2="290" y2="210" stroke="#ca8a04" strokeWidth="1" strokeDasharray="2 2" />
                <text x="295" y="213" fontSize="10" fill="#a16207" fontWeight="600">Ureteres</text>
              </g>

              {/* Bexiga com nível de enchimento dinâmico */}
              <g
                onClick={() => handleSelect('Bexiga')}
                className="cursor-pointer transition-transform hover:scale-105"
              >
                {/* Contorno da Bexiga */}
                <ellipse cx="180" cy="300" rx="36" ry="30" fill="#fef08a" stroke="#ca8a04" strokeWidth="3" />
                {/* Líquido da urina dentro da bexiga */}
                <ellipse
                  cx="180"
                  cy={310 - (bladderLevel * 0.15)}
                  rx={26 * (bladderLevel / 100 + 0.3)}
                  ry={18 * (bladderLevel / 100 + 0.3)}
                  fill="#eab308"
                  opacity="0.8"
                />
                <text x="180" y="305" textAnchor="middle" fontSize="10" fill="#713f12" fontWeight="bold">
                  Bexiga ({bladderLevel}%)
                </text>
                <line x1="144" y1="300" x2="60" y2="300" stroke="#ca8a04" strokeWidth="1" strokeDasharray="2 2" />
                <text x="55" y="303" textAnchor="end" fontSize="10" fill="#854d0e" fontWeight="700">Bexiga</text>
              </g>

              {/* Uretra */}
              <g
                onClick={() => handleSelect('Uretra')}
                className="cursor-pointer"
              >
                <line x1="180" y1="330" x2="180" y2="375" stroke="#a16207" strokeWidth="6" strokeLinecap="round" />
                <line x1="180" y1="355" x2="250" y2="355" stroke="#a16207" strokeWidth="1" strokeDasharray="2 2" />
                <text x="254" y="358" fontSize="10" fill="#713f12" fontWeight="600">Uretra</text>
              </g>
            </svg>
          </div>
        ) : (
          /* SVG Pele & Transpiração (Corte da pele) */
          <div className="relative w-full max-w-[360px] h-[400px] bg-gradient-to-b from-sky-50 to-amber-50 rounded-2xl border border-amber-200 flex items-center justify-center p-2">
            <svg viewBox="0 0 360 400" className="w-full h-full select-none">
              <defs>
                <linearGradient id="epidermis" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fed7aa" />
                  <stop offset="100%" stopColor="#fdba74" />
                </linearGradient>
                <linearGradient id="dermis" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>
              </defs>

              {/* Céu / Ar exterior */}
              <rect x="20" y="20" width="320" height="90" fill="#f0f9ff" rx="10" />
              <text x="180" y="45" textAnchor="middle" fontSize="12" fill="#0369a1" fontWeight="bold">
                Ar exterior e Sol (Calor)
              </text>

              {/* Gotas de suor a evaporar */}
              <circle cx="100" cy="80" r="5" fill="#38bdf8" />
              <circle cx="180" cy="75" r="6" fill="#38bdf8" />
              <circle cx="260" cy="82" r="5" fill="#38bdf8" />
              <text x="180" y="65" textAnchor="middle" fontSize="10" fill="#0284c7" fontWeight="600">
                Suor a evaporar pelos poros (Arrefece o corpo!)
              </text>

              {/* Superfície da Pele (Epiderme) */}
              <rect x="20" y="110" width="320" height="40" fill="url(#epidermis)" stroke="#f97316" strokeWidth="2" />
              <text x="35" y="135" fontSize="11" fill="#9a3412" fontWeight="bold">Epiderme (Superfície)</text>

              {/* Poros na superfície */}
              <circle cx="100" cy="110" r="4" fill="#0284c7" />
              <circle cx="180" cy="110" r="4" fill="#0284c7" />
              <circle cx="260" cy="110" r="4" fill="#0284c7" />

              {/* Camada Interna (Derme) */}
              <rect x="20" y="150" width="320" height="220" fill="url(#dermis)" stroke="#c2410c" strokeWidth="2" rx="0 0 10 10" />

              {/* Pelos da pele */}
              <line x1="80" y1="70" x2="90" y2="200" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
              <line x1="220" y1="65" x2="230" y2="210" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />

              {/* Glândulas Sudoríparas (em novelo) */}
              <g
                onClick={() => handleSelect('Glândulas Sudoríparas')}
                className="cursor-pointer"
              >
                {/* Conduta do suor até ao poro */}
                <path d="M180 112 L180 260" stroke="#38bdf8" strokeWidth="4" strokeDasharray="3 3" fill="none" />
                {/* Novelo da glândula sudorípara */}
                <path
                  d="M170 260 C155 270, 160 300, 180 300 C200 300, 205 270, 190 260 C175 250, 165 280, 180 290"
                  stroke="#0284c7"
                  strokeWidth="5"
                  fill="#bae6fd"
                />
                <circle cx="180" cy="280" r="18" fill="#38bdf8" opacity="0.3" />
                <rect x="110" y="320" width="140" height="25" rx="6" fill="#ffffff" opacity="0.9" />
                <text x="180" y="337" textAnchor="middle" fontSize="10" fill="#0369a1" fontWeight="bold">
                  Glândula Sudorípara
                </text>
              </g>

              {/* Vasos sanguíneos na derme */}
              <path d="M40 360 Q180 340 320 360" stroke="#ef4444" strokeWidth="4" fill="none" />
              <path d="M40 370 Q180 350 320 370" stroke="#3b82f6" strokeWidth="4" fill="none" />
            </svg>
          </div>
        )}

        {/* Action simulator button */}
        {activeTab === 'urinario' ? (
          <div className="w-full mt-3 flex items-center justify-between gap-3">
            <button
              onClick={handleDrinkWater}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
            >
              <Droplets className="w-3.5 h-3.5" />
              Beber Água (+ Urina nos Rins)
            </button>
            <button
              onClick={() => {
                setBladderLevel(10);
                playPopSound();
              }}
              className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors"
            >
              Ir à Casa de Banho (Esvaziar)
            </button>
          </div>
        ) : (
          <div className="w-full mt-3 p-2 bg-sky-50 rounded-xl border border-sky-200 text-center text-xs text-sky-900 font-medium">
            ☀️ Quando está calor ou fazemos exercício, as glândulas produzem suor para nos refrescar!
          </div>
        )}
      </div>

      {/* Control & Concept Deck */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        {/* Excretion Role Card */}
        <div className="bg-amber-500/10 border border-amber-300 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Função: Eliminar Impurezas
            </span>
            <button
              onClick={() =>
                speakText(
                  'O sistema excretor elimina as substâncias que as células produzem na sua atividade e que não se podem acumular no corpo. É constituído pelos rins, vias urinárias e pela pele!'
                )
              }
              className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors"
              title="Ouvir explicação em voz alta"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-amber-950 leading-relaxed mb-3">
            O corpo funciona sem parar e produz resíduos. Os <strong>rins</strong> filtram o sangue e criam a urina, enquanto a <strong>pele</strong> através do suor elimina toxinas e regula a nossa temperatura.
          </p>

          <div className="flex items-center gap-2 text-xs font-semibold text-amber-900">
            <span className="px-2 py-1 rounded-md bg-amber-100 border border-amber-200">Rins + Vias</span>
            <span>+</span>
            <span className="px-2 py-1 rounded-md bg-sky-100 border border-sky-200 text-sky-900">Pele e Suor</span>
            <span>=</span>
            <span className="text-amber-800">Corpo Limpo!</span>
          </div>
        </div>

        {/* Selected Organ Inspector */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-amber-100 text-amber-800 rounded-md">
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
            {descriptions[selectedOrgan]?.func || 'Clica num órgão no diagrama para aprender a sua função.'}
          </p>

          <button
            onClick={() => speakText(`${selectedOrgan}: ${descriptions[selectedOrgan]?.func}`)}
            className="inline-flex items-center gap-1.5 text-xs text-amber-800 hover:text-amber-900 font-medium"
          >
            <Volume2 className="w-3.5 h-3.5" />
            Ouvir detalhes
          </button>
        </div>

        {/* 4th grade health reminder */}
        <div className="bg-white border border-amber-200 rounded-xl p-3 text-xs text-amber-950 flex items-start gap-2.5">
          <span className="text-base">💧</span>
          <div>
            <strong className="font-semibold text-amber-900">Cuidados no 4.º ano:</strong> Não deves reter a urina na bexiga muito tempo! Bebe água regularmente e evita o consumo excessivo de sal nos alimentos.
          </div>
        </div>
      </div>
    </div>
  );
};
