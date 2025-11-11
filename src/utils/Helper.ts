export class Helper {
  static getWeekStart(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay(); // 0 (Sun) - 6 (Sat)
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday as start
    return new Date(d.setDate(diff));
  }

  static getDateKey(date: Date): string {
    return date.toISOString().split("T")[0];
  }

  static getWeekKey(date: Date): string {
    return this.getDateKey(this.getWeekStart(date));
  }
}
