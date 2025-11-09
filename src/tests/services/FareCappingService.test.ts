import { MoysterCard, Journey, Station } from "../../entities";
import { FareCalculationService, FareCappingService } from "../../services";

import { describe, it, expect, beforeEach } from "vitest";
import { caps } from "../../utils";
import journeysData from "../../data/journeys.json";

describe("CappingService - Daily Cap Scenario", () => {
  let card: MoysterCard;
  let stationsMap: Record<number, Station>;

  beforeEach(() => {
    // Create stations for zone 1 and 2
    stationsMap = {
      1: new Station("Londonium Bridge Station", 1),
      2: new Station("Hammersmith", 2),
    };
    card = new MoysterCard(200); // enough balance
  });

  it("should apply daily cap correctly for multiple journeys", () => {
    const key = `${stationsMap[1].getZone()}-${stationsMap[2].getZone()}`;
    const dailyCap = caps[key].daily;

    // Simulate each journey
    for (const data of journeysData) {
      const fromStation = stationsMap[data.fromZone];
      const toStation = stationsMap[data.toZone];

      const journey = card.startJourney(fromStation);
      journey.setStartTime(new Date(data.time));
      card.completeJourney(toStation);
      const fare = FareCalculationService.calculateFare(journey);
      journey.farePaid = fare;

      // Apply capping
      FareCappingService.adjustFare(card, journey, fare);
    }

    // Compute total charged
    const totalCharged = card
      .getJourneys()
      .reduce((sum, j) => sum + (j.farePaid ?? 0), 0);

    expect(totalCharged).toBe(dailyCap);
  });
});
