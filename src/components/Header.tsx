import React from 'react';
import { Flame, Gamepad2, Users, BookOpen, Trophy, Volume2, VolumeX, Download } from 'lucide-react';

export type ActiveTab = 'lobby' | 'game' | 'classes' | 'questions' | 'leaderboard';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenExportModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  soundEnabled,
  onToggleSound,
  onOpenExportModal,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo & Tiêu đề */}
        <button
          onClick={() => onTabChange('lobby')}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-slate-900 leading-tight">
                Chinh Phục Nhiệt Học
              </span>
              <span className="text-xs bg-orange-100 text-orange-700 font-semibold px-2 py-0.5 rounded-full border border-orange-200">
                KNTT 12
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Chương I: Vật lí nhiệt • Bộ sách Kết nối tri thức
            </p>
          </div>
        </button>

        {/* Navigation tabs */}
        <nav className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => onTabChange('lobby')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'lobby' || activeTab === 'game'
                ? 'bg-orange-50 text-orange-600 border border-orange-200 shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span className="hidden md:inline">Trò chơi</span>
          </button>

          <button
            onClick={() => onTabChange('classes')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'classes'
                ? 'bg-orange-50 text-orange-600 border border-orange-200 shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="hidden md:inline">Quản lý lớp</span>
          </button>

          <button
            onClick={() => onTabChange('questions')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'questions'
                ? 'bg-orange-50 text-orange-600 border border-orange-200 shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden md:inline">Ngân hàng câu hỏi</span>
          </button>

          <button
            onClick={() => onTabChange('leaderboard')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'leaderboard'
                ? 'bg-orange-50 text-orange-600 border border-orange-200 shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span className="hidden md:inline">Vinh danh</span>
          </button>

          {/* Nút tải file HTML 1 file duy nhất */}
          <button
            onClick={onOpenExportModal}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-2xs transition flex items-center gap-1 cursor-pointer"
            title="Tải mã nguồn 1 file HTML chạy Offline"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">File HTML 1 file</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="w-9 h-9 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center transition cursor-pointer"
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            aria-label="Bật hoặc tắt âm thanh"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-orange-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
