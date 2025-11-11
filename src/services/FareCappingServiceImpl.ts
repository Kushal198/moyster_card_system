import { MoysterCard, Journey } from "../entities";
import { FareCappingService } from "../interfaces";
import { Helper } from "../utils";
import MoysterCardService from "./MoysterCardService";
import { TravelSummaryService } from "../interfaces";
import TravelSummaryServiceImpl from "./TravelSummaryServiceImpl";

export default class FareCappingServiceImpl implements FareCappingService {
  // private cardService: MoysterCardService;
  private travelSummaryService: TravelSummaryService;
  constructor() {
    this.travelSummaryService = new TravelSummaryServiceImpl();
  }

  getWeeklyTotal(date: string): number {
    return this.travelSummaryService.getWeeklyTotal(date);
  }
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
  adjustFare(card: MoysterCard, journey: Journey, originalFare: number): void {
    // const dateKey = Helper.getDateKey(journey.getStartTime());
    // const weekKey = Helper.getWeekKey(journey.getStartTime());

    // const dailyCap = 120;
    // const weeklyCap = 600;
    this.travelSummaryService.updateTotals(journey);

    // const dailyTotals = this.travelSummaryService.getDailyTotal(dateKey);
    // const weeklyTotals = this.travelSummaryService.getWeeklyTotal(weekKey);
    // let adjustedFare = journey.getFarePaid();

    // if (dailyTotals > dailyCap) {
    //   const excess = dailyTotals - dailyCap;
    //   adjustedFare -= excess;
    // }

    // if (weeklyTotals > weeklyCap) {
    //   const excess = weeklyTotals - weeklyCap;
    //   adjustedFare -= excess;
    // }
  }
}
