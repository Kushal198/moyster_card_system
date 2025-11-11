import { Journey, Zone } from "../entities";
import {
  FareRuleRepository,
  PeakHourRepository,
  FareCalculationService,
} from "../interfaces";

export default class FareCalculationServiceImpl
  implements FareCalculationService
{
  private fareRuleRepo: FareRuleRepository;
  private peakHourRepo: PeakHourRepository;

  constructor(
    fareRuleRepo: FareRuleRepository,
    peakHourRepo: PeakHourRepository
  ) {
    this.fareRuleRepo = fareRuleRepo;
    this.peakHourRepo = peakHourRepo;
  }

  public calculateFare(journey: Journey): number {
    if (!journey.getExitStation()) {
      // Handle maximum fare for incomplete journey
      return this.getMaxFare(
        journey.getEntryStation().getZone().getId(),
        journey.getStartTime()
      );
    }

    const fromZone = new Zone(journey.getEntryStation().getZone().getId());
    const toZone = new Zone(journey.getExitStation()!.getZone().getId());

    const isPeak = this.peakHourRepo.isPeak(journey.getStartTime());

    const fareRule = this.fareRuleRepo.findRule(fromZone, toZone);
    if (!fareRule) {
      throw new Error(
        `No fare rule found for zones ${fromZone.getId()}-${toZone.getId()}`
      );
    }

    return fareRule.getFare(isPeak);
  }

  public getMaxFare(fromZoneId: number, startTime: Date): number {
    // Optional: you can define max fare logic dynamically
    // For now, assume max fare is the highest peak fare from this zone
    const fromZone = new Zone(fromZoneId); //1
    const allRules = this.fareRuleRepo.getAllRules(); //[new FareRule(new Zone(1), new Zone(1), 30, 25)]
    const relevantRules = allRules.filter((rule) =>
      rule.matches(fromZone, fromZone)
    );
    let isPeak = this.peakHourRepo.isPeak(startTime);
    if (!relevantRules.length) return 0;
    return Math.max(...relevantRules.map((r) => r.getFare(isPeak))); // peak fare as max can be changed later dynamically
  }
}
