import { describe, it, expect, vi, beforeEach } from "vitest";
import { FareCappingServiceV2Impl } from "../../../services";
import { Journey, Station, Zone, MoysterCard } from "../../../entities";
import * as Helper from "../../../utils"; // for getFarthestZoneRange
import { caps } from "../../../utils";

describe("FareCappingServiceV2Impl", () => {
  let card: MoysterCard;

  beforeEach(() => {
    card = new MoysterCard(500); // enough balance
  });

  it("should apply all strategies in sequence and return final adjusted fare", () => {
    // Mock journey
    const journey = new Journey(
      new Station("Londonium Bridge Station", new Zone(1)),
      new Date()
    );

    // Spy on setFare
    const setFareSpy = vi.spyOn(journey, "setFare");

    // Mock getFarthestZoneRange to control fareCap
    vi.spyOn(Helper, "getFarthestZoneRange").mockReturnValue("1-2");

    // Mock card.getJourneysByDate to return empty array
    vi.spyOn(card, "getJourneysByDate").mockReturnValue([]);

    // Mock strategies
    const strategy1 = { applyCap: vi.fn((journey, fare, fareCap) => 30) };
    const strategy2 = { applyCap: vi.fn((journey, fare, fareCap) => 25) };

    const service = new FareCappingServiceV2Impl([strategy1, strategy2]);

    const result = service.adjustFare(card, journey, 40);

    // Strategy1 called with original fare and calculated fareCap
    expect(strategy1.applyCap).toHaveBeenCalledWith(journey, 40, caps["1-2"]);

    // Strategy2 called with result of strategy1 and same fareCap
    expect(strategy2.applyCap).toHaveBeenCalledWith(journey, 30, caps["1-2"]);

    // Journey.setFare called with final adjusted fare
    expect(setFareSpy).toHaveBeenCalledWith(25);

    // Adjusted fare returned
    expect(result).toBe(25);
  });

  it("should return base fare if no strategies are provided", () => {
    const journey = new Journey(new Station("Bank", new Zone(1)), new Date());

    const setFareSpy = vi.spyOn(journey, "setFare");

    const service = new FareCappingServiceV2Impl([]);
    const result = service.adjustFare(card, journey, 50);

    // Base fare returned unchanged
    expect(result).toBe(50);

    // Journey.setFare called with base fare
    expect(setFareSpy).toHaveBeenCalledWith(50);
  });
});
