import { Journey } from "../entities";
import { fares, peakHours } from "../utils";

export default class FareCalculationService {
  constructor() {}

  public calculateFare(journey: Journey): number {
    if (!journey.getExitStation()) {
      throw new Error("Journey is not complete");
    }
    const fromZone = journey.getEntryStation().getZone();
    const toZone = journey.getExitStation()?.getZone();
    const key: string = `${fromZone}-${toZone}`;
    const date = journey.getStartTime();

    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;
    const dayType = isWeekend ? "weekend" : "weekday";

    const hours = date.getHours();
    //8>7 && 8<10
    const isPeak =
      (hours >= peakHours[dayType][0]["start"] &&
        hours <= peakHours[dayType][0]["end"]) ||
      (hours >= peakHours[dayType][1]["start"] &&
        hours <= peakHours[dayType][1]["end"]);

    console.log(isPeak);

    return isPeak ? fares[key].peak : fares[key].nonPeak;
  }
}
