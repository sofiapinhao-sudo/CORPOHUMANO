import React, { useState } from 'react';
import { Shield, Radio, Sparkles, Volume2, Cpu, Scan, Layers, Eye, Droplets, Smile } from 'lucide-react';
import { DEFENSE_MECHANISMS, TECH_IN_HEALTH } from '../../data/humanBodyData';
import { speakText, playPopSound } from '../../utils/soundEffects';

export const DefenseAndTechSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'defesa' | 'tecnologia'>('defesa');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold text-teal-800 uppercase tracking-wider block mb-1">
            Ciência & Inovação no 4.º Ano
          </span>
          <h3 className="text-xl font-bold text-slate-900">
            Defesas do Organismo & Tecnologia na Saúde
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Descobre como o teu corpo se protege de infeções e como os médicos usam a tecnologia para curar doenças.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => { setActiveTab('defesa'); playPopSound(); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'defesa' ? 'bg-white text-teal-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-teal-600" />
            Mecanismos de Defesa
          </button>
          <button
            onClick={() => { setActiveTab('tecnologia'); playPopSound(); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'tecnologia' ? 'bg-white text-indigo-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-indigo-600" />
            Tecnologia na Saúde
          </button>
        </div>
      </div>

      {activeTab === 'defesa' ? (
        /* Defense mechanisms grid */
        <div>
          <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-950 mb-4 flex items-center justify-between">
            <span>
              🛡️ <strong>Barreiras Naturais:</strong> O corpo humano possui defesas fantásticas que impedem microrganismos e poeiras de entrar no organismo!
            </span>
            <button
              onClick={() => speakText('O corpo humano possui barreiras naturais que o defendem de ameaças causadoras de infeções ou de reações alérgicas.')}
              className="p-1 rounded-md bg-teal-100 hover:bg-teal-200 text-teal-800 transition-colors ml-2 shrink-0"
              title="Ouvir introdução"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {DEFENSE_MECHANISMS.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-teal-100 bg-gradient-to-br from-white to-teal-50/30 hover:border-teal-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-teal-950 flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-black">
                        {idx + 1}
                      </span>
                      {item.nome}
                    </span>
                    <button
                      onClick={() => speakText(`${item.nome}: ${item.descricao}`)}
                      className="p-1 text-teal-700 hover:text-teal-900 transition-colors"
                      title="Ouvir em voz alta"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {item.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Technology in Health */
        <div>
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-950 mb-4 flex items-center justify-between">
            <span>
              🚀 <strong>Avanços Médicos:</strong> A evolução da tecnologia melhorou dispositivos e medicamentos que ajudam na prevenção, identificação e tratamento de doenças!
            </span>
            <button
              onClick={() => speakText('A tecnologia aperfeiçoou e melhorou dispositivos, produtos, medicamentos e técnicas que ajudam na prevenção, na identificação e no tratamento de doenças.')}
              className="p-1 rounded-md bg-indigo-100 hover:bg-indigo-200 text-indigo-800 transition-colors ml-2 shrink-0"
              title="Ouvir introdução"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {TECH_IN_HEALTH.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30 hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-sm font-bold text-indigo-950">{item.nome}</h5>
                    <button
                      onClick={() => speakText(`${item.nome}: ${item.descricao}`)}
                      className="p-1 text-indigo-700 hover:text-indigo-900 transition-colors"
                      title="Ouvir em voz alta"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed mb-3">
                    {item.descricao}
                  </p>
                </div>
                <div className="pt-2 border-t border-indigo-50 text-[11px] font-semibold text-indigo-700">
                  Estudo do Meio 4.º Ano
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
