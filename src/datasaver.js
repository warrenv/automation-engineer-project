import fs from 'fs'
import rp from 'request-promise'

console.log('DATA SAVER RUNNING')

export const urlHost = 'http://localhost:3000'
export const urlPath = '/users'
export const USERS_FILE = './users.json'

const getSavedUsers = async (usersFile) => {
  let currentData

  if (fs.existsSync(usersFile)) {
    const fileStr = fs.readFileSync(usersFile)
    currentData = JSON.parse(fileStr)
  } else {
    currentData = {}
  }

  return currentData
}

const saveUsers = async (usersFile, users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2))
}

const checkCurrentUsers = async usersFile => {
  console.log('CHECKING CURRENT USERS')

  const opts = {
    method: 'GET',
    uri: 'http://localhost:3000/users',
    json: true,
  }

  const newUserList = await rp(opts)
  const users = await getSavedUsers(usersFile)

  for (let user of newUserList) {
    if (users[user.id] === undefined) {
      console.log('FOUND NEW USER', user.id, user.name)
      users[user.id] = user
    } else {
      console.log('USER ALREADY SAVED', user.id, user.name)
    }
  }

  await saveUsers(usersFile, users)
}

export default {
  start: (usersFile = USERS_FILE) => {
    setInterval(async () => {
      await checkCurrentUsers(usersFile)
    }, 30000)

    checkCurrentUsers(usersFile)
  },

  once: (usersFile = USERS_FILE) => checkCurrentUsers(usersFile),
}
