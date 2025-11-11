import { Journey, MoysterCard } from "../entities";

export interface FareCappingService {
  adjustFare(card: MoysterCard, journey: Journey, originalFare: number): void;
  getWeeklyTotal(date: string): number;
}
