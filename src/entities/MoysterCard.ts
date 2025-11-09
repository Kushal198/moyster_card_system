export default class MoysterCard {
  constructor(private balance: number) {}

  public getBalance(): number {
    return this.balance;
  }

  public setBalance(balance: number): void {
    this.balance = balance;
  }
}
