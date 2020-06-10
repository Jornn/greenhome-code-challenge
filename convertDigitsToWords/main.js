let prompt = require('prompt-sync')();
let convertToDutch = require('./convertToDutch.js')
let convertToEnglish = require('./convertToEnglish.js')


function main() {
  const language = getLanguage()
  console.log(`Chosen language is: ${language}`);
  const input = Number(getNumber())
  convertedNumber = language == "English" ? convertToEnglish.convert(input) : convertToDutch.convert(input)
  console.log(convertedNumber)
}

function getLanguage() {
  console.log('What language do you want to convert to? ')
  let input = prompt('Type \"e\" for English. Type \"d\" for Dutch: ');
  if (input.toLowerCase() == "e") {
    return "English"
  } else if (input.toLowerCase() == "d") {
    return "Dutch"
  } else {
    console.log("Incorrect input, please try again.")
    return getLanguage()
  }
}

function getNumber() {
  return prompt('What number do you want to convert?: ');
}

main()





