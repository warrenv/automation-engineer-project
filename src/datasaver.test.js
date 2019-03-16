import fs from 'fs'
import { describe } from 'riteway'
import { buildReport, getSavedUsers, merge } from './datasaver'

const savedUsers = {
  1: { id: 1, name: 'Bob' },
  2: { id: 2, name: 'Jenny' },
}

describe('src/datasaver', async assert => {})

describe('merge()', async assert => {
  assert({
    given: 'a saved list of users and no lser',
    should: 'return the saved list',
    actual: merge(savedUsers, {}),
    expected: savedUsers,
  })

  {
    const expected = { ...savedUsers, 3: { id: 3, name: 'Albert' } }

    const actual = merge(savedUsers, { id: 3, name: 'Albert' })

    assert({
      given: 'a saved list of users and a user with a matching id',
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
    given: 'a saved list of users and a user with the same id',
    should: 'return the saved list',
    actual: merge({ 1: { id: 1, name: 'Bob' } }, { id: 1, name: 'Bobby' }),
    expected: { 1: { id: 1, name: 'Bob' } },
  })
})

describe('getSavedUsers()', async assert => {
  const filename = './testfile.json'

  {
    const expected = { a: 1 }
    fs.writeFileSync(filename, JSON.stringify({ a: 1 }, null, 2))

    assert({
      given: 'an existing filename',
      should: 'return the contents of the file',
      actual: getSavedUsers(filename),
      expected,
    })

    fs.existsSync(filename) && fs.unlinkSync(filename, () => {})
  }

  {
    const expected = {}
    fs.existsSync(filename) && fs.unlinkSync(filename, () => {})

    assert({
      given: 'a non-existent filename',
      should: 'return an empty object',
      actual: getSavedUsers(filename),
      expected,
    })
  }
})

describe('buildReport()', async assert => {
  const savedUsers = {
    1: { id: 1, name: 'Bob' },
  }

  const fetchedUsers = [
    { id: 1, name: 'Bob' },
    { id: 9, name: 'Jill' },
  ]

  assert({
    given: 'lists of existing and new users',
    should: 'return the detail lines of the report',
    actual: buildReport(savedUsers, fetchedUsers),
    expected: ['USER ALREADY SAVED 1 Bob', 'FOUND NEW USER 9 Jill'],
  })
})
