const test = require('ava').default
const { part1, part2 } = require('./xmas-encryption')

const input = [
  35,
  20,
  15,
  25,
  47,
  40,
  62,
  55,
  65,
  95,
  102,
  117,
  150,
  182,
  127,
  219,
  299,
  277,
  309,
  576
]

test('part 1', (t) => {
  t.is(part1(input, 5), 127)
})

test('part 2', (t) => {
  t.is(part2(input, 127), 62)
})
