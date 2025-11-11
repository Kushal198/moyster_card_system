import { Journey, MoysterCard, Station } from "../entities";
import { Helper } from "../utils";
import FareCalculationServiceImpl from "./FareCalculationServiceImpl";

export default class MoysterCardService {
  private journeysByDate: Record<string, Journey[]> = {};

  constructor(private fareCalculator: FareCalculationServiceImpl) {}

  //   startJourney(entryStation: Station, startTime = new Date()): Journey {
  //     const journey = new Journey(entryStation, startTime);
  //     const dateKey = Helper.getDateKey(startTime);

  //     if (!this.journeysByDate[dateKey]) this.journeysByDate[dateKey] = [];
  //     this.journeysByDate[dateKey].push(journey);

  //     return journey;
  //   }

  startJourney(card: MoysterCard, entryStation: Station, date: Date): Journey {
    const journey = new Journey(entryStation, date);
    // You could calculate max fare if needed for incomplete journey
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
    // const dateKey = Helper.getDateKey(journey.getStartTime());
    const dataKey = journey.getStartTime().toDateString();
    const journeys = this.journeysByDate[dataKey] ?? [];
    let activeJourney = journeys.find((j) => j.getExitStation() === null);

    if (!activeJourney) {
      console.log("No active journey to complete");
      return null;
    }
    // Complete the journey
    activeJourney.setExitStation(exitStation);
    const actualFare = this.fareCalculator.calculateFare(journey);
    journey.setFare(actualFare);
    // card.deduct(actualFare);

    return activeJourney;
  }

  getJourneysByDate(dateKey: string): Journey[] {
    return this.journeysByDate[dateKey] ?? [];
  }

  getAllJourneys(): Journey[] {
    return Object.values(this.journeysByDate).flat();
  }
}
