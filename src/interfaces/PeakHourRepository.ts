// repositories/PeakHourRepository.ts
export interface PeakHourRepository {
  isPeak(date: Date): boolean;
}
