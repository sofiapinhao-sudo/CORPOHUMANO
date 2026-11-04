import React, { useState } from 'react';
import {
  Heart,
  Wind,
  Flame,
  Droplets,
  Users,
  Brain,
  Shield,
  Gamepad2,
  HelpCircle,
  BookOpen,
  Volume2,
  VolumeX,
  Presentation,
  CheckCircle2,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { SYSTEMS_DATA, SystemInfo } from './data/humanBodyData';
import { DigestiveDiagram } from './components/diagrams/DigestiveDiagram';
import { RespiratoryDiagram } from './components/diagrams/RespiratoryDiagram';
import { CirculatoryDiagram } from './components/diagrams/CirculatoryDiagram';
import { UrinaryDiagram } from './components/diagrams/UrinaryDiagram';
import { ReproductiveDiagram } from './components/diagrams/ReproductiveDiagram';
import { NervousDiagram } from './components/diagrams/NervousDiagram';
import { DigestionJourneyGame } from './components/games/DigestionJourneyGame';
import { OrganDetectiveGame } from './components/games/OrganDetectiveGame';
import { HealthyHabitsGame } from './components/games/HealthyHabitsGame';
import { FullClassQuiz } from './components/quiz/FullClassQuiz';
import { DefenseAndTechSection } from './components/defense/DefenseAndTechSection';
import { speakText, stopSpeaking, playPopSound } from './utils/soundEffects';

export default function App() {
  const [activeTab, setActiveTab] = useState<'sistemas' | 'jogos' | 'quiz' | 'defesa'>('sistemas');
  const [selectedSystemId, setSelectedSystemId] = useState<string>('digestivo');
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [isClassroomMode, setIsClassroomMode] = useState<boolean>(false);
  const [classroomQuestion, setClassroomQuestion] = useState<string | null>(null);

  const currentSystem: SystemInfo = SYSTEMS_DATA[selectedSystemId] || SYSTEMS_DATA.digestivo;

  const handleSystemChange = (id: string) => {
    setSelectedSystemId(id);
    playPopSound();
  };

  const handleToggleMute = () => {
    if (!isAudioMuted) {
      stopSpeaking();
    }
    setIsAudioMuted(!isAudioMuted);
    playPopSound();
  };

  const handleTeacherRandomQuestion = () => {
    playPopSound();
    const oralQuestions = [
      'Pergunta à turma: Qual é a função das glândulas salivares na boca?',
      'Pergunta à turma: Porque é que devemos inspirar pelo nariz e não pela boca?',
      'Pergunta à turma: O que acontece ao diafragma durante a inspiração?',
      'Pergunta à turma: Qual é a diferença entre artérias e veias no sistema circulatório?',
      'Pergunta à turma: Em que órgão o sangue entrega os nutrientes absorvidos?',
      'Pergunta à turma: Quais são os dois órgãos do sistema excretor que eliminam impurezas?',
      'Pergunta à turma: O que é a fecundação e onde se dá início a uma nova vida?',
      'Pergunta à turma: Quais são as três partes principais do sistema nervoso central?',
      'Pergunta à turma: Porque é que as lágrimas e a saliva são consideradas mecanismos de defesa?'
    ];
    const picked = oralQuestions[Math.floor(Math.random() * oralQuestions.length)];
    setClassroomQuestion(picked);
    if (!isAudioMuted) {
      speakText(picked);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-amber-200">
      {/* Top Bar following the strict 3-zone contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setActiveTab('sistemas'); }}
            className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-black text-sm shadow-xs">
              4º
            </span>
            <span className="font-display">Exploradores do Corpo Humano</span>
          </a>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => { setActiveTab('sistemas'); playPopSound(); }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'sistemas' ? 'text-amber-600 font-bold' : ''
              }`}
            >
              Os 6 Sistemas
            </button>
            <button
              onClick={() => { setActiveTab('jogos'); playPopSound(); }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'jogos' ? 'text-amber-600 font-bold' : ''
              }`}
            >
              Jogos & Desafios
            </button>
            <button
              onClick={() => { setActiveTab('quiz'); playPopSound(); }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'quiz' ? 'text-amber-600 font-bold' : ''
              }`}
            >
              Mega Quiz & Diploma
            </button>
            <button
              onClick={() => { setActiveTab('defesa'); playPopSound(); }}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'defesa' ? 'text-amber-600 font-bold' : ''
              }`}
            >
              Defesas & Tecnologia
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setIsClassroomMode(!isClassroomMode);
                if (!isClassroomMode) handleTeacherRandomQuestion();
              }}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>{isClassroomMode ? 'Modo Normal' : 'Modo Turma'}</span>
            </button>
            <button
              onClick={handleToggleMute}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
              title={isAudioMuted ? 'Ativar Voz e Som' : 'Desativar Som'}
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-around border-t border-slate-100 px-2 py-1.5 bg-slate-50 text-xs font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('sistemas')}
            className={`py-1 px-2 rounded-md ${activeTab === 'sistemas' ? 'text-amber-700 font-bold bg-amber-50' : ''}`}
          >
            Sistemas
          </button>
          <button
            onClick={() => setActiveTab('jogos')}
            className={`py-1 px-2 rounded-md ${activeTab === 'jogos' ? 'text-amber-700 font-bold bg-amber-50' : ''}`}
          >
            Jogos
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`py-1 px-2 rounded-md ${activeTab === 'quiz' ? 'text-amber-700 font-bold bg-amber-50' : ''}`}
          >
            Quiz
          </button>
          <button
            onClick={() => setActiveTab('defesa')}
            className={`py-1 px-2 rounded-md ${activeTab === 'defesa' ? 'text-amber-700 font-bold bg-amber-50' : ''}`}
          >
            Defesa & Tech
          </button>
        </div>
      </header>

      {/* Classroom Quick Oral Question Banner */}
      {isClassroomMode && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white px-4 py-3 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 bg-white/20 rounded-lg shrink-0">
                <Presentation className="w-5 h-5 text-white" />
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-100 block">
                  Projeção para a Sala de Aula · Pergunta Rápida à Turma
                </span>
                <p className="text-sm sm:text-base font-bold text-white leading-tight">
                  {classroomQuestion || 'Clica em "Nova Pergunta" para debater com os alunos!'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleTeacherRandomQuestion}
                className="px-3 py-1.5 bg-white text-amber-900 rounded-lg text-xs font-bold hover:bg-amber-50 transition-colors shadow-xs"
              >
                Sortear Nova Pergunta
              </button>
              {classroomQuestion && (
                <button
                  onClick={() => speakText(classroomQuestion)}
                  className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
                  title="Ler pergunta em voz alta"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-amber-50 via-white to-sky-50/40 rounded-3xl border border-slate-200/80 p-6 sm:p-8">
          <div className="max-w-3xl">
            {/* Clean unboxed metadata with typographic separators */}
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 mb-2">
              <span>Estudo do Meio</span>
              <span aria-hidden="true">·</span>
              <span>4.º Ano do 1.º Ciclo</span>
              <span aria-hidden="true">·</span>
              <span>Unidade 1: O Corpo Humano</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-display mb-3 text-balance">
              Descobre o Fantástico Mundo do Corpo Humano
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              Aprende como funciona cada sistema com simulações animadas, jogos didáticos, desafios de reflexos e quizzes adaptados ao programa escolar do 4.º ano.
            </p>

            {/* Quick Action Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => { setActiveTab('sistemas'); playPopSound(); }}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'sistemas'
                    ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-300'
                    : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200'
                }`}
              >
                1. Explorar os 6 Sistemas
              </button>
              <button
                onClick={() => { setActiveTab('jogos'); playPopSound(); }}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'jogos'
                    ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-300'
                    : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200'
                }`}
              >
                2. Jogos & Desafios
              </button>
              <button
                onClick={() => { setActiveTab('quiz'); playPopSound(); }}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'quiz'
                    ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-300'
                    : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200'
                }`}
              >
                3. Mega Quiz com Diploma
              </button>
              <button
                onClick={() => { setActiveTab('defesa'); playPopSound(); }}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'defesa'
                    ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-300'
                    : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200'
                }`}
              >
                4. Defesas & Saúde
              </button>
            </div>
          </div>
        </section>

        {/* TAB 1: SISTEMAS DO CORPO HUMANO */}
        {activeTab === 'sistemas' && (
          <section className="space-y-6">
            {/* System Selector Pills / Segmented Controls */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Escolhe o Sistema para Estudar
                </span>
                <h2 className="text-xl font-bold text-slate-900 font-display">
                  Anatomia & Funcionamento Didático
                </h2>
              </div>

              {/* 6 Systems Selector */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200 shadow-xs">
                {Object.values(SYSTEMS_DATA).map((sys) => {
                  const isSelected = selectedSystemId === sys.id;
                  return (
                    <button
                      key={sys.id}
                      onClick={() => handleSystemChange(sys.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {sys.shortName}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* System Highlight Header Card */}
            <div
              className="p-5 rounded-2xl border transition-all"
              style={{
                backgroundColor: currentSystem.color.bgLight,
                borderColor: currentSystem.color.border
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-xs font-extrabold uppercase px-2 py-0.5 rounded-md"
                      style={{
                        backgroundColor: currentSystem.color.badgeBg,
                        color: currentSystem.color.badgeText
                      }}
                    >
                      {currentSystem.name}
                    </span>
                    <span className="text-xs text-slate-500">Unidade 1 · 4.º Ano</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                    {currentSystem.funcaoPrincipal.split(':')[0]}:{' '}
                    <span className="font-bold text-base sm:text-lg text-slate-700">
                      {currentSystem.tagline}
                    </span>
                  </h3>
                </div>

                <button
                  onClick={() =>
                    speakText(
                      `${currentSystem.name}. ${currentSystem.funcaoPrincipal}. ${currentSystem.cuidados.join('. ')}`
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white text-slate-800 text-xs font-bold border border-slate-200 shadow-xs hover:bg-slate-50 transition-colors shrink-0 self-start sm:self-auto cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-amber-600" />
                  <span>Ouvir Resumo em Voz Alta</span>
                </button>
              </div>
            </div>

            {/* Interactive Anatomical SVG & Biological Simulation */}
            <div>
              {selectedSystemId === 'digestivo' && <DigestiveDiagram />}
              {selectedSystemId === 'respiratorio' && <RespiratoryDiagram />}
              {selectedSystemId === 'circulatorio' && <CirculatoryDiagram />}
              {selectedSystemId === 'urinario' && <UrinaryDiagram />}
              {selectedSystemId === 'reprodutor' && <ReproductiveDiagram />}
              {selectedSystemId === 'nervoso' && <NervousDiagram />}
            </div>

            {/* Step-by-step How It Works + Health Care Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* How it works steps */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6">
                <h4 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Passo a Passo: Como Funciona o {currentSystem.name}?
                </h4>

                <div className="space-y-4">
                  {currentSystem.comoFunciona.map((item) => (
                    <div key={item.passo} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {item.passo}
                      </span>
                      <div>
                        <h5 className="text-sm font-bold text-slate-900">{item.titulo}</h5>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-0.5">
                          {item.texto}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Health and Care recommendations */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-emerald-950 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Cuidados a Ter (Estudo do Meio)
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {currentSystem.cuidados.map((cuidado, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                        <span>{cuidado}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Curiosities */}
                <div className="mt-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Sabias que...?
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {currentSystem.curiosidades[0]}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: JOGOS & DESAFIOS */}
        {activeTab === 'jogos' && (
          <section className="space-y-8">
            <div className="text-center max-w-xl mx-auto mb-2">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-1">
                Aprender a Brincar
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                Jogos e Desafios Interativos do 4.º Ano
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Três jogos especialmente preparados para consolidar os conhecimentos sobre a digestão, os órgãos de cada sistema e os hábitos de vida saudável.
              </p>
            </div>

            {/* Game 1: Digestive Voyage */}
            <DigestionJourneyGame />

            {/* Game 2: Organ Detective */}
            <OrganDetectiveGame />

            {/* Game 3: Healthy Habits True/False */}
            <HealthyHabitsGame />
          </section>
        )}

        {/* TAB 3: MEGA QUIZ & DIPLOMA */}
        {activeTab === 'quiz' && (
          <section className="space-y-6">
            <FullClassQuiz />
          </section>
        )}

        {/* TAB 4: DEFESAS & TECNOLOGIA */}
        {activeTab === 'defesa' && (
          <section className="space-y-6">
            <DefenseAndTechSection />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-slate-200 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Exploradores do Corpo Humano</span>
            <span>·</span>
            <span>Estudo do Meio 4.º Ano (Unidade 1)</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/public/assets/aistudio/Unidade_1_de43517a.pdf"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-800 transition-colors inline-flex items-center gap-1 font-medium"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Ver Manual Original (PDF)
            </a>
            <span>·</span>
            <span>Preparado para Alunos e Professores</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
