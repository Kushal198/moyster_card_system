import { Journey } from "../entities";
import { capMap, Helper } from "../utils";
import { Strategy } from "./Strategy";

export class WeeklyCapStrategy implements Strategy {
  private totals: Record<string, number> = {};
  private cap = 600;

  applyCap(journey: Journey, currentFare: number, fareCap?: capMap): number {
    const key = Helper.getWeekKey(journey.getStartTime());
    this.cap = fareCap?.weekly ?? this.cap;
    const total = this.totals[key] ?? 0;
    let adjusted = currentFare;

    if (total + adjusted > this.cap) {
      adjusted -= total + adjusted - this.cap;
    }

    this.totals[key] = total + adjusted;
    return adjusted;
  }
}
