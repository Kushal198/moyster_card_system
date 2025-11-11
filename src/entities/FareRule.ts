import { Zone } from ".";

export default class FareRule {
  constructor(
    private readonly fromZone: Zone,
    private readonly toZone: Zone,
    private readonly peakFare: number,
    private readonly nonPeakFare: number
  ) {}

  /**
   * Checks if this fare rule applies for a given zone pair.
   *
   * A rule is considered a match if the journey's from/to zones
   * are the same as the rule's zones, regardless of direction.
   *
   * Example:
   *   FareRule(Zone 1, Zone 2) will match both:
   *     - Journey from Zone 1 to Zone 2
   *     - Journey from Zone 2 to Zone 1
   */
  matches(from: Zone, to: Zone): boolean {
    return (
      (this.fromZone.getId() === from.getId() &&
        this.toZone.getId() === to.getId()) ||
      (this.fromZone.getId() === to.getId() &&
        this.toZone.getId() === from.getId())
    );
  }

  getFare(isPeak: boolean): number {
    return isPeak ? this.peakFare : this.nonPeakFare;
  }

  getZoneRangeKey(): string {
    const low = Math.min(this.fromZone.getId(), this.toZone.getId());
    const high = Math.max(this.fromZone.getId(), this.toZone.getId());
    return `${low}-${high}`;
  }
}
