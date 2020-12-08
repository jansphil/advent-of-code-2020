const { getCookies } = require('chrome-cookies-secure')
const { writeFileSync, mkdirSync, copyFileSync } = require('fs')
const { replaceInFileSync } = require('replace-in-file')

const { join } = require('path')

const axios = require('axios').default

const getSessionCookie = () =>
  new Promise((resolve, reject) => {
    getCookies('https://adventofcode.com/', 'object', (err, cookies) => {
      if (err) {
        reject(err)
      } else {
        if (cookies.session) {
          resolve(cookies.session)
        } else {
          reject(new Error(
            'no session cookie for https://adventofcode.com/ found.\n' +
            'available cookies: \n' +
            Object.keys(cookies.session)
          ))
        }
      }
    })
  })

const getPuzzleInput = async (day) => {
  const session = await getSessionCookie()
  const { data } = await axios.get(
    `https://adventofcode.com/2020/day/${parseInt(day)}/input`,
    { headers: { cookie: `session=${session}` } }
  )
  return data
}

const bootstrap = async (day, name) => {
  const input = await getPuzzleInput(day)
  mkdirSync(join(__dirname, day))
  writeFileSync(join(__dirname, day, 'input.txt'), input.trimEnd(), { encoding: 'utf-8' })

  copyFileSync(join(__dirname, '00', 'index.js'), join(__dirname, day, 'index.js'))
  copyFileSync(join(__dirname, '00', 'lib.js'), join(__dirname, day, `${name}.js`))
  copyFileSync(join(__dirname, '00', 'lib.test.js'), join(__dirname, day, `${name}.test.js`))

  replaceInFileSync({
    files: `**/${day}/*.js`,
    from: '<<NAME>>',
    to: name
  })
}

module.exports = bootstrap
