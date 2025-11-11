import { describe, it, expect, beforeEach, vi } from "vitest";
import { MoysterCardService } from "../../../services";
import { MoysterCard, Station, Zone } from "../../../entities";

describe("MoysterCardService (Unit Tests)", () => {
  let cardService: MoysterCardService;
  let card: MoysterCard;
  let mockFareCalculator: any;
  let mockFareCapping: any;
  let zone1: Zone;
  let zone2: Zone;

  beforeEach(() => {
    zone1 = new Zone(1);
    zone2 = new Zone(2);

    // Mock FareCalculationService
    mockFareCalculator = {
      calculateFare: vi.fn().mockReturnValue(50),
    };

    // Mock FareCappingService
    mockFareCapping = {
      adjustFare: vi.fn().mockImplementation((journey, fare) => fare),
    };

    cardService = new MoysterCardService(mockFareCalculator, mockFareCapping);
    card = new MoysterCard(200); // starting balance
  });

  it("should start a journey and store it in the card", () => {
    const entry = new Station("Londonium Bridge Station", zone1);
    const journey = cardService.startJourney(card, entry, new Date());

    const dateKey = journey.getStartTime().toDateString();

    expect(cardService.getJourneysByDate(dateKey)).toHaveLength(1);
    expect(cardService.getJourneysByDate(dateKey)[0]).toBe(journey);
    expect(journey.getEntryStation()).toBe(entry);
    expect(journey.getExitStation()).toBeNull();

    // Should call fare calculation and capping
    expect(mockFareCalculator.calculateFare).toHaveBeenCalledWith(journey);
    expect(journey.getFarePaid()).toBe(50);
  });

  it("should complete a journey and deduct fare from the card", () => {
    const entry = new Station("Holborn", zone1);
    const exit = new Station("Bank", zone1);

    const journey = cardService.startJourney(card, entry, new Date());
    cardService.completeJourney(card, exit, journey);

    expect(journey.getExitStation()).toBe(exit);
    expect(journey.getEndTime()).toBeInstanceOf(Date);
    expect(journey.isComplete()).toBe(true);

    // Balance deducted correctly
    expect(card.getBalance()).toBe(150); // 200 - 50

    // Fare calculation and capping called once each
    expect(mockFareCalculator.calculateFare).toHaveBeenCalledTimes(2);
    expect(mockFareCapping.adjustFare).toHaveBeenCalledTimes(1);
  });

  it("should handle multiple journeys on the same day", () => {
    const entry1 = new Station("Holborn", zone1);
    const exit1 = new Station("Bank", zone1);
    const entry2 = new Station("Earl's Court", zone2);
    const exit2 = new Station("Victoria", zone1);
    const journeyDate = new Date("2025-11-10T10:00:00");

    const journey1 = cardService.startJourney(card, entry1, journeyDate);
    cardService.completeJourney(card, exit1, journey1);

    const journey2 = cardService.startJourney(card, entry2, journeyDate);
    cardService.completeJourney(card, exit2, journey2);

    const dateKey = journeyDate.toDateString();
    const journeys = cardService.getJourneysByDate(dateKey);

    expect(journeys).toHaveLength(2);
    expect(journeys).toContain(journey1);
    expect(journeys).toContain(journey2);

    // Balance deduction: 2 journeys x 50
    expect(card.getBalance()).toBe(100);
  });

  it("should not allow completing a journey twice", () => {
    const entry = new Station("Holborn", zone1);
    const exit = new Station("Bank", zone1);

    const journey = cardService.startJourney(card, entry, new Date());
    cardService.completeJourney(card, exit, journey);

    // second completion attempt should throw
    expect(() => cardService.completeJourney(card, exit, journey)).toThrowError(
      "Journey is already completed"
    );
  });
});
