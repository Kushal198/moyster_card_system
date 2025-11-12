import { Journey, MoysterCard } from "../entities";
import { Helper } from "./Helper";
import { PeakHourRule } from "./PeakHourRule";

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

const peakHours: Record<string, Record<string, string>[]> = {
  weekday: [
    { start: "07:00", end: "10:30" },
    { start: "17:00", end: "20:00" },
  ],
  weekend: [
    { start: "09:00", end: "11:00" },
    { start: "18:00", end: "22:00" },
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
    const from = j.getEntryStation().getZone().getId();
    const to = j.getExitStation()?.getZone().getId() ?? from;
    const low = Math.min(from, to);
    const high = Math.max(from, to);

    if (high > maxRange[1]) maxRange = [low, high];
  }

  return `${maxRange[0]}-${maxRange[1]}`;
}

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getWeekEnd(weekStart: Date): Date {
  const end = new Date(weekStart);
  end.setDate(weekStart.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
}

// private getDateKey(date: Date): string {
//   return date.toISOString().split("T")[0];
// }
function getTotalChargedForWeek(card: MoysterCard, weekKey: string) {
  return card
    .getAllJourneys()
    .filter((j) => Helper.getWeekKey(j.getStartTime()) === weekKey)
    .reduce((sum, j) => sum + (j.getFarePaid() ?? 0), 0);
}

export {
  fares,
  peakHours,
  caps,
  capMap,
  getFarthestZoneRange,
  getWeekStart,
  getWeekEnd,
  Helper,
  PeakHourRule,
  getTotalChargedForWeek,
};
