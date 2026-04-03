require('dotenv').config()
const express = require('express')
const app = express()

require ('./db/database')

app.use(express.json())

const authRoutes = require('./routes/auth')
app.use('/api/auth',authRoutes)


app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})