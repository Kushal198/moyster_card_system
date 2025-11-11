import { Zone } from "../entities";
import { FareRule } from "../utils";

export interface FareRuleRepository {
  findRule(from: Zone, to: Zone): FareRule | null;
  getAllRules(): FareRule[];
}
