const parseLine = (line) => {
  const bagsRegex = / bags?.?/
  let [outerBag, innerBags] = line.split(' contain ')

  // will be something like 'dotted brown bags'
  outerBag = outerBag.replace(bagsRegex, '')

  // will be something like '5 dark turquoise bags, 1 drab red bag.' or 'no other bags.'
  if (innerBags === 'no other bags.') {
    innerBags = []
  } else {
    innerBags = innerBags.split(', ')
      .map((innerBag) => innerBag.replace(bagsRegex, ''))
      .map((innerBag) => {
        const [count, ...color] = innerBag.split(' ')
        return { count: parseInt(count), color: color.join(' ') }
      })
  }

  return { color: outerBag, contains: innerBags }
}

const parseInput = (input) => {
  const innerToOuterMap = {}
  const outerToInnerMap = {}

  input.split('\n')
    .map((line) => parseLine(line))
    .forEach(({ color: outerColor, contains }) => {
      outerToInnerMap[outerColor] = contains

      contains.forEach(({ count, color: innerColor }) => {
        if (!innerToOuterMap[innerColor]) {
          innerToOuterMap[innerColor] = [outerColor]
        } else {
          innerToOuterMap[innerColor].push(outerColor)
        }
      })
    })

  return { innerToOuterMap, outerToInnerMap }
}

const part1 = (inputMap, targetColor) => {
  const outerBagColors = new Set()

  const traverseOuterBags = (color) => {
    if (!inputMap[color]) {
      return
    }

    inputMap[color]
      .filter((outerColor) => !outerBagColors.has(outerColor))
      .forEach((outerColor) => {
        outerBagColors.add(outerColor)
        traverseOuterBags(outerColor)
      })

    return Array.from(outerBagColors)
  }

  return traverseOuterBags(targetColor).length
}

const part2 = (inputMap, targetColor) => {
  const countInnerBags = (color) => {
    const innerBags = inputMap[color]

    if (innerBags.length === 0) {
      return 0
    }

    return innerBags
      .map(({ color: innerColor, count }) => count + count * countInnerBags(innerColor))
      .reduce((acc, cur) => acc + cur)
  }

  return countInnerBags(targetColor, 0)
}

module.exports = {
  parseInput,
  part1,
  part2
}
