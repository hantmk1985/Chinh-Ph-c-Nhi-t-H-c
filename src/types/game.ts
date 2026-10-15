export type Difficulty = 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao';

export interface Question {
  id: string;
  topic: string;
  difficulty: Difficulty;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0 for A, 1 for B, 2 for C, 3 for D
  explanation: string;
  isCustom?: boolean;
}

export interface ClassGroup {
  id: string;
  name: string;
  students: string[];
}

export type GameMode = 'timed' | 'practice' | 'survival';

export interface GameSettings {
  timePerQuestion: number; // in seconds (e.g. 20, 30, 45, 0 for infinite)
  questionCount: number; // how many questions to play
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  soundEnabled: boolean;
  gameMode: GameMode;
}

export interface AnswerRecord {
  questionId: string;
  questionText: string;
  options: string[];
  userAnswer: number | null; // index chosen, or null if timed out
  correctAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
  explanation: string;
  topic: string;
}

export interface GameResultData {
  id: string;
  studentName: string;
  className: string;
  score: number;
  maxScore: number;
  scoreOutOf10: number;
  correctCount: number;
  totalQuestions: number;
  timeSpentTotal: number;
  maxStreak: number;
  completedAt: string;
  answers: AnswerRecord[];
  gameMode: GameMode;
  rankTitle: string;
  badge: string;
}
