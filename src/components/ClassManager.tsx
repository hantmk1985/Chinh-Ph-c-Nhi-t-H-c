import React, { useState } from 'react';
import { ClassGroup } from '../types/game.ts';
import { parseStudentList } from '../game/rules.ts';
import { Users, Plus, Trash2, Save, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';

interface ClassManagerProps {
  classes: ClassGroup[];
  selectedClassId: string;
  onSelectClass: (classId: string) => void;
  onUpdateClasses: (updated: ClassGroup[]) => void;
}

export const ClassManager: React.FC<ClassManagerProps> = ({
  classes,
  selectedClassId,
  onSelectClass,
  onUpdateClasses,
}) => {
  const currentClass = classes.find((c) => c.id === selectedClassId) || classes[0];
  const [textareaValue, setTextareaValue] = useState<string>(
    currentClass ? currentClass.students.join('\n') : ''
  );
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [newClassName, setNewClassName] = useState<string>('');
  const [isAddingClass, setIsAddingClass] = useState<boolean>(false);

  // Sync textarea when selected class changes
  React.useEffect(() => {
    if (currentClass) {
      setTextareaValue(currentClass.students.join('\n'));
      setFeedbackMsg(null);
    }
  }, [currentClass?.id]);

  const handleSaveStudents = () => {
    if (!currentClass) return;
    const cleaned = parseStudentList(textareaValue);
    const updated = classes.map((c) =>
      c.id === currentClass.id ? { ...c, students: cleaned } : c
    );
    onUpdateClasses(updated);
    setFeedbackMsg(`Đã cập nhật thành công ${cleaned.length} học sinh cho lớp ${currentClass.name}!`);
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newClassName.trim();
    if (!trimmed) return;

    const newClass: ClassGroup = {
      id: `class-${Date.now()}`,
      name: trimmed,
      students: [],
    };
    const updated = [...classes, newClass];
    onUpdateClasses(updated);
    onSelectClass(newClass.id);
    setNewClassName('');
    setIsAddingClass(false);
  };

  const handleDeleteClass = (classId: string) => {
    if (classes.length <= 1) {
      alert('Hệ thống cần duy trì ít nhất một lớp học.');
      return;
    }
    const toDelete = classes.find((c) => c.id === classId);
    if (!toDelete) return;
    if (window.confirm(`Bạn có chắc chắn muốn xóa lớp ${toDelete.name}?`)) {
      const updated = classes.filter((c) => c.id !== classId);
      onUpdateClasses(updated);
      if (selectedClassId === classId) {
        onSelectClass(updated[0].id);
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-lg">
              <Users className="w-5 h-5" />
            </span>
            Quản Lý Danh Sách Lớp Học
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Giáo viên có thể thêm lớp mới, chỉnh sửa hoặc dán danh sách học sinh từ file Word/Excel để học sinh chọn tên khi thi đấu.
          </p>
        </div>

        <button
          onClick={() => setIsAddingClass(!isAddingClass)}
          className="bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 shadow-sm transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Lớp Mới</span>
        </button>
      </div>

      {/* Form tạo lớp mới */}
      {isAddingClass && (
        <form onSubmit={handleCreateClass} className="bg-orange-50/70 border border-orange-200 p-4 rounded-2xl flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
            placeholder="Nhập tên lớp (Ví dụ: 12A3, 12 Tin, ...)"
            className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
            autoFocus
          />
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold py-2 px-4 rounded-xl shadow-xs transition cursor-pointer"
          >
            Tạo Lớp
          </button>
          <button
            type="button"
            onClick={() => setIsAddingClass(false)}
            className="text-xs font-semibold text-slate-500 hover:text-slate-700 px-3 py-2 cursor-pointer"
          >
            Hủy
          </button>
        </form>
      )}

      {/* Grid 2 cột: Danh sách lớp & Chi tiết học sinh */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cột 1: Danh sách các lớp */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 px-1 mb-2">
            Danh sách lớp ({classes.length})
          </label>
          <div className="space-y-2">
            {classes.map((cls) => {
              const isSelected = cls.id === currentClass?.id;
              return (
                <div
                  key={cls.id}
                  onClick={() => onSelectClass(cls.id)}
                  className={`w-full p-3.5 rounded-2xl border text-left cursor-pointer transition flex items-center justify-between group ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50/70 text-slate-900 font-bold shadow-2xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <UserCheck className={`w-4 h-4 ${isSelected ? 'text-orange-600' : 'text-slate-400'}`} />
                    <span className="text-sm">{cls.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {cls.students.length} HS
                    </span>
                    {classes.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClass(cls.id);
                        }}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded-md opacity-0 group-hover:opacity-100 transition cursor-pointer"
                        title="Xóa lớp này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cột 2 & 3: Nhập dán danh sách học sinh */}
        <div className="md:col-span-2 bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Lớp: <span className="text-orange-600">{currentClass?.name}</span>
              </h3>
              <p className="text-xs text-slate-500">
                Hiện có {currentClass?.students.length || 0} học sinh trong danh sách.
              </p>
            </div>
            <button
              onClick={handleSaveStudents}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold py-2 px-4 rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Lưu Danh Sách</span>
            </button>
          </div>

          {feedbackMsg && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm p-3 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{feedbackMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Dán danh sách họ và tên học sinh (Mỗi bạn một dòng):</span>
              <span className="text-[11px] text-slate-400 font-normal">Hỗ trợ dán trực tiếp từ Excel</span>
            </label>
            <textarea
              rows={9}
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              placeholder="1. Nguyễn Hoàng An&#10;2. Trần Minh Anh&#10;3. Lê Tuấn Bảo&#10;4. Phạm Thu Cúc..."
              className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono leading-relaxed"
            />
            <div className="flex items-start gap-1.5 mt-2 text-[11px] text-slate-500">
              <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>
                Hệ thống tự động loại bỏ số thứ tự ở đầu dòng (như "1. ", "02 - "), loại bỏ khoảng trắng thừa và tự lọc các tên trùng lặp.
              </span>
            </div>
          </div>

          {/* Xem trước một số học sinh */}
          {currentClass && currentClass.students.length > 0 && (
            <div className="pt-2 border-t border-slate-200/60">
              <span className="text-xs font-semibold text-slate-600 block mb-2">
                Xem nhanh danh sách học sinh đã lưu ({currentClass.students.length}):
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                {currentClass.students.map((st, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-xs bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg shadow-2xs"
                  >
                    <span className="text-[10px] text-slate-400 font-mono font-bold">{i + 1}.</span>
                    {st}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
