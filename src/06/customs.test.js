const test = require('ava').default
const { sumCountOfAnswers } = require('./customs')

const input =
`abc

a
b
c

ab
ac

a
a
a
a

b`

test('count of answers', (t) => {
  const { countAllYes, countAnyYes } = sumCountOfAnswers(input)
  t.is(countAnyYes, 11)
  t.is(countAllYes, 6)
})
