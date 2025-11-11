import { Journey } from "../entities";
import { FareCappingService } from "../interfaces";
import { WeeklyCapStrategy } from "../strategy";
import { Strategy } from "../strategy/Strategy";

export default class FareCappingServiceV2Impl implements FareCappingService {
  constructor(private strategies: Strategy[]) {}

  adjustFare(journey: Journey, baseFare: number): number {
    let adjustedFare = baseFare;
    for (const strategy of this.strategies) {
      adjustedFare = strategy.applyCap(journey, adjustedFare);
    }
    journey.setFare(adjustedFare);
    return adjustedFare;
  }
}
