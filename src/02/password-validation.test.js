const test = require('ava').default
const { countValidPasswords, letterCountPasswordPredicate, letterPositionPasswordPredicate } = require('./password-validation')

const input = [
  '1-3 a: abcde',
  '1-3 b: cdefg',
  '2-9 c: ccccccccc',
  '1-2 a: aaa'
]

test('part 1', t => {
  t.is(countValidPasswords(input, letterCountPasswordPredicate), 2)
})

test('part 2', t => {
  t.is(countValidPasswords(input, letterPositionPasswordPredicate), 1)
})
