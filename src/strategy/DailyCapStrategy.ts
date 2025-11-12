import { Journey } from "../entities";
import { capMap, Helper } from "../utils";
import { Strategy } from "./Strategy";

export class DailyCapStrategy implements Strategy {
  private totals: Record<string, number> = {};
  private cap = 120; //default

  applyCap(journey: Journey, currentFare: number, fareCap?: capMap): number {
    const key = Helper.getDateKey(journey.getStartTime());
    this.cap = fareCap?.daily ?? this.cap;

    const total = this.totals[key] ?? 0;
    let adjusted = currentFare;

    if (total + adjusted > this.cap) {
      adjusted -= total + adjusted - this.cap;
    }

    this.totals[key] = total + adjusted;
    return adjusted;
  }
}
