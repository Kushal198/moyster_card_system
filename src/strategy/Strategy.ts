import { Journey } from "../entities";

export interface Strategy {
  applyCap(journey: Journey, currentFare: number): number;
}
