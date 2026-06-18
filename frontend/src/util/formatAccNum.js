export const formatAccountNumber = (value) => {
  return value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
};
