

function rot13(str) {
  
  let codes = [];

  for (let i = 0; i < str.length; i++) {
    codes.push(str.charCodeAt(i));
  }
  console.log(codes);

  let newCodes = codes.map(code => {
    let temp;
    if (code >= 65 && code <= 77) {
      temp = code + 13;
    } else if (code >= 78 && code <= 90) {
      temp = code - 13;
    } else {
      temp = code;
    }
    return String.fromCharCode(temp);
  })
  console.log(newCodes);

  return newCodes.join("");
}

rot13("SERR PBQR PNZC");


