const test = require('ava').default

const { part1, part2 } = require('./shuttle-search')

const timestamp = 939
const shuttles = ['7', '13', 'x', 'x', '59', 'x', '31', '19']

test('part 1', (t) => {
  t.is(part1(timestamp, shuttles), 295)
})

test('part 2', (t) => {
  t.is(part2(shuttles), 1068781)
})
