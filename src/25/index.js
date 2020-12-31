const { readFile } = require('../utils')
const { part1 } = require('./combo-breaker')

const [doorPublicKey, cardPublicKey] = readFile(__dirname).split('\n').map(Number)

console.log(`Part I: ${part1(doorPublicKey, cardPublicKey)}`)
