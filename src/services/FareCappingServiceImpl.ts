import { MoysterCard, Journey } from "../entities";
import { FareCappingService } from "../interfaces";
import { Helper } from "../utils";
import MoysterCardService from "./MoysterCardService";

export default class FareCappingServiceImpl implements FareCappingService {
  private dailyTotals: Record<string, number> = {};
  private weeklyTotals: Record<string, number> = {};
  adjustFare(journey: Journey): number {
    const dateKey = Helper.getDateKey(journey.getStartTime());
    const weekKey = Helper.getWeekKey(journey.getStartTime());
    let dailyTotal = (this.dailyTotals[dateKey] =
      this.dailyTotals[dateKey] || 0);

    let weeklyTotal = (this.weeklyTotals[weekKey] =
      this.weeklyTotals[weekKey] || 0);
    let adjustedFare = journey.getFarePaid();
    const dailyCap = 120;
    const weeklyCap = 600;
    // Apply daily cap
    const projectedDaily = dailyTotal + adjustedFare;
    if (projectedDaily > dailyCap) {
      const excess = projectedDaily - dailyCap;
      adjustedFare -= excess;
    }

    // Apply weekly cap
    const projectedWeekly = weeklyTotal + adjustedFare;
    if (projectedWeekly > weeklyCap) {
      const excess = projectedWeekly - weeklyCap;
      adjustedFare -= excess;
    }

    this.dailyTotals[dateKey] = dailyTotal + adjustedFare;
    this.weeklyTotals[weekKey] = weeklyTotal + adjustedFare;
    journey.setFare(Math.max(0, adjustedFare));
    return Math.max(0, adjustedFare);
  }

  getDailyTotal(dateKey: string): number {
    return this.dailyTotals[dateKey] ?? 0;
  }

  getWeeklyTotal(weekKey: string): number {
    return this.weeklyTotals[weekKey] ?? 0;
  }
}
