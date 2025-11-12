import Station from "./Station";

export default class Journey {
  private farePaid: number = 0;

  constructor(
    private readonly entryStation: Station,
    private readonly startTime: Date,
    private exitStation: Station | null = null,
    private endTime: Date | null = null
  ) {
    if (exitStation && !endTime) {
      throw new Error("End time must be provided if journey is complete");
    }
  }

  getEntryStation(): Station {
    return this.entryStation;
  }

  getExitStation(): Station | null {
    return this.exitStation;
  }

  setExitStation(exitStation: Station | null): void {
    if (this.exitStation) {
      throw new Error("Journey is already completed");
    }
    this.exitStation = exitStation;
    this.endTime = new Date();
  }

  getStartTime(): Date {
    return this.startTime;
  }

  getEndTime(): Date | null {
    return this.endTime;
  }

  setEndTime(endTime: Date): void {
    this.endTime = endTime;
  }

  getFarePaid(): number {
    return this.farePaid;
  }

  setFare(amount: number): void {
    if (amount < 0) throw new Error("Fare cannot be negative");
    this.farePaid = amount;
  }

  complete(exitStation: Station, endTime: Date = new Date()): void {
    if (this.exitStation) throw new Error("Journey is already completed");
    this.exitStation = exitStation;
    this.endTime = endTime;
  }

  isComplete(): boolean {
    return this.exitStation !== null;
  }

  toString(): string {
    const end = this.isComplete() ? this.exitStation?.getName() : "In progress";
    return `${this.entryStation.getName()} → ${end}`;
  }
}
