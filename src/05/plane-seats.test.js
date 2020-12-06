const test = require('ava').default
const { Readable } = require('stream')
const { findEmptySeat, getHighestSeatId } = require('./plane-seats')

function * getHighestSeatIdInputGenerator () {
  yield 'BFFFBBFRRR\n' +
        'FFFBBBFRRR\n' +
        'BBFFBBFRLL\n'
}

test('when finding the highest seat', async (t) => {
  const id = await getHighestSeatId(Readable.from(getHighestSeatIdInputGenerator()))
  t.is(id, 820)
})

function * getEmptySeatIdInputGenerator () {
  yield 'BBFFBBFLLL\n' +
        'BBFFBBFLLR\n' +
        'BBFFBBFLRL\n'
  //    'BBFFBBFLRR\n'  this will be the missing seat
  yield 'BBFFBBFRLL\n' +
        'BBFFBBFRLR\n' +
        'BBFFBBFRRL\n' +
        'BBFFBBFRRR\n'
}

test('when finding the empty seat', async (t) => {
  const id = await findEmptySeat(Readable.from(getEmptySeatIdInputGenerator()))
  t.is(id, 819)
})
