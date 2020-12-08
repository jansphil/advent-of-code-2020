const fs = require('fs')
const path = require('path')
const { Transform } = require('stream')

const readFile = (dir, file = 'input.txt') => fs.readFileSync(path.join(dir, file), { encoding: 'utf-8' })

const readStream = (dir, file = 'input.txt') => fs.createReadStream(path.join(dir, file), { encoding: 'utf-8' })

const createStreamCounter = () => {
  let counter = 0
  return new Transform({
    objectMode: true,
    transform (chunk, _encoding, next) {
      counter++
      next()
    },
    flush (done) {
      done(null, counter)
    }
  })
}

const createStreamFilter = (predicate) => {
  return new Transform({
    objectMode: true,
    transform (chunk, _encoding, next) {
      if (predicate(chunk)) {
        next(null, chunk)
      } else {
        next()
      }
    }
  })
}

const splitStringAt = (string, index) => [string.slice(0, index), string.slice(index)]

const transformString = (string, transformations) => string.split('').map((char) => transformations[char]).join('')

const createArray = (length, value = false) => Array.from({ length }, (_) => value)

module.exports = {
  readFile,
  readStream,
  createStreamCounter,
  createStreamFilter,
  splitStringAt,
  transformString,
  createArray
}
