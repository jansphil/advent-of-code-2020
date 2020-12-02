const test = require('ava').default
const { findPairAddingUpTo, findTriadeAddingUpTo } = require('./expense-report')

const input = [1721, 979, 366, 299, 675, 1456]

test('part 1', t => {
  const pair = findPairAddingUpTo(input, 2020)
  t.is(pair[0] * pair[1], 514579)
})

test('part 2', t => {
  const triade = findTriadeAddingUpTo(input, 2020)
  t.is(triade[0] * triade[1] * triade[2], 241861950)
})
