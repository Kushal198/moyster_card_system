import { Journey, MoysterCard } from "../entities";
import FareCalculationService from "./FareCalculationService";
import { caps, getFarthestZoneRange } from "../utils";

export default class FareCappingService {
  constructor() {}

  public static adjustFare(
    card: MoysterCard,
    journey: Journey,
    originalFare: number
  ): number {
    //need to implement max fare for non-exit
    let fromZone = Math.min(
      journey.getEntryStation().getZone(),
      journey.getExitStation()?.getZone() || 0
    );
    let toZone = Math.max(
      journey.getEntryStation().getZone(),
      journey.getExitStation()?.getZone() || 0
    );
    const key: string = `${fromZone}-${toZone}`;
    const journeyDate = journey.getStartTime().toDateString();
    const totalJourney = card
      .getJourneys()
      .filter(
        (j) =>
          j.getStartTime().toDateString() === journeyDate && j.getExitStation()
      );
    const capKey = getFarthestZoneRange(totalJourney);
    let dailyCap = caps[capKey].daily;
    const totalSoFar = totalJourney
      .filter((j) => j != journey)
      .reduce((acc, j) => acc + FareCalculationService.calculateFare(j), 0);

    let adjustedFare = originalFare;

    if (totalSoFar + originalFare > dailyCap) {
      //100 + 35>120
      adjustedFare = Math.max(0, dailyCap - totalSoFar); //120-100=20 -> 35-20=15
    }
    journey.farePaid = adjustedFare;
    return adjustedFare;
  }
}
