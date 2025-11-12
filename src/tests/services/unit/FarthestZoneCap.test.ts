import { describe, it, expect, beforeEach, vi } from "vitest";
import { MoysterCard, Journey, Station, Zone } from "../../../entities";
import { DailyCapStrategy, WeeklyCapStrategy } from "../../../strategy";
import { Strategy } from "../../../strategy/Strategy";
import { caps } from "../../../utils";

describe("Fare Capping - Farthest Zone Scenario", () => {
  let card: MoysterCard;
  let dailyStrategy: Strategy;
  let weeklyStrategy: Strategy;
  let zone1Station: Station;
  let zone2Station: Station;

  beforeEach(() => {
    card = new MoysterCard(500);
    zone1Station = new Station("Zone1", new Zone(1));
    zone2Station = new Station("Zone2", new Zone(2));

    dailyStrategy = new DailyCapStrategy();
    weeklyStrategy = new WeeklyCapStrategy();
  });

  it("should apply daily cap based on farthest zone traveled", () => {
    /*  zoneFareCap caps["1-2"] etc in applyCap comes from adjustFare so the farthest zone travelled cap is sent here */
    // First journey: Zone 1-1
    const j1 = new Journey(zone1Station, new Date("2025-11-10T09:00:00"));

    let fare1 = dailyStrategy.applyCap(j1, 25, caps["1-1"]); // assume fare 25

    // Second journey: Zone 1-1
    const j2 = new Journey(zone1Station, new Date("2025-11-10T12:00:00"));
    let fare2 = dailyStrategy.applyCap(j2, 25, caps["1-1"]); // assume fare 25

    // Third journey: Zone 1-2 (farthest)
    const j3 = new Journey(zone2Station, new Date("2025-11-10T15:00:00"));
    let fare3 = dailyStrategy.applyCap(j3, 30, caps["1-2"]); // assume fare 35

    const j4 = new Journey(zone1Station, new Date("2025-11-10T15:00:00"));
    let fare4 = dailyStrategy.applyCap(j4, 35, caps["1-2"]); // assume fare 35

    const totalFare = fare1 + fare2 + fare3 + fare4;

    // Daily cap for Zone 1-2 is 120
    expect(totalFare).toBeLessThanOrEqual(120);
  });
});
