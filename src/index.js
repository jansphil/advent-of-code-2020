const { program } = require('commander')
const npm = require('npm')

program
  .command('puzzle <puzzle>')
  .action((puzzle) => require(`./${puzzle}`))

program
  .command('dev <puzzle>')
  .action((puzzle) => npm.load(() => {
    npm.commands['run-script'](
      ['test', '-w', `**/${puzzle}/*.test.js`],
      () => { }
    )
  }))

program
  .command('bootstrap <puzzle> <name>')
  .action((puzzle, name) => {
    require('./bootstrap')(puzzle, name)
      .then((_) => console.log(`🎄 Good Luck with day ${puzzle} 🎄`))
      .catch((err) => console.error(err))
  })

program.parse(process.argv)
