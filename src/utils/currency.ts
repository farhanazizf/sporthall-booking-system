const format = (
  countryCode: string,
  currency: string,
  number: number
): string => {
  const options = {
    currency,
    style: "currency",
    currencyDisplay: "symbol",
  };

  return new Intl.NumberFormat(countryCode, options).format(number);
};

export const rupiah = (number: number): string =>
  format("id-ID", "IDR", number).slice(0, -3);

export default format;
