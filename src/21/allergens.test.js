const test = require('ava').default
const { run } = require('./allergens')

const input = [
  'mxmxvkd kfcds sqjhc nhms (contains dairy, fish)',
  'trh fvjkl sbzzf mxmxvkd (contains dairy)',
  'sqjhc fvjkl (contains soy)',
  'sqjhc mxmxvkd sbzzf (contains fish)'
]

test('part 1 and 2', (t) => {
  const { part1, part2 } = run(input)

  t.is(part1, 5)
  t.is(part2, 'mxmxvkd,sqjhc,fvjkl')
})
