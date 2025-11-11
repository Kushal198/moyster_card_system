import { Journey, MoysterCard, Station, Zone } from "../../entities";
import {
  FareCappingService,
  FareRuleRepository,
  PeakHourRepository,
} from "../../interfaces";
import { FareRuleRepositoryImpl } from "../../repository/FareRuleRepositoryImpl";
import { PeakHourRepositoryImpl } from "../../repository/PeakHourRepositoryImpl";
import {
  FareCalulationServiceImpl,
  FareCappingServiceImpl,
  MoysterCardService,
} from "../../services";

import { describe, it, expect, beforeEach } from "vitest";
import FareCalculationServiceImpl from "../../services/FareCalculationServiceImpl";

describe("Fare Calculation Service", () => {
  let card: MoysterCard;
  let cardService: MoysterCardService;
  let fareCappingService: FareCappingService;

  const station1 = new Station("Londonium Bridge Station", new Zone(1));
  const station2 = new Station("Bank", new Zone(1));
  const station3 = new Station("Earl's Court", new Zone(2));
  const station4 = new Station("Hammersmith", new Zone(2));

  beforeEach(() => {
    card = new MoysterCard(200);
    const fareRepo: FareRuleRepository = new FareRuleRepositoryImpl();
    const peakRepo: PeakHourRepository = new PeakHourRepositoryImpl();
    const fareCalculator = new FareCalculationServiceImpl(fareRepo, peakRepo);
    const fareCappingService = new FareCappingServiceImpl();
    cardService = new MoysterCardService(fareCalculator, fareCappingService);
  });

  /*Off-Peak hours for weekdays zone pair 2-1 */
  it("should charge off-peak hour fare for zone pair 2-1 on weekdays", () => {
    const journey = cardService.startJourney(
      card,
      station3,
      new Date("2025-11-10T13:00:00")
    ); // off-peak
    cardService.completeJourney(card, station1, journey);
    const fare = journey.getFarePaid();

    expect(fare).toBe(30);
    expect(card.getBalance()).toBe(170);
  });

  /*Peak hours for weekdays zone pair 1-1 */
  it("should charge peak hour fare for zone pair 1-1 on weekdays", () => {
    const journey = cardService.startJourney(
      card,
      station1,
      new Date("2025-11-10T08:00:00")
    );
    cardService.completeJourney(card, station2, journey);
    const fare = journey.getFarePaid();
    expect(card.getBalance()).toBe(170);
    expect(fare).toBe(30);
  });

  /*Peak hours for weekdays zone pair 1-2 */
  it("should charge peak hour fare for zone pair 1-2 on weekdays", () => {
    const journey = cardService.startJourney(
      card,
      station1,
      new Date("2025-11-10T08:00:00")
    );
    cardService.completeJourney(card, station3, journey);
    const fare = journey.getFarePaid();

    expect(card.getBalance()).toBe(165);
    expect(fare).toBe(35);
  });

  /*Peak hours for weekdays zone pair 2-2 */
  it("should charge peak hour fare for zone pair 2-2 on weekdays", () => {
    const journery = cardService.startJourney(
      card,
      station3,
      new Date("2025-11-10T08:00:00")
    );
    cardService.completeJourney(card, station4, journery);
    const fare = journery.getFarePaid();
    expect(card.getBalance()).toBe(175);
    expect(fare).toBe(25);
  });

  /*Off-Peak hours for weekdays zone pair 1-1 */
  it("should charge off-peak hour fare for zone pari 1-1 on weekdays", () => {
    const journey = cardService.startJourney(
      card,
      station1,
      new Date("2025-11-10T13:00:00")
    );
    cardService.completeJourney(card, station2, journey);
    const fare = journey.getFarePaid();
    expect(card.getBalance()).toBe(175);
    expect(fare).toBe(25);
  });

  /*Off-Peak hours for weekdays zone pair 2-2 */
  it("should charge off-peak hour fare for zone pair 2-2 on weekdays", () => {
    const journey = cardService.startJourney(
      card,
      station3,
      new Date("2025-11-10T13:00:00")
    );
    cardService.completeJourney(card, station4, journey);
    const fare = journey.getFarePaid();
    expect(card.getBalance()).toBe(180);
    expect(fare).toBe(20);
  });

  /*Peak hours for (Sat-Sun)weekends zone pair 1-2 */
  it("should charge peak hour fare for zone pair 1-2 on weekends", () => {
    const journey = cardService.startJourney(
      card,
      station1,
      new Date("2025-09-10T09:00:00")
    );
    cardService.completeJourney(card, station3, journey);
    const fare = journey.getFarePaid();

    expect(card.getBalance()).toBe(165);
    expect(fare).toBe(35);
  });

  /*Peak hours for (Sat-Sun)weekends zone pair 1-1 */
  it("should charge peak hour fare for zone pair 1-1 on weekends", () => {
    const journey = cardService.startJourney(
      card,
      station1,
      new Date("2025-09-10T09:00:00")
    );
    cardService.completeJourney(card, station2, journey);
    const fare = journey.getFarePaid();

    expect(card.getBalance()).toBe(170);
    expect(fare).toBe(30);
  });

  /*Peak hours for (Sat-Sun)weekends zone pair 2-2 */
  it("should charge peak hour fare for zone pair 2-2 on weekends", () => {
    const journey = cardService.startJourney(
      card,
      station3,
      new Date("2025-09-10T09:00:00")
    );
    cardService.completeJourney(card, station4, journey);
    const fare = journey.getFarePaid();
    expect(card.getBalance()).toBe(175);
    expect(fare).toBe(25);
  });
});
