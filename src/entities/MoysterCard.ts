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

  addBalance(amount: number): void {
    if (amount <= 0) throw new Error("Invalid amount");
    this.balance += amount;
  }

  deduct(amount: number): void {
    if (amount > this.balance) throw new Error("Insufficient balance");
    this.balance -= amount;
  }
  // public dailyTotals: Record<string, number> = {}; // key = YYYY-MM-DD
  // public weeklyTotals: Record<string, number> = {}; // key = weekStart (YYYY-MM-DD)
  // public journeysByDate: Record<string, Journey[]> = {};
  // private balance: number;

  // constructor(balance: number) {
  //   if (balance < 0) throw new Error("Negative balance");
  //   this.balance = balance;
  // }

  // public getBalance(): number {
  //   return this.balance;
  // }

  // public setBalance(balance: number): void {
  //   this.balance = balance;
  // }
  // private getWeekStart(date: Date): Date {
  //   const d = new Date(date);
  //   const day = d.getDay(); // 0 (Sun) - 6 (Sat)
  //   const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday as start
  //   return new Date(d.setDate(diff));
  // }
  // private getDateKey(date: Date): string {
  //   return date.toISOString().split("T")[0];
  // }

  // private getWeekKey(date: Date): string {
  //   const weekStart = this.getWeekStart(date);
  //   return weekStart.toISOString().split("T")[0];
  // }

  // public startJourney(entryStation: Station, startTime?: Date): Journey {
  //   const journey = new Journey(entryStation, startTime || new Date());
  //   const date = journey.getStartTime().toDateString();
  //   if (!this.journeysByDate[date]) this.journeysByDate[date] = [];
  //   this.journeysByDate[date].push(journey);
  //   const dateKey = this.getDateKey(journey.getStartTime());
  //   const weekKey = this.getWeekKey(journey.getStartTime());
  //   // Update daily total
  //   this.dailyTotals[dateKey] =
  //     (this.dailyTotals[dateKey] || 0) + journey.farePaid;

  //   // Update weekly total
  //   this.weeklyTotals[weekKey] =
  //     (this.weeklyTotals[weekKey] || 0) + journey.farePaid;
  //   return journey;
  // }

  // public deductBalance(amount: number): void {
  //   this.balance -= amount;
  // }

  // getJourneysByDate(date: string): Journey[] {
  //   return this.journeysByDate[date] ?? [];
  // }

  // getAllJourneys(): Journey[] {
  //   return Object.values(this.journeysByDate).flat();
  // }

  // completeJourney(exitStation: Station, journery: Journey): Journey | null {
  //   const today = journery.getStartTime().toDateString();
  //   // Get all journeys for today
  //   const todaysJourneys = this.journeysByDate[today] ?? [];
  //   // Find the first active journey without exitStation
  //   const journey = todaysJourneys.find((j) => j.getExitStation() === null);

  //   if (!journey) {
  //     console.log("No active journey to complete");
  //     return null;
  //   }
  //   // Complete the journey
  //   journey.setExitStation(exitStation); // sets exitStation and endTime
  //   return journey;
  // }
}
