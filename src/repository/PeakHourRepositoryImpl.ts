import { PeakHourRepository } from "../interfaces";
import { PeakHourRule } from "../utils";

export class PeakHourRepositoryImpl implements PeakHourRepository {
  private rules: PeakHourRule[];

  constructor() {
    this.rules = [
      new PeakHourRule("weekday", "07:00", "10:30"),
      new PeakHourRule("weekday", "17:00", "20:00"),
      new PeakHourRule("weekend", "09:00", "11:00"),
      new PeakHourRule("weekend", "18:00", "22:00"),
    ];
  }

  isPeak(date: Date): boolean {
    return this.rules.some((rule) => rule.appliesTo(date));
  }
}
