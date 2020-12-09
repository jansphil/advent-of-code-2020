const { readFile } = require('../utils')
const { part1, part2 } = require('./xmas-encryption')

const input = readFile(__dirname).split('\n').map(Number)

const invalidNum = part1(input, 25)

console.log(`Part I: ${invalidNum}`)
console.log(`Part II: ${part2(input, invalidNum)}`)
