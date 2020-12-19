const { readFile } = require('../utils')
const { part1, part2 } = require('./monster-messagesss')

const [rules, messages] = readFile(__dirname).split('\n\n').map((block) => block.split('\n'))

console.log(`Part I: ${part1(rules, messages)}`)
console.log(`Part II: ${part2(rules, messages)}`)
