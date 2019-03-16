import fs from 'fs'
import http from 'http'
import { describe } from 'riteway'

import dataSaver from '../../src/datasaver'
import datafetcher from '../../src/datafetcher'

describe('tests/functional/happy-path', async assert => {
  const port = 3333
  const testFile = './users.functional-test.json'

  const server = http.createServer(datafetcher).listen(port, async () => {
    dataSaver(testFile, port)
      .then(report => {
        assert({
          given: 'a call to launch the datafetcher and dataserver services',
          should: `save the results to "${testFile}"`,
          actual: fs.existsSync(testFile),
          expected: true,
        })

        const expected = [
          'FOUND NEW USER 1 Leanne Graham',
          'FOUND NEW USER 2 Ervin Howell',
          'FOUND NEW USER 3 Clementine Bauch',
          'FOUND NEW USER 4 Patricia Lebsack',
          'FOUND NEW USER 5 Chelsey Dietrich',
          'FOUND NEW USER 6 Mrs. Dennis Schulist',
          'FOUND NEW USER 7 Kurtis Weissnat',
          'FOUND NEW USER 8 Nicholas Runolfsdottir V',
          'FOUND NEW USER 9 Glenna Reichert',
          'FOUND NEW USER 10 Clementina DuBuque',
        ]

        assert({
          given: 'a call to launch the datafetcher and dataserver services',
          should: 'return a report',
          actual: report,
          expected,
        })
      })
      .finally(() => {
        fs.existsSync(testFile) && fs.unlinkSync(testFile, () => {})
        server.close()
      })
  })
})
