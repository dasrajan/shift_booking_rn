import dayjs from 'dayjs';
import {
  isToday,
  isTomorrow,
  minutesToTime,
  timeDiffBetween,
} from './helper';

test('Is timestamp today', () => {
  expect(isToday(dayjs(new Date()))).toBe(true);
});

test('Is timestamp today', () => {
  expect(isToday(dayjs(new Date('December 17, 1995 03:24:00')))).toBe(false);
});

test('Is timestamp tomorrow', () => {
  expect(isTomorrow(dayjs(Date.now()).add(1, 'day'))).toBe(true);
});

test('Is timestamp tomorrow', () => {
  expect(isTomorrow(dayjs(new Date('December 17, 1995 03:24:00')))).toBe(false);
});

test('Difference between 2 timestamps is calculated', () => {
  expect(timeDiffBetween(1579950000000, 1579957200000)).toBe(120); // January 23rd 12h - January 23rd 14h
});

test('Minutes are converted to "{hours} and {minutes} min" format', () => {
  expect(minutesToTime(125)).toBe('2 h and 5 min');
});
