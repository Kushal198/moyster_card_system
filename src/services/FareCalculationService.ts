import { Journey } from "../entities";
import { fares, isPeak, peakHours } from "../utils";

export default class FareCalculationService {
  constructor() {}

  public static calculateFare(journey: Journey): number {
    if (!journey.getExitStation()) {
      throw new Error("Journey is not complete");
    }

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
    const date = journey.getStartTime();

    return isPeak(date) ? fares[key].peak : fares[key].nonPeak;
  }
}
