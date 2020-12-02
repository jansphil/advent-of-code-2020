const { readFile } = require('../utils')
const { countValidPasswords, letterCountPasswordPredicate, letterPositionPasswordPredicate } = require('./password-validation')

const input = readFile(__dirname).split('\n')

const numberOfValidPasswordPart1 = countValidPasswords(input, letterCountPasswordPredicate)
console.log(`Part 1: ${numberOfValidPasswordPart1} password are valid`)

const numberOfValidPasswordPart2 = countValidPasswords(input, letterPositionPasswordPredicate)
console.log(`Part 2: ${numberOfValidPasswordPart2} password are valid`)
