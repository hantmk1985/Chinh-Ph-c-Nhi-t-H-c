import React, { useState } from 'react';
import { Difficulty, Question } from '../types/game.ts';
import { TOPIC_LIST } from '../data/defaultQuestions.ts';
import { validateQuestion } from '../game/rules.ts';
import {
  BookOpen,
  Plus,
  RotateCcw,
  Search,
  CheckCircle,
  Trash2,
  X,
  HelpCircle,
  FileQuestion,
  Sparkles,
} from 'lucide-react';

interface QuestionManagerProps {
  questions: Question[];
  onUpdateQuestions: (updated: Question[]) => void;
  onResetQuestions: () => void;
}

export const QuestionManager: React.FC<QuestionManagerProps> = ({
  questions,
  onUpdateQuestions,
  onResetQuestions,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New question form state
  const [formTopic, setFormTopic] = useState('Định luật I NĐTĐH');
  const [formDifficulty, setFormDifficulty] = useState<Difficulty>('Thông hiểu');
  const [formContent, setFormContent] = useState('');
  const [formOptions, setFormOptions] = useState<[string, string, string, string]>([
    '',
    '',
    '',
    '',
  ]);
  const [formCorrectAnswer, setFormCorrectAnswer] = useState<number>(0);
  const [formExplanation, setFormExplanation] = useState('');
  const [formErrors, setFormErrors] = useState<string[]>([]);

  // Filtered list
  const filteredQuestions = questions.filter((q) => {
    const matchSearch =
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.explanation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDiff = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    const matchTopic = selectedTopic === 'all' || q.topic === selectedTopic;
    return matchSearch && matchDiff && matchTopic;
  });

  const handleOpenModal = () => {
    setFormTopic('Định luật I NĐTĐH');
    setFormDifficulty('Thông hiểu');
    setFormContent('');
    setFormOptions(['', '', '', '']);
    setFormCorrectAnswer(0);
    setFormExplanation('');
    setFormErrors([]);
    setIsModalOpen(true);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    const newQ: Question = {
      id: `custom-${Date.now()}`,
      topic: formTopic.trim() || 'Vật lí nhiệt',
      difficulty: formDifficulty,
      question: formContent.trim(),
      options: [
        formOptions[0].trim(),
        formOptions[1].trim(),
        formOptions[2].trim(),
        formOptions[3].trim(),
      ],
      correctAnswer: formCorrectAnswer,
      explanation: formExplanation.trim(),
      isCustom: true,
    };

    const validation = validateQuestion(newQ);
    if (!validation.valid) {
      setFormErrors(validation.errors);
      return;
    }

    const updated = [newQ, ...questions];
    onUpdateQuestions(updated);
    setIsModalOpen(false);
  };

  const handleDeleteQuestion = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) {
      const updated = questions.filter((q) => q.id !== id);
      onUpdateQuestions(updated);
    }
  };

  const handleOptionChange = (idx: number, val: string) => {
    const nextOpts: [string, string, string, string] = [...formOptions];
    nextOpts[idx] = val;
    setFormOptions(nextOpts);
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

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-lg">
              <BookOpen className="w-5 h-5" />
            </span>
            Ngân Hàng Câu Hỏi Nhiệt Học (Vật Lí 12 KNTT)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tổng cộng: <strong className="text-slate-800">{questions.length} câu hỏi</strong> • Tích hợp sẵn 20 câu bám sát chương trình và cho phép giáo viên bổ sung linh hoạt.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenModal}
            className="bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 shadow-sm transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Câu Hỏi</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Khôi phục lại danh sách 20 câu hỏi chuẩn ban đầu?')) {
                onResetQuestions();
              }
            }}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            title="Khôi phục 20 câu mặc định"
            aria-label="Khôi phục ngân hàng câu hỏi"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bộ lọc & Tìm kiếm */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm nội dung, chủ đề, lời giải..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none cursor-pointer"
        >
          <option value="all">Tất cả độ khó</option>
          <option value="Nhận biết">Nhận biết</option>
          <option value="Thông hiểu">Thông hiểu</option>
          <option value="Vận dụng">Vận dụng</option>
          <option value="Vận dụng cao">Vận dụng cao</option>
        </select>

        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none cursor-pointer max-w-[200px]"
        >
          {TOPIC_LIST.map((t) => (
            <option key={t} value={t === 'Tất cả chủ đề' ? 'all' : t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Danh sách câu hỏi */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200/60">
            <FileQuestion className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-600">Không tìm thấy câu hỏi phù hợp bộ lọc</p>
            <p className="text-xs text-slate-400 mt-1">Hãy thử đổi từ khóa hoặc độ khó tìm kiếm.</p>
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const labels = ['A', 'B', 'C', 'D'];
            return (
              <div
                key={q.id}
                className="bg-slate-50/60 hover:bg-white rounded-2xl border border-slate-200 p-5 transition space-y-3 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-200/80 text-slate-700 font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-orange-100 text-orange-700 border border-orange-200">
                      {q.topic}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-md border ${getDifficultyBadge(q.difficulty)}`}>
                      {q.difficulty}
                    </span>
                    {q.isCustom && (
                      <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Tự tạo
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition cursor-pointer"
                    title="Xóa câu hỏi này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Nội dung câu hỏi */}
                <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {q.question}
                </h4>

                {/* 4 Lựa chọn */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  {q.options.map((opt, i) => {
                    const isCorrect = i === q.correctAnswer;
                    return (
                      <div
                        key={i}
                        className={`p-2.5 rounded-xl border flex items-start gap-2.5 ${
                          isCorrect
                            ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-semibold'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                            isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {labels[i]}
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Lời giải chi tiết */}
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong className="text-slate-900">Lời giải chi tiết:</strong> {q.explanation}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal Thêm Câu Hỏi Mới */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 max-h-[92vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-orange-500" />
                Thêm Câu Hỏi Mới Vào Ngân Hàng
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full text-slate-400 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formErrors.length > 0 && (
              <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-xs text-rose-700 space-y-1">
                {formErrors.map((err, i) => (
                  <div key={i}>• {err}</div>
                ))}
              </div>
            )}

            <form onSubmit={handleSaveQuestion} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Chủ đề:
                  </label>
                  <input
                    type="text"
                    value={formTopic}
                    onChange={(e) => setFormTopic(e.target.value)}
                    placeholder="Ví dụ: Định luật I NĐTĐH"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mức độ phân hóa:
                  </label>
                  <select
                    value={formDifficulty}
                    onChange={(e) => setFormDifficulty(e.target.value as Difficulty)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none font-medium cursor-pointer"
                  >
                    <option value="Nhận biết">Nhận biết</option>
                    <option value="Thông hiểu">Thông hiểu</option>
                    <option value="Vận dụng">Vận dụng</option>
                    <option value="Vận dụng cao">Vận dụng cao</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nội dung câu hỏi:
                </label>
                <textarea
                  rows={3}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Nhập nội dung câu hỏi trắc nghiệm..."
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              {/* 4 phương án */}
              <div className="space-y-2.5">
                <label className="block text-xs font-semibold text-slate-700">
                  4 Phương án lựa chọn (Tích chọn tròn phương án ĐÚNG):
                </label>
                {(['A', 'B', 'C', 'D'] as const).map((letter, i) => (
                  <div key={letter} className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="correct-opt"
                      checked={formCorrectAnswer === i}
                      onChange={() => setFormCorrectAnswer(i)}
                      className="w-4 h-4 text-orange-600 focus:ring-orange-500 cursor-pointer"
                      id={`radio-opt-${i}`}
                    />
                    <label
                      htmlFor={`radio-opt-${i}`}
                      className="w-6 font-bold text-slate-700 text-xs sm:text-sm cursor-pointer"
                    >
                      {letter}.
                    </label>
                    <input
                      type="text"
                      value={formOptions[i]}
                      onChange={(e) => handleOptionChange(i, e.target.value)}
                      placeholder={`Nội dung phương án ${letter}`}
                      required
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lời giải chi tiết ngắn gọn:
                </label>
                <textarea
                  rows={2}
                  value={formExplanation}
                  onChange={(e) => setFormExplanation(e.target.value)}
                  placeholder="Giải thích lý do khoa học tại sao phương án đó là đáp án đúng..."
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-xs transition cursor-pointer"
                >
                  Lưu Câu Hỏi Vào Ngân Hàng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
