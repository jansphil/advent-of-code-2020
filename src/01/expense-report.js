const findPairAddingUpTo = (numbers, targetSum, excludedIndex = undefined) => {
  const numberMap = {}

  numbers
    .filter((_number, i) => i !== excludedIndex)
    .forEach((number) => { numberMap[number] = targetSum - number })

  for (const [number, diffToTarget] of Object.entries(numberMap)) {
    if (numberMap[diffToTarget]) {
      // since number is an object key we need to parse it again
      return [Number(number), diffToTarget]
    }
  }

  return undefined
}

const findTriadeAddingUpTo = (numbers, targetSum) => {
  const numberMap = {}

  numbers.forEach((number, index) => { numberMap[number] = { target: targetSum - number, index } })

  for (const [number, { target, index }] of Object.entries(numberMap)) {
    const solution = findPairAddingUpTo(numbers, target, index)
    if (solution) {
      // since number is an object key we need to parse it again
      return [Number(number), ...solution]
    }
  }

  return undefined
}

module.exports = {
  findPairAddingUpTo,
  findTriadeAddingUpTo
}
