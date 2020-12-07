const { readFile } = require('../utils')
const { parseInput, part1, part2 } = require('./luggage-processing')

const input = readFile(__dirname)
const { innerToOuterMap, outerToInnerMap } = parseInput(input)

console.log(`Part 1: ${part1(innerToOuterMap, 'shiny gold')}`)
console.log(`Part 2: ${part2(outerToInnerMap, 'shiny gold')}`)
