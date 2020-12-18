const operator = {
  '+': (a, b) => a + b,
  '*': (a, b) => a * b
}

const evaluateTree = ({ node, left, right }) => {
  const a = typeof left === 'object' ? evaluateTree(left) : left
  const b = typeof right === 'object' ? evaluateTree(right) : right
  return operator[node](a, b)
}

const parseExpressionPart1 = (expression) => {
  if (expression.length === 1) {
    return typeof expression[0] === 'string' ? parseInt(expression[0]) : expression[0]
  }

  let chars = [...expression]
  while (chars.indexOf('(') !== -1) {
    const leftParanthesis = chars.indexOf('(')
    let depth = 1
    for (let i = leftParanthesis + 1; i < chars.length; i++) {
      if (chars[i] === '(') {
        depth++
      } else if (chars[i] === ')') {
        depth--
        if (depth === 0) {
          const inner = parseExpressionPart1(chars.slice(leftParanthesis + 1, i))
          chars = [...chars.slice(0, leftParanthesis), inner, ...chars.slice(i + 1)]
          break
        }
      }
    }
  }

  const len = chars.length
  const node = chars[len - 2]
  const right = parseExpressionPart1(chars.slice(len - 1))
  const left = parseExpressionPart1(chars.slice(0, len - 2))

  return { node, left, right }
}

const evaluatePart2 = (input) => {
  let chars = input

  while (chars.indexOf('(') !== -1) {
    const start = chars.indexOf('(')
    let end = start + 1
    let depth = 1

    while (depth !== 1 || chars[end] !== ')') {
      if (chars[end] === '(') depth++
      else if (chars[end] === ')') depth--
      end++
    }

    const inner = evaluatePart2(chars.substring(start + 1, end))
    chars = chars.substring(0, start) + inner + chars.substring(end + 1)
  }

  return chars
    .split('*')
    .map((term) =>
      term.length === 1
        ? parseInt(term)
        : term
          .split('+')
          .map((num) => parseInt(num))
          .reduce((acc, cur) => acc + cur)
    )
    .reduce((acc, cur) => acc * cur)
}

const part1 = (input) =>
  input
    .map((line) => line.replace(/ /g, '').split(''))
    .map((line) => parseExpressionPart1(line))
    .map((tree) => evaluateTree(tree))
    .reduce((acc, cur) => acc + cur)

const part2 = (input) =>
  input
    .map((line) => line.replace(/ /g, ''))
    .map((line) => evaluatePart2(line))
    .reduce((acc, cur) => acc + cur)

module.exports = {
  evaluateTree,
  parseExpressionPart1,
  part1,
  part2
}
