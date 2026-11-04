import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, Check, X, RotateCcw, Volume2, Printer, Sparkles, Filter } from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../../data/humanBodyData';
import { playSuccessSound, playErrorSound, playPopSound, speakText } from '../../utils/soundEffects';

export const FullClassQuiz: React.FC = () => {
  const [selectedSystem, setSelectedSystem] = useState<string>('todos');
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => [...QUIZ_QUESTIONS]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('Aluno(a) do 4.º Ano');

  const filterQuestions = (sys: string) => {
    setSelectedSystem(sys);
    playPopSound();
    let filtered = [...QUIZ_QUESTIONS];
    if (sys !== 'todos') {
      filtered = QUIZ_QUESTIONS.filter(q => q.sistema === sys);
    }
    setQuestions(filtered);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setIsFinished(false);
  };

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (idx: number) => {
    if (showFeedback) return;
    setSelectedOption(idx);
    setShowFeedback(true);

    const isCorrect = idx === currentQ.respostaCorreta;
    if (isCorrect) {
      playSuccessSound();
      setScore((prev) => prev + 1);
    } else {
      playErrorSound();
    }
  };

  const handleNext = () => {
    playPopSound();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    playPopSound();
    filterQuestions(selectedSystem);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl border border-indigo-200/80 shadow-sm p-4 sm:p-6">
      {/* Quiz Header & System Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-indigo-100">
        <div>
          <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider block mb-1">
            Avaliação Formativa & Quizzes
          </span>
          <h3 className="text-xl font-bold text-slate-900">
            Mega Quiz do Corpo Humano · 4.º Ano
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Testa tudo o que aprendeste sobre os sistemas, funções, órgãos e cuidados de saúde!
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold">
          <button
            onClick={() => filterQuestions('todos')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              selectedSystem === 'todos' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Todos ({QUIZ_QUESTIONS.length})
          </button>
          <button
            onClick={() => filterQuestions('digestivo')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              selectedSystem === 'digestivo' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Digestivo
          </button>
          <button
            onClick={() => filterQuestions('respiratorio')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              selectedSystem === 'respiratorio' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Respiratório
          </button>
          <button
            onClick={() => filterQuestions('circulatorio')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              selectedSystem === 'circulatorio' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Circulatório
          </button>
          <button
            onClick={() => filterQuestions('urinario')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              selectedSystem === 'urinario' ? 'bg-yellow-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Urinário
          </button>
          <button
            onClick={() => filterQuestions('reprodutor')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              selectedSystem === 'reprodutor' ? 'bg-pink-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Reprodutor
          </button>
          <button
            onClick={() => filterQuestions('nervoso')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              selectedSystem === 'nervoso' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Nervoso
          </button>
        </div>
      </div>

      {!isFinished && currentQ ? (
        <div className="max-w-2xl mx-auto">
          {/* Progress & Question Counter */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>
              Pergunta {currentIndex + 1} de {questions.length}
            </span>
            <span className="font-semibold text-indigo-700">
              Acertos: {score} de {currentIndex}
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Box */}
          <div className="bg-gradient-to-br from-indigo-50/70 to-blue-50/40 border border-indigo-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold uppercase tracking-wider">
                Sistema {currentQ.sistema}
              </span>
              <button
                onClick={() => speakText(`${currentQ.pergunta}. ${currentQ.opcoes.join('. ')}`)}
                className="p-1.5 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-800 transition-colors"
                title="Ouvir pergunta em voz alta"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <h4 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentQ.pergunta}
            </h4>
          </div>

          {/* 4 Multiple Choice Options */}
          <div className="space-y-3 mb-6">
            {currentQ.opcoes.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectTarget = currentQ.respostaCorreta === idx;

              let btnStyle = 'bg-white hover:bg-indigo-50/50 border-slate-200 text-slate-800';
              if (showFeedback) {
                if (isCorrectTarget) {
                  btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md ring-2 ring-emerald-300';
                } else if (isSelected && !isCorrectTarget) {
                  btnStyle = 'bg-rose-500 text-white border-rose-600';
                } else {
                  btnStyle = 'opacity-40 bg-slate-50 border-slate-200 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={showFeedback}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 ${
                        showFeedback && isCorrectTarget
                          ? 'bg-white text-emerald-700'
                          : showFeedback && isSelected
                          ? 'bg-white text-rose-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {showFeedback && isCorrectTarget && <Check className="w-5 h-5 shrink-0" />}
                  {showFeedback && isSelected && !isCorrectTarget && <X className="w-5 h-5 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Feedback Explanation */}
          {showFeedback && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                {selectedOption === currentQ.respostaCorreta ? (
                  <span className="text-emerald-700 font-bold block mb-1">
                    Correto! Muito bem!
                  </span>
                ) : (
                  <span className="text-rose-700 font-bold block mb-1">
                    Não foi desta. Lembra-te:
                  </span>
                )}
                {currentQ.explicacao}
              </div>

              <button
                onClick={handleNext}
                className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shrink-0"
              >
                Próxima Pergunta →
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Certificate & Final Score Card */
        <div className="max-w-xl mx-auto text-center py-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-amber-50/80 via-white to-amber-50/40 border-4 border-amber-300 shadow-xl relative overflow-hidden mb-6">
            {/* Diploma Banner */}
            <div className="w-16 h-16 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
              <Award className="w-9 h-9" />
            </div>

            <span className="text-xs font-black uppercase tracking-widest text-amber-800">
              Estudo do Meio · 4.º Ano
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 mb-2 font-display">
              DIPLOMA DE CIENTISTA DO CORPO HUMANO
            </h2>
            <p className="text-xs text-slate-600 max-w-sm mx-auto mb-4">
              Certifica-se que o aluno ou turma concluiu o desafio com brilhantismo e demonstrou excelente domínio sobre o corpo humano!
            </p>

            {/* Custom Student Name Input */}
            <div className="max-w-xs mx-auto mb-4">
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                Nome do Aluno(a) ou da Turma:
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full text-center py-2 px-3 border border-amber-300 rounded-xl font-bold text-amber-950 bg-amber-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Score pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-100 border border-amber-300 text-amber-950 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Pontuação Final: {score} de {questions.length} perguntas certas ({Math.round((score / questions.length) * 100)}%)</span>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs text-slate-400 border-t border-amber-200/60 pt-4 px-4">
              <span>Classificação: Excelente!</span>
              <span>Data: Unidade 1</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-transform active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              Repetir Quiz
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-transform active:scale-95"
            >
              <Printer className="w-4 h-4" />
              Imprimir Certificado
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
