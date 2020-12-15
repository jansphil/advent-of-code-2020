const game = (input, n) => {
  const memory = new Map()
  input.forEach((number, i) => {
    memory.set(number, { last: i + 1, before: undefined })
  })

  let turn = input.length + 1
  let lastNumber = input[input.length - 1]
  while (turn <= n) {
    const { last, before } = memory.get(lastNumber)
    const number = typeof before === 'undefined' ? 0 : last - before

    if (memory.has(number)) {
      const { last: previousLast } = memory.get(number)
      memory.set(number, { last: turn, before: previousLast })
    } else {
      memory.set(number, { last: turn, before: undefined })
    }

    lastNumber = number
    turn++
  }

  return lastNumber
}

module.exports = {
  game
}
