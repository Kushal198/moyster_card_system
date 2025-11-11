import { FareRule } from "../entities";
import { Zone } from "../entities";
import { FareRuleRepository } from "../interfaces";

export class FareRuleRepositoryImpl implements FareRuleRepository {
  private rules: FareRule[];

  constructor() {
    this.rules = [
      new FareRule(new Zone(1), new Zone(1), 30, 25),
      new FareRule(new Zone(1), new Zone(2), 35, 30),
      new FareRule(new Zone(2), new Zone(2), 25, 20),
    ];
  }

  findRule(from: Zone, to: Zone): FareRule | null {
    return this.rules.find((rule) => rule.matches(from, to)) || null;
  }

  getAllRules(): FareRule[] {
    return this.rules;
  }
}
