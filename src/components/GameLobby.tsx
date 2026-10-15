import React from 'react';
import { ClassGroup, GameMode, GameSettings } from '../types/game.ts';
import {
  Rocket,
  Timer,
  GraduationCap,
  HeartPulse,
  Award,
  Sparkles,
  Users,
  Settings,
  HelpCircle,
  Flame,
} from 'lucide-react';

interface GameLobbyProps {
  classes: ClassGroup[];
  selectedClassId: string;
  selectedStudentName: string;
  customStudentName: string;
  settings: GameSettings;
  totalAvailableQuestions: number;
  onClassChange: (classId: string) => void;
  onStudentChange: (studentName: string) => void;
  onCustomNameChange: (customName: string) => void;
  onSettingsChange: (settings: GameSettings) => void;
  onStartGame: () => void;
  onNavigateToClasses: () => void;
}

export const GameLobby: React.FC<GameLobbyProps> = ({
  classes,
  selectedClassId,
  selectedStudentName,
  customStudentName,
  settings,
  totalAvailableQuestions,
  onClassChange,
  onStudentChange,
  onCustomNameChange,
  onSettingsChange,
  onStartGame,
  onNavigateToClasses,
}) => {
  const currentClass = classes.find((c) => c.id === selectedClassId) || classes[0];

  const handleModeSelect = (mode: GameMode) => {
    onSettingsChange({
      ...settings,
      gameMode: mode,
      timePerQuestion: mode === 'practice' ? 0 : 20,
    });
  };

  const handleQuestionCount = (count: number) => {
    onSettingsChange({
      ...settings,
      questionCount: Math.min(count, totalAvailableQuestions),
    });
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 text-white p-6 sm:p-10 shadow-xl shadow-orange-500/10">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold mb-3 border border-white/25">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>Vật lí 12 - Chương I: Vật lí nhiệt (GDPT 2018 - Kết nối tri thức)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3">
            Chinh Phục Nhiệt Học
          </h1>

          <p className="text-orange-100 text-sm sm:text-base leading-relaxed mb-6 font-medium">
            Khám phá mô hình động học phân tử, thang nhiệt Celsius & Kelvin, nội năng, định luật I nhiệt động lực học, nhiệt dung riêng và nhiệt chuyển thể qua các thử thách trắc nghiệm tương tác sinh động!
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-orange-100">
            <span className="flex items-center gap-1.5 bg-black/10 px-3 py-1.5 rounded-xl backdrop-blur-2xs">
              <Timer className="w-4 h-4 text-amber-300" /> 20s/câu hỏi
            </span>
            <span className="flex items-center gap-1.5 bg-black/10 px-3 py-1.5 rounded-xl backdrop-blur-2xs">
              <Flame className="w-4 h-4 text-orange-300" /> Thưởng chuỗi Combo
            </span>
            <span className="flex items-center gap-1.5 bg-black/10 px-3 py-1.5 rounded-xl backdrop-blur-2xs">
              <Award className="w-4 h-4 text-yellow-300" /> Cấp Giấy khen vinh danh
            </span>
          </div>
        </div>

        {/* Decorative background icon */}
        <div className="absolute -right-8 -bottom-10 opacity-15 text-white pointer-events-none select-none">
          <Flame className="w-64 h-64" />
        </div>
      </div>

      {/* Grid: 2 Cột cấu hình & 1 Cột Tóm tắt + Nút Bắt Đầu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cột 1 & 2: Chọn Học sinh & Chế độ thi */}
        <div className="md:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          {/* Bước 1: Người chơi */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-black">
                  1
                </span>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Thông Tin Học Sinh Tham Gia
                </h3>
              </div>
              <button
                type="button"
                onClick={onNavigateToClasses}
                className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
              >
                <Users className="w-3.5 h-3.5" /> Quản lý danh sách lớp
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Lớp học:
                </label>
                <select
                  value={selectedClassId}
                  onChange={(e) => onClassChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                >
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name} ({cls.students.length} học sinh)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Chọn họ tên học sinh:
                </label>
                <select
                  value={selectedStudentName}
                  onChange={(e) => {
                    onStudentChange(e.target.value);
                    onCustomNameChange('');
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                >
                  {currentClass && currentClass.students.length > 0 ? (
                    currentClass.students.map((st, i) => (
                      <option key={i} value={st}>
                        {st}
                      </option>
                    ))
                  ) : (
                    <option value="">(Chưa có danh sách - Nhập tên bên dưới)</option>
                  )}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Hoặc tự nhập tên tự do (nếu chưa có trong danh sách):
              </label>
              <input
                type="text"
                value={customStudentName}
                onChange={(e) => onCustomNameChange(e.target.value)}
                placeholder="Nhập họ và tên học sinh (Ví dụ: Nguyễn Văn An)..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
              />
            </div>
          </div>

          {/* Bước 2: Chế độ chơi */}
          <div className="space-y-4 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-black">
                2
              </span>
              <h3 className="font-extrabold text-slate-900 text-base">
                Chọn Chế Độ Chơi
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleModeSelect('timed')}
                className={`p-4 rounded-2xl text-left border-2 transition cursor-pointer relative ${
                  settings.gameMode === 'timed'
                    ? 'border-orange-500 bg-orange-50/60 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-extrabold text-sm text-slate-900">Thi đấu 20s</span>
                  <Timer className={`w-4 h-4 ${settings.gameMode === 'timed' ? 'text-orange-500' : 'text-slate-400'}`} />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Đếm ngược 20 giây mỗi câu, cộng điểm thời gian và chuỗi combo.
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleModeSelect('practice')}
                className={`p-4 rounded-2xl text-left border-2 transition cursor-pointer relative ${
                  settings.gameMode === 'practice'
                    ? 'border-orange-500 bg-orange-50/60 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-extrabold text-sm text-slate-900">Luyện tập</span>
                  <GraduationCap className={`w-4 h-4 ${settings.gameMode === 'practice' ? 'text-orange-500' : 'text-slate-400'}`} />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Không tính giờ, thoải mái suy ngẫm và đọc kĩ lời giải chi tiết.
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleModeSelect('survival')}
                className={`p-4 rounded-2xl text-left border-2 transition cursor-pointer relative ${
                  settings.gameMode === 'survival'
                    ? 'border-orange-500 bg-orange-50/60 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-extrabold text-sm text-slate-900">Sinh tồn (3 tim)</span>
                  <HeartPulse className={`w-4 h-4 ${settings.gameMode === 'survival' ? 'text-rose-500' : 'text-slate-400'}`} />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Có 3 mạng, mỗi lần trả lời sai bị trừ 1 tim, thách thức học sinh giỏi.
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Cột 3: Tóm tắt & Nút Bắt Đầu */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Settings className="w-4 h-4 text-orange-500" /> Cấu Hình Vòng Thi
            </h3>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-200/50">
                <span>Học sinh:</span>
                <span className="font-bold text-slate-900 truncate max-w-[140px]">
                  {customStudentName.trim() || selectedStudentName || 'Học sinh'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/50">
                <span>Lớp:</span>
                <span className="font-bold text-slate-900">{currentClass?.name || '12A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/50">
                <span>Số câu hỏi:</span>
                <span className="font-bold text-orange-600">{settings.questionCount} câu</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/50">
                <span>Chế độ:</span>
                <span className="font-bold text-slate-900">
                  {settings.gameMode === 'timed'
                    ? 'Thi đấu 20s'
                    : settings.gameMode === 'practice'
                    ? 'Luyện tập'
                    : 'Sinh tồn 3 tim'}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span>Trộn ngẫu nhiên:</span>
                <span className="font-bold text-emerald-600">Đã kích hoạt</span>
              </div>
            </div>

            {/* Chọn số lượng câu hỏi */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Số lượng câu trong lượt thi:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[10, 15, 20].map((num) => {
                  const isSelected = settings.questionCount === num;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleQuestionCount(num)}
                      className={`py-2 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                        isSelected
                          ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-2xs'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {num} câu
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={onStartGame}
              className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-black py-4 px-6 rounded-2xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2.5 text-base transition transform active:scale-95 cursor-pointer"
            >
              <Rocket className="w-5 h-5 animate-pulse" />
              <span>Bắt Đầu Chinh Phục</span>
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-2.5 flex items-center justify-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" /> Có sẵn lời giải chi tiết cho từng câu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
