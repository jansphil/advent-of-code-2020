const run = (input) => {
  let accumulator = 0
  let position = 0
  const visited = new Set()

  const commands = {
    nop: (arg) => {
      position++
    },
    jmp: (arg) => {
      position += arg
    },
    acc: (arg) => {
      accumulator += arg
      position++
    }
  }

  while (position < input.length) {
    if (visited.has(position)) {
      return { accumulator, code: 1 }
    }

    visited.add(position)
    const [instruction, arg] = input[position].split(' ')
    commands[instruction](parseInt(arg))
  }

  return { accumulator, code: 0 }
}

const autoHeal = (input) => {
  for (let i = input.length - 1; i >= 0; i--) {
    const correctedInput = input.map((line, lineIndex) => {
      if (lineIndex !== i) {
        return line
      }
      if (line.startsWith('jmp')) {
        return line.replace('jmp', 'nop')
      }
      if (line.startsWith('nop')) {
        return line.replace('nop', 'jmp')
      }
      return line
    })

    const { accumulator, code } = run(correctedInput)
    if (code === 0) {
      return accumulator
    }
  }
}

module.exports = {
  run,
  autoHeal
}
