const test = require('ava').default
const { run, autoHeal } = require('./handheld-console')

const input = [
  'nop +0',
  'acc +1',
  'jmp +4',
  'acc +3',
  'jmp -3',
  'acc -99',
  'acc +1',
  'jmp -4',
  'acc +6'
]

test('part 1', (t) => {
  const { accumulator } = run(input)
  t.is(accumulator, 5)
})

test('part 2', (t) => {
  const accumulator = autoHeal(input)
  t.is(accumulator, 8)
})
