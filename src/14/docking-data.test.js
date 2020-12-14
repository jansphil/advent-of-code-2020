const test = require('ava').default
const { part1, part2 } = require('./docking-data')

test('part 1', (t) => {
  const input = [
    'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
    'mem[8] = 11',
    'mem[7] = 101',
    'mem[8] = 0'
  ]

  t.is(part1(input), 165)
})

test('part 2', (t) => {
  const input = [
    'mask = 000000000000000000000000000000X1001X',
    'mem[42] = 100',
    'mask = 00000000000000000000000000000000X0XX',
    'mem[26] = 1'
  ]

  t.is(part2(input), 208)
})
