const fs = require('fs')
const path = require('path')

const readFile = (dir, file = 'input.txt') => fs.readFileSync(path.join(dir, file), { encoding: 'utf-8' })

module.exports = {
  readFile
}
