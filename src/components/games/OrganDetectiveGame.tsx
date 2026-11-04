import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ShieldCheck, HelpCircle, Flame, Check, X, RotateCcw, Award } from 'lucide-react';
import { ORGAN_MATCHING_ITEMS, OrganMatchingItem } from '../../data/humanBodyData';
import { playSuccessSound, playErrorSound, playPopSound } from '../../utils/soundEffects';

export const OrganDetectiveGame: React.FC = () => {
  const [questions, setQuestions] = useState<OrganMatchingItem[]>(() => {
    return [...ORGAN_MATCHING_ITEMS].sort(() => Math.random() - 0.5);
  });
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const systems = [
    { id: 'respiratorio', label: 'Respiratório', color: 'hover:border-sky-400 hover:bg-sky-50' },
    { id: 'digestivo', label: 'Digestivo', color: 'hover:border-amber-400 hover:bg-amber-50' },
    { id: 'circulatorio', label: 'Circulatório', color: 'hover:border-red-400 hover:bg-red-50' },
    { id: 'urinario', label: 'Urinário / Excretor', color: 'hover:border-yellow-400 hover:bg-yellow-50' },
    { id: 'reprodutor', label: 'Reprodutor', color: 'hover:border-pink-400 hover:bg-pink-50' },
    { id: 'nervoso', label: 'Nervoso', color: 'hover:border-purple-400 hover:bg-purple-50' }
  ];

  const currentItem = questions[currentIndex];

  const handleChoose = (systemId: string) => {
    if (showFeedback) return;
    setSelectedAnswer(systemId);
    setShowFeedback(true);

    const isCorrect = systemId === currentItem.sistemaCorreto;
    if (isCorrect) {
      playSuccessSound();
      setScore((prev) => prev + 10);
      setStreak((prev) => prev + 1);
    } else {
      playErrorSound();
      setStreak(0);
    }
  };

  const handleNext = () => {
    playPopSound();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    playPopSound();
    setQuestions([...ORGAN_MATCHING_ITEMS].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsFinished(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-blue-200/80 shadow-sm p-4 sm:p-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-blue-100">
        <div>
          <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block mb-1">
            Desafio 2 · Todos os Sistemas
          </span>
          <h3 className="text-xl font-bold text-slate-900">
            Detetive dos Sistemas: Onde Pertence?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Lê a pista do órgão misterioso e descobre a que sistema do corpo humano ele pertence!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-900">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Sequência: {streak}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-xl text-xs font-bold text-blue-900">
            <span>Pontos: {score}</span>
          </div>
        </div>
      </div>

      {!isFinished ? (
        <div className="max-w-xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Órgão {currentIndex + 1} de {questions.length}</span>
            <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}% concluído</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Mystery Organ Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 rounded-2xl p-6 text-center mb-6 shadow-sm">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
              Quem sou eu?
            </span>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-blue-950 mb-2 tracking-tight">
              {currentItem.name}
            </h4>
            <p className="text-sm text-blue-900 leading-relaxed max-w-md mx-auto">
              "{currentItem.dica}"
            </p>
          </div>

          {/* 6 System Selection Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
            {systems.map((sys) => {
              const isSelected = selectedAnswer === sys.id;
              const isCorrectTarget = currentItem.sistemaCorreto === sys.id;

              let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-white hover:shadow-sm';
              if (showFeedback) {
                if (isCorrectTarget) {
                  btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md ring-2 ring-emerald-300';
                } else if (isSelected && !isCorrectTarget) {
                  btnStyle = 'bg-rose-500 text-white border-rose-600';
                } else {
                  btnStyle = 'opacity-40 bg-slate-50 text-slate-400 border-slate-200';
                }
              }

              return (
                <button
                  key={sys.id}
                  disabled={showFeedback}
                  onClick={() => handleChoose(sys.id)}
                  className={`p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all text-center flex flex-col items-center justify-center gap-1 ${btnStyle}`}
                >
                  {sys.label}
                  {showFeedback && isCorrectTarget && <Check className="w-4 h-4 mt-0.5" />}
                  {showFeedback && isSelected && !isCorrectTarget && <X className="w-4 h-4 mt-0.5" />}
                </button>
              );
            })}
          </div>

          {/* Feedback bottom bar */}
          {showFeedback && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs sm:text-sm">
                {selectedAnswer === currentItem.sistemaCorreto ? (
                  <span className="text-emerald-700 font-bold">
                    Acertaste em cheio! O órgão {currentItem.name} pertence ao Sistema {systems.find(s => s.id === currentItem.sistemaCorreto)?.label}!
                  </span>
                ) : (
                  <span className="text-rose-700 font-medium">
                    Não foi desta. O órgão {currentItem.name} pertence na verdade ao Sistema <strong>{systems.find(s => s.id === currentItem.sistemaCorreto)?.label}</strong>!
                  </span>
                )}
              </div>

              <button
                onClick={handleNext}
                className="w-full sm:w-auto px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shrink-0"
              >
                Próximo Órgão →
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Final Results */
        <div className="text-center py-8 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center mx-auto mb-4 text-amber-700">
            <Award className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-black text-slate-900 mb-1">
            Missão de Detetive Concluída!
          </h4>
          <p className="text-sm text-slate-600 mb-4">
            Completaste todos os órgãos misteriosos com uma pontuação final de <strong>{score} pontos</strong>!
          </p>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-sm transition-transform active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            Jogar Novamente
          </button>
        </div>
      )}
    </div>
  );
};
