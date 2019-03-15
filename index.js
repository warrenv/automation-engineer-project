import dataSaver from './src/datasaver'
import dataFetcher from './src/datafetcher'

const port = process.env.PORT || 3000

dataFetcher.listen(port, () => {
  console.log(`DATA FETCHER RUNNING ON PORT ${port}`)
  dataSaver.start()
})
