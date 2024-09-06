/**
 *
 * @param date The date to be compared
 * @param expiresIn data valid for N milliseconds
 * @returns boolean
 */
export function isDateExpired(date: Date, expiresIn: number) {
  return Number(new Date()) - Number(date) >= expiresIn;
}
