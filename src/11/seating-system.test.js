const test = require('ava').default
const { part1, part2 } = require('./seating-system')

const input = [
  ['L', '.', 'L', 'L', '.', 'L', 'L', '.', 'L', 'L'],
  ['L', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L', 'L'],
  ['L', '.', 'L', '.', 'L', '.', '.', 'L', '.', '.'],
  ['L', 'L', 'L', 'L', '.', 'L', 'L', '.', 'L', 'L'],
  ['L', '.', 'L', 'L', '.', 'L', 'L', '.', 'L', 'L'],
  ['L', '.', 'L', 'L', 'L', 'L', 'L', '.', 'L', 'L'],
  ['.', '.', 'L', '.', 'L', '.', '.', '.', '.', '.'],
  ['L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L'],
  ['L', '.', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L'],
  ['L', '.', 'L', 'L', 'L', 'L', 'L', '.', 'L', 'L']
]

test('part 1', (t) => {
  t.is(part1(input), 37)
})

test('part 2', (t) => {
  t.is(part2(input), 26)
})
