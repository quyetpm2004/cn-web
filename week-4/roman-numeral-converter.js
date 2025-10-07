

function convertToRoman(num) {
  const roman = {
    numerals: {
      1000: "M",
      900: "CM",
      500: "D",
      400: "CD",
      100: "C",
      90: "XC",
      50: "L",
      40: "XL",
      10: "X",
      9: "IX",
      5: "V",
      4: "IV",
      1: "I"
    },
    values: [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  };

  if (typeof num !== "number" || isNaN(num)) {
    return "Not a number in roman numerals";
  }
  if (num <= 0) {
    return "Please enter a positive number";
  }
  if (num >= 5000) {
    return "Please enter a smaller number (<5000)";
  }

  let convert = "";
  let i = 0;

  while (num > 0 && i < roman.values.length) {
    if (num >= roman.values[i]) {
      convert += roman.numerals[roman.values[i]];
      num -= roman.values[i];
    } else {
      i++;
    }
  }

  return convert.toUpperCase();
}




convertToRoman(36);


