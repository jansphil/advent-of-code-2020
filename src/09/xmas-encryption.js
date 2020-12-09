const isValidNum = (target, nums) => {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return true
    }
  }
  return false
}

const part1 = (input, preambleLength) => {
  for (let i = preambleLength; i < input.length; i++) {
    if (!isValidNum(input[i], input.slice(i - preambleLength, i))) {
      return input[i]
    }
  }
}

const part2 = (input, invalidNum) => {
  for (let startIndex = 0; startIndex < input.length - 1; startIndex++) {
    let sum = input[startIndex]
    let endOffset = 1
    while (sum < invalidNum && startIndex + endOffset < input.length) {
      sum += input[startIndex + endOffset]
      endOffset++
      if (sum === invalidNum) {
        const nums = input.slice(startIndex, startIndex + endOffset)
        return Math.min(...nums) + Math.max(...nums)
      }
    }
  }
}

module.exports = {
  part1,
  part2
}
