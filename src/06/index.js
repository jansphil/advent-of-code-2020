const { readStream, readFile } = require('../utils')
const { sumCountOfAnswersWithStream, sumCountOfAnswers } = require('./customs')

sumCountOfAnswersWithStream(readStream(__dirname))
  .then(({ countAnyYes, countAllYes }) => console.log(`Part I ${countAnyYes} | Part II ${countAllYes}`))
  .catch((err) => console.error(err))

const { countAllYes, countAnyYes } = sumCountOfAnswers(readFile(__dirname))
console.log(`Part I ${countAnyYes} | Part II ${countAllYes}`)
