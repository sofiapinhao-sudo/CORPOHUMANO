import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ThumbsUp, ThumbsDown, Check, X, RotateCcw, HeartHandshake } from 'lucide-react';
import { playSuccessSound, playErrorSound, playPopSound } from '../../utils/soundEffects';

interface HabitItem {
  id: number;
  habito: string;
  isCorrect: boolean; // true = Bom/Saudável, false = Prejudicial/Errado
  sistema: string;
  explicacao: string;
}

const HABITS_LIST: HabitItem[] = [
  {
    id: 1,
    habito: 'Inspirar sempre pelo nariz em vez da boca.',
    isCorrect: true,
    sistema: 'Sistema Respiratório',
    explicacao: 'Certo! No nariz, os pelinhos filtram poeiras, e os vasos aquecem e humedecem o ar antes de chegar aos pulmões.'
  },
  {
    id: 2,
    habito: 'Reter a urina na bexiga durante muitas horas quando temos vontade.',
    isCorrect: false,
    sistema: 'Sistema Excretor / Urinário',
    explicacao: 'Errado! Segurar a urina pode provocar infeções urinárias e prejudicar a bexiga. Devemos ir à casa de banho logo que sentirmos vontade.'
  },
  {
    id: 3,
    habito: 'Mastigar muito bem e devagar os alimentos antes de engolir.',
    isCorrect: true,
    sistema: 'Sistema Digestivo',
    explicacao: 'Certo! Mastigar bem ajuda a triturar a comida e a misturá-la com a saliva, facilitando todo o trabalho do estômago.'
  },
  {
    id: 4,
    habito: 'Adicionar muito sal e comer snacks ultra-salgados todos os dias.',
    isCorrect: false,
    sistema: 'Sistema Circulatório e Urinário',
    explicacao: 'Errado! O excesso de sal sobrecarrega os rins e pode aumentar a pressão arterial no sistema circulatório.'
  },
  {
    id: 5,
    habito: 'Lavar as mãos com água e sabão sempre antes das refeições.',
    isCorrect: true,
    sistema: 'Sistema Digestivo e Defesa',
    explicacao: 'Certo! Lavar as mãos elimina bactérias e micróbios que poderiam entrar na boca com os alimentos e causar doenças.'
  },
  {
    id: 6,
    habito: 'Mudar de roupa interior todos os dias e cuidar da higiene dos órgãos genitais.',
    isCorrect: true,
    sistema: 'Sistema Reprodutor',
    explicacao: 'Certo! A higiene diária e roupa lavada evitam o desenvolvimento de bactérias e fungos.'
  },
  {
    id: 7,
    habito: 'Ficar em ambientes fechados com fumo de tabaco.',
    isCorrect: false,
    sistema: 'Sistema Respiratório',
    explicacao: 'Errado! O fumo do tabaco contém substâncias tóxicas que danificam gravemente os pulmões e os brônquios.'
  },
  {
    id: 8,
    habito: 'Dormir cerca de 9 a 10 horas e descansar adequadamente.',
    isCorrect: true,
    sistema: 'Sistema Nervoso e Circulatório',
    explicacao: 'Certo! O descanso é fundamental para o cérebro consolidar as aprendizagens da escola e para o coração repousar.'
  },
  {
    id: 9,
    habito: 'Andar de bicicleta ou trotinete sem capacete.',
    isCorrect: false,
    sistema: 'Sistema Nervoso',
    explicacao: 'Errado! Uma queda pode magoar o crânio e lesionar o cérebro. O capacete protege a nossa cabeça!'
  },
  {
    id: 10,
    habito: 'Utilizar protetor solar na praia e nos dias de sol intenso.',
    isCorrect: true,
    sistema: 'A Pele (Sistema Excretor e Defesa)',
    explicacao: 'Certo! O protetor solar protege a pele das queimaduras e de doenças provocadas pelos raios ultravioleta.'
  }
];

