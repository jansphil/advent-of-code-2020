const { times, range } = require('lodash')

const simulate = (cups, n) => {
  const nCups = cups.length
  const links = {}

  for (let i = 0; i < cups.length - 1; i++) {
    links[cups[i]] = cups[i + 1]
  }

  links[cups[nCups - 1]] = cups[0]

  let currentCup = cups[0]
  times(n, () => {
    const pickedUpCups = [links[currentCup], links[links[currentCup]], links[links[links[currentCup]]]]

    let destination = currentCup === 1 ? nCups : currentCup - 1
    while (pickedUpCups.includes(destination)) {
      destination = destination === 1 ? nCups : destination - 1
    }

    links[currentCup] = links[pickedUpCups[2]]
    links[pickedUpCups[2]] = links[destination]
    links[destination] = pickedUpCups[0]

    currentCup = links[currentCup]
  })

  return links
}

const part1 = (input) => {
  const cups = [...input]

  const links = simulate(cups, 100)

  let res = '' + links[1]
  while (true) {
    const next = links[res.slice(-1)]
    if (next === 1) {
      return res
    }
    res += next
  }
}

const part2 = (input) => {
  const cups = [...input, ...range(Math.max(...input) + 1, 1000001)]

  const links = simulate(cups, 10000000)

  return links[1] * links[links[1]]
}

module.exports = {
  part1,
  part2
}
