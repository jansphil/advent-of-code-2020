const { readFile } = require('../utils')
const { part1, part2 } = require('./ticket-translation')

const input = readFile(__dirname)

console.log(`Part I: ${part1(input)}`)
console.log(`Part II: ${part2(input)}`)
