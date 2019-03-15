import { describe } from 'riteway'
import nock from 'nock'
import getUsers, { urlHost, urlPath } from '../../src/get-users'

const users = [{
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: {
      lat: '-37.3159',
      lng: '81.1496',
    },
  },
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
}]

describe('tests/integration/get-users', async assert => {
  {
    nock(urlHost)
      .get(urlPath)
      .reply(200, users)

    const actual = await getUsers()

    assert({
      given: 'a successful call to fetch users',
      should: 'return a code of 0 and user data',
      actual,
      expected: { code: 0, users },
    })

    nock.cleanAll()
  }

  {
    nock(urlHost)
      .get(urlPath)
      .reply(500, 'An error occured')

    const actual = await getUsers()

    assert({
      given: 'a failed call to fetch users',
      should: 'return a code of 1, an error message and an empty user list',
      actual,
      expected: { code: 1, message: '500 - "An error occured"', users: [] },
    })

    nock.cleanAll()
  }
})
