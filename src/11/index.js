const { readFile } = require('../utils')
const { part1, part2 } = require('./seating-system')

const input = readFile(__dirname)
  .split('\n')
  .map((line) => line.split(''))

console.log(`Part I: ${part1(input)}`)
console.log(`Part II: ${part2(input)}`)
