import { test, expect } from 'vitest';

test('should handle empty arrays correctly', () => {
  const array: string[] = [];
  expect(array.length).toBe(0);
  expect(array).toEqual([]);
});
