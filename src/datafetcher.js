import express from 'express'
import getUsers from './get-users'

const app = express()

app.get('/users', async (req, res, next) => {
  try {
    const { users } = await getUsers()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
})

export default app
