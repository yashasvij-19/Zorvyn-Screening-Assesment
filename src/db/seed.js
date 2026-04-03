const Database = require("better-sqlite3");
const bcrypt = require("bcryptjs");
const path = require("path");

const db = new Database(path.join(__dirname, "database.db"));

const users = [
  {
    name: "Derek OBrien",
    email: "derek@findash.com",
    password: "col123$",
    role: "viewer",
  },
  {
    name: "Tom Cook",
    email: "tom@findash.com",
    password: "col125%",
    role: "analyst",
  },
  {
    name: "Harrison Jeremy",
    email: "harrison@findash.com",
    password: "col127&",
    role: "admin",
  },
];

const insertUser = db.prepare(`
  INSERT INTO users (name, email, password, role) 
  VALUES (?, ?, ?, ?)
`);

users.forEach((user) => {
  const hashedPassword = bcrypt.hashSync(user.password, 10);
  insertUser.run(user.name, user.email, hashedPassword, user.role);
});

console.log("Users seeded");

const records = [
  {
    amount: 85000,
    type: "income",
    category: "Revenue",
    date: "2024-04-01",
    notes: "Client payment Q1",
  },
  {
    amount: 42000,
    type: "expense",
    category: "Salaries",
    date: "2024-04-02",
    notes: "March salaries",
  },
  {
    amount: 18000,
    type: "income",
    category: "Consulting",
    date: "2024-04-03",
    notes: "Project X fee",
  },
  {
    amount: 8200,
    type: "expense",
    category: "Software",
    date: "2024-04-03",
    notes: "AWS monthly bill",
  },
  {
    amount: 22000,
    type: "income",
    category: "Revenue",
    date: "2024-03-28",
    notes: "Bulk order payment",
  },
  {
    amount: 5500,
    type: "expense",
    category: "Marketing",
    date: "2024-03-25",
    notes: "Google Ads Q2",
  },
  {
    amount: 12000,
    type: "income",
    category: "Consulting",
    date: "2024-03-20",
    notes: "Advisory retainer",
  },
  {
    amount: 5700,
    type: "expense",
    category: "Travel",
    date: "2024-03-18",
    notes: "Client site visit",
  },
];

const insertRecords = db.prepare(
  `INSERT INTO records (amount, type, category, date, notes) VALUES (?,?,?,?,?)`,
);

records.forEach((record) => {
  insertRecords.run(
    record.amount,
    record.type,
    record.category,
    record.date,
    record.notes,
  );
});

console.log("Records seeded");

console.log("Database seeded successfully");
db.close();
