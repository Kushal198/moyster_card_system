import { Journey } from "../entities";

export interface TravelSummaryService {
  updateTotals(journey: Journey): void;
  getDailyTotal(dateKey: string): number;
  getWeeklyTotal(weekKey: string): number;
}
