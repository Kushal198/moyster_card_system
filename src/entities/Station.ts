export default class Station {
  constructor(private readonly name: string, private readonly zone: number) {}

  public getName(): string {
    return this.name;
  }

  public getZone(): number {
    return this.zone;
  }
}
