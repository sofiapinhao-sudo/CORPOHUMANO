import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowUp, ArrowDown, CheckCircle2, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { DIGESTIVE_VOYAGE_ITEMS, OrganSortingItem } from '../../data/humanBodyData';
import { playSuccessSound, playErrorSound, playPopSound } from '../../utils/soundEffects';

export const DigestionJourneyGame: React.FC = () => {
  // Shuffle items initially
  const [items, setItems] = useState<OrganSortingItem[]>(() => {
    return [...DIGESTIVE_VOYAGE_ITEMS].sort(() => Math.random() - 0.5);
  });
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isAllCorrect, setIsAllCorrect] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (isChecked && isAllCorrect) return;
    setIsChecked(false);
    playPopSound();
    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setItems(newItems);
  };

  const handleVerify = () => {
    setAttempts((prev) => prev + 1);
    const correct = items.every((item, idx) => item.order === idx + 1);
    setIsChecked(true);
    setIsAllCorrect(correct);

    if (correct) {
      playSuccessSound();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      playErrorSound();
    }
  };

  const handleReset = () => {
    playPopSound();
    setItems([...DIGESTIVE_VOYAGE_ITEMS].sort(() => Math.random() - 0.5));
    setIsChecked(false);
    setIsAllCorrect(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-amber-200/80 shadow-sm p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-amber-100">
        <div>
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">
            Desafio 1 · Sistema Digestivo
          </span>
          <h3 className="text-xl font-bold text-slate-900">
            A Grande Viagem do Alimento!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Organiza os órgãos pela ordem correta por onde o bolo alimentar e os nutrientes passam, desde a primeira trinca na boca até à eliminação final.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Misturar
          </button>
        </div>
      </div>

      {/* Interactive Sorting List */}
      <div className="space-y-2 mb-6">
        {items.map((item, index) => {
          const isCorrectPosition = isChecked && item.order === index + 1;
          const isWrongPosition = isChecked && item.order !== index + 1;

          return (
            <div
              key={item.id}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                isCorrectPosition
                  ? 'bg-emerald-50 border-emerald-300 ring-1 ring-emerald-200'
                  : isWrongPosition
                  ? 'bg-rose-50 border-rose-300'
                  : 'bg-slate-50 hover:bg-amber-50/50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 ${
                    isCorrectPosition
                      ? 'bg-emerald-600 text-white'
                      : isWrongPosition
                      ? 'bg-rose-500 text-white'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {index + 1}º
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-bold text-slate-900 text-sm">{item.name}</h5>
                    <span className="text-[11px] font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-md">
                      {item.etapaNome}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-1">{item.descricao}</p>
                </div>
              </div>

              {/* Move buttons */}
              <div className="flex items-center gap-1 shrink-0 ml-2">
                <button
                  disabled={index === 0}
                  onClick={() => moveItem(index, 'up')}
                  className="p-1.5 rounded-md bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 transition-colors"
                  title="Subir na ordem"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  disabled={index === items.length - 1}
                  onClick={() => moveItem(index, 'down')}
                  className="p-1.5 rounded-md bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 transition-colors"
                  title="Descer na ordem"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feedback & Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
        <div>
          {isChecked && isAllCorrect && (
            <div className="flex items-center gap-2 text-emerald-800 text-sm font-bold">
              <Trophy className="w-5 h-5 text-emerald-600" />
              Parabéns! Ordenaste toda a viagem da digestão na perfeição!
            </div>
          )}
          {isChecked && !isAllCorrect && (
            <div className="text-rose-700 text-xs sm:text-sm font-medium">
              Ainda há órgãos fora do lugar certo. Dica: Começa na Boca e lembra-te que os nutrientes vão para o sangue no Intestino Delgado!
            </div>
          )}
        </div>

        <button
          onClick={handleVerify}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95"
        >
          <CheckCircle2 className="w-4 h-4" />
          Verificar Resposta
        </button>
      </div>
    </div>
  );
};
