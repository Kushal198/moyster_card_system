import Zone from "./Zone";

export default class Station {
  constructor(private readonly name: string, private readonly zone: Zone) {}

  public getName(): string {
    return this.name;
  }

  public getZone(): Zone {
    return this.zone;
  }
}
