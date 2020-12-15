const { readFile } = require('../utils')
const { game } = require('./memory-game')

const input = readFile(__dirname).split(',').map(Number)

console.log(`Part I: ${game(input, 2020)}`)
console.log(`Part II: ${game(input, 30000000)}`)
