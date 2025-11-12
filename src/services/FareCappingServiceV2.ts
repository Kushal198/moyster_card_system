import { Journey, MoysterCard } from "../entities";
import { FareCappingService } from "../interfaces";
import { WeeklyCapStrategy } from "../strategy";
import { Strategy } from "../strategy/Strategy";
import { capMap, caps, getFarthestZoneRange, Helper } from "../utils";

export default class FareCappingServiceV2Impl implements FareCappingService {
  constructor(private strategies: Strategy[]) {}

  adjustFare(card: MoysterCard, journey: Journey, baseFare: number): number {
    let adjustedFare = baseFare;
    const dateKey = Helper.getDateKey(journey.getStartTime());

    let fareCap: capMap =
      caps[getFarthestZoneRange(card.getJourneysByDate(dateKey))];

    for (const strategy of this.strategies) {
      adjustedFare = strategy.applyCap(journey, adjustedFare, fareCap);
    }
    journey.setFare(adjustedFare);
    return adjustedFare;
  }
}
