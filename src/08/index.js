const { readFile } = require('../utils')
const { run, autoHeal } = require('./handheld-console')

const input = readFile(__dirname).split('\n')

console.log(`Part I: ${run(input).accumulator}`)
console.log(`Part II: ${autoHeal(input)}`)
