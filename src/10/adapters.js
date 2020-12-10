const part1 = (input) => {
  const sortedInput = input.sort((a, b) => a - b)
  const joltageDifferences = { 1: 0, 2: 0, 3: 0 }

  joltageDifferences[sortedInput[0]]++ // wall to first adapter
  joltageDifferences[3]++ // last adapter to device

  for (let i = 1; i < input.length; i++) {
    joltageDifferences[sortedInput[i] - sortedInput[i - 1]]++
  }

  return joltageDifferences[1] * joltageDifferences[3]
}

const part2 = (input) => {
  let sortedInput = input.sort((a, b) => a - b)
  const startJoltage = 0
  const deviceJoltage = sortedInput[sortedInput.length - 1] + 3
  sortedInput = [startJoltage, ...sortedInput, deviceJoltage]

  // We iterate from the device through all adapters back to the wall since
  // the combinations for one adapter is the sum of the combinations the adapter can reach
  //
  // EXAMPLE
  // 0 - 1 - 4 - 5 - 6 - 7 - 10 - 11 - 12
  //                              | 11 can reach only one => 1
  //                         | 10 can reach 11 and 12 (which have 1 combinations each) => 2
  //                     | 7 can reach only 10 (which has 2 combinations) => 2
  //                 | 6 can reach only 7 (which has 2 combinations) => 2
  //             | 5 can reach 6 and 7 (which both have 2 combinations) => 4
  //         | 4 can reach 5, 6 and 7 (which have 4, 2 and 2 combinations respectively) => 8
  //     | 1 can only reach 4 => 8
  // | 0 can only reaach 1 => 8

  const combinations = {}
  combinations[deviceJoltage] = 1
  for (let i = sortedInput.length - 2; i >= 0; i--) {
    const joltage = sortedInput[i]
    combinations[joltage] = 0

    let j = i + 1
    while (j < sortedInput.length && joltage + 3 >= sortedInput[j]) {
      combinations[joltage] += combinations[sortedInput[j]]
      j++
    }
  }

  return combinations[0]
}

module.exports = {
  part1,
  part2
}
