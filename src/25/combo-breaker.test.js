const test = require('ava').default
const { part1 } = require('./combo-breaker')

test('part 1', (t) => {
  t.is(part1(5764801, 17807724), 14897079)
})
