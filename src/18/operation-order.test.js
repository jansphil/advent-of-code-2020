const test = require('ava').default
const { part1, part2, evaluateTree, parseExpressionPart1 } = require('./operation-order')

const input = []

test('part 1', (t) => {
  t.is(part1(input), 42)
})

test('part 2', (t) => {
  t.is(part2(input), 42)
})

test('evaluate tree', (t) => {
  const input = {
    node: '+',
    left: {
      node: '*',
      left: 6,
      right: 2
    },
    right: {
      node: '+',
      left: {
        node: '*',
        left: 2,
        right: 3
      },
      right: 4
    }
  }

  t.is(evaluateTree(input), 22)
})

test.only('parse expressions part 1', (t) => {
  t.deepEqual(parseExpressionPart1(['2', '*', '4']), { node: '*', left: 2, right: 4 })
  t.deepEqual(parseExpressionPart1(['2', '*', '4', '+', '5']), { node: '+', left: { node: '*', left: 2, right: 4 }, right: 5 })
  t.deepEqual(parseExpressionPart1(['(', '2', '*', '4', '+', '5', ')']), { node: '+', left: { node: '*', left: 2, right: 4 }, right: 5 })
  t.deepEqual(parseExpressionPart1(['2', '+', '4', '*', '(', '5', '+', '1', ')']), { node: '*', left: { node: '+', left: 2, right: 4 }, right: { node: '+', left: 5, right: 1 } })
})
