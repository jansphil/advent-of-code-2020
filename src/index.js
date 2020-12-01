const { program } = require('commander')

program
  .command('puzzle <puzzle>')
  .action((puzzle) => require(`./${puzzle}`))

program.parse(process.argv)
