const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PLN",
  maximumFractionDigits: 2,
  minimumFractionDigits: 0
});

export default function formatPrice(amount: string | number | null) {
  if (!amount) return "";
  return intl.format(Number(amount));
}
