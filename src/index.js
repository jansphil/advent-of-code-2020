const { program } = require('commander')
const npm = require('npm')

program
  .command('puzzle <puzzle>')
  .action((puzzle) => require(`./${puzzle}`))

program
  .command('dev <puzzle>')
  .action((puzzle) => npm.load(() => npm.run('test', '-w', `**/${puzzle}/*.test.js`)))

program.parse(process.argv)
