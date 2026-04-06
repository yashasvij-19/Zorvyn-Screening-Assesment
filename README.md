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

SQLite is file based, requires zero configuration, and the better-sqlite3 driver is synchronous which keeps the code straightforward. In a production system with multiple concurrent users, a proper database server would be the right call.

**JWT over sessions**

JWTs are stateless — the server does not need to store session data anywhere. The user's id, name and role are included in the token itself, so the middleware can verify identity and permissions in a single step without a database lookup on every request.

**Role based middleware**

A reusable `authorize(...roles)` middleware handles roles at the route level rather than checking them inside each controller. This keeps controllers focused on business logic and makes permission rules easy to read at a glance in the route files.

**MVC style folder structure**

Routes, controllers, and middleware are separated into their own folders. This makes the codebase easy to navigate and scale — adding a new feature means adding a route file and a controller file without touching anything else.

---

## Test credentials

After running the seed script, these accounts are available:

| Name | Email | Password | Role |
|---|---|---|---|
| Harrison Jeremy | harrison@findash.com | col127& | Admin |
| Tom Cook | tom@findash.com | col125% | Analyst |
| Derek OBrien | derek@findash.com | col123$ | Viewer |