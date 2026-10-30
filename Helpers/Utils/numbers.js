export const isNumberPositive = (str) => {
  if (str === "") return true;

  const dotCount = str.split(".").length - 1;

  if (dotCount > 1) {
    return false;
  }

  for (let i = 0; i < str.length; i++) {
    if (str[i] === ".") continue;
    if (str[i] < "0" || str[i] > "9") {
      return false;
    }
  }
  return true;
};
