import { Journey, MoysterCard, Station } from "../../entities";
import { FareCalculationService } from "../../services";

import { describe, it, expect, beforeEach } from "vitest";

describe("Fare Calculation Service", () => {
  let card: MoysterCard;
  const station1 = new Station("Londonium Bridge Station", 1);
  const station2 = new Station("Bank", 1);
  const station3 = new Station("Earl's Court", 2);
  const station4 = new Station("Hammersmith", 2);

  beforeEach(() => {
    card = new MoysterCard(20);
  });

  /*Off-Peak hours for weekdays zone pair 2-1 */
  it("should charge off-peak hour fare for zone pair 2-1 on weekdays", () => {
    const journey = card.startJourney(
      station3,
      new Date("2025-11-10T13:00:00")
    );
    card.completeJourney(station1, journey);
    const fare = FareCalculationService.calculateFare(journey);
    expect(fare).toBe(30);
  });

  /*Peak hours for weekdays zone pair 1-1 */
  it("should charge peak hour fare for zone pair 1-1 on weekdays", () => {
    const journey = card.startJourney(
      station1,
      new Date("2025-11-10T08:00:00")
    );
    card.completeJourney(station2, journey);
    const fare = FareCalculationService.calculateFare(journey);
    expect(fare).toBe(30);
  });

  /*Peak hours for weekdays zone pair 1-2 */
  it("should charge peak hour fare for zone pair 1-2 on weekdays", () => {
    const journey = card.startJourney(
      station1,
      new Date("2025-11-10T08:00:00")
    );
    card.completeJourney(station3, journey);
    const fare = FareCalculationService.calculateFare(journey);
    expect(fare).toBe(35);
  });

  /*Peak hours for weekdays zone pair 2-2 */
  it("should charge peak hour fare for zone pair 2-2 on weekdays", () => {
    const journery = card.startJourney(
      station3,
      new Date("2025-11-10T08:00:00")
    );
    card.completeJourney(station4, journery);
    const fare = FareCalculationService.calculateFare(journery);
    expect(fare).toBe(25);
  });

  /*Off-Peak hours for weekdays zone pair 1-1 */
  it("should charge off-peak hour fare for zone pari 1-1 on weekdays", () => {
    const journey = card.startJourney(
      station1,
      new Date("2025-11-10T13:00:00")
    );
    card.completeJourney(station2, journey);
    const fare = FareCalculationService.calculateFare(journey);
    expect(fare).toBe(25);
  });

  /*Off-Peak hours for weekdays zone pair 2-2 */
  it("should charge off-peak hour fare for zone pair 2-2 on weekdays", () => {
    const journey = card.startJourney(
      station3,
      new Date("2025-11-10T13:00:00")
    );
    card.completeJourney(station4, journey);
    const fare = FareCalculationService.calculateFare(journey);
    expect(fare).toBe(20);
  });

  /*Peak hours for (Sat-Sun)weekends zone pair 1-2 */
  it("should charge peak hour fare for zone pair 1-2 on weekends", () => {
    const journey = card.startJourney(
      station1,
      new Date("2025-09-10T09:00:00")
    );
    card.completeJourney(station3, journey);
    const fare = FareCalculationService.calculateFare(journey);
    expect(fare).toBe(35);
  });

  /*Peak hours for (Sat-Sun)weekends zone pair 1-1 */
  it("should charge peak hour fare for zone pair 1-1 on weekends", () => {
    const journey = card.startJourney(
      station1,
      new Date("2025-09-10T09:00:00")
    );
    card.completeJourney(station2, journey);
    const fare = FareCalculationService.calculateFare(journey);
    expect(fare).toBe(30);
  });

  /*Peak hours for (Sat-Sun)weekends zone pair 2-2 */
  it("should charge peak hour fare for zone pair 2-2 on weekends", () => {
    const journey = card.startJourney(
      station3,
      new Date("2025-09-10T09:00:00")
    );
    card.completeJourney(station4, journey);
    const fare = FareCalculationService.calculateFare(journey);
    expect(fare).toBe(25);
  });
});
