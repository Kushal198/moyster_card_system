import Station from "./Station";

export default class Journey {
  constructor(
    private entryStation: Station,
    private exitStation: Station | null = null,
    private startTime: Date = new Date(),
    private endTime: Date | null = null
  ) {}

  public getEntryStation(): Station {
    return this.entryStation;
  }

  public getExitStation(): Station | null {
    return this.exitStation;
  }

  public getEndTime(): Date | null {
    return this.endTime;
  }

  public setExitStation(station: Station): void {
    if (this.exitStation) {
      throw new Error("Journey is already completed");
    }
    this.exitStation = station;
    this.endTime = new Date();
  }
}
