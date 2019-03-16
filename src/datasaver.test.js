import { describe } from 'riteway'
import { merge } from './datasaver'

const savedUsers = {
  1: { id: 1, name: 'Bob' },
  2: { id: 2, name: 'Jenny' },
}

describe('src/datasaver', async assert => {})

describe('merge()', async assert => {
  assert({
    given: 'a saved list of users and no new user',
    should: 'return the saved list',
    actual: merge(savedUsers, {}),
    expected: savedUsers,
  })

  {
    const expected = { ...savedUsers, 3: { id: 3, name: 'Albert' } }

    const actual = merge(savedUsers, { id: 3, name: 'Albert' })

    assert({
      given: 'a saved list of users and a new user with a matching id',
      should: 'update the saved list with the new user',
      actual,
      expected,
    })
  }

  // TODO: This may be a bug. Current functionality is the newly
  // fetched user's information will not be updated in the saved
  // list since no merge is done if the ids match.
  // It all depends on what the users.json file is used for.

  assert({
    given: 'a saved list of users and one user with the same id',
    should: 'return the saved list',
    actual: merge({ 1: { id: 1, name: 'Bob' } }, { id: 1, name: 'Bobby' }),
    expected: { 1: { id: 1, name: 'Bob' } },
  })
})
