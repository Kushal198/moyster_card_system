import Journey from "./Journery";
import Station from "./Station";

export default class MoysterCard {
  private journeys: Journey[] = [];
  private balance: number;

  constructor(initialBalance: number) {
    if (initialBalance < 0) throw new Error("Negative balance");
    this.balance = initialBalance;
  }

  getBalance(): number {
    return this.balance;
  }

  addJourney(journey: Journey): void {
    this.journeys.push(journey);
  }

  getAllJourneys(): Journey[] {
    return this.journeys;
  }

  getJourneysByDate(dateKey: string): Journey[] {
    return this.journeys.filter(
      (j) => j.getStartTime().toISOString().split("T")[0] === dateKey
    );
  }

  addBalance(amount: number): void {
    if (amount <= 0) throw new Error("Invalid amount");
    this.balance += amount;
  }

  deduct(amount: number): void {
    if (amount > this.balance) throw new Error("Insufficient balance");
    this.balance -= amount;
  }
}
