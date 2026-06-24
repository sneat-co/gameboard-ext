import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { fold, inBonus, order, type GameEvent, type GameState } from './eventtimeline.js';

interface ParityCase {
  name: string;
  events: GameEvent[];
  expected: GameState;
}

const fixtureUrl = new URL('../../parity/parity.json', import.meta.url);
const cases: ParityCase[] = JSON.parse(readFileSync(fileURLToPath(fixtureUrl), 'utf8'));

describe('cross-language reducer parity (Go ↔ TS via parity.json)', () => {
  it('fixture is non-empty', () => {
    expect(cases.length).toBeGreaterThan(0);
  });

  for (const c of cases) {
    it(`folds "${c.name}" to the same state as the Go reducer`, () => {
      expect(fold(c.events)).toEqual(c.expected);
    });
  }
});

describe('reducer unit behaviour', () => {
  it('orders by wallClock then eventID and dedupes by eventID', () => {
    const ev = (eventID: string, wallClockMs: number): GameEvent => ({
      eventID, wallClockMs, type: 'score', source: 'scorekeeper', period: 0, gameClockMs: 0,
    });
    const ordered = order([ev('b', 10), ev('a', 10), ev('c', 5), ev('a', 10)]);
    expect(ordered.map((e) => e.eventID)).toEqual(['c', 'a', 'b']);
  });

  it('inBonus flips when opponent reaches the foul limit', () => {
    const s = fold([
      { eventID: 'f1', type: 'team-foul', source: 'scorekeeper', wallClockMs: 1, period: 0, gameClockMs: 0, side: 'home' },
      { eventID: 'f2', type: 'team-foul', source: 'scorekeeper', wallClockMs: 2, period: 0, gameClockMs: 0, side: 'home' },
    ]);
    expect(inBonus(s, 'away', 2)).toBe(true);
    expect(inBonus(s, 'home', 2)).toBe(false);
  });
});
