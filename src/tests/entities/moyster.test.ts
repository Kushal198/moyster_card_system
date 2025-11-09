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

    const journey = card.startJourney(entry);

    expect(card.getJourneys().length).toBe(1);
    expect(card.getJourneys()[0]).toBe(journey);
    expect(journey.getEntryStation().getName()).toBe(
      "Londonium Bridge Station"
    );
    expect(journey.getExitStation()).toBeNull();
  });
  it("should complete the last incomplete journey and update exitStation", () => {
    const card = new MoysterCard(130);
    const entry = new Station("Holborn", 1);
    const exit = new Station("Bank", 1);

    card.startJourney(entry);
    const journey = card.completeJourney(exit);

    expect(journey.getExitStation()).toBe(exit);
    expect(journey.getEndTime()).toBeInstanceOf(Date);
    expect(journey.isComplete()).toBe(true);
  });
});
