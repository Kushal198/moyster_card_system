export class FareCap {
  constructor(
    private readonly zoneRange: string,
    private readonly dailyCap: number,
    private readonly weeklyCap: number
  ) {}

  getZoneRange(): string {
    return this.zoneRange;
  }

  getDailyCap(): number {
    return this.dailyCap;
  }

  getWeeklyCap(): number {
    return this.weeklyCap;
  }
}
