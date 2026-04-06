# FinDash

It is a finance dashboard system that allows different users — admin, analyst, and viewer — to interact with financial records based on their role.

The backend provides user and role management, full CRUD operations on financial records with filtering, search and pagination, and summary level analytics. Access control is enforced on every endpoint based on the user's role.

---

## Tech stack

| Technology | Purpose |
|---|---|
| Node.js + Express | Server and REST API — minimal, flexible, and well suited for building APIs quickly |
| SQLite + better-sqlite3 | Database — zero setup, file based, appropriate for this project scope |
| JSON Web Tokens (JWT) | Token based authentication — stateless, industry standard |
| bcryptjs | Password hashing — passwords are never stored in plain text |
| express-validator | Input validation — ensures clean data before it hits the database |
| express-rate-limit | Rate limiting — protects endpoints from excessive requests |

---

## Getting started

### Prerequisites
- Node.js v18 or higher

### Installation

1. Clone the repository
```bash
git clone https://github.com/yashasvij-19/Zorvyn-Screening-Assesment.git
cd Zorvyn-Screening-Assesment
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
PORT=3000
JWT_SECRET=your_secret_key_here

> `.env` is not committed to GitHub for security reasons. Create it manually after cloning.

4. Seed the database with sample data
```bash
node src/db/seed.js
```

5. Start the development server
```bash
npm run dev
```

6. Open `http://localhost:3000` in your browser to access the dashboard.

---

## API endpoints

All protected routes require a JWT token in the request header:
Authorization: Bearer <token>

---

### Auth — `/api/auth`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and receive a JWT token |

**Register request body:**
```json
{
  "name": "John Doe",
  "email": "john@findash.com",
  "password": "password123",
  "role": "viewer"
}
```

**Login request body:**
```json
{
  "email": "john@findash.com",
  "password": "password123"
}
```

**Login response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@findash.com",
    "role": "viewer"
  }
}
```

---

### Records — `/api/records`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/records` | Admin, Analyst, Viewer | Get all records |
| GET | `/api/records/:id` | Admin, Analyst, Viewer | Get a single record |
| POST | `/api/records` | Admin, Analyst | Create a new record |
| PUT | `/api/records/:id` | Admin, Analyst | Update a record |
| DELETE | `/api/records/:id` | Admin only | Soft delete a record |

**Supported query parameters:**

```
GET /api/records?type=expense
GET /api/records?category=Marketing
GET /api/records?date=2024-04-01
GET /api/records?search=salary
GET /api/records?page=1&limit=5
```


**Create record request body:**
```json
{
  "amount": 15000,
  "type": "income",
  "category": "Revenue",
  "date": "2024-04-04",
  "notes": "Client payment"
}
```

---

### Users — `/api/users`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/users` | Admin only | Get all users |
| PATCH | `/api/users/:id/role` | Admin only | Update a user's role |
| PATCH | `/api/users/:id/status` | Admin only | Update a user's status |

**Update role request body:**
```json
{
  "role": "analyst"
}
```

**Update status request body:**
```json
{
  "status": "inactive"
}
```

---

### Analytics — `/api/analytics`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/analytics/summary` | Admin, Analyst | Total income, expenses and net balance |
| GET | `/api/analytics/by-category` | Admin, Analyst | Totals grouped by category |
| GET | `/api/analytics/monthly-trend` | Admin, Analyst | Income vs expenses per month |
| GET | `/api/analytics/recent-activity` | Admin, Analyst, Viewer | Last 5 financial records |

**Summary response:**
```json
{
  "totalIncome": 67000,
  "totalExpense": 61400,
  "netBalance": 5600
}
```

---

## Design decisions

**SQLite over a full database server**
SQLite is file based, requires zero configuration, and since better-sqlite3 driver is synchronous,it keeps the code straightforward.

**JWT over sessions**
JWTs are stateless — the server does not need to store session data anywhere. The user's id, name and role are included in the token itself and so the middleware can verify identity and permissions in a single step without a database lookup on every request.

**Role based middleware**
A reusable `authorize(...roles)` middleware handles the roles at the route level, Rather than checking it inside each controller, this makes permission rules easy to read in the route files.

**MVC style folder structure**
Routes, controllers, and middleware are separated into their own folders. This makes the codebase easy to navigate and scale.
---

## Test credentials

After running the seed script, these accounts are available:

| Name | Email | Password | Role |
|---|---|---|---|
| Harrison Jeremy | harrison@findash.com | col127& | Admin |
| Tom Cook | tom@findash.com | col125% | Analyst |
| Derek OBrien | derek@findash.com | col123$ | Viewer |

