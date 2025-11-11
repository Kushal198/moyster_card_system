import { Zone } from "../entities";
import { FareRule } from "../entities";

export interface FareRuleRepository {
  findRule(from: Zone, to: Zone): FareRule | null;
  getAllRules(): FareRule[];
}
