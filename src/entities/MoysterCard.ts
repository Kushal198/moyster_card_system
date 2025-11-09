import Journey from "./Journery";
import Station from "./Station";

export default class MoysterCard {
  constructor(private balance: number, private journeys: Journey[] = []) {}

  public getBalance(): number {
    return this.balance;
  }

  public setBalance(balance: number): void {
    this.balance = balance;
  }

  public startJourney(entryStation: Station): Journey {
    const journey = new Journey(entryStation);
    this.journeys.push(journey);
    return journey;
  }

  public getJourneys(): Journey[] {
    return this.journeys;
  }

  completeJourney(exitStation: Station): Journey {
    const journey = this.journeys.find((j) => j.getExitStation() === null);
    if (!journey) throw new Error("No active journey to complete");
    journey.setExitStation(exitStation); // sets exitStation and endTime
    return journey;
  }
}
