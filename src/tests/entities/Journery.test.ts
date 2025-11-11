import { Journey, Station, Zone } from "../../entities";
import { describe, it, expect, beforeEach } from "vitest";

describe("Journey creation unit test", () => {
  let zone1: Zone;
  let zone2: Zone;

  beforeEach(() => {
    zone1 = new Zone(1);
    zone2 = new Zone(2);
  });

  it("should create journey with given name and zoneId", () => {
    const entry = new Station("Londonium Bridge Station", zone1);
    const journey = new Journey(entry, new Date());

    expect(journey.getEntryStation().getName()).toBe(
      "Londonium Bridge Station"
    );
    expect(journey.getEntryStation().getZone().getId()).toBe(1);
  });
});

describe("Journey completion unit test", () => {
  let zone1: Zone;
  let zone2: Zone;

  beforeEach(() => {
    zone1 = new Zone(1);
    zone2 = new Zone(2);
  });

  it("should start with null exit station and null end time", () => {
    const entry = new Station("Londonium Bridge Station", zone1);
    const journey = new Journey(entry, new Date());

    expect(journey.getExitStation()).toBeNull();
    expect(journey.getEndTime()).toBeNull();
  });

  it("should set exitStation and endTime when setExitStation() is called", () => {
    const entry = new Station("Londonium Bridge Station", zone1);
    const exit = new Station("Earl's Court", zone2);

    const journey = new Journey(entry, new Date());
    journey.setExitStation(exit);

    expect(journey.getExitStation()).toBe(exit);
    expect(journey.getEndTime()).toBeInstanceOf(Date);
  });

  it("should throw error if journey is completed twice", () => {
    const entry = new Station("Holborn", zone1);
    const exit1 = new Station("Earl's Court", zone2);
    const exit2 = new Station("Hammersmith", zone2);

    const journey = new Journey(entry, new Date());
    journey.setExitStation(exit1);

    // second tap-out attempt
    expect(() => journey.setExitStation(exit2)).toThrow(
      "Journey is already completed"
    );
  });
});
