import { MoysterCard, Journey, Station, Zone } from "../../entities";
import { FareCappingServiceImpl, MoysterCardService } from "../../services";

import { describe, it, expect, beforeEach } from "vitest";
import { caps } from "../../utils";
import journeysData from "../../data/journeys.json";
import weekleyJournerys from "../../data/weekleyJournerys.json";
import {
  FareCappingService,
  FareRuleRepository,
  PeakHourRepository,
} from "../../interfaces";
import { FareRuleRepositoryImpl } from "../../repository/FareRuleRepositoryImpl";
import { PeakHourRepositoryImpl } from "../../repository/PeakHourRepositoryImpl";
import FareCalculationServiceImpl from "../../services/FareCalculationServiceImpl";

describe("CappingService - Daily Cap Scenario", () => {
  let card: MoysterCard;
  let cardService: MoysterCardService;
  let fareCappingService: FareCappingService;
  let stationsMap: Record<number, Station>;

  beforeEach(() => {
    // Create stations for zone 1 and 2
    stationsMap = {
      1: new Station("Londonium Bridge Station", new Zone(1)),
      2: new Station("Hammersmith", new Zone(2)),
    };
    card = new MoysterCard(800); // enough balance
    const fareRepo: FareRuleRepository = new FareRuleRepositoryImpl();
    const peakRepo: PeakHourRepository = new PeakHourRepositoryImpl();
    const fareCalculator = new FareCalculationServiceImpl(fareRepo, peakRepo);
    fareCappingService = new FareCappingServiceImpl();
    cardService = new MoysterCardService(fareCalculator, fareCappingService);
  });

  it("should apply daily cap correctly for multiple journeys", () => {
    // Simulate each journey
    for (const data of journeysData) {
      const fromStation = stationsMap[data.fromZone];
      const toStation = stationsMap[data.toZone];
      const journey = cardService.startJourney(
        card,
        fromStation,
        new Date(data.time)
      );
      cardService.completeJourney(card, toStation, journey);
    }
    const today = new Date("2025-11-10T00:01:00");
    const totalCharged = cardService
      .getJourneysByDate(today.toDateString())
      .reduce((sum, j) => sum + (j.getFarePaid() ?? 0), 0);

    expect(card.getBalance()).toBe(680);
    expect(totalCharged).toBe(120);
  });
});

describe("CappingService - Weekly Cap Scenario", () => {
  let card: MoysterCard;
  let cardService: MoysterCardService;
  let fareCappingService: FareCappingService;
  //   let stationsMap: Record<number, Station>;
  let stations: Record<number, Station>;

  beforeEach(() => {
    stations = {
      1: new Station("Zone1Station", new Zone(1)),
      2: new Station("Zone2Station", new Zone(2)),
    };
    card = new MoysterCard(1000);
    const fareRepo: FareRuleRepository = new FareRuleRepositoryImpl();
    const peakRepo: PeakHourRepository = new PeakHourRepositoryImpl();
    const fareCalculator = new FareCalculationServiceImpl(fareRepo, peakRepo);
    fareCappingService = new FareCappingServiceImpl();
    cardService = new MoysterCardService(fareCalculator, fareCappingService);
  });

  it("should apply weekly cap correctly for multiple journeys", () => {
    // Simulate each journey
    for (const data of weekleyJournerys) {
      const fromStation = stations[data.fromZone];
      const toStation = stations[data.toZone];
      const journey = cardService.startJourney(
        card,
        fromStation,
        new Date(data.date)
      );
      cardService.completeJourney(card, toStation, journey);
    }
    expect(card.getBalance()).toBe(245);
    expect(fareCappingService.getWeeklyTotal("2025-11-03")).toBe(600);
  });
});
