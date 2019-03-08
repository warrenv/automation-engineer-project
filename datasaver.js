const fs = require('fs')
const rp = require('request-promise')

console.log("DATA SAVER RUNNING")

const getSavedUsers = async () => {
  let currentData
  if (fs.existsSync('./users.json')) {
    const fileStr = fs.readFileSync('./users.json')
    currentData = JSON.parse(fileStr)
  } else {
    currentData = {}
  }

  return currentData
}

const saveUsers = async (users) => {
  fs.writeFileSync('./users.json', JSON.stringify(users, null, 2))
}

const checkCurrentUsers = async () => {
  console.log("CHECKING CURRENT USERS")

  const opts = {
    method: 'GET',
    uri: 'http://localhost:3000/users',
    json: true
  }

  const newUserList = await rp(opts)
  const users = await getSavedUsers()

  for (let user of newUserList) {
    if (users[user.id] === undefined) {
      console.log("FOUND NEW USER", user.id, user.name)
      users[user.id] = user
    } else {
      console.log("USER ALREADY SAVED", user.id, user.name)
    }
  }

  await saveUsers(users)
}

setInterval(async () => {
  await checkCurrentUsers()
}, 30000)

checkCurrentUsers()