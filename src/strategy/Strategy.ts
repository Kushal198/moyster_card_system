import { Journey } from "../entities";
import { capMap } from "../utils";

export interface Strategy {
  applyCap(journey: Journey, currentFare: number, fareCap?: capMap): number;
}
