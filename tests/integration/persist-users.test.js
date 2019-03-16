import { describe } from 'riteway'
import fs from 'fs'
import nock from 'nock'

import dataSaver, { urlHost, urlPath } from '../../src/datasaver'

const USERS_FILE = './tests/tmp/users.json'

describe('tests/integration/persist-users', async assert => {
  {
    fs.existsSync(USERS_FILE) && fs.unlinkSync(USERS_FILE, () => {})
    nock(urlHost)
      .get(urlPath)
      .reply(200, [{ id: 1, name: 'Fred' }])

    await dataSaver.once(USERS_FILE)
    const actual = fs.existsSync(USERS_FILE)

    assert({
      given: 'a call to update when no saved users',
      should: `result in creation of "${USERS_FILE}"`,
      actual,
      expected: true,
    })

    {
      const expected = {
        '1': {
          'id': 1,
          'name': 'Fred',
        },
      }

      const actual = JSON.parse(fs.readFileSync(USERS_FILE))

      assert({
        given: 'a call to update when no saved users',
        should: 'have one user in the file',
        actual,
        expected,
      })
    }

    {
      nock(urlHost)
        .get(urlPath)
        .reply(200, [{ id: 1, name: 'Fred' }, { id: 2, name: 'Sally' }])

      const expected = {
        '1': {
          'id': 1,
          'name': 'Fred',
        },
        '2': {
          'id': 2,
          'name': 'Sally',
        },
      }

      await dataSaver.once(USERS_FILE)
      const actual = JSON.parse(fs.readFileSync(USERS_FILE))

      assert({
        given: 'a new user and a call to update an existing file',
        should: 'have two users in the file',
        actual,
        expected,
      })
    }

    fs.existsSync(USERS_FILE) && fs.unlinkSync(USERS_FILE, () => {})
  }
})
