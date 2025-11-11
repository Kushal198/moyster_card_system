import { describe, it, expect, vi } from "vitest";
import { FareCappingServiceV2Impl } from "../../../services";
import { Journey, Station, Zone } from "../../../entities";

describe("FareCappingServiceV2Impl", () => {
  it("should apply all strategies in sequence and return final adjusted fare", () => {
    // Mock journey
    const journey = new Journey(
      new Station("Londonium Bridge Station", new Zone(1)),
      new Date()
    );
    journey.setFare = vi.fn();

    // Mock strategies
    const strategy1 = { applyCap: vi.fn().mockReturnValue(30) };
    const strategy2 = { applyCap: vi.fn().mockReturnValue(25) };

    const service = new FareCappingServiceV2Impl([strategy1, strategy2]);

    const result = service.adjustFare(journey, 40);

    expect(strategy1.applyCap).toHaveBeenCalledWith(journey, 40);
    expect(strategy2.applyCap).toHaveBeenCalledWith(journey, 30);

    expect(journey.setFare).toHaveBeenCalledWith(25);

    expect(result).toBe(25);
  });

  it("should return base fare if no strategies are provided", () => {
    const journey = new Journey(
      new Station("Londonium Bridge Station", new Zone(1)),
      new Date()
    );
    journey.setFare = vi.fn();

    const service = new FareCappingServiceV2Impl([]);
    const result = service.adjustFare(journey, 50);

    expect(result).toBe(50);
    expect(journey.setFare).toHaveBeenCalledWith(50);
  });
});
