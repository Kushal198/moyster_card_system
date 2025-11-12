import { describe, it, expect } from "vitest";
import FareRule from "../../entities/FareRule";
import { Zone } from "../../entities";

describe("FareRule", () => {
  const zone1 = new Zone(1);
  const zone2 = new Zone(2);
  const peakFare = 35;
  const nonPeakFare = 25;

  const fareRule = new FareRule(zone1, zone2, peakFare, nonPeakFare);

  it("should match zone pair in correct direction", () => {
    expect(fareRule.matches(zone1, zone2)).toBe(true);
  });

  it("should match zone pair in reverse direction", () => {
    expect(fareRule.matches(zone2, zone1)).toBe(true);
  });

  it("should not match unrelated zones", () => {
    const zone3 = new Zone(3);
    expect(fareRule.matches(zone1, zone3)).toBe(false);
    expect(fareRule.matches(zone2, zone3)).toBe(false);
  });

  it("should return peak fare when isPeak is true", () => {
    expect(fareRule.getFare(true)).toBe(peakFare);
  });

  it("should return non-peak fare when isPeak is false", () => {
    expect(fareRule.getFare(false)).toBe(nonPeakFare);
  });

  it("should return correct zone range key", () => {
    expect(fareRule.getZoneRangeKey()).toBe("1-2");
  });
});
