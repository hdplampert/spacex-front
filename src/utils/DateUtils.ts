
export class DateUtils {

  static dateToString(date?: Date) {
    return date ? date.toLocaleString() : "";
  }

  static dateFromUnixSeconds(sec: number) {
    return sec ? new Date(sec * 1000) : undefined
  }

}