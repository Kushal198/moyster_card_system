import { Journey, MoysterCard } from "../entities";

export interface FareCappingService {
  adjustFare(journey: Journey): number;
  getWeeklyTotal(date: string): number;
}
