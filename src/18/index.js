const { readFile } = require('../utils')
const { part1, part2 } = require('./operation-order')

const input = readFile(__dirname).split('\n')

console.log(`Part I: ${part1(input)}`)
console.log(`Part II: ${part2(input)}`)
// console.log(`Part II: ${part2(['2 * 3 + (4 * 5)'])}`)
