import { Journey } from "../entities";

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

type capMap = {
  daily: number;
  weekly: number;
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

const caps: Record<string, capMap> = {
  "1-1": { daily: 100, weekly: 500 },
  "1-2": { daily: 120, weekly: 600 },
  "2-2": { daily: 80, weekly: 400 },
};

function getFarthestZoneRange(journeys: Journey[]): string {
  let maxRange = [1, 1];

  for (const j of journeys) {
    const from = j.getEntryStation().getZone();
    const to = j.getExitStation()?.getZone() ?? from;
    const low = Math.min(from, to);
    const high = Math.max(from, to);

    if (high > maxRange[1]) maxRange = [low, high];
  }

  return `${maxRange[0]}-${maxRange[1]}`;
}

export { fares, peakHours, caps, getFarthestZoneRange };
