import { Journey, MoysterCard } from "../entities";
import FareCalculationService from "./FareCalculationService";
import { caps, getFarthestZoneRange, getWeekEnd, getWeekStart } from "../utils";

export default class FareCappingService {
  constructor() {}

  public static applyDailyCap(
    card: MoysterCard,
    journey: Journey,
    originalFare: number
  ): number {
    const journeyDate = journey.getStartTime().toDateString();

    // const totalJourneys = card
    //   .getJourneys()
    //   .filter(
    //     (j) =>
    //       j.getStartTime().toDateString() === journeyDate && j.getExitStation()
    //   );
    const totalJourneys = card
      .getJourneysByDate(journeyDate)
      .filter(
        (j) =>
          j.getStartTime().toDateString() === journeyDate && j.getExitStation()
      );

    const capKey = getFarthestZoneRange(totalJourneys);
    const dailyCap = caps[capKey].daily;

    const totalSoFar = totalJourneys
      .filter((j) => j !== journey)
      .reduce((acc, j) => acc + (j.farePaid ?? 0), 0);

    let adjustedFare = originalFare;
    if (totalSoFar + originalFare > dailyCap) {
      adjustedFare = Math.max(0, dailyCap - totalSoFar);
    }

    return adjustedFare;
  }

  public static applyWeeklyCap(
    card: MoysterCard,
    journey: Journey,
    adjustedFare: number
  ) {
    const weekStart = getWeekStart(journey.getStartTime());
    const weekEnd = getWeekEnd(weekStart);

    // const weekJourneys = card.getJourneys().filter((j) => {
    //   const d = j.getStartTime();
    //   return d >= weekStart && d <= weekEnd && j.getExitStation();
    // });
    const journeyDate = journey.getStartTime().toDateString();
    const weekJourneys = card.getJourneysByDate(journeyDate).filter((j) => {
      const d = j.getStartTime();
      return d >= weekStart && d <= weekEnd && j.getExitStation();
    });

    const capKey = getFarthestZoneRange(weekJourneys);
    const weeklyCap = caps[capKey].weekly;

    const totalWeekSoFar = weekJourneys
      .filter((j) => j !== journey)
      .reduce((acc, j) => acc + (j.farePaid ?? 0), 0);

    if (totalWeekSoFar + adjustedFare > weeklyCap) {
      return Math.max(0, weeklyCap - totalWeekSoFar);
    }

    return adjustedFare;
  }

  public static adjustFare(
    card: MoysterCard,
    journey: Journey,
    originalFare: number
  ): number {
    // 🔹 Step 1: Apply daily cap
    let dailyAdjustedFare = this.applyDailyCap(card, journey, originalFare);

    // 🔹 Step 2: Apply weekly cap (based on same card + journey)
    const finalAdjustedFare = this.applyWeeklyCap(
      card,
      journey,
      dailyAdjustedFare
    );

    // 🔹 Step 3: Store fare and return
    journey.farePaid = finalAdjustedFare;
    return finalAdjustedFare;
  }
}
