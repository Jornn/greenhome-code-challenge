let vocab = require('./vocab.js')

function convert(x) {
  if (x.toString().match(/[\D]/)) {
    return `${x} is not a valid number. Please try again`
  }
  const numberLength = x.toString().length
  const numberArray = Array.from(String(x), Number)
  const vocabLength = vocab.restEnglish.length

  let convertedNumber
  if (numberLength > (vocabLength * 3)) {
    return `Entered number is too big. Maximum digits: ${vocabLength * 3}`
  }
  for (let i = 0; i < vocabLength; i++) {
    if ((i * 3 + 1) < 4 && numberLength >= (i * 3 + 1)) {
      convertedNumber = convertSingletonsEnglish((i * 3 + 1), numberArray, numberLength, '')
    }
    else if (numberLength >= (i * 3 + 1)) {
      convertedNumber = convertSingletonsEnglish((i * 3 + 1), numberArray, numberLength, `-${vocab.restEnglish[i]}-`) + convertedNumber
    }
    if (numberLength >= (i * 3 + 3)) {
      if (numberArray[numberLength - (i * 3 + 3)] == 1) {
        convertedNumber = `hundred-${convertedNumber}`
      } else if (numberArray[numberLength - (i * 3 + 3)] == 0) {

      }
      else {
        convertedNumber = `${vocab.singletonEnglish[numberArray[numberLength - (i * 3 + 3)]]}-hundred-${convertedNumber}`
      }
    }
  }
  return convertedNumber
}

function convertSingletonsEnglish(startNumber, numberArray, numberLength, keyword) {
  if (numberLength >= (startNumber + 1)) {
    //Convert tens + singletons
    if (numberArray[numberLength - (startNumber + 1)] < 2) {
      if (numberArray[numberLength - (startNumber + 1)] * 10 + numberArray[numberLength - startNumber] == 0) {
        return
      } else {
        return vocab.singletonEnglish[numberArray[numberLength - (startNumber + 1)] * 10 + numberArray[numberLength - startNumber]] + keyword
      }
    } else {
      return vocab.tensEnglish[numberArray[numberLength - (startNumber + 1)]] + '-' + vocab.singletonEnglish[numberArray[numberLength - startNumber]] + keyword
    }
  } else {
    return vocab.singletonEnglish[numberArray[numberLength - startNumber]] + keyword
  }
}


module.exports = {
  convert
}