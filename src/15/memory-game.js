const game = (input, n) => {
  const memory = {}
  input.forEach((number, i) => {
    memory[number] = { last: i + 1, before: undefined }
  })

  let turn = input.length + 1
  let lastNumber = input[input.length - 1]
  while (turn <= n) {
    const number = memory[lastNumber].before ? memory[lastNumber].last - memory[lastNumber].before : 0

    if (memory[number]) {
      memory[number].before = memory[number].last
      memory[number].last = turn
    } else {
      memory[number] = { last: turn, before: undefined }
    }

    lastNumber = number
    turn++
  }

  return lastNumber
}

module.exports = {
  game
}
