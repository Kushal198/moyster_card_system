export class PeakHourRule {
  constructor(
    private readonly dayType: "weekday" | "weekend",
    private readonly start: string,
    private readonly end: string
  ) {}

  appliesTo(date: Date): boolean {
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;
    if ((isWeekend ? "weekend" : "weekday") !== this.dayType) return false;

    const minutes = date.getHours() * 60 + date.getMinutes();
    const [sh, sm] = this.start.split(":").map(Number);
    const [eh, em] = this.end.split(":").map(Number);

    return minutes >= sh * 60 + sm && minutes <= eh * 60 + em;
  }
}
