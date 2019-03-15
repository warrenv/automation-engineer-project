import express from 'express'
import getUsers from './get-users'

const app = express()

app.get('/users', async (req, res) => {
  const { users } = await getUsers()
  res.json(users)
})

export default app
