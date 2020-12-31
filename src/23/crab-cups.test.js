const test = require('ava').default
const { part1, part2 } = require('./crab-cups')

const input = [3, 8, 9, 1, 2, 5, 4, 6, 7]

test('part 1', (t) => {
  t.is(part1(input), '67384529')
})

test('part 2', (t) => {
  t.is(part2(input), 149245887792)
})
