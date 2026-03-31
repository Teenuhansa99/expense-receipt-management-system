# Expense & Receipt Management System

A full-stack expense and receipt management web application built with Next.js, Express.js, PostgreSQL, and TypeScript.

##  Quick Start

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database (or use provided Supabase connection)

### Installation & Running

1. **Clone and install dependencies**
```bash
# Install frontend dependencies
cd client && npm install

# Install backend dependencies
cd ../server && npm install
```

2. **Configure environment variables**

For the backend (`server/.env`):
```env
PORT=5000
DATABASE_URL=postgresql://your_supabase_url
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
```

For the frontend (`client/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. **Start the servers**

Backend (Port 5000):
```bash
cd server
npm run dev
```

Frontend (Port 3000):
```bash
cd client
npm run dev
```

4. **Open the application**
Navigate to `http://localhost:3000`

---

## 📋 Features

### Core Features
- User Registration & Login with JWT authentication
- Add expenses with title, amount, category, and date
- View list of expenses with pagination
- Filter and search expenses by multiple criteria
- View total spending summary with analytics
- Edit and delete expenses
- Category-based spending analysis
- Responsive web interface

### Pages
1. **Login** (`/login`) - User authentication
2. **Register** (`/register`) - New user registration
3. **Dashboard** (`/`) - Overview with summary cards and recent expenses
4. **Expenses** (`/expenses`) - Full expense listing with filtering
5. **Add Expense** (`/expenses/new`) - Create new expense
6. **Expense Details** (`/expenses/[id]`) - View expense details
7. **Edit Expense** (`/expenses/[id]/edit`) - Update expense
8. **Summary** (`/summary`) - Analytics and spending reports
9. **Settings** (`/settings`) - User profile settings

---

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (via pg)
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt

---

## Database Schema

```sql
-- Users table
CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Expenses table
CREATE TABLE public.expenses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES public.users(id),
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    expense_date DATE NOT NULL,
    receipt_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_expenses_category ON public.expenses(category);
CREATE INDEX idx_expenses_date ON public.expenses(expense_date);
CREATE INDEX idx_expenses_user_id ON public.expenses(user_id);
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Expenses (Protected Routes - require JWT token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses (filtered by user) |
| GET | `/api/expenses/:id` | Get expense by ID |
| POST | `/api/expenses` | Create new expense |
| PUT | `/api/expenses/:id` | Update expense |
| DELETE | `/api/expenses/:id` | Delete expense |
| GET | `/api/expenses/summary` | Get expense summary |

### Request Examples

**Register:**
```json
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Login:**
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Create Expense (with Authorization header):**
```json
POST /api/expenses
Authorization: Bearer <jwt_token>

{
  "title": "Lunch",
  "amount": 25.50,
  "category": "Food",
  "expenseDate": "2026-03-31"
}
```

---

## Security

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes require valid JWT token
- SQL parameterized queries prevent injection
- CORS configured for cross-origin requests

---

## Project Structure

```
expense_app/
├── client/                    # Next.js Frontend
│   ├── src/
│   │   ├── app/              # App Router pages
│   │   ├── components/       # React components
│   │   ├── contexts/         # Auth context
│   │   ├── services/         # API services
│   │   └── types/            # TypeScript types
│   └── package.json
├── server/                    # Express Backend
│   ├── src/
│   │   ├── config/          # Database config
│   │   ├── controllers/      # Route controllers
│   │   ├── middlewares/      # Auth & validation
│   │   ├── models/           # Type definitions
│   │   ├── repositories/     # Data access layer
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   └── utils/            # Utilities
│   ├── .env                  # Environment variables
│   ├── schema.sql            # Database schema
│   └── package.json
└── README.md
```

---

## Testing

```bash
# Run backend tests
cd server
npm test
