export default class Zone {
  constructor(private readonly id: number) {}

  getId(): number {
    return this.id;
  }

  toString(): string {
    return `Zone ${this.id}`;
  }
}
