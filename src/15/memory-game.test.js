const test = require('ava').default
const { game } = require('./memory-game')

test('part 1', (t) => {
  t.is(game([1, 3, 2], 2020), 1)
  t.is(game([2, 1, 3], 2020), 10)
  t.is(game([1, 2, 3], 2020), 27)
  t.is(game([2, 3, 1], 2020), 78)
  t.is(game([3, 2, 1], 2020), 438)
  t.is(game([3, 1, 2], 2020), 1836)
})

test('part 2', (t) => {
  t.is(game([1, 3, 2], 30000000), 2578)
})
