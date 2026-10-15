import type { Difficulty, Question } from '../types/game.ts';

/**
 * Calculates score for a question based on time remaining, streak multiplier, and question difficulty.
 */
export function calculateQuestionScore(
  isCorrect: boolean,
  timeLeft: number,
  timeTotal: number,
  streak: number,
  difficulty: Difficulty
): number {
  if (!isCorrect) return 0;

  // Base points by difficulty
  let basePoints = 100;
  if (difficulty === 'Thông hiểu') basePoints = 120;
  if (difficulty === 'Vận dụng') basePoints = 150;
  if (difficulty === 'Vận dụng cao') basePoints = 200;

  // Time bonus: up to 50% extra if answered fast
  let timeBonus = 0;
  if (timeTotal > 0 && timeLeft > 0) {
    const timeFraction = Math.min(1, Math.max(0, timeLeft / timeTotal));
    timeBonus = Math.round(basePoints * 0.5 * timeFraction);
  }

  // Streak bonus: +10% per streak point, max 2.0x (streak >= 10)
  const streakMultiplier = 1 + Math.min(1.0, Math.max(0, (streak - 1) * 0.1));

  return Math.round((basePoints + timeBonus) * streakMultiplier);
}

export interface Evaluation {
  scoreOutOf10: number;
  percentage: number;
  grade: 'Xuất sắc' | 'Giỏi' | 'Khá' | 'Trung bình' | 'Cần cố gắng';
  title: string;
  badge: string;
  feedbackMessage: string;
  stars: number;
}

/**
 * Evaluates the player's performance on a standard 10-point educational scale
 */
export function evaluatePerformance(correctCount: number, totalQuestions: number): Evaluation {
  if (totalQuestions <= 0) {
    return {
      scoreOutOf10: 0,
      percentage: 0,
      grade: 'Cần cố gắng',
      title: 'Học viên Nhập môn',
      badge: '🌱',
      feedbackMessage: 'Chưa hoàn thành câu hỏi nào.',
      stars: 0
    };
  }

  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const scoreOutOf10 = Math.round((correctCount / totalQuestions) * 10 * 10) / 10;

  if (scoreOutOf10 >= 9.0) {
    return {
      scoreOutOf10,
      percentage,
      grade: 'Xuất sắc',
      title: 'Kiện Tướng Nhiệt Học',
      badge: '🏆',
      feedbackMessage: 'Tuyệt đỉnh! Em đã nắm rất vững bản chất và các quy luật Nhiệt học lớp 12!',
      stars: 5
    };
  } else if (scoreOutOf10 >= 8.0) {
    return {
      scoreOutOf10,
      percentage,
      grade: 'Giỏi',
      title: 'Nhà Vật Lí Tài Năng',
      badge: '🥇',
      feedbackMessage: 'Rất tốt! Em hiểu rõ các khái niệm và công thức tính toán Chương I.',
      stars: 4
    };
  } else if (scoreOutOf10 >= 6.5) {
    return {
      scoreOutOf10,
      percentage,
      grade: 'Khá',
      title: 'Nhà Nghiên Cứu Triển Vọng',
      badge: '🥈',
      feedbackMessage: 'Khá tốt! Hãy chú ý hơn các bài toán vận dụng quy ước dấu và chuyển thể.',
      stars: 3
    };
  } else if (scoreOutOf10 >= 5.0) {
    return {
      scoreOutOf10,
      percentage,
      grade: 'Trung bình',
      title: 'Thực Tập Sinh Vật Lí',
      badge: '🥉',
      feedbackMessage: 'Đạt yêu cầu cơ bản. Cần ôn kỹ lại định nghĩa nội năng và công thức Q = mcΔt.',
      stars: 2
    };
  } else {
    return {
      scoreOutOf10,
      percentage,
      grade: 'Cần cố gắng',
      title: 'Người Tìm Hiểu Nhiệt Học',
      badge: '📚',
      feedbackMessage: 'Đừng nản lòng! Hãy đọc lại lý thuyết SGK KNTT và xem kĩ lời giải chi tiết nhé.',
      stars: 1
    };
  }
}

/**
 * Parses raw text lines into clean, trimmed, non-empty student names.
 */
export function parseStudentList(rawText: string): string[] {
  if (!rawText) return [];
  const lines = rawText.split('\n');
  const seen = new Set<string>();
  const list: string[] = [];

  for (const line of lines) {
    // Strip leading numbers like "1. ", "01 - ", etc. if teacher pasted numbered list
    const cleaned = line
      .replace(/^[\s\d]+[.)\-\s]+/, '')
      .trim();

    if (cleaned.length > 0 && !seen.has(cleaned.toLowerCase())) {
      seen.add(cleaned.toLowerCase());
      list.push(cleaned);
    }
  }

  return list;
}

/**
 * Validates a Question object for editing / adding to bank
 */
export function validateQuestion(q: Partial<Question>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!q.question || q.question.trim().length < 5) {
    errors.push('Nội dung câu hỏi phải có ít nhất 5 ký tự.');
  }

  if (!q.options || q.options.length !== 4) {
    errors.push('Câu hỏi phải có đúng 4 phương án lựa chọn A, B, C, D.');
  } else {
    for (let i = 0; i < 4; i++) {
      if (!q.options[i] || q.options[i].trim().length === 0) {
        errors.push(`Đáp án ${String.fromCharCode(65 + i)} không được để trống.`);
      }
    }
  }

  if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer > 3) {
    errors.push('Chưa chọn đáp án đúng (A, B, C hoặc D).');
  }

  if (!q.explanation || q.explanation.trim().length < 5) {
    errors.push('Vui lòng nhập lời giải chi tiết (ít nhất 5 ký tự).');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Shuffles an array deterministically without modifying original
 */
export function shuffleArray<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
