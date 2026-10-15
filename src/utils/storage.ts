import { ClassGroup, GameResultData, Question } from '../types/game.ts';
import { DEFAULT_QUESTIONS } from '../data/defaultQuestions.ts';

const STORAGE_KEYS = {
  QUESTIONS: 'cpnh_questions_v1',
  CLASSES: 'cpnh_classes_v1',
  SELECTED_CLASS_ID: 'cpnh_selected_class_id_v1',
  SELECTED_STUDENT: 'cpnh_selected_student_v1',
  HISTORY: 'cpnh_history_v1'
};

const DEFAULT_CLASSES: ClassGroup[] = [
  {
    id: 'class-12a1',
    name: '12A1',
    students: [
      'Nguyễn Hoàng An',
      'Trần Minh Anh',
      'Lê Tuấn Bảo',
      'Phạm Thu Cúc',
      'Vũ Tiến Đạt',
      'Đặng Thùy Dương',
      'Bùi Gia Huy',
      'Đỗ Mai Khanh',
      'Ngô Hoàng Long',
      'Lý Thanh Mai'
    ]
  },
  {
    id: 'class-12a2',
    name: '12A2',
    students: [
      'Trịnh Quốc Bảo',
      'Võ Hải Đăng',
      'Hà Thảo My',
      'Nguyễn Nhật Nam',
      'Phan Khánh Linh'
    ]
  },
  {
    id: 'class-12-ly',
    name: '12 Chuyên Vật Lí',
    students: [
      'Lê Quang Huy',
      'Nguyễn Minh Khôi',
      'Trần Phương Linh',
      'Phạm Tuấn Kiệt'
    ]
  }
];

export function getStoredQuestions(): Question[] {
  if (typeof window === 'undefined') return DEFAULT_QUESTIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(DEFAULT_QUESTIONS));
      return DEFAULT_QUESTIONS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error('Failed to read questions from localStorage:', err);
  }
  return DEFAULT_QUESTIONS;
}

export function saveStoredQuestions(questions: Question[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
  } catch (err) {
    console.error('Failed to save questions to localStorage:', err);
  }
}

export function resetQuestionsToDefault(): Question[] {
  try {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(DEFAULT_QUESTIONS));
  } catch (err) {
    console.error('Failed to reset questions:', err);
  }
  return DEFAULT_QUESTIONS;
}

export function getStoredClasses(): ClassGroup[] {
  if (typeof window === 'undefined') return DEFAULT_CLASSES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CLASSES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(DEFAULT_CLASSES));
      return DEFAULT_CLASSES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error('Failed to read classes from localStorage:', err);
  }
  return DEFAULT_CLASSES;
}

export function saveStoredClasses(classes: ClassGroup[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CLASSES, JSON.stringify(classes));
  } catch (err) {
    console.error('Failed to save classes to localStorage:', err);
  }
}

export function getStoredHistory(): GameResultData[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to read history:', err);
    return [];
  }
}

export function saveResultToHistory(result: GameResultData): void {
  try {
    const history = getStoredHistory();
    const updated = [result, ...history].slice(0, 100); // keep last 100 plays
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save result:', err);
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  } catch (err) {
    console.error('Failed to clear history:', err);
  }
}
