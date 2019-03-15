import express from 'express'
import getUsers from './src/get-users'

const app = express()

app.listen(3000, () => {
  console.log('DATA FETCHER RUNNING OR PORT 3000')
})

app.get('/users', async (req, res) => {
  const { users } = await getUsers()
  res.json(users)
})
