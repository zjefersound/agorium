export function formatCompactNumber(number: number) {
  const formatter = Intl.NumberFormat("en-US", { notation: "compact" });
  return formatter.format(number).toLocaleLowerCase();
}
