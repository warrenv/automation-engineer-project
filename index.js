import dataSaver from './src/datasaver'
import dataFetcher from './src/datafetcher'

const port = process.env.PORT || 3000
const USERS_FILE = process.env.USERS_FILE || './users.json'

const run = usersFile => {
  console.log('CHECKING CURRENT USERS')

  dataSaver(usersFile)
    .then(report => console.log(report.join('\n')))
    .catch(console.log)
}

if (process.argv.length === 2) {
  dataFetcher.listen(port, () => {
    console.log(`DATA FETCHER RUNNING ON PORT ${port}`)

    console.log('DATA SAVER RUNNING')
    setInterval(() => run(USERS_FILE), 30000)
    run(USERS_FILE)
  })
}

if (process.argv.length === 3 && process.argv[2] === 'datafetcher') {
  dataFetcher.listen(port, () => {
    console.log(`DATA FETCHER RUNNING ON PORT ${port}`)
  })
}

if (process.argv.length === 3 && process.argv[2] === 'datasaver') {
  console.log('DATA SAVER RUNNING')
  setInterval(() => run(USERS_FILE), 30000)
  run(USERS_FILE)
}
