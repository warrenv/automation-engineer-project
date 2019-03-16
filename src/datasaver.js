import fs from 'fs'
import rp from 'request-promise'

export const urlHost = 'http://localhost:3000'
export const urlPath = '/users'

const getSavedUsers = usersFile =>
  fs.existsSync(usersFile)
    ? JSON.parse(fs.readFileSync(usersFile))
    : {}

const saveUsers = (usersFile, users) =>
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2))

const buildReport = (users, fetched) =>
  fetched.map(
    user => users[user.id]
      ? `USER ALREADY SAVED ${user.id} ${user.name}`
      : `FOUND NEW USER ${user.id} ${user.name}`
  )

const merge = (acc, curr) => ({ ...acc, [curr.id]: curr })

const fetchUsers = () =>
  rp({
    method: 'GET',
    uri: 'http://localhost:3000/users',
    json: true,
  })

export default async usersFile => {
  const [newUserList, users] = await Promise.all([fetchUsers(), getSavedUsers(usersFile)])
  saveUsers(usersFile, newUserList.reduce(merge, users))
  return buildReport(users, newUserList)
}
