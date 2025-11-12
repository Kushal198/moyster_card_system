import Zone from "./Zone";

export default class Station {
  constructor(private readonly name: string, private readonly zone: Zone) {}

  getName(): string {
    return this.name;
  }

  getZone(): Zone {
    return this.zone;
  }
}
