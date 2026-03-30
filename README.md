# Expense Tracker

A full-stack expense tracking application built with Next.js (frontend) and Node.js/Express (backend) with PostgreSQL database.

## Features

- **Dashboard**: Overview with summary cards, recent expenses, and analytics
- **Expense Management**: Add, view, edit, and delete expenses
- **Categories**: Organize expenses by categories (Food, Transportation, Entertainment, etc.)
- **Receipts**: Attach receipt URLs to expenses
- **Filtering & Search**: Filter expenses by category, date range, and search by title
- **Summary Reports**: Detailed spending analytics and category breakdowns
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL
- **Charts**: Recharts
- **Icons**: Lucide React

## Project Structure

```
expense_app/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/           # Next.js app router pages
│   │   ├── components/    # Reusable UI components
│   │   ├── services/      # API service functions
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                 # Express.js backend
│   ├── src/
│   │   ├── app.ts         # Express app setup
│   │   ├── server.ts      # Server entry point
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # Route controllers
│   │   ├── middlewares/   # Express middlewares
│   │   ├── models/        # TypeScript interfaces
│   │   ├── repositories/  # Database operations
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── utils/         # Utility functions
│   │   └── tests/         # Unit tests
│   ├── schema.sql         # Database schema
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Database Setup

1. Install PostgreSQL and start the service
2. Create a database user (default: postgres)
3. Run the database setup:

```bash
cd server
# Set your PostgreSQL password
$env:PGPASSWORD="your_password"
psql -U postgres -d postgres -c "CREATE DATABASE expense_db;"
psql -U postgres -d expense_db -f schema.sql
```

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Update the `.env` file with your database credentials:
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=expense_db
```

4. Start the development server:
```bash
npm run dev
```

The backend will be running at `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be running at `http://localhost:3000` or `http://localhost:3001`

## API Endpoints

- `GET /api/expenses` - Get all expenses (with optional filters)
- `GET /api/expenses/:id` - Get expense by ID
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/summary` - Get expense summary statistics

## Usage

1. Open the application in your browser
2. View the dashboard for an overview of your expenses
3. Add new expenses using the "Add Expense" button
4. Browse and manage expenses in the "Expenses" section
5. View detailed analytics in the "Summary" section
6. Filter and search expenses as needed

## Development

### Running Tests

```bash
cd server
npm test
```

### Building for Production

#### Backend:
```bash
cd server
npm run build
npm start
```

#### Frontend:
```bash
cd client
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.