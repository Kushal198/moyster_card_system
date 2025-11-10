import Station from "./Station";

export default class Journey {
  private startTime: Date;
  constructor(
    private entryStation: Station,
    startTime?: Date,
    private exitStation: Station | null = null,
    private endTime: Date | null = null,

    public farePaid: number = 0
  ) {
    this.startTime = startTime || new Date();
  }

  public getEntryStation(): Station {
    return this.entryStation;
  }

  public getExitStation(): Station | null {
    return this.exitStation;
  }

  public getEndTime(): Date | null {
    return this.endTime;
  }

  getStartTime(): Date {
    return this.startTime;
  }

  public setExitStation(station: Station): void {
    if (this.exitStation) {
      throw new Error("Journey is already completed");
    }
    this.exitStation = station;
    this.endTime = new Date();
  }
  public isComplete(): boolean {
    return this.exitStation !== null;
  }
}
