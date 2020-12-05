const { readStream } = require('../utils')
const { getHighestSeatId, findEmptySeat } = require('./plane-seats')

getHighestSeatId(readStream(__dirname))
  .then((highestSeatId) => console.log(`Highest seat id: ${highestSeatId}`))
  .catch((err) => console.error(err))

findEmptySeat(readStream(__dirname))
  .then((emptySeatId) => console.log(`Empty seat id: ${emptySeatId}`))
  .catch((err) => console.error(err))
