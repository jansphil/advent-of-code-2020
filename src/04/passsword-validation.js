const S = require('fluent-schema').default
const Ajv = require('ajv')
const { Transform } = require('stream')
const split = require('split')
const { createStreamFilter, createStreamCounter } = require('../utils')

const passwordSchema = S.object()
  .prop('byr', S.integer().minimum(1920).maximum(2002).required())
  .prop('iyr', S.integer().minimum(2010).maximum(2020).required())
  .prop('eyr', S.integer().minimum(2020).maximum(2030).required())
  .prop('hgt', S.oneOf([
    S.string().pattern(/^1([5-8][0-9]|9[0-3])cm$/),
    S.string().pattern(/^(59|6[0-9]|7[0-6])in$/)
  ]).required())
  .prop('hcl', S.string().pattern(/^#[a-f0-9]{6}$/).required())
  .prop('ecl', S.enum(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']).required())
  .prop('pid', S.string().pattern(/^[0-9]{9}$/).required())
  .prop('cid')

const ajv = new Ajv({ coerceTypes: true })
const validatePassword = ajv.compile(passwordSchema.valueOf())

const parsePassword = () => {
  let passport

  return new Transform({
    objectMode: true,
    transform (chunk, _encoding, next) {
      if (!chunk) {
        // if we receive a blank line, we can emit the buffered passport if one is present
        if (passport) {
          this.push(passport)
          passport = undefined
        }
      } else {
        // if we receive some data we parse and buffer it
        if (!passport) passport = {}
        chunk.toString()
          .split(' ')
          .map((keyValuePair) => keyValuePair.split(':'))
          .forEach(([key, value]) => { passport[key] = value })
      }
      // always call next
      next()
    },
    // implement flush to emit the last passport that is not followed by a blank line
    flush (done) {
      if (passport) done(null, passport)
      else done()
    }
  })
}

const countValidPasswordsStream = (inputStream) =>
  inputStream
    .pipe(split())
    .pipe(parsePassword())
    .pipe(createStreamFilter(validatePassword))
    .pipe(createStreamCounter())

module.exports = {
  validatePassword,
  countValidPasswordsStream
}
