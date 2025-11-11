import { Journey } from "../entities";

export interface FareCalculationService {
  calculateFare(journey: Journey): number;
  getMaxFare(fromZoneId: number): number;
}
