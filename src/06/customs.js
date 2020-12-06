const split = require('split')
const { Transform } = require('stream')

const createGroupCollector = () => {
  let currentGroupAnswersAnyYes = new Set()
  let currentGroupAnswersAllYes
  return new Transform({
    objectMode: true,
    transform (chunk, _encoding, next) {
      if (!chunk) {
        // we encoutered a blank line => we can send out the buffered group
        next(null, { anyYes: currentGroupAnswersAnyYes, allYes: currentGroupAnswersAllYes })
        currentGroupAnswersAnyYes = new Set()
        currentGroupAnswersAllYes = undefined
      } else {
        const answers = chunk.toString().split('')

        // add answers to the part 1 condition => any
        answers.forEach((answer) => currentGroupAnswersAnyYes.add(answer))

        // add answers to the part 2 condition => all
        if (typeof currentGroupAnswersAllYes === 'undefined') {
          currentGroupAnswersAllYes = answers
        } else {
          currentGroupAnswersAllYes = currentGroupAnswersAllYes.filter((answer) => answers.includes(answer))
        }
        next()
      }
    },
    flush (done) {
      if (currentGroupAnswersAnyYes.size !== 0) {
        done(null, { anyYes: currentGroupAnswersAnyYes, allYes: currentGroupAnswersAllYes })
      } else {
        done()
      }
    }
  })
}

const createGroupAnswerCountAggregator = () => {
  let countAnyYes = 0
  let countAllYes = 0
  return new Transform({
    objectMode: true,
    transform ({ anyYes, allYes }, _encoding, next) {
      countAnyYes += anyYes.size
      countAllYes += allYes.length
      next()
    },
    flush (done) {
      done(null, { countAnyYes, countAllYes })
    }
  })
}

const sumCountOfAnswersWithStream = (inputStream) => {
  return new Promise((resolve, reject) => {
    inputStream
      .pipe(split())
      .pipe(createGroupCollector())
      .pipe(createGroupAnswerCountAggregator())
      .on('data', (aggregatedCount) => resolve(aggregatedCount))
      .on('error', (err) => reject(err))
  })
}

const sumCountOfAnswers = (input) => {
  const answersPerGroup = input.split('\n\n')
    .map((group) => group.split('\n').map((answer) => answer.split('')))

  const countAnyYes = answersPerGroup
    .map((group) => group.reduce(
      (acc, cur) => {
        cur.forEach((answer) => acc.add(answer))
        return acc
      },
      new Set()
    ))
    .map((group) => group.size)
    .reduce((acc, cur) => acc + cur)

  const countAllYes = answersPerGroup
    .map((group) => group.reduce(
      (acc, cur) => acc.filter((answer) => cur.includes(answer))
    ))
    .map((group) => group.length)
    .reduce((acc, cur) => acc + cur)

  return { countAnyYes, countAllYes }
}

module.exports = {
  sumCountOfAnswersWithStream,
  sumCountOfAnswers
}
