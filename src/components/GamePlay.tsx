import React, { useState, useEffect, useRef } from 'react';
import { AnswerRecord, Difficulty, GameMode, Question } from '../types/game.ts';
import { calculateQuestionScore } from '../game/rules.ts';
import { soundManager } from '../utils/sound.ts';
import {
  Flame,
  Clock,
  Heart,
  Star,
  CheckCircle2,
  XCircle,
  ArrowRight,
  GraduationCap,
  Infinity as InfinityIcon,
  HelpCircle,
} from 'lucide-react';

interface GamePlayProps {
  studentName: string;
  className: string;
  questions: Question[];
  gameMode: GameMode;
  timePerQuestion: number;
  onFinishGame: (
    answers: AnswerRecord[],
    score: number,
    maxStreak: number,
    timeSpentTotal: number
  ) => void;
}

export const GamePlay: React.FC<GamePlayProps> = ({
  studentName,
  className,
  questions,
  gameMode,
  timePerQuestion,
  onFinishGame,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(timePerQuestion || 20);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const questionStartTimeRef = useRef<number>(Date.now());
  const gameStartTimeRef = useRef<number>(Date.now());

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;

  // Setup question timer
  useEffect(() => {
    setSelectedOption(null);
    setHasAnswered(false);
    questionStartTimeRef.current = Date.now();

    if (gameMode !== 'practice' && timePerQuestion > 0) {
      setTimeLeft(timePerQuestion);

      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 5 && prev > 1) {
            soundManager.playTick();
          }
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            handleTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex]);

  const handleTimeout = () => {
    if (hasAnswered) return;
    setHasAnswered(true);
    soundManager.playWrong();

    const timeSpent = timePerQuestion;
    const newStreak = 0;
    setStreak(newStreak);

    if (gameMode === 'survival') {
      const remainingLives = lives - 1;
      setLives(remainingLives);
      if (remainingLives <= 0) {
        setTimeout(() => {
          handleEnd(
            [
              ...answers,
              {
                questionId: currentQ.id,
                questionText: currentQ.question,
                options: currentQ.options,
                userAnswer: null,
                correctAnswer: currentQ.correctAnswer,
                isCorrect: false,
                timeSpent,
                explanation: currentQ.explanation,
                topic: currentQ.topic,
              },
            ],
            score,
            maxStreak
          );
        }, 1200);
      }
    }

    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        questionText: currentQ.question,
        options: currentQ.options,
        userAnswer: null,
        correctAnswer: currentQ.correctAnswer,
        isCorrect: false,
        timeSpent,
        explanation: currentQ.explanation,
        topic: currentQ.topic,
      },
    ]);
  };

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setHasAnswered(true);
    setSelectedOption(idx);

    const timeSpent = Math.round((Date.now() - questionStartTimeRef.current) / 1000);
    const isCorrect = idx === currentQ.correctAnswer;

    let nextScore = score;
    let nextStreak = streak;
    let nextMaxStreak = maxStreak;

    if (isCorrect) {
      soundManager.playCorrect();
      nextStreak = streak + 1;
      if (nextStreak > nextMaxStreak) {
        nextMaxStreak = nextStreak;
      }
      if (nextStreak >= 3 && nextStreak % 3 === 0) {
        soundManager.playStreak();
      }

      const earned = calculateQuestionScore(
        true,
        gameMode === 'practice' ? 0 : timeLeft,
        timePerQuestion,
        nextStreak,
        currentQ.difficulty
      );
      nextScore = score + earned;
      setScore(nextScore);
      setStreak(nextStreak);
      setMaxStreak(nextMaxStreak);
    } else {
      soundManager.playWrong();
      nextStreak = 0;
      setStreak(0);

      if (gameMode === 'survival') {
        const remainingLives = lives - 1;
        setLives(remainingLives);
        if (remainingLives <= 0) {
          const finalAnswers: AnswerRecord[] = [
            ...answers,
            {
              questionId: currentQ.id,
              questionText: currentQ.question,
              options: currentQ.options,
              userAnswer: idx,
              correctAnswer: currentQ.correctAnswer,
              isCorrect: false,
              timeSpent,
              explanation: currentQ.explanation,
              topic: currentQ.topic,
            },
          ];
          setTimeout(() => {
            handleEnd(finalAnswers, nextScore, nextMaxStreak);
          }, 1200);
          return;
        }
      }
    }

    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        questionText: currentQ.question,
        options: currentQ.options,
        userAnswer: idx,
        correctAnswer: currentQ.correctAnswer,
        isCorrect,
        timeSpent,
        explanation: currentQ.explanation,
        topic: currentQ.topic,
      },
    ]);
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIndex + 1 >= totalQuestions) {
      handleEnd(answers, score, maxStreak);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleEnd = (
    finalAnswers: AnswerRecord[],
    finalScore: number,
    finalMaxStreak: number
  ) => {
    const totalTime = Math.round((Date.now() - gameStartTimeRef.current) / 1000);
    onFinishGame(finalAnswers, finalScore, finalMaxStreak, totalTime);
  };

  const getDifficultyBadge = (diff: Difficulty) => {
    switch (diff) {
      case 'Nhận biết':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Thông hiểu':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Vận dụng':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Vận dụng cao':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const labels = ['A', 'B', 'C', 'D'];
  const timerPercentage = timePerQuestion > 0 ? (timeLeft / timePerQuestion) * 100 : 100;

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* HUD Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Học sinh & Lớp */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-base border border-orange-200">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
              {studentName}
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5 font-medium">
              <span>Lớp: {className}</span>
              <span>•</span>
              <span className="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-md text-[11px]">
                {currentQ.topic}
              </span>
            </div>
          </div>
        </div>

        {/* Chỉ số: Điểm, Combo, Mạng */}
        <div className="flex items-center gap-3 sm:gap-4 font-mono">
          {/* Sinh tồn 3 mạng */}
          {gameMode === 'survival' && (
            <div className="flex items-center gap-1 text-rose-500">
              {[1, 2, 3].map((heart) => (
                <Heart
                  key={heart}
                  className={`w-5 h-5 ${
                    heart <= lives ? 'fill-rose-500 text-rose-500' : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Streak Combo */}
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-amber-800 text-xs font-bold">
            <Flame className={`w-4 h-4 text-orange-500 ${streak > 0 ? 'animate-bounce' : ''}`} />
            <span>Combo:</span>
            <span className="text-sm font-black">x{streak}</span>
          </div>

          {/* Điểm số */}
          <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-xl text-orange-800 text-xs font-bold">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>Điểm:</span>
            <span className="text-sm font-black text-orange-600">{score}</span>
          </div>
        </div>
      </div>

      {/* Progress & Countdown Timer */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-bold px-1">
          <span className="text-slate-500">
            Tiến độ: <span className="text-slate-900 font-black">Câu {currentIndex + 1} / {totalQuestions}</span>
          </span>
          <span className="text-orange-600 font-mono font-bold flex items-center gap-1.5">
            {gameMode === 'practice' ? (
              <>
                <InfinityIcon className="w-4 h-4 text-slate-400" />
                <span className="text-slate-500">Không giới hạn thời gian</span>
              </>
            ) : (
              <>
                <Clock className="w-4 h-4" />
                <span>{timeLeft}s</span>
              </>
            )}
          </span>
        </div>

        {/* Animated Timer Bar */}
        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              timerPercentage > 40
                ? 'bg-gradient-to-r from-emerald-500 to-amber-500'
                : 'bg-gradient-to-r from-amber-500 to-rose-500'
            }`}
            style={{ width: `${timerPercentage}%` }}
          />
        </div>
      </div>

      {/* Khung Câu hỏi chính */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Phân loại & Mức độ */}
        <div className="flex items-center justify-between">
          <span className={`text-xs font-bold px-3 py-1 rounded-lg border ${getDifficultyBadge(currentQ.difficulty)}`}>
            Mức độ: {currentQ.difficulty}
          </span>
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" /> Chủ đề: <strong>{currentQ.topic}</strong>
          </span>
        </div>

        {/* Nội dung câu hỏi */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed min-h-[56px]">
          {currentQ.question}
        </h3>

        {/* 4 Phương án A, B, C, D */}
        <div className="grid grid-cols-1 gap-3">
          {currentQ.options.map((option, idx) => {
            const isCorrectAnswer = idx === currentQ.correctAnswer;
            const isUserSelection = idx === selectedOption;

            let buttonStyle = 'bg-slate-50 hover:bg-orange-50/70 border-slate-200 text-slate-800';
            let badgeStyle = 'bg-white border-slate-200 text-slate-700';

            if (hasAnswered) {
              if (isCorrectAnswer) {
                buttonStyle = 'bg-emerald-50/90 border-emerald-500 text-emerald-950 font-bold shadow-2xs';
                badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
              } else if (isUserSelection && !isCorrectAnswer) {
                buttonStyle = 'bg-rose-50/90 border-rose-500 text-rose-950 font-medium';
                badgeStyle = 'bg-rose-600 text-white border-rose-600';
              } else {
                buttonStyle = 'bg-slate-50/50 border-slate-200/60 text-slate-400 opacity-60';
                badgeStyle = 'bg-slate-100 text-slate-400 border-slate-200';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={hasAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition flex items-start gap-3.5 group cursor-pointer ${buttonStyle}`}
              >
                <span
                  className={`w-7 h-7 rounded-xl border flex items-center justify-center font-black text-xs shrink-0 transition ${badgeStyle}`}
                >
                  {labels[idx]}
                </span>
                <span className="text-sm sm:text-base leading-snug flex-1 font-medium">
                  {option}
                </span>
                {hasAnswered && isCorrectAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                {hasAnswered && isUserSelection && !isCorrectAnswer && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Lời giải chi tiết từ Giáo viên Vật lí (Hiện khi đã chọn đáp án hoặc hết giờ) */}
        {hasAnswered && (
          <div
            className={`rounded-2xl p-5 border space-y-3 transition-all ${
              selectedOption === currentQ.correctAnswer
                ? 'bg-emerald-50/70 border-emerald-200'
                : 'bg-rose-50/70 border-rose-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm">
                {selectedOption === currentQ.correctAnswer ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-emerald-900">Chính xác tuyệt đối!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span className="text-rose-900">
                      {selectedOption === null ? 'Hết giờ trả lời!' : 'Chưa chính xác!'}
                    </span>
                  </>
                )}
              </div>

              <button
                onClick={handleNext}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold py-2.5 px-5 rounded-xl flex items-center gap-2 shadow-sm transition transform active:scale-95 cursor-pointer"
              >
                <span>{currentIndex + 1 >= totalQuestions ? 'Xem Kết Quả' : 'Câu Tiếp Theo'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white/80 p-3.5 rounded-xl border border-slate-200/60">
              <strong className="text-slate-900 block mb-1">
                Lời giải chi tiết từ Giáo viên:
              </strong>
              {currentQ.explanation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
