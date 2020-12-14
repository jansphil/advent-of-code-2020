const { padStart, sum } = require('lodash')

const run = (input, memoryAssignmentsCallback) => {
  let currentMask
  const memory = {}

  input.forEach((line) => {
    if (line.startsWith('mask')) {
      currentMask = line.substring(7).split('')
      return
    }

    const [address, number] = line.match(/^mem\[(\d+)\] = (\d+)$/).slice(1).map(Number)

    memoryAssignmentsCallback(address, number, currentMask)
      .forEach(([address, value]) => {
        memory[address] = value
      })
  })

  return sum(Object.values(memory))
}

const part1 = (input) => {
  return run(input, (address, number, mask) => {
    const bits = padStart(number.toString(2), mask.length, '0')
    const maskedBits = []

    mask.forEach((maskAtBit, index) => {
      if (maskAtBit === 'X') {
        maskedBits.push(bits.charAt(index))
      } else {
        maskedBits.push(maskAtBit)
      }
    })

    return [[address, parseInt(maskedBits.join(''), 2)]]
  })
}

const part2 = (input) => {
  return run(input, (initialAddress, number, mask) => {
    const bits = padStart(initialAddress.toString(2), mask.length, '0')
    let addresses = [[]]

    mask.forEach((maskAtBit, index) => {
      if (maskAtBit === 'X') {
        addresses = addresses.flatMap((address) => [[...address, '0'], [...address, '1']])
      } else {
        const newBit = maskAtBit === '1' ? '1' : bits.charAt(index)
        addresses = addresses.map((address) => [...address, newBit])
      }
    })

    return addresses.map((address) => [parseInt(address.join(''), 2), number])
  })
}

module.exports = {
  part1,
  part2
}
