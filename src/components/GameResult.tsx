import React, { useEffect } from 'react';
import { GameResultData } from '../types/game.ts';
import { evaluatePerformance } from '../game/rules.ts';
import { soundManager } from '../utils/sound.ts';
import confetti from 'canvas-confetti';
import {
  Award,
  RotateCcw,
  Printer,
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  Flame,
  Star,
  Check,
  X,
} from 'lucide-react';

interface GameResultProps {
  result: GameResultData;
  onPlayAgain: () => void;
  onViewLeaderboard: () => void;
}

export const GameResult: React.FC<GameResultProps> = ({
  result,
  onPlayAgain,
  onViewLeaderboard,
}) => {
  const evalData = evaluatePerformance(result.correctCount, result.totalQuestions);

  useEffect(() => {
    if (evalData.scoreOutOf10 >= 7.0) {
      soundManager.playVictory();
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (err) {
        console.error('Confetti error:', err);
      }
    }
  }, [result.id]);

  const handlePrint = () => {
    window.print();
  };

  const labels = ['A', 'B', 'C', 'D'];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Giấy Khen Vinh Danh (Printable Certificate) */}
      <div
        id="certificate-card"
        className="relative overflow-hidden bg-white border-4 border-amber-300 rounded-3xl p-6 sm:p-10 shadow-xl text-center space-y-5"
      >
        {/* Ribbon góc */}
        <div className="absolute top-0 right-0 w-28 h-28 overflow-hidden pointer-events-none">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-[10px] py-1.5 text-center rotate-45 transform translate-x-7 translate-y-4 shadow-md uppercase tracking-wider">
            Vật Lí 12
          </div>
        </div>

        {/* Huy hiệu */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-red-500 text-white shadow-xl shadow-orange-500/30 text-4xl">
          <Award className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest font-black text-orange-600 block mb-1">
            GIẤY KHEN THÀNH TÍCH XUẤT SẮC
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {result.studentName.toUpperCase()}
          </h2>
          <p className="text-sm text-slate-500 font-semibold mt-1">
            Học sinh lớp: <strong className="text-slate-800">{result.className}</strong> • Bộ sách Kết nối tri thức với cuộc sống
          </p>
        </div>

        {/* 4 Chỉ số quan trọng */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5">
            <span className="text-[11px] text-slate-500 font-bold block mb-1">Điểm Hệ 10</span>
            <span className="text-2xl sm:text-3xl font-black text-orange-600 font-mono">
              {evalData.scoreOutOf10}/10
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5">
            <span className="text-[11px] text-slate-500 font-bold block mb-1">Số Câu Đúng</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">
              {result.correctCount}/{result.totalQuestions}
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5">
            <span className="text-[11px] text-slate-500 font-bold block mb-1">Tổng Điểm Thi</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-600 font-mono">
              {result.score}
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex flex-col justify-center">
            <span className="text-[11px] text-slate-500 font-bold block mb-1">Danh Hiệu</span>
            <span className="text-xs font-black text-indigo-700 bg-indigo-50 py-1 px-2 rounded-lg truncate">
              {evalData.badge} {evalData.title}
            </span>
          </div>
        </div>

        {/* Nhận xét năng lực từ Giáo viên */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm text-amber-950 font-medium max-w-2xl mx-auto leading-relaxed text-left">
          <div className="font-bold text-amber-900 mb-1 flex items-center gap-2">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>Đánh giá sư phạm từ Giáo viên:</span>
          </div>
          {evalData.feedbackMessage}
        </div>

        {/* Chân trang Giấy khen */}
        <div className="flex justify-between items-end max-w-xl mx-auto pt-4 text-xs text-slate-500 border-t border-slate-100">
          <div className="text-left">
            <div className="font-bold text-slate-700">Thời gian hoàn thành</div>
            <div>{result.completedAt}</div>
          </div>
          <div className="text-center">
            <div className="font-extrabold text-orange-600 font-mono text-sm">
              Chương I: Vật lí nhiệt
            </div>
            <div className="text-[11px] text-slate-400">Vật lí 12 - GDPT 2018 (KNTT)</div>
          </div>
        </div>
      </div>

      {/* Nút hành động */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onPlayAgain}
          className="px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm shadow-md transition flex items-center gap-2 cursor-pointer transform active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Chơi Lượt Mới</span>
        </button>

        <button
          onClick={handlePrint}
          className="px-5 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-sm shadow-xs transition flex items-center gap-2 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>In / Xuất Giấy Khen</span>
        </button>

        <button
          onClick={onViewLeaderboard}
          className="px-5 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-sm shadow-xs transition flex items-center gap-2 cursor-pointer"
        >
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>Bảng Vinh Danh Lớp</span>
        </button>
      </div>

      {/* Xem lại toàn bộ câu hỏi và đáp án chi tiết */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-orange-500" /> Xem Lại Chi Tiết & Lời Giải Lượt Thi
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            {result.answers.length} câu hỏi
          </span>
        </div>

        <div className="space-y-4">
          {result.answers.map((item, idx) => {
            const userChoiceText =
              item.userAnswer !== null
                ? `${labels[item.userAnswer]}. ${item.options[item.userAnswer]}`
                : 'Hết giờ (Không chọn)';
            const correctChoiceText = `${labels[item.correctAnswer]}. ${item.options[item.correctAnswer]}`;

            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition space-y-2.5 ${
                  item.isCorrect
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : 'border-rose-200 bg-rose-50/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                    <span className="text-slate-500 mr-1.5 font-mono">#{idx + 1}.</span>
                    {item.questionText}
                  </div>
                  <span
                    className={`text-xs font-extrabold px-3 py-1 rounded-full shrink-0 flex items-center gap-1 ${
                      item.isCorrect
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {item.isCorrect ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Đúng
                      </>
                    ) : (
                      <>
                        <X className="w-3.5 h-3.5" /> Sai
                      </>
                    )}
                  </span>
                </div>

                <div className="text-xs sm:text-sm space-y-1 pt-1">
                  <div>
                    <span className="text-slate-500">Lựa chọn của em: </span>
                    <strong className={item.isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                      {userChoiceText}
                    </strong>
                  </div>

                  {!item.isCorrect && (
                    <div>
                      <span className="text-slate-500">Đáp án chính xác: </span>
                      <strong className="text-emerald-700">{correctChoiceText}</strong>
                    </div>
                  )}

                  <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-slate-700 mt-2">
                    <strong className="text-slate-900">Lời giải chi tiết: </strong>
                    {item.explanation}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
