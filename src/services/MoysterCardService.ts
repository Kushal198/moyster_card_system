import { Journey, MoysterCard, Station } from "../entities";
import { FareCalculationService, FareCappingService } from "../interfaces";

export default class MoysterCardService {
  private journeysByDate: Record<string, Journey[]> = {};

  constructor(
    private fareCalculator: FareCalculationService,
    private fareCappingService: FareCappingService
  ) {}

  startJourney(card: MoysterCard, entryStation: Station, date: Date): Journey {
    const journey = new Journey(entryStation, date);
    // set max fare if incomplete journey
    journey.setFare(this.fareCalculator.calculateFare(journey));
    card.addJourney(journey);
    const dateKey = journey.getStartTime().toDateString();
    if (!this.journeysByDate[dateKey]) this.journeysByDate[dateKey] = [];
    this.journeysByDate[dateKey].push(journey);
    card.deduct(journey.getFarePaid());
    return journey;
  }

  completeJourney(
    card: MoysterCard,
    exitStation: Station,
    journey: Journey
  ): Journey | null {
    const dataKey = journey.getStartTime().toDateString();
    const journeys = this.journeysByDate[dataKey] ?? [];
    let activeJourney = journeys.find((j) => j.getExitStation() === null);

    if (!activeJourney) {
      throw new Error("Journey is already completed");
    }
    // Complete the journey
    activeJourney.setExitStation(exitStation);
    let maxFareAllocated = activeJourney.getFarePaid();
    //Since the commuter is completing the journey, we are adding the previously cut max fare to the balance
    card.addBalance(maxFareAllocated);
    let actualFare = this.fareCalculator.calculateFare(journey);
    //Setting the actual fare
    journey.setFare(actualFare);
    let adjustedFare = this.fareCappingService.adjustFare(journey, actualFare);
    //setting the adjusted fare
    journey.setFare(adjustedFare);
    //deducting the adjusted fare from the balance
    card.deduct(adjustedFare);
    return activeJourney;
  }

  getJourneysByDate(dateKey: string): Journey[] {
    return this.journeysByDate[dateKey] ?? [];
  }

  getAllJourneys(): Journey[] {
    return Object.values(this.journeysByDate).flat();
  }
}
