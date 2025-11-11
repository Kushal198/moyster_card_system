import { Zone } from ".";

export default class FareRule {
  constructor(
    private readonly fromZone: Zone,
    private readonly toZone: Zone,
    private readonly peakFare: number,
    private readonly nonPeakFare: number
  ) {}

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
