// import { Journey, MoysterCard } from "../entities";
// import FareCalculationService from "./FareCalculationService";
// import { caps, getFarthestZoneRange, getWeekEnd, getWeekStart } from "../utils";

// export default class FareCappingService {
//   constructor() {}

//   // Monday as start of the week
//   private static getWeekStart(date: Date): Date {
//     const d = new Date(date);
//     const day = d.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
//     const diff = day === 0 ? -6 : 1 - day; // Monday as start
//     d.setDate(d.getDate() + diff);
//     d.setHours(0, 0, 0, 0); // normalize to midnight
//     return d;
//   }

//   private static getDateKey(date: Date): string {
//     return date.toISOString().split("T")[0];
//   }

//   private static getWeekKey(date: Date): string {
//     const weekStart = this.getWeekStart(date);
//     return weekStart.toISOString().split("T")[0];
//   }

//   public static adjustFare(
//     card: MoysterCard,
//     journey: Journey,
//     originalFare: number //35
//   ): void {
//     const dateKey = this.getDateKey(journey.getStartTime()); //2025-11-03
//     const weekKey = this.getWeekKey(journey.getStartTime());

//     const dailyTotal = card.dailyTotals[dateKey] || 0; //dailyTotals[2025-11-10]->0

//     const weeklyTotal = card.weeklyTotals[weekKey] || 0;

//     const dailyCap = 120;
//     // caps[getFarthestZoneRange(card.getJourneysByDate(dateKey))].daily;
//     const weeklyCap = 600;
//     // caps[getFarthestZoneRange(card.getJourneysByDate(dateKey))].weekly;
//     let adjustedFare = journey.farePaid;

//     // Apply daily cap
//     const projectedDaily = dailyTotal + adjustedFare;
//     if (projectedDaily > dailyCap) {
//       const excess = projectedDaily - dailyCap;
//       adjustedFare -= excess;
//     }

//     // Apply weekly cap
//     const projectedWeekly = weeklyTotal + adjustedFare;
//     if (projectedWeekly > weeklyCap) {
//       const excess = projectedWeekly - weeklyCap;
//       adjustedFare -= excess;
//     }

//     card.dailyTotals[dateKey] = dailyTotal + adjustedFare;
//     card.weeklyTotals[weekKey] = weeklyTotal + adjustedFare;
//     journey.farePaid = Math.max(0, adjustedFare);
//     card.deductBalance(adjustedFare);
//   }
// }
