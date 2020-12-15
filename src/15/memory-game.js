const game = (input, n) => {
  const memory = new Map()

  input.slice(0, -1).forEach((number, i) => memory.set(number, i))

  let next = input[input.length - 1]
  for (let turn = input.length - 1; turn < n - 1; turn++) {
    const current = next
    next = memory.has(current) ? turn - memory.get(current) : 0
    memory.set(current, turn)
  }

  return next
}

module.exports = {
  game
}
