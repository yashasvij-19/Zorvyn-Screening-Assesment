const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/database");

const login = (req, res) => {
  const { email, password } = req.body;

  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const validPassword = bcrypt.compareSync(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "24h" },
  );

  res.json({
    message: "Login successful",
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
};

const register = (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .json({ message: "Name,email and password are required" });
  }
  const existingUser = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email);

  if (existingUser) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const userRole = role || "viewer";

  const result = db
    .prepare('INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)')
    .run(name, email, hashedPassword, userRole);

  res.status(201).json({
    message: "User created successfully",
    userId: result.lastInsertRowid,
  });
};
module.exports = { login, register };
