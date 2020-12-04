const test = require('ava').default
const { validatePassword, countValidPasswordsStream } = require('./passsword-validation')
const { Readable } = require('stream')

const passport = { pid: '087499704', hgt: '74in', ecl: 'grn', iyr: '2012', eyr: '2030', byr: '1980', hcl: '#623a2f' }

test('when validating the empty', t => {
  t.false(validatePassword(null))
  t.false(validatePassword(undefined))
  t.false(validatePassword({}))
})

test('when validating the birth year', t => {
  t.true(validatePassword({ ...passport, byr: '1920' }))
  t.true(validatePassword({ ...passport, byr: '2002' }))

  t.false(validatePassword({ ...passport, byr: '1919' }))
  t.false(validatePassword({ ...passport, byr: '2003' }))
  t.false(validatePassword({ ...passport, byr: 'foo' }))
  t.false(validatePassword({ ...passport, byr: undefined }))
})

test('when validating the issue year', t => {
  t.true(validatePassword({ ...passport, iyr: '2010' }))
  t.true(validatePassword({ ...passport, iyr: '2020' }))

  t.false(validatePassword({ ...passport, iyr: '2009' }))
  t.false(validatePassword({ ...passport, iyr: '2021' }))
  t.false(validatePassword({ ...passport, iyr: 'foo' }))
  t.false(validatePassword({ ...passport, iyr: undefined }))
})

test('when validating the expiration year', t => {
  t.true(validatePassword({ ...passport, eyr: '2020' }))
  t.true(validatePassword({ ...passport, eyr: '2030' }))

  t.false(validatePassword({ ...passport, eyr: '2019' }))
  t.false(validatePassword({ ...passport, eyr: '2031' }))
  t.false(validatePassword({ ...passport, eyr: 'foo' }))
  t.false(validatePassword({ ...passport, eyr: undefined }))
})

test('when validating the height', t => {
  t.true(validatePassword({ ...passport, hgt: '59in' }))
  t.true(validatePassword({ ...passport, hgt: '67in' }))
  t.true(validatePassword({ ...passport, hgt: '76in' }))

  t.false(validatePassword({ ...passport, hgt: '77in' }))
  t.false(validatePassword({ ...passport, hgt: '78in' }))

  t.true(validatePassword({ ...passport, hgt: '150cm' }))
  t.true(validatePassword({ ...passport, hgt: '164cm' }))
  t.true(validatePassword({ ...passport, hgt: '174cm' }))
  t.true(validatePassword({ ...passport, hgt: '184cm' }))
  t.true(validatePassword({ ...passport, hgt: '193cm' }))

  t.false(validatePassword({ ...passport, hgt: '149cm' }))
  t.false(validatePassword({ ...passport, hgt: '194cm' }))

  t.false(validatePassword({ ...passport, hgt: undefined }))
})

test('when validating the hair color', t => {
  t.true(validatePassword({ ...passport, hcl: '#af0189' }))

  t.false(validatePassword({ ...passport, hcl: '#gggggg' }))
  t.false(validatePassword({ ...passport, hcl: '#1111111' }))
  t.false(validatePassword({ ...passport, hcl: 'af0189' }))
  t.false(validatePassword({ ...passport, hcl: undefined }))
})

test('when validating the eye color', t => {
  t.true(validatePassword({ ...passport, ecl: 'amb' }))

  t.false(validatePassword({ ...passport, ecl: 'foo' }))
  t.false(validatePassword({ ...passport, ecl: undefined }))
})

test('when validating the passport id', t => {
  t.true(validatePassword({ ...passport, pid: '123456789' }))

  t.false(validatePassword({ ...passport, pid: '0123456789' }))
  t.false(validatePassword({ ...passport, pid: 'abcdefghi' }))
  t.false(validatePassword({ ...passport, pid: 'foo' }))
  t.false(validatePassword({ ...passport, pid: undefined }))
})

function * inputDataGenerator () {
  yield 'eyr:1972 cid:100\n' +
  'hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926\n' +
  '\n' +
  'iyr:2019\n' +
  'hcl:#602927 eyr:1967 hgt:170cm\n' +
  'ecl:grn pid:012533040 byr:1946\n' +
  '\n' +
  'hcl:dab227 iyr:2012\n' +
  'ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277\n' +
  '\n' +
  'hgt:59cm ecl:zzz\n' +
  'eyr:2038 hcl:74454a iyr:2023\n' +
  'pid:3556412378 byr:2007\n'

  yield 'pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980\n' +
  'hcl:#623a2f\n' +
  '\n' +
  'eyr:2029 ecl:blu cid:129 byr:1989\n' +
  'iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm\n' +
  '\n' +
  'hcl:#888785\n' +
  'hgt:164cm byr:2001 iyr:2015 cid:88\n' +
  'pid:545766238 ecl:hzl\n' +
  'eyr:2022\n' +
  '\n' +
  'iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719\n'
}

test('whn counting valid passwords', t => {
  return new Promise((resolve, reject) => {
    countValidPasswordsStream(Readable.from(inputDataGenerator()))
      .on('data', (count) => resolve(count))
      .on('error', (err) => reject(err))
  }).then((count) => t.is(count, 4))
})
