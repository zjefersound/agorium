interface ToCurrencyOptions extends Intl.NumberFormatOptions {
  locale: Intl.LocalesArgument;
}
export function toCurrency(
  value: number,
  options: ToCurrencyOptions = { locale: "pt-BR", currency: "BRL" }
) {
  return new Intl.NumberFormat(options.locale, {
    style: "currency",
    ...options,
  }).format(value);
}
