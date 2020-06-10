let prompt = require('prompt-sync')();
let vocab = require('./vocab.js')


function main() {
  const language = getLanguage()
  console.log(`Chosen language is: ${language}`);
  const input = getWords(language).toString()
  convertedNumber = language == "English" ? convertFromEnglish(input) : convertFromDutch(input)
  console.log(`Converted number: ${convertedNumber}`)
}

function getLanguage() {
  console.log("What language do you want to convert from?")
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

function getWords(language) {
  console.log("What words do you want to convert? ")

  language == "Dutch" ? console.log("Example: honderd duizend twee en vijftig ") : console.log("Example: one hundred fifty two ")

  return prompt('What words do you want to convert? ');
}

function convertFromEnglish(words){
  const splitWords = words.split(/[\s-]+/)
  const wordsLength = splitWords.length
  let lowNumbers = 0;
  let hundreds = 0;
  splitWords.forEach((word, i) => {
    if (vocab.singletonEnglish[word] != null) {
      hundreds += vocab.singletonEnglish[word]
    } else if (word == "hundred") {
      if (hundreds == 0) {
        hundreds = 100
      } else {
        hundreds = hundreds * 100
      }
    } else {
      lowNumbers = lowNumbers + hundreds * vocab.MagnitudeEnglish[word]
      hundreds = 0
    }
  })
  return (lowNumbers+hundreds)
}

function convertFromDutch(words) {
  const splitWords = words.split(/[\s-]+/)
  const wordsLength = splitWords.length
  let lowNumbers = 0;
  let hundreds = 0;
  splitWords.forEach((word, i) => {
    if (vocab.singletonDutch[word] != null) {
      hundreds += vocab.singletonDutch[word]
    } else if (word == "honderd") {
      if (hundreds == 0) {
        hundreds = 100
      } else {
        hundreds = hundreds * 100
      }
    } else {
      if (vocab.MagnitudeDutch[word] != null) {
        if (hundreds == 0) {
          lowNumbers = lowNumbers + 1 * vocab.MagnitudeDutch[word]
        } else {
          lowNumbers = lowNumbers + hundreds * vocab.MagnitudeDutch[word]
        }
        hundreds = 0
      }
    }
  })
  return (lowNumbers + hundreds)
}

main()





