import React, { useState } from 'react';
import { Volume2, Info, Activity, Heart, ArrowRight } from 'lucide-react';
import { speakText, playPopSound, playHeartbeatSound } from '../../utils/soundEffects';

interface Props {
  onSelectOrgan?: (organName: string) => void;
}

export const CirculatoryDiagram: React.FC<Props> = ({ onSelectOrgan }) => {
  const [circulationType, setCirculationType] = useState<'ambas' | 'pequena' | 'grande'>('ambas');
  const [heartRate, setHeartRate] = useState<'repouso' | 'corrida'>('repouso');
  const [selectedElement, setSelectedElement] = useState<string>('Coração');

  const descriptions: Record<string, { tipo: string; func: string }> = {
    'Coração': {
      tipo: 'Bomba Muscular',
      func: 'Órgão musculoso com cavidades (aurículas e ventrículos) e válvulas que bombeia o sangue dia e noite sem parar!'
    },
    'Artéria Aorta': {
      tipo: 'Vaso Sanguíneo (Artéria)',
      func: 'A maior artéria do corpo! Leva o sangue rico em oxigénio do coração para alimentar a cabeça, braços, órgãos e pernas.'
    },
    'Artérias Pulmonares': {
      tipo: 'Vaso Sanguíneo (Artéria)',
      func: 'Levam o sangue com dióxido de carbono do coração até aos pulmões para ser oxigenado.'
    },
    'Veias Cavas': {
      tipo: 'Vaso Sanguíneo (Veia)',
      func: 'Veias principais que trazem o sangue com impurezas de todo o corpo de regresso ao coração.'
    },
    'Veias Pulmonares': {
      tipo: 'Vaso Sanguíneo (Veia)',
      func: 'Trazem o sangue limpinho e carregado de oxigénio novo dos pulmões de volta ao coração.'
    },
    'Capilares': {
      tipo: 'Vasos Microscópicos',
      func: 'Vasos finíssimos como cabelos que unem artérias e veias. Aqui as células recebem o oxigénio e entregam o CO2.'
    }
  };

  const handleSelect = (name: string) => {
    setSelectedElement(name);
    playPopSound();
    if (onSelectOrgan) onSelectOrgan(name);
  };

  const handleHeartbeatClick = () => {
    playHeartbeatSound();
  };

  const isFast = heartRate === 'corrida';

  return (
    <div className="bg-white rounded-2xl border border-red-200/80 shadow-sm p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      {/* Visual SVG Canvas */}
      <div className="lg:col-span-7 flex flex-col items-center">
        {/* Circulation Mode Switch */}
        <div className="flex flex-wrap items-center justify-between w-full max-w-[400px] gap-2 mb-3">
          <div className="flex items-center gap-1 p-1 bg-red-50 rounded-xl border border-red-200 text-xs font-semibold">
            <button
              onClick={() => { setCirculationType('ambas'); playPopSound(); }}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                circulationType === 'ambas' ? 'bg-red-600 text-white shadow-sm' : 'text-red-800 hover:bg-red-100'
              }`}
            >
              Completa
            </button>
            <button
              onClick={() => { setCirculationType('pequena'); playPopSound(); }}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                circulationType === 'pequena' ? 'bg-red-600 text-white shadow-sm' : 'text-red-800 hover:bg-red-100'
              }`}
            >
              Pequena (Pulmões)
            </button>
            <button
              onClick={() => { setCirculationType('grande'); playPopSound(); }}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                circulationType === 'grande' ? 'bg-red-600 text-white shadow-sm' : 'text-red-800 hover:bg-red-100'
              }`}
            >
              Grande (Corpo)
            </button>
          </div>

          {/* Heart rate simulator */}
          <button
            onClick={() => {
              setHeartRate(isFast ? 'repouso' : 'corrida');
              playPopSound();
            }}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-colors ${
              isFast
                ? 'bg-red-100 text-red-900 border-red-300 font-bold'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-red-600" />
            {isFast ? '140 bpm (A Correr!)' : '75 bpm (Em Repouso)'}
          </button>
        </div>

        {/* SVG Circulatory Visualization */}
        <div className="relative w-full max-w-[360px] h-[430px] bg-gradient-to-b from-red-50/50 via-white to-blue-50/40 rounded-2xl border border-red-100 flex items-center justify-center p-2">
          <svg viewBox="0 0 360 430" className="w-full h-full select-none">
            <defs>
              <linearGradient id="oxygenBlood" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
              <linearGradient id="deoxBlood" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>

            {/* Silhouette Outline */}
            <path
              d="M180 20 C155 20, 140 40, 140 65 C140 85, 155 105, 160 110 C120 120, 95 145, 80 180 C70 205, 65 240, 65 280 C65 340, 80 390, 100 410 L260 410 C280 390, 295 340, 295 280 C295 240, 290 205, 280 180 C265 145, 240 120, 200 110 C205 105, 220 85, 220 65 C220 40, 205 20, 180 20 Z"
              fill="#fafafa"
              stroke="#e2e8f0"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* Pulmões (Topo - Pequena Circulação) */}
            <g
              opacity={circulationType === 'grande' ? 0.25 : 1}
              className="transition-opacity duration-300"
            >
              <ellipse cx="120" cy="90" rx="25" ry="30" fill="#fecaca" stroke="#f87171" strokeWidth="2" />
              <ellipse cx="240" cy="90" rx="25" ry="30" fill="#fecaca" stroke="#f87171" strokeWidth="2" />
              <text x="180" y="55" textAnchor="middle" fontSize="11" fill="#991b1b" fontWeight="bold">
                Pulmões (Troca O2 e CO2)
              </text>
            </g>

            {/* PEQUENA CIRCULAÇÃO PATHS */}
            <g
              opacity={circulationType === 'grande' ? 0.2 : 1}
              className="transition-opacity duration-300"
            >
              {/* Artéria Pulmonar (Sangue com CO2 do coração aos pulmões - Azul) */}
              <path
                d="M165 190 C150 150, 130 130, 130 115"
                stroke="url(#deoxBlood)"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                className="animate-flow-dash"
              />
              <path
                d="M170 190 C190 150, 230 130, 230 115"
                stroke="url(#deoxBlood)"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                className="animate-flow-dash"
              />

              {/* Veias Pulmonares (Sangue rico em O2 dos pulmões de volta ao coração - Vermelho) */}
              <path
                d="M140 110 C155 130, 165 160, 175 185"
                stroke="url(#oxygenBlood)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M220 110 C205 130, 195 160, 185 185"
                stroke="url(#oxygenBlood)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            </g>

            {/* GRANDE CIRCULAÇÃO PATHS */}
            <g
              opacity={circulationType === 'pequena' ? 0.2 : 1}
              className="transition-opacity duration-300"
            >
              {/* Artéria Aorta (Coração para cabeça e corpo - Vermelho vivo) */}
              <path
                d="M185 185 C205 170, 215 150, 215 130 C215 110, 180 90, 180 70"
                stroke="url(#oxygenBlood)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                onClick={() => handleSelect('Artéria Aorta')}
                className="cursor-pointer"
              />
              {/* Aorta descendo para o corpo */}
              <path
                d="M185 220 L185 340 C185 360, 160 380, 150 400 M185 340 C185 360, 210 380, 220 400"
                stroke="url(#oxygenBlood)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                className="animate-flow-dash cursor-pointer"
                onClick={() => handleSelect('Artéria Aorta')}
              />

              {/* Veias Cavas (Retorno do sangue rico em CO2 para o coração - Azul) */}
              <path
                d="M165 70 L165 185"
                stroke="url(#deoxBlood)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                onClick={() => handleSelect('Veias Cavas')}
                className="cursor-pointer"
              />
              <path
                d="M140 400 C150 380, 165 350, 165 220"
                stroke="url(#deoxBlood)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                className="animate-flow-dash cursor-pointer"
                onClick={() => handleSelect('Veias Cavas')}
              />

              {/* Capilares na base (tecidos do corpo) */}
              <g
                onClick={() => handleSelect('Capilares')}
                className="cursor-pointer"
              >
                <path d="M150 370 Q180 360 210 370 Q180 380 150 390" stroke="#a855f7" strokeWidth="2.5" fill="none" />
                <text x="180" y="415" textAnchor="middle" fontSize="10" fill="#6b21a8" fontWeight="bold">
                  Capilares nos Tecidos
                </text>
              </g>
            </g>

            {/* CORAÇÃO CENTRAL COM ANIMAÇÃO DE PULSAÇÃO */}
            <g
              onClick={() => {
                handleSelect('Coração');
                handleHeartbeatClick();
              }}
              className="cursor-pointer"
              style={{
                transformOrigin: '180px 200px',
                animation: `heartbeat ${isFast ? '0.5s' : '0.9s'} ease-in-out infinite`
              }}
            >
              {/* Sombra de brilho */}
              <circle cx="180" cy="202" r="32" fill="#fecaca" opacity="0.6" />
              {/* Coração estilizado anatómico */}
              <path
                d="M180 225 C160 210, 150 190, 160 175 C170 162, 180 175, 180 178 C180 175, 190 162, 200 175 C210 190, 200 210, 180 225 Z"
                fill="#dc2626"
                stroke="#991b1b"
                strokeWidth="3"
              />
              {/* Divisória aurículas/ventrículos */}
              <line x1="180" y1="178" x2="180" y2="220" stroke="#7f1d1d" strokeWidth="2" strokeDasharray="2 2" />
              <text x="180" y="202" textAnchor="middle" fontSize="9" fill="#ffffff" fontWeight="bold">
                Coração
              </text>
            </g>

            {/* Rótulo de Sangue com Cores Didáticas */}
            <g>
              <circle cx="50" cy="180" r="5" fill="#ef4444" />
              <text x="60" y="183" fontSize="9" fill="#991b1b" fontWeight="600">Rico em O2</text>
              <circle cx="50" cy="198" r="5" fill="#3b82f6" />
              <text x="60" y="201" fontSize="9" fill="#1e3a8a" fontWeight="600">Rico em CO2</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Control & Concept Deck */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        {/* Circulation Explanation Card */}
        <div className="bg-red-500/10 border border-red-300 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-red-800">
              {circulationType === 'pequena'
                ? 'Pequena Circulação (Pulmonar)'
                : circulationType === 'grande'
                ? 'Grande Circulação (Geral)'
                : 'Circulação Dupla do Sangue'}
            </span>
            <button
              onClick={() =>
                speakText(
                  circulationType === 'pequena'
                    ? 'Pequena Circulação: O sangue vai do coração aos pulmões para libertar dióxido de carbono e receber oxigénio, regressando depois ao coração!'
                    : circulationType === 'grande'
                    ? 'Grande Circulação: O sangue rico em oxigénio sai pela artéria aorta para todo o corpo, alimentando as células e voltando pelas veias cavas!'
                    : 'O sangue percorre dois caminhos: a pequena circulação entre o coração e os pulmões, e a grande circulação entre o coração e todo o corpo!'
                )
              }
              className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 transition-colors"
              title="Ouvir explicação em voz alta"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-red-950 leading-relaxed mb-3">
            {circulationType === 'pequena'
              ? 'O sangue sai do coração pelas artérias pulmonares até aos pulmões, onde liberta o CO2 e recebe oxigénio novinho. Regressa ao coração pelas veias pulmonares.'
              : circulationType === 'grande'
              ? 'O sangue rico em oxigénio sai pela grandiosa artéria aorta e viaja até à ponta dos dedos dos pés, cérebro e órgãos. Recolhe resíduos e regressa pelas veias cavas.'
              : 'O coração funciona em dois circuitos ao mesmo tempo: oxigena o sangue nos pulmões (pequena) e distribui nutrientes por todo o corpo (grande)!'}
          </p>

          <button
            onClick={handleHeartbeatClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            Ouvir Batimento Cardíaco (Tu-tump!)
          </button>
        </div>

        {/* Selected Element Inspector */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-red-100 text-red-700 rounded-md">
                <Info className="w-4 h-4" />
              </span>
              <span className="text-xs font-semibold text-slate-500">Elemento em Destaque</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 font-medium text-slate-700">
              {descriptions[selectedElement]?.tipo || 'Elemento'}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-1">{selectedElement}</h3>
          <p className="text-sm text-slate-700 leading-relaxed mb-3">
            {descriptions[selectedElement]?.func || 'Clica no coração ou nos vasos no diagrama para ver os detalhes.'}
          </p>

          <button
            onClick={() => speakText(`${selectedElement}: ${descriptions[selectedElement]?.func}`)}
            className="inline-flex items-center gap-1.5 text-xs text-red-700 hover:text-red-800 font-medium"
          >
            <Volume2 className="w-3.5 h-3.5" />
            Ouvir detalhes
          </button>
        </div>

        {/* 4th grade vessels summary */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 rounded-xl bg-red-50 border border-red-200">
            <span className="font-bold text-red-800 block">Artérias</span>
            <span className="text-red-700 text-[11px]">Saem do coração</span>
          </div>
          <div className="p-2 rounded-xl bg-blue-50 border border-blue-200">
            <span className="font-bold text-blue-800 block">Veias</span>
            <span className="text-blue-700 text-[11px]">Voltam ao coração</span>
          </div>
          <div className="p-2 rounded-xl bg-purple-50 border border-purple-200">
            <span className="font-bold text-purple-800 block">Capilares</span>
            <span className="text-purple-700 text-[11px]">Trocas com células</span>
          </div>
        </div>
      </div>
    </div>
  );
};
