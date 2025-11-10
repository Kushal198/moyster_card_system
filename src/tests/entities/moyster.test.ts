import { MoysterCard, Station } from "../../entities";
import { describe, it, expect } from "vitest";

describe("MoysterCard", () => {
  it("should create moyster card with given balance", () => {
    const moyster = new MoysterCard(100);
    expect(moyster.getBalance()).toBe(100);
  });
});

describe("MoysterCard Journey", () => {
  it("should start a new journey and store it in journeys array", () => {
    const card = new MoysterCard(100);
    const entry = new Station("Londonium Bridge Station", 1);
    const journey = card.startJourney(entry, new Date("2025-11-10T00:01:00"));
    expect(card.getJourneysByDate(new Date().toDateString())).to.have.lengthOf(
      1
    );
    expect(card.getJourneysByDate(new Date().toDateString())[0]).toBe(journey);
    expect(journey.getEntryStation().getName()).toBe(
      "Londonium Bridge Station"
    );
    expect(journey.getExitStation()).toBeNull();
  });
  it("should complete the last incomplete journey and update exitStation", () => {
    const card = new MoysterCard(130);
    const entry = new Station("Holborn", 1);
    const exit = new Station("Bank", 1);

    const journey = card.startJourney(entry, new Date("2025-11-10T00:01:00"));
    card.completeJourney(exit, journey);

    expect(journey.getExitStation()).toBe(exit);
    expect(journey.getEndTime()).toBeInstanceOf(Date);
    expect(journey.isComplete()).toBe(true);
  });
});
