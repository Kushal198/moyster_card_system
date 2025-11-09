/**
 * Utils Directory
 *
 * This directory contains utility functions and helper methods.
 * These are reusable, pure functions that don't belong to a specific domain.
 */
type hoursMap = {
  peak: number;
  nonPeak: number;
};

const fares: Record<string, hoursMap> = {
  "1-1": { peak: 30, nonPeak: 25 },
  "1-2": { peak: 35, nonPeak: 30 },
  "2-2": { peak: 25, nonPeak: 20 },
};

const peakHours: Record<string, Record<string, number>[]> = {
  weekday: [
    { start: 7, end: 10 },
    { start: 17, end: 20 },
  ],
  weekend: [
    { start: 9, end: 11 },
    { start: 18, end: 22 },
  ],
};
export { fares, peakHours };
