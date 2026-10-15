import React, { useState } from 'react';
import { Download, Check, Copy, FileCode, X, Sparkles, ExternalLink } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownloadFile = () => {
    // Trigger download of the standalone HTML file that was created in the root
    const link = document.createElement('a');
    link.href = '/chinh_phuc_nhiet_hoc_vat_ly_12.html';
    link.download = 'chinh_phuc_nhiet_hoc_vat_ly_12.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    window.open('/chinh_phuc_nhiet_hoc_vat_ly_12.html', '_blank');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 w-8 h-8 rounded-full text-slate-400 hover:bg-slate-100 flex items-center justify-center cursor-pointer transition"
          aria-label="Đóng cửa sổ"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-xs">
            <FileCode className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-xl text-slate-900">
              Xuất File HTML Đơn Lẻ (Chạy Offline)
            </h3>
            <p className="text-xs text-slate-500">
              Đáp ứng yêu cầu: Toàn bộ trò chơi gộp trong đúng 1 file HTML duy nhất.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Đặc điểm của file <code className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded text-xs font-mono">chinh_phuc_nhiet_hoc_vat_ly_12.html</code>:
          </div>
          <ul className="space-y-1.5 list-disc list-inside text-slate-600 text-xs">
            <li>Gộp chung mã HTML, CSS Tailwind và JavaScript trong 1 file duy nhất.</li>
            <li>Tích hợp đầy đủ 20 câu hỏi trắc nghiệm chuẩn Chương I Vật lí 12 (KNTT).</li>
            <li>Có sẵn tính năng Quản lý danh sách lớp học và Quản lý ngân hàng câu hỏi.</li>
            <li>Có hiệu ứng âm thanh tổng hợp Web Audio API (không sợ đứt link mp3).</li>
            <li>Lưu trữ phiên chơi và danh sách bằng LocalStorage của trình duyệt.</li>
            <li>Chỉ cần nhấp đúp chuột là chạy ngay trên máy tính phòng học, tivi thông minh, máy chiếu!</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={handleDownloadFile}
            className="w-full sm:flex-1 bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-extrabold py-3.5 px-5 rounded-2xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 text-sm transition transform active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Tải File HTML Về Máy</span>
          </button>

          <button
            onClick={handleOpenInNewTab}
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Mở Trực Tiếp File HTML</span>
          </button>
        </div>
      </div>
    </div>
  );
};
