const { readFile } = require('../utils')
const { findPairAddingUpTo, findTriadeAddingUpTo } = require('./expense-report')

const input = readFile(__dirname).split('\n').map(Number)

const pair = findPairAddingUpTo(input, 2020)
console.log(`Part I: ${pair[0]} * ${pair[1]} = ${pair[0] * pair[1]}`)

const triade = findTriadeAddingUpTo(input, 2020)
console.log(`Part II: ${triade[0]} * ${triade[1]} * ${triade[2]} = ${triade[0] * triade[1] * triade[2]}`)
