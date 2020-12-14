const { readFile } = require('../utils')
const { part1, part2 } = require('./shuttle-search')

const input = readFile(__dirname).split('\n')
const arrivingTimestamp = parseInt(input[0])
const shuttleIds = input[1].split(',')

console.log(`Part I: ${part1(arrivingTimestamp, shuttleIds)}`)
console.log(`Part II: ${part2(shuttleIds)}`)
