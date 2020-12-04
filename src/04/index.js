const { readStream } = require('../utils')
const { countValidPasswordsStream } = require('./passsword-validation')

countValidPasswordsStream(readStream(__dirname))
  .on('data', (count) => console.log(`${count} passwords are valid`))
  .on('error', (err) => console.error(err))
