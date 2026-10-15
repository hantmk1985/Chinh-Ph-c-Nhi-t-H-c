import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateQuestionScore,
  evaluatePerformance,
  parseStudentList,
  validateQuestion,
  shuffleArray
} from './rules.ts';

test('calculateQuestionScore returns 0 when answer is incorrect', () => {
  const score = calculateQuestionScore(false, 15, 20, 1, 'Nhận biết');
  assert.equal(score, 0);
});

test('calculateQuestionScore computes base and time bonus for correct answer', () => {
  // With 20s left out of 20s, time bonus is max (50% of 100 = 50), streak = 1 -> 150
  const score = calculateQuestionScore(true, 20, 20, 1, 'Nhận biết');
  assert.equal(score, 150);

  // Vận dụng cao base is 200, time = 0, streak = 1 -> 200
  const hardScore = calculateQuestionScore(true, 0, 20, 1, 'Vận dụng cao');
  assert.equal(hardScore, 200);

  // Streak bonus multiplier
  const streakScore = calculateQuestionScore(true, 0, 0, 3, 'Nhận biết');
  // streak = 3 -> multiplier = 1 + 0.2 = 1.2 -> 100 * 1.2 = 120
  assert.equal(streakScore, 120);
});

test('evaluatePerformance gives correct grade and title', () => {
  const excellent = evaluatePerformance(19, 20);
  assert.equal(excellent.grade, 'Xuất sắc');
  assert.equal(excellent.scoreOutOf10, 9.5);
  assert.equal(excellent.stars, 5);

  const good = evaluatePerformance(16, 20);
  assert.equal(good.grade, 'Giỏi');
  assert.equal(good.scoreOutOf10, 8.0);

  const pass = evaluatePerformance(10, 20);
  assert.equal(pass.grade, 'Trung bình');
  assert.equal(pass.scoreOutOf10, 5.0);

  const fail = evaluatePerformance(4, 20);
  assert.equal(fail.grade, 'Cần cố gắng');
});

test('parseStudentList parses lines, strips numbers and deduplicates', () => {
  const raw = `
  1. Nguyễn Văn An
  2 - Trần Thị Bình
  Lê Hoàng Cúc
  nguyễn văn an
  04. Đỗ Minh Đức
  `;

  const parsed = parseStudentList(raw);
  assert.equal(parsed.length, 4);
  assert.equal(parsed[0], 'Nguyễn Văn An');
  assert.equal(parsed[1], 'Trần Thị Bình');
  assert.equal(parsed[2], 'Lê Hoàng Cúc');
  assert.equal(parsed[3], 'Đỗ Minh Đức');
});

test('validateQuestion rejects incomplete questions and accepts valid ones', () => {
  const invalid = validateQuestion({
    question: 'Ngắn',
    options: ['A', '', 'C', 'D'],
    correctAnswer: 5,
    explanation: ''
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.length >= 3);

  const valid = validateQuestion({
    question: 'Hệ thức định luật I NĐTĐH là gì?',
    options: ['ΔU = A + Q', 'ΔU = A - Q', 'Q = mcΔt', 'Q = λm'],
    correctAnswer: 0,
    explanation: 'Hệ thức đúng là ΔU = A + Q theo SGK Vật lí 12.'
  });
  assert.equal(valid.valid, true);
  assert.equal(valid.errors.length, 0);
});

test('shuffleArray returns all elements without losing any', () => {
  const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const shuffled = shuffleArray(original);
  assert.equal(shuffled.length, original.length);
  assert.deepEqual([...shuffled].sort((a, b) => a - b), original);
});
