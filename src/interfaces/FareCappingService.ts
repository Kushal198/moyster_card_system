import { Journey } from "../entities";

export interface FareCappingService {
  adjustFare(journey: Journey, baseFare: number): number;
}
