const test = require('ava').default
const { part1, part2 } = require('./conway-cubes')

const input = [
  ['.', '#', '.'],
  ['.', '.', '#'],
  ['#', '#', '#']
]

test('part 1', (t) => {
  t.is(part1(input), 112)
})

test('part 2', (t) => {
  t.is(part2(input), 848)
})
