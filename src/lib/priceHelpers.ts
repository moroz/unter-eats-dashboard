export const formatPrice = (price: number | string | null | undefined) => {
  if (price === null || price === undefined) return null;
  const isInt = Math.round(Number(price)) == Number(price);
  if (isInt) return `${Number(price)} zł`;
  return Number(price).toFixed(2).replace(".", ",") + " zł";
};
