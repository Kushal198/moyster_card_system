import { Journey, Station } from "../../entities";
import { describe, it, expect } from "vitest";

describe("Journey entry tapIn behavior", () => {
  it("should create journey with given name and zoneId", () => {
    const entry = new Station("Londonium Bridge Station", 1);
    const journey = new Journey(entry);

    expect(journey.getEntryStation().getName()).toBe(
      "Londonium Bridge Station"
    );
    expect(journey.getEntryStation().getZone()).toBe(1);
  });
});

describe("Journey exit tapOut behavior", () => {
  it("should start with null exit station and null end time", () => {
    const entry = new Station("Londonium Bridge Station", 1);
    const journey = new Journey(entry);

    expect(journey.getExitStation()).toBeNull();
    expect(journey.getEndTime()).toBeNull();
  });

  it("should set exitStation and endTime when setExitStation() is called", () => {
    const entry = new Station("Londonium Bridge Station", 1);
    const exit = new Station("Earl's Court", 2);

    const journey = new Journey(entry);
    journey.setExitStation(exit);

    expect(journey.getExitStation()).toBe(exit);
    expect(journey.getEndTime()).toBeInstanceOf(Date);
  });

  it("should throw error if journey is completed twice", () => {
    const entry = new Station("Holborn", 1);
    const exit1 = new Station("Earl's Court", 2);
    const exit2 = new Station("Hammersmith", 2);

    const journey = new Journey(entry);
    journey.setExitStation(exit1);

    // second tap-out attempt
    expect(() => journey.setExitStation(exit2)).toThrow(
      "Journey is already completed"
    );
  });
});