export const HealthyHabitsGame: React.FC = () => {
  const [habits, setHabits] = useState<HabitItem[]>(() => {
    return [...HABITS_LIST].sort(() => Math.random() - 0.5);
  });
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentHabit = habits[currentIndex];

  const handleVote = (choice: boolean) => {
    if (showFeedback) return;
    setSelectedAnswer(choice);
    setShowFeedback(true);

    const isCorrect = choice === currentHabit.isCorrect;
    if (isCorrect) {
      playSuccessSound();
      setScore((prev) => prev + 10);
    } else {
      playErrorSound();
    }
  };

  const handleNext = () => {
    playPopSound();
    if (currentIndex + 1 < habits.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    playPopSound();
    setHabits([...HABITS_LIST].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsFinished(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-200/80 shadow-sm p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-emerald-100">
        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
            Desafio 3 · Hábitos e Saúde
          </span>
          <h3 className="text-xl font-bold text-slate-900">
            Mestre dos Cuidados e da Saúde: Certo ou Errado?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Analisa cada comportamento do dia a dia e decide se faz bem ou se prejudica o teu corpo!
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-900">
          <span>Pontuação: {score} / 100</span>
        </div>
      </div>

      {!isFinished ? (
        <div className="max-w-xl mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Afirmação {currentIndex + 1} de {habits.length}</span>
            <span>{currentHabit.sistema}</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / habits.length) * 100}%` }}
            />
          </div>

          {/* Habit Card */}
          <div className="bg-gradient-to-br from-emerald-50/70 to-teal-50/50 border border-emerald-200 rounded-2xl p-6 text-center mb-6 shadow-sm">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
              Comportamento em Avaliação
            </span>
            <p className="text-lg sm:text-xl font-bold text-emerald-950 leading-snug">
              "{currentHabit.habito}"
            </p>
          </div>

          {/* Voting Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              disabled={showFeedback}
              onClick={() => handleVote(true)}
              className={`p-4 rounded-2xl border text-sm sm:text-base font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${
                showFeedback
                  ? currentHabit.isCorrect
                    ? 'bg-emerald-500 text-white border-emerald-600 ring-2 ring-emerald-300'
                    : selectedAnswer === true
                    ? 'bg-rose-500 text-white border-rose-600'
                    : 'opacity-40 bg-slate-50 border-slate-200 text-slate-500'
                  : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-900 hover:scale-[1.02] active:scale-95'
              }`}
            >
              <ThumbsUp className="w-5 h-5" />
              <span>CERTO (Faz Bem!)</span>
            </button>

            <button
              disabled={showFeedback}
              onClick={() => handleVote(false)}
              className={`p-4 rounded-2xl border text-sm sm:text-base font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${
                showFeedback
                  ? !currentHabit.isCorrect
                    ? 'bg-emerald-500 text-white border-emerald-600 ring-2 ring-emerald-300'
                    : selectedAnswer === false
                    ? 'bg-rose-500 text-white border-rose-600'
                    : 'opacity-40 bg-slate-50 border-slate-200 text-slate-500'
                  : 'bg-rose-50 hover:bg-rose-100 border-rose-300 text-rose-900 hover:scale-[1.02] active:scale-95'
              }`}
            >
              <ThumbsDown className="w-5 h-5" />
              <span>ERRADO (Prejudicial!)</span>
            </button>
          </div>

          {/* Feedback Explanation */}
          {showFeedback && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                {selectedAnswer === currentHabit.isCorrect ? (
                  <span className="text-emerald-700 font-bold block mb-1">
                    Excelente resposta!
                  </span>
                ) : (
                  <span className="text-rose-700 font-bold block mb-1">
                    Atenção à saúde:
                  </span>
                )}
                {currentHabit.explicacao}
              </div>

              <button
                onClick={handleNext}
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shrink-0"
              >
                Próximo Hábito →
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results screen */
        <div className="text-center py-8 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center mx-auto mb-4 text-emerald-700">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-black text-slate-900 mb-1">
            És um Guardião da Saúde!
          </h4>
          <p className="text-sm text-slate-600 mb-4">
            Completaste todas as 10 afirmações com <strong>{score} pontos</strong>. Sabes exatamente como cuidar do teu corpo todos os dias!
          </p>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-sm transition-transform active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            Jogar Novamente
          </button>
        </div>
      )}
    </div>
  );
};
