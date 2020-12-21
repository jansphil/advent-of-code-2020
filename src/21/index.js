const { readFile } = require('../utils')
const { run } = require('./allergens')

const { part1, part2 } = run(readFile(__dirname).split('\n'))

console.log(`Part I: ${part1}`)
console.log(`Part II: ${part2}`)
