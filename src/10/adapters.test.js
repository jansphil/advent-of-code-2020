const test = require('ava').default
const { part1, part2 } = require('./adapters')

const input = [
  28,
  33,
  18,
  42,
  31,
  14,
  46,
  20,
  48,
  47,
  24,
  23,
  49,
  45,
  19,
  38,
  39,
  11,
  1,
  32,
  25,
  35,
  8,
  17,
  7,
  9,
  4,
  2,
  34,
  10,
  3
]

test('part 1', (t) => {
  t.is(part1(input), 220)
})

test('part 2', (t) => {
  t.is(part2(input), 19208)
})
