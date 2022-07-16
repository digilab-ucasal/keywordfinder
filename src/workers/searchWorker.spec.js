import { describe, expect, it } from 'vitest';
import { getKeywordsFromText, getTokensFromText, mapKeywordsWithCounter } from './searchWorker';

describe('keywordfinder', () => {
  const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  const keywords = 'dolor, dolore, in';

  const keywordsWithCounter = mapKeywordsWithCounter(getKeywordsFromText(keywords), getTokensFromText(text));

  it('expects to find 2 occurrences for "dolor"', () => {
    expect(keywordsWithCounter['dolor']).toEqual(2);
  });

  it('expects to find 2 occurrences for "dolore"', () => {
    expect(keywordsWithCounter['dolore']).toEqual(2);
  });

  it('expects to find 3 occurrences for "in"', () => {
    expect(keywordsWithCounter['in']).toEqual(3);
  });
});
