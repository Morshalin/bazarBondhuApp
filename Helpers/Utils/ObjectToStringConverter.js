export const objectToStringConverter = (action, status) => {
  function capitalizeWords(string) {
    let splitString = string.split("_").join(" ");
    return splitString.replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    });
  }

  for (const [key, value] of Object.entries(action)) {
    if (value.toString() === status.toString()) {
      return capitalizeWords(key.toLowerCase());
    }
  }
};
