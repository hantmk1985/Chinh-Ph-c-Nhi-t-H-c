import React, { useState } from 'react';
import { GameResultData } from '../types/game.ts';
import { Trophy, Trash2, Medal, UserCheck, Calendar, Star, GraduationCap } from 'lucide-react';

interface LeaderboardProps {
  history: GameResultData[];
  onClearHistory: () => void;
  onPlayGame: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  history,
  onClearHistory,
  onPlayGame,
}) => {
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('all');

  // Unique classes in history
  const classList = Array.from(new Set(history.map((h) => h.className)));

  const filteredHistory = history.filter((h) => {
    if (selectedClassFilter === 'all') return true;
    return h.className === selectedClassFilter;
  });

  // Top 3 best scores
  const topScores = [...filteredHistory]
    .sort((a, b) => b.score - a.score || b.scoreOutOf10 - a.scoreOutOf10)
    .slice(0, 3);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-lg">
              <Trophy className="w-5 h-5" />
            </span>
            Bảng Vinh Danh Thành Tích Nhiệt Học
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Ghi nhận kết quả các đợt kiểm tra và vinh danh những học sinh đạt điểm số cao nhất.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử thi?')) {
                  onClearHistory();
                }
              }}
              className="text-xs font-semibold text-slate-400 hover:text-rose-600 transition flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-50 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Xóa lịch sử</span>
            </button>
          )}

          <button
            onClick={onPlayGame}
            className="bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl shadow-xs transition cursor-pointer"
          >
            Vào Thi Ngay
          </button>
        </div>
      </div>

      {/* Top 3 Podium if there are records */}
      {topScores.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {topScores.map((item, idx) => {
            const medals = [
              { color: 'from-amber-400 to-yellow-500', text: '🥇 Hạng Nhất', border: 'border-amber-300' },
              { color: 'from-slate-300 to-slate-400', text: '🥈 Hạng Nhì', border: 'border-slate-300' },
              { color: 'from-amber-600 to-orange-700', text: '🥉 Hạng Ba', border: 'border-orange-200' },
            ];
            const badge = medals[idx] || medals[2];

            return (
              <div
                key={item.id}
                className={`bg-slate-50/70 border-2 ${badge.border} rounded-2xl p-4 text-center space-y-2 relative overflow-hidden`}
              >
                <span className="text-xs font-black uppercase text-slate-600 block">
                  {badge.text}
                </span>
                <div className="font-extrabold text-base text-slate-900 truncate">
                  {item.studentName}
                </div>
                <div className="text-xs text-slate-500 font-medium">Lớp: {item.className}</div>
                <div className="pt-1 flex items-center justify-center gap-2 font-mono">
                  <span className="text-xl font-black text-orange-600">
                    {item.scoreOutOf10}/10
                  </span>
                  <span className="text-xs text-slate-400">({item.score}đ)</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Filter by class */}
      {classList.length > 1 && (
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-semibold">Lọc theo lớp:</span>
          <select
            value={selectedClassFilter}
            onChange={(e) => setSelectedClassFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-medium text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="all">Tất cả các lớp</option>
            {classList.map((c) => (
              <option key={c} value={c}>
                Lớp {c}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Bảng danh sách chi tiết */}
      <div className="overflow-x-auto">
        {filteredHistory.length === 0 ? (
          <div className="text-center py-16 text-slate-400 space-y-2">
            <Trophy className="w-12 h-12 mx-auto text-slate-300" />
            <p className="text-sm font-bold text-slate-600">Chưa có kết quả lượt thi nào</p>
            <p className="text-xs">Hãy chọn học sinh và hoàn thành vòng thi đầu tiên để ghi danh!</p>
          </div>
        ) : (
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-600 font-extrabold border-b border-slate-200">
              <tr>
                <th className="py-3 px-3.5">Học sinh</th>
                <th className="py-3 px-3.5">Lớp</th>
                <th className="py-3 px-3.5">Điểm số</th>
                <th className="py-3 px-3.5">Đúng/Tổng</th>
                <th className="py-3 px-3.5">Danh hiệu</th>
                <th className="py-3 px-3.5 text-right">Ngày thi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredHistory.map((h, i) => (
                <tr key={h.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-3.5 font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-5 text-center font-mono text-xs text-slate-400">
                      {i + 1}
                    </span>
                    <span>{h.studentName}</span>
                  </td>
                  <td className="py-3.5 px-3.5 text-slate-600 font-medium">{h.className}</td>
                  <td className="py-3.5 px-3.5 font-mono font-black text-orange-600">
                    {h.scoreOutOf10}/10{' '}
                    <span className="text-[11px] font-normal text-slate-400">({h.score}đ)</span>
                  </td>
                  <td className="py-3.5 px-3.5 text-emerald-600 font-bold">
                    {h.correctCount}/{h.totalQuestions}
                  </td>
                  <td className="py-3.5 px-3.5 text-slate-700 font-medium">
                    <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-lg text-xs">
                      {h.badge} {h.rankTitle}
                    </span>
                  </td>
                  <td className="py-3.5 px-3.5 text-right text-slate-400 text-xs">
                    {h.completedAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
