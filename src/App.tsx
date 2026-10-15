import React, { useState, useEffect } from 'react';
import {
  AnswerRecord,
  ClassGroup,
  GameMode,
  GameResultData,
  GameSettings,
  Question,
} from './types/game.ts';
import {
  getStoredClasses,
  getStoredHistory,
  getStoredQuestions,
  resetQuestionsToDefault,
  saveResultToHistory,
  saveStoredClasses,
  saveStoredQuestions,
} from './utils/storage.ts';
import { evaluatePerformance, shuffleArray } from './game/rules.ts';
import { soundManager } from './utils/sound.ts';
import { Header, ActiveTab } from './components/Header.tsx';
import { GameLobby } from './components/GameLobby.tsx';
import { GamePlay } from './components/GamePlay.tsx';
import { GameResult } from './components/GameResult.tsx';
import { ClassManager } from './components/ClassManager.tsx';
import { QuestionManager } from './components/QuestionManager.tsx';
import { Leaderboard } from './components/Leaderboard.tsx';
import { ExportModal } from './components/ExportModal.tsx';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('lobby');
  const [questions, setQuestions] = useState<Question[]>(getStoredQuestions);
  const [classes, setClasses] = useState<ClassGroup[]>(getStoredClasses);
  const [history, setHistory] = useState<GameResultData[]>(getStoredHistory);

  const [selectedClassId, setSelectedClassId] = useState<string>(() => {
    const list = getStoredClasses();
    return list[0]?.id || 'class-12a1';
  });

  const [selectedStudentName, setSelectedStudentName] = useState<string>(() => {
    const list = getStoredClasses();
    return list[0]?.students[0] || 'Nguyễn Hoàng An';
  });

  const [customStudentName, setCustomStudentName] = useState<string>('');

  const [settings, setSettings] = useState<GameSettings>({
    timePerQuestion: 20,
    questionCount: 20,
    shuffleQuestions: true,
    shuffleOptions: true,
    soundEnabled: true,
    gameMode: 'timed',
  });

  const [activeGameQuestions, setActiveGameQuestions] = useState<Question[]>([]);
  const [currentResult, setCurrentResult] = useState<GameResultData | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // Sync sound manager
  useEffect(() => {
    soundManager.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Support ?autostart=1 query param for testing & ultra-mode
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        const currentClass = classes.find((c) => c.id === selectedClassId) || classes[0];
        const student = currentClass?.students[0] || 'Học sinh kiểm thử';
        setSelectedStudentName(student);
        const pool = shuffleArray(questions).slice(0, 5);
        setActiveGameQuestions(pool);
        setActiveTab('game');
      }
    }
  }, []);

  const handleStartGame = () => {
    soundManager.playClick();
    const student = customStudentName.trim() || selectedStudentName || 'Học sinh';
    setSelectedStudentName(student);

    // Shuffle and pick questions based on settings
    let pool = settings.shuffleQuestions ? shuffleArray(questions) : [...questions];
    pool = pool.slice(0, Math.min(settings.questionCount, pool.length));

    // Optionally shuffle options within questions
    if (settings.shuffleOptions) {
      pool = pool.map((q) => {
        const correctText = q.options[q.correctAnswer];
        const shuffledOpts = shuffleArray(q.options) as [string, string, string, string];
        const newCorrectIdx = shuffledOpts.indexOf(correctText);
        return {
          ...q,
          options: shuffledOpts,
          correctAnswer: newCorrectIdx,
        };
      });
    }

    setActiveGameQuestions(pool);
    setActiveTab('game');
  };

  const handleFinishGame = (
    answers: AnswerRecord[],
    score: number,
    maxStreak: number,
    timeSpentTotal: number
  ) => {
    const currentClass = classes.find((c) => c.id === selectedClassId) || classes[0];
    const student = customStudentName.trim() || selectedStudentName || 'Học sinh';
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const totalQuestions = answers.length;
    const evalData = evaluatePerformance(correctCount, totalQuestions);

    const resultData: GameResultData = {
      id: `res-${Date.now()}`,
      studentName: student,
      className: currentClass?.name || '12A',
      score,
      maxScore: totalQuestions * 150,
      scoreOutOf10: evalData.scoreOutOf10,
      correctCount,
      totalQuestions,
      timeSpentTotal,
      maxStreak,
      completedAt: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      answers,
      gameMode: settings.gameMode,
      rankTitle: evalData.title,
      badge: evalData.badge,
    };

    setCurrentResult(resultData);
    saveResultToHistory(resultData);
    setHistory((prev) => [resultData, ...prev]);
    setActiveTab('game'); // Will render result view because currentResult exists
  };

  const handlePlayAgain = () => {
    setCurrentResult(null);
    setActiveTab('lobby');
  };

  const handleUpdateClasses = (updated: ClassGroup[]) => {
    setClasses(updated);
    saveStoredClasses(updated);
  };

  const handleUpdateQuestions = (updated: Question[]) => {
    setQuestions(updated);
    saveStoredQuestions(updated);
  };

  const handleResetQuestions = () => {
    const defaults = resetQuestionsToDefault();
    setQuestions(defaults);
  };

  const handleClearHistory = () => {
    localStorage.removeItem('cpnh_history_v1');
    setHistory([]);
  };

  const currentClass = classes.find((c) => c.id === selectedClassId) || classes[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          soundManager.playClick();
          setCurrentResult(null);
          setActiveTab(tab);
        }}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'lobby' && (
          <GameLobby
            classes={classes}
            selectedClassId={selectedClassId}
            selectedStudentName={selectedStudentName}
            customStudentName={customStudentName}
            settings={settings}
            totalAvailableQuestions={questions.length}
            onClassChange={(clsId) => {
              setSelectedClassId(clsId);
              const cls = classes.find((c) => c.id === clsId);
              if (cls && cls.students.length > 0) {
                setSelectedStudentName(cls.students[0]);
              }
            }}
            onStudentChange={setSelectedStudentName}
            onCustomNameChange={setCustomStudentName}
            onSettingsChange={setSettings}
            onStartGame={handleStartGame}
            onNavigateToClasses={() => setActiveTab('classes')}
          />
        )}

        {activeTab === 'game' && !currentResult && (
          <GamePlay
            studentName={customStudentName.trim() || selectedStudentName || 'Học sinh'}
            className={currentClass?.name || '12A'}
            questions={activeGameQuestions}
            gameMode={settings.gameMode}
            timePerQuestion={settings.timePerQuestion}
            onFinishGame={handleFinishGame}
          />
        )}

        {activeTab === 'game' && currentResult && (
          <GameResult
            result={currentResult}
            onPlayAgain={handlePlayAgain}
            onViewLeaderboard={() => {
              setCurrentResult(null);
              setActiveTab('leaderboard');
            }}
          />
        )}

        {activeTab === 'classes' && (
          <ClassManager
            classes={classes}
            selectedClassId={selectedClassId}
            onSelectClass={(clsId) => {
              setSelectedClassId(clsId);
              const cls = classes.find((c) => c.id === clsId);
              if (cls && cls.students.length > 0) {
                setSelectedStudentName(cls.students[0]);
              }
            }}
            onUpdateClasses={handleUpdateClasses}
          />
        )}

        {activeTab === 'questions' && (
          <QuestionManager
            questions={questions}
            onUpdateQuestions={handleUpdateQuestions}
            onResetQuestions={handleResetQuestions}
          />
        )}

        {activeTab === 'leaderboard' && (
          <Leaderboard
            history={history}
            onClearHistory={handleClearHistory}
            onPlayGame={() => {
              setCurrentResult(null);
              setActiveTab('lobby');
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="font-medium">
            <strong>Chinh Phục Nhiệt Học</strong> • Chương trình Vật lí 12 GDPT 2018 (Kết nối tri thức với cuộc sống)
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="text-orange-600 hover:text-orange-700 font-semibold cursor-pointer"
            >
              Tải file HTML đơn lẻ (Offline)
            </button>
            <span>•</span>
            <span className="text-slate-400">© 2026 Giáo dục Vật lí THPT</span>
          </div>
        </div>
      </footer>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
