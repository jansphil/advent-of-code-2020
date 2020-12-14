const { mod } = require('mathjs')

const part1 = (timestamp, shuttleIds) => {
  const nextShuttles = shuttleIds
    .filter((id) => id !== 'x')
    .map((id) => parseInt(id))
    .map((id) => ({ nextDeparture: id * Math.ceil(timestamp / id), id }))
    .sort((a, b) => a.nextDeparture - b.nextDeparture)

  return (nextShuttles[0].nextDeparture - timestamp) * nextShuttles[0].id
}

const part2 = (shuttleIds) => {
  // use sieving method from chinese remainder theorem
  // see https://en.wikipedia.org/wiki/Chinese_remainder_theorem#Search_by_sieving

  let constraints = [] // write contraints as T = a mod n

  shuttleIds.forEach((id, index) => {
    if (id === 'x') {
      return
    }

    // shuttle with id 13 should start after 1 minute: a = -1 % 13
    // (use mathjs mod since js mod is broken for negative numbers)
    const n = parseInt(id)
    constraints.push({ n, a: mod(-index, id) })
  })

  // sort constraints by n desc
  constraints = constraints.sort((a, b) => b.n - a.n)

  // start at the first constraint and iterate the numbers that are congruent to a % n
  // e.g.: 55 % 59 => 55, 55 + 1 * 59, 55 + 2 * 59, ... => x + i * n
  // search for the first number that complied with the second constraint, e.g. 25 % 31
  // when we find that number, it becomes our new start point and we add n1 * n2 at each step
  let x = constraints[0].a
  let N = constraints[0].n
  constraints.slice(1).forEach(({ n, a }) => {
    let i = 0
    while ((x + i * N) % n !== a) {
      i++
    }
    x = x + i * N
    N *= n
  })

  return x
}

module.exports = {
  part1,
  part2
}
