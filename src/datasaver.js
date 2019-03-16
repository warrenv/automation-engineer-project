import fs from 'fs'
import rp from 'request-promise'

export const urlHost = 'http://localhost:3000'
export const urlPath = '/users'

export const getSavedUsers = usersFile =>
  fs.existsSync(usersFile)
    ? JSON.parse(fs.readFileSync(usersFile))
    : {}

const saveUsers = (usersFile, users) =>
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2))

export const buildReport = (users, fetched) =>
  fetched.map(
    user => users[user.id]
      ? `USER ALREADY SAVED ${user.id} ${user.name}`
      : `FOUND NEW USER ${user.id} ${user.name}`
  )

export const merge = (acc, curr) => ({
  ...acc,
  ...(curr.id && !acc[curr.id]) ? { [curr.id]: curr } : {},
})

const fetchUsers = () =>
  rp({
    method: 'GET',
    uri: 'http://localhost:3000/users',
    json: true,
  })

export default async usersFile => {
  const newUserList = await fetchUsers()
  const users = await getSavedUsers(usersFile)

  saveUsers(usersFile, newUserList.reduce(merge, users))
  return buildReport(users, newUserList)
}
