let vocab = require('./vocab.js')

function convert(x) {
  if (x.toString().match(/[\D]/)) {
    return `Invalid number. Please try again`
  }
  const numberLength = x.toString().length
  const numberArray = Array.from(String(x), Number)
  const vocabLength = vocab.restDutch.length

  let convertedNumber
  if (numberLength > (vocabLength * 3)) {
    return `Entered number is too big. Maximum digits: ${vocabLength * 3}`
  }
  for (let i = 0; i < vocabLength; i++) {
    //Convert numbers smaller than 100 ( Less than 4 digits )
    if ((i * 3 + 1) < 4 && numberLength >= (i * 3 + 1)) {
      convertedNumber = convertSingletonsDutch((i * 3 + 1), numberArray, numberLength, '')
    }
    //Convert rest of the numbers
    else if (numberLength >= (i * 3 + 1)) {
      convertedNumber = convertSingletonsDutch((i * 3 + 1), numberArray, numberLength, `-${vocab.restDutch[i]}-`) + convertedNumber
    }
    //Converts the hundreds
    if (numberLength >= (i * 3 + 3)) {
      //If one-hundred -> send without one
      if (numberArray[numberLength - (i * 3 + 3)] == 1) {
        convertedNumber = `honderd-${convertedNumber}`
      }
      //If zero-hundred -> Dont add hundreds
      else if (numberArray[numberLength - (i * 3 + 3)] == 0) { }
      //Adds hundreds
      else {
        convertedNumber = `${vocab.singletonDutch[numberArray[numberLength - (i * 3 + 3)]]}-honderd-${convertedNumber}`
      }
    }
  }
  return convertedNumber
}

function convertSingletonsDutch(startNumber, numberArray, numberLength, keyword) {
  if (numberLength >= (startNumber + 1)) {
    //Seperate logic first digits smaller than 20 - different number names ( ex: twelve )
    if (numberArray[numberLength - (startNumber + 1)] < 2) {
      //Return nothing if 0
      if (numberArray[numberLength - (startNumber + 1)] * 10 + numberArray[numberLength - startNumber] == 0) {
        return
      }
      //Return number < 20
      else {
        return vocab.singletonDutch[numberArray[numberLength - (startNumber + 1)] * 10 + numberArray[numberLength - startNumber]] + keyword
      }
    }
    //Return number > 20 with "en" inbetween
    else {
      return vocab.singletonDutch[numberArray[numberLength - startNumber]] + '-en-' + vocab.tensDutch[numberArray[numberLength - (startNumber + 1)]] + keyword
    }
  }
  else if (numberArray[numberLength - startNumber] == 1) {
    return keyword.substr(1)
  }
  else if (numberArray[numberLength - startNumber] == 0) {
  }
  else {
    return vocab.singletonDutch[numberArray[numberLength - startNumber]] + keyword
  }
}

module.exports = {
  convert
}