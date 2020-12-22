const { readFile } = require('../utils')
const { part1, part2 } = require('./crab-combat')

const input = readFile(__dirname)
  .split('\n\n')
  .map((block) => block.split('\n').slice(1).map(Number))

console.log(`Part I: ${part1(input)}`)
console.log(`Part II: ${part2(input)}`)
