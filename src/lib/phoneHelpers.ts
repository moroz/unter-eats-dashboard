export const formatPhone = (phoneNo: string) => {
  return String(phoneNo)
    .match(/.{1,3}/g)
    ?.join(" ");
};
