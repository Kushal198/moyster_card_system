import { MoysterCard, Journey, Station } from "../../entities";
import { FareCalculationService, FareCappingService } from "../../services";

import { describe, it, expect, beforeEach } from "vitest";
import { caps } from "../../utils";
import journeysData from "../../data/journeys.json";
import weekleyJournerys from "../../data/weekleyJournerys.json";

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

      const journey = card.startJourney(fromStation, new Date(data.time));
      //   journey.setStartTime(new Date(data.time));
      card.completeJourney(toStation, journey);
      const fare = FareCalculationService.calculateFare(journey);
      journey.farePaid = fare;

      // Apply capping
      FareCappingService.adjustFare(card, journey, fare);
    }
    const today = new Date("2025-11-10T00:01:00");

    // Compute total charged
    const totalCharged = card
      .getJourneysByDate(today.toDateString())
      .reduce((sum, j) => sum + (j.farePaid ?? 0), 0);
    console.log(card.journeysByDate);
    expect(totalCharged).toBe(dailyCap);
  });
});

// describe("CappingService - Weekly Cap Scenario", () => {
//   let card: MoysterCard;
//   let stations: Record<number, Station>;

//   beforeEach(() => {
//     stations = {
//       1: new Station("Zone1Station", 1),
//       2: new Station("Zone2Station", 2),
//     };
//     card = new MoysterCard(500);
//   });
//   function simulateJourney(dateTime: string, from: Station, to: Station) {
//     const journey = new Journey(from);
//     journey.setStartTime(new Date(dateTime));
//     journey.setExitStation(to);
//     card.getJourneys().push(journey);

//     const baseFare = FareCalculationService.calculateFare(journey);
//     const adjusted = FareCappingService.adjustFare(card, journey, baseFare);
//     journey.farePaid = adjusted;
//     return adjusted;
//   }

//   it("should apply weekly cap correctly for multiple journeys", () => {
//     const key = `${stations[1].getZone()}-${stations[2].getZone()}`;
//     const weeklyCap = caps[key].weekly;

//     // Simulate each journey
//     // Run all journeys
//     for (const data of weekleyJournerys) {
//       const fromStation = stations[data.fromZone];
//       const toStation = stations[data.toZone];
//       simulateJourney(data.date, fromStation, toStation);
//     }
//     // weekleyJournerys.forEach((time, fromZone:number, toZone:number) =>
//     //     simulateJourney(time as string, stations[fromZone] , stations[toZone] )
//     // );
//     console.log(card.getJourneys());
//     const totalFare = card
//       .getJourneys()
//       .reduce((sum, j) => sum + (j.farePaid ?? 0), 0);

//     // Expected: weekly cap 600 reached before Sunday ends
//     expect(totalFare).to.equal(weeklyCap);
//   });
// });
