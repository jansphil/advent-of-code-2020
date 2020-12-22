const test = require('ava').default
const { part1, part2 } = require('./crab-combat')

const input = [
  [9, 2, 6, 3, 1],
  [5, 8, 4, 7, 10]
]

test('part 1', (t) => {
  t.is(part1(input), 306)
})

test('part 2', (t) => {
  t.is(part2(input), 291)
})
