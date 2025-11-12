import { Journey, MoysterCard } from "../entities";

export interface FareCappingService {
  adjustFare(card: MoysterCard, journey: Journey, baseFare: number): number;
}
