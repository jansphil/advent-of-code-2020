const { readFile } = require('../utils')
const { part1, part2 } = require('./crab-cups')

const input = readFile(__dirname).split('').map(Number)

console.log(`Part I: ${part1(input)}`)
console.log(`Part II: ${part2(input)}`)
