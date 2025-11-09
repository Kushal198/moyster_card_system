export default class MoysterCard {
  constructor(private readonly balance: number) {}

  public getBalance(): number {
    return this.balance;
  }
}
