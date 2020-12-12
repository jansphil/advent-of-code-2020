const test = require('ava').default
const { part1, part2 } = require('./navigation-system')

const input = [
  'F10',
  'N3',
  'F7',
  'R90',
  'F11'
]

test('part 1', (t) => {
  t.is(part1(input), 25)
})

test('part 2', (t) => {
  t.is(part2(input), 286)
})
