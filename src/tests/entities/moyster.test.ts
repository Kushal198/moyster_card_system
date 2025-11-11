import { describe, it, expect, beforeEach } from "vitest";
import { MoysterCard, Station, Zone, Journey } from "../../entities";
import { FareCalulationServiceImpl } from "../../services";
import { MoysterCardService } from "../../services";
import { FareRuleRepository, PeakHourRepository } from "../../interfaces";
import { FareRuleRepositoryImpl } from "../../repository/FareRuleRepositoryImpl";
import { PeakHourRepositoryImpl } from "../../repository/PeakHourRepositoryImpl";

describe("MoysterCard Integration with JourneyService", () => {
  let card: MoysterCard;
  let cardService: MoysterCardService;

  beforeEach(() => {
    card = new MoysterCard(200);
    const fareRepo: FareRuleRepository = new FareRuleRepositoryImpl();
    const peakRepo: PeakHourRepository = new PeakHourRepositoryImpl();
    const fareCalculator = new FareCalulationServiceImpl(fareRepo, peakRepo);
    cardService = new MoysterCardService(fareCalculator);
  });

  it("should start a new journey and store it in the card", () => {
    const entry = new Station("Londonium Bridge Station", new Zone(1));
    const journeyDate = new Date("2025-11-10T08:00:00"); // peak hour
    const journey = cardService.startJourney(card, entry, journeyDate);

    // const dateKey = journeyDate.toISOString().split("T")[0];
    const dateKey = journey.getStartTime().toDateString();
    expect(cardService.getJourneysByDate(dateKey)).toHaveLength(1);
    expect(cardService.getJourneysByDate(dateKey)[0]).toBe(journey);
    expect(journey.getEntryStation().getName()).toBe(
      "Londonium Bridge Station"
    );
    expect(journey.getExitStation()).toBeNull();
    expect(journey.getFarePaid()).toBeGreaterThan(0); // fare should be calculated
  });

  it("should complete the last incomplete journey and update exitStation", () => {
    const entry = new Station("Holborn", new Zone(1));
    const exit = new Station("Bank", new Zone(1));
    const journeyDate = new Date("2025-11-10T09:00:00"); // peak hour

    const journey = cardService.startJourney(card, entry, journeyDate);
    cardService.completeJourney(card, exit, journey);

    expect(journey.getExitStation()).toBe(exit);
    expect(journey.getEndTime()).toBeInstanceOf(Date);
    expect(journey.isComplete()).toBe(true);
  });

  it("should handle multiple journeys on the same day", () => {
    const entry1 = new Station("Holborn", new Zone(1));
    const exit1 = new Station("Bank", new Zone(1));
    const entry2 = new Station("Earl's Court", new Zone(2));
    const exit2 = new Station("Victoria", new Zone(1));
    const journeyDate = new Date("2025-11-10T10:00:00");

    const journey1 = cardService.startJourney(card, entry1, journeyDate);
    cardService.completeJourney(card, exit1, journey1);

    const journey2 = cardService.startJourney(card, entry2, journeyDate);
    cardService.completeJourney(card, exit2, journey2);

    const dateKey = journeyDate.toDateString();
    // const dateKey = journeyDate.toISOString().split("T")[0];
    expect(cardService.getJourneysByDate(dateKey)).toHaveLength(2);
    expect(cardService.getJourneysByDate(dateKey)).toContain(journey1);
    expect(cardService.getJourneysByDate(dateKey)).toContain(journey2);
  });
});
