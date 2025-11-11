import { describe, it, expect, beforeEach } from "vitest";
import { DailyCapStrategy, WeeklyCapStrategy } from "../../../strategy";
import { MoysterCard, Journey, Station, Zone } from "../../../entities";
import { Strategy } from "../../../strategy/Strategy";

describe("DailyCapStrategy - Unit Tests", () => {
  let card: MoysterCard;
  let strategy: Strategy;

  beforeEach(() => {
    card = new MoysterCard(500);
    strategy = new DailyCapStrategy();
  });

  it("should not cap if total fare is below daily limit", () => {
    const journey = new Journey(
      new Station("Londonium Bridge Station", new Zone(1)),
      new Date("2025-11-10T08:00:00")
    );
    journey.setFare(20);
    card.addJourney(journey);

    const adjustedFare = strategy.applyCap(journey, 20);

    expect(adjustedFare).toBe(20);
  });

  it("should cap total daily fare at daily limit", () => {
    // Assume daily cap for Zone1-2 = 120
    const journey1 = new Journey(
      new Station("Londonium Bridge Station", new Zone(1)),
      new Date()
    );
    strategy.applyCap(journey1, 100); // this fills totals[key] = 100

    const journey2 = new Journey(
      new Station("Hammersmith", new Zone(2)),
      new Date()
    );
    const adjustedFare = strategy.applyCap(journey2, 40);

    // Only 20 remaining to reach cap
    expect(adjustedFare).toBe(20);
  });

  it("should charge 0 if daily cap is already reached", () => {
    const journey1 = new Journey(
      new Station("Londonium Bridge Station", new Zone(1)),
      new Date()
    );
    strategy.applyCap(journey1, 120); // this fills totals[key] = 100

    const journey2 = new Journey(
      new Station("Hammersmith", new Zone(2)),
      new Date()
    );
    const adjustedFare = strategy.applyCap(journey2, 40);

    expect(adjustedFare).toBe(0);
  });
});

describe("WeeklyCapStrategy - Unit Tests", () => {
  let card: MoysterCard;
  let strategy: Strategy;

  beforeEach(() => {
    card = new MoysterCard(500);
    strategy = new WeeklyCapStrategy();
  });

  it("should not cap if total fare is below daily limit", () => {
    const journey = new Journey(
      new Station("Londonium Bridge Station", new Zone(1)),
      new Date("2025-11-10T08:00:00")
    );
    journey.setFare(20);
    card.addJourney(journey);

    const adjustedFare = strategy.applyCap(journey, 50);

    expect(adjustedFare).toBe(50);
  });

  it("should cap total weekly fare at weekly limit", () => {
    // Simulate total fare so far this week = 780
    const earlierJourney = new Journey(
      new Station("Londonium Bridge Station", new Zone(1)),
      new Date("2025-11-03")
    );
    strategy.applyCap(earlierJourney, 580);

    // New journey would make total exceed cap
    const newJourney = new Journey(
      new Station("Hammersmith", new Zone(2)),
      new Date("2025-11-07")
    );
    const adjustedFare = strategy.applyCap(newJourney, 40);

    expect(adjustedFare).toBe(20); // 580 + 40 = 620 → capped to 600 → only charge 20
  });
});
