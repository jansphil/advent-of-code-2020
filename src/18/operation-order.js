const ok = require('assert')

const operator = {
  '+': (a, b) => a + b,
  '*': (a, b) => a * b
}

const evaluateTree = ({ node, left, right }) => {
  const a = typeof left === 'object' ? evaluateTree(left) : left
  const b = typeof right === 'object' ? evaluateTree(right) : right
  return operator[node](a, b)
}

const parseExpressionPart1 = (chars) => {
  if (chars.length === 1) {
    return parseInt(chars[0])
  }

  let right
  let i = chars.length - 1
  if (chars[i] === ')') {
    let depth = 0
    while (true) {
      if (chars[i] === ')') {
        depth++
      } else if (chars[i] === '(') {
        depth--
      }

      if (depth === 0) {
        right = parseExpressionPart1(chars.slice(i + 1, chars.length - 1))
        break
      }

      i--
    }
  } else {
    right = parseInt(chars[i])
  }

  if (i === 0) {
    return right
  }

  const node = chars[i - 1]
  const left = parseExpressionPart1(chars.slice(0, i - 1))

  return { node, left, right }
}

const parseExpressionPart2 = (chars, rightNode) => {
  ok(chars.length > 0)
  if (chars.length === 1) {
    return parseInt(chars[0])
  }

  let right
  let i = chars.length - 1
  if (rightNode) {
    right = rightNode
    i++
  } else if (chars[i] === ')') {
    let depth = 0
    while (true) {
      if (chars[i] === ')') {
        depth++
      } else if (chars[i] === '(') {
        depth--
      }

      if (depth === 0) {
        right = parseExpressionPart2(chars.slice(i + 1, chars.length - 1))
        break
      }
      i--
    }
  } else {
    right = parseInt(chars[i])
  }

  if (i === 0) {
    return right
  }

  const node = chars[i - 1]

  if (node === '+') {
    let left
    let j = i - 2
    if (chars[j] === ')') {
      let depth = 0
      while (true) {
        if (chars[j] === ')') {
          depth++
        } else if (chars[j] === '(') {
          depth--
        }

        if (depth === 0) {
          left = parseExpressionPart2(chars.slice(j + 1, i - 2))
          break
        }
        j--
      }
    } else {
      left = parseInt(chars[j])
    }

    if (j === 0) {
      return { node, left, right }
    }
    return parseExpressionPart2(chars.slice(0, j), { node, left, right })
  } else {
    const left = parseExpressionPart2(chars.slice(0, i - 1))
    return { node, left, right }
  }
}

const part1 = (input) =>
  input
    .map((line) => line.replace(/ /g, '').split(''))
    .map((line) => parseExpressionPart1(line))
    .map((tree) => evaluateTree(tree))
    .reduce((acc, cur) => acc + cur)

const part2 = (input) =>
  input
    .map((line) => line.replace(/ /g, '').split(''))
    .map((line) => parseExpressionPart2(line))
    .map((tree) => evaluateTree(tree))
    .reduce((acc, cur) => acc + cur)

module.exports = {
  evaluateTree,
  parseExpressionPart1,
  parseExpressionPart2,
  part1,
  part2
}
