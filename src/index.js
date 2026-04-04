require("dotenv").config()
const express = require("express")
const app = express()

require("./db/database")

app.use(express.json())

const authRoutes = require("./routes/auth")
app.use("/api/auth", authRoutes)

const { authenticate, authorize } = require('./middleware/auth')
app.get('/api/protected', authenticate, authorize('admin'), (req, res) => {
  res.json({ message: 'You are in', user: req.user })
})

const userRoutes = require("./routes/users")
app.use('/api/users',userRoutes)

const recordRoutes = require("./routes/records")
app.use('/api/records',recordRoutes)


app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
