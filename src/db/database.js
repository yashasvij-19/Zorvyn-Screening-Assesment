const Database = require ('better-sqlite3')
const path = require ('path')

const db = new Database(path.join(__dirname,'database.db'))

db.exec(`
    CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'viewer',
    status TEXT NOT NULL DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    `)

    db.exec(`
        CREATE TABLE IF NOT EXISTS records(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        type TEXT NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL,
        notes TEXT, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        `)

        console.log('Database connected and tables ready')

        module.exports = db