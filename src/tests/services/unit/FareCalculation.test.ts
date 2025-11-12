import { describe, it, expect, beforeEach, vi } from "vitest";
import { MoysterCard, Station, Zone } from "../../../entities";
import { MoysterCardService } from "../../../services";
import { FareCappingService } from "../../../interfaces";

describe("MoysterCardService - unit tests with mocks", () => {
  let card: MoysterCard;
  let cardService: MoysterCardService;
  let fareCappingService: FareCappingService;
  const station = new Station("Londonium Bridge Station", new Zone(1));
  const mockFareCalculator = {
    calculateFare: vi.fn(),
  };

  beforeEach(() => {
    card = new MoysterCard(200);

    fareCappingService = {
      adjustFare: vi.fn((card, journery, fare) => fare), // simple passthrough
    } as any;

    cardService = new MoysterCardService(
      mockFareCalculator as any,
      fareCappingService
    );
  });

  it("deducts fare from the card", () => {
    mockFareCalculator.calculateFare.mockImplementation((journey) => {
      // Return fare based on journey start/end (or just a fixed value for test)
      return 30;
    });

    const journey = cardService.startJourney(card, station, new Date());
    cardService.completeJourney(card, station, journey);

    expect(card.getBalance()).toBe(170); // 200 - 30
    expect(journey.getFarePaid()).toBe(30);
  });

  it("calls fareCappingService.applyCap", () => {
    mockFareCalculator.calculateFare.mockReturnValue(30);

    const journey = cardService.startJourney(card, station, new Date());
    cardService.completeJourney(card, station, journey);

    expect(fareCappingService.adjustFare).toHaveBeenCalledWith(
      card,
      journey,
      30
    );
  });
});
