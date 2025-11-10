import Journey from "./Journery";
import Station from "./Station";

export default class MoysterCard {
  constructor(
    private balance: number,
    // private journeys: Journey[] = [],
    public journeysByDate: Record<string, Journey[]> = {}
  ) {}

  public getBalance(): number {
    return this.balance;
  }

  public setBalance(balance: number): void {
    this.balance = balance;
  }

  public startJourney(entryStation: Station, startTime?: Date): Journey {
    const journey = new Journey(entryStation, startTime || new Date());
    const date = journey.getStartTime().toDateString();
    if (!this.journeysByDate[date]) this.journeysByDate[date] = [];
    this.journeysByDate[date].push(journey);
    return journey;
  }

  getJourneysByDate(date: string): Journey[] {
    return this.journeysByDate[date] ?? [];
  }

  getAllJourneys(): Journey[] {
    return Object.values(this.journeysByDate).flat();
  }

  completeJourney(exitStation: Station, journery: Journey): Journey | null {
    const today = journery.getStartTime().toDateString();
    // Get all journeys for today
    const todaysJourneys = this.journeysByDate[today] ?? [];
    // Find the first active journey without exitStation
    const journey = todaysJourneys.find((j) => j.getExitStation() === null);

    if (!journey) {
      console.log("No active journey to complete");
      return null;
    }
    // Complete the journey
    journey.setExitStation(exitStation); // sets exitStation and endTime
    return journey;
  }
}
