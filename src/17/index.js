const { readFile } = require('../utils')
const { part1, part2 } = require('./conway-cubes')

const input = readFile(__dirname).split('\n').map((row) => row.split(''))

console.log(`Part I: ${part1(input)}`)
console.log(`Part II: ${part2(input)}`)
