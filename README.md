# Expense & Receipt Management System

## Software Engineering Intern Assignment

A comprehensive expense and receipt management web application built as part of a software engineering internship assignment. This project demonstrates full-stack development skills with modern technologies and best practices.

## 🎯 Objective

This assignment evaluates the ability to:
- Learn independently and build end-to-end systems
- Apply strong engineering principles using modern tools
- Use AI-assisted development effectively
- Create maintainable, scalable, and well-documented code

## 📋 Problem Statement

Build a simple Expense and Receipt Management web application that simulates a real-world fintech use case while remaining simple enough to complete within the given timeframe.

### Core Features
- ✅ Add an expense with title, amount, category, and date
- ✅ View list of expenses with pagination
- ✅ Filter and search expenses by multiple criteria
- ✅ View total spending summary with analytics
- ✅ Optional: attach receipt reference (URL)
- ✅ Edit and delete expenses
- ✅ Category-based spending analysis
- ✅ Responsive web interface

## 🛠️ Technical Requirements

### Technology Stack
- **Frontend**: Next.js 14 (TypeScript)
- **Backend**: Node.js with Express (TypeScript)
- **Database**: PostgreSQL (SQL)
- **Architecture**: Full-stack with separate frontend, middleware, and backend layers

### Additional Technologies Used
- **UI Framework**: Tailwind CSS for responsive design
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **HTTP Client**: Axios for API communication
- **Testing**: Jest for unit tests
- **Development**: TypeScript throughout for type safety

## 🏗️ Architecture & Design

### System Architecture
```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐    SQL    ┌─────────────────┐
│   Next.js       │◄────────────────►│   Express.js    │◄──────────►│   PostgreSQL    │
│   Frontend      │                  │   Backend       │            │   Database      │
│   (Port 3000)   │                  │   (Port 5000)   │            │                 │
└─────────────────┘                  └─────────────────┘            └─────────────────┘
```

### Project Structure
```
expense-receipt-management/
├── client/                          # Next.js Frontend Application
│   ├── src/
│   │   ├── app/                     # Next.js App Router Pages
│   │   │   ├── page.tsx            # Dashboard/Home Page
│   │   │   ├── expenses/           # Expense Management Pages
│   │   │   │   ├── page.tsx        # Expenses List
│   │   │   │   ├── new/            # Add Expense Page
│   │   │   │   └── [id]/           # Expense Details & Edit
│   │   │   └── summary/            # Analytics Summary Page
│   │   ├── components/             # Reusable React Components
│   │   │   ├── Layout.tsx         # Main Layout with Sidebar
│   │   │   ├── Sidebar.tsx        # Navigation Sidebar
│   │   │   ├── Header.tsx         # Top Header with Search
│   │   │   ├── SummaryCards.tsx   # Dashboard Summary Cards
│   │   │   ├── RecentExpensesTable.tsx # Expenses Table
│   │   │   ├── SpendingCharts.tsx # Analytics Charts
│   │   │   └── QuickActions.tsx   # Action Buttons
│   │   ├── services/              # API Service Layer
│   │   │   └── api.ts             # Axios API Client
│   │   ├── types/                 # TypeScript Type Definitions
│   │   │   └── expense.ts         # Expense-related Types
│   │   └── utils/                 # Utility Functions
│   │       └── formatters.ts      # Data Formatting Utilities
│   ├── .env.local                 # Environment Variables
│   └── package.json               # Frontend Dependencies
├── server/                          # Express.js Backend Application
│   ├── src/
│   │   ├── app.ts                 # Express App Configuration
│   │   ├── server.ts              # Server Entry Point
│   │   ├── config/                # Configuration Files
│   │   │   └── db.ts              # Database Connection
│   │   ├── controllers/           # Route Controllers (Business Logic)
│   │   │   └── expense.controller.ts # Expense CRUD Operations
│   │   ├── middlewares/           # Express Middlewares
│   │   │   ├── errorHandler.ts    # Global Error Handling
│   │   │   ├── notFound.ts        # 404 Handler
│   │   │   └── validateExpense.ts # Input Validation
│   │   ├── models/                # Data Models & Types
│   │   │   └── expense.types.ts   # TypeScript Interfaces
│   │   ├── repositories/          # Data Access Layer
│   │   │   └── expense.repository.ts # Database Operations
│   │   ├── routes/                # API Route Definitions
│   │   │   └── expense.routes.ts  # Expense API Routes
│   │   ├── services/              # Service Layer (Business Logic)
│   │   │   └── expense.service.ts # Expense Business Logic
│   │   ├── utils/                 # Utility Functions
│   │   │   ├── apiError.ts        # Custom Error Classes
│   │   │   └── formatCurrency.ts  # Currency Formatting
│   │   └── tests/                 # Unit Tests
│   │       ├── app.test.ts        # App Integration Tests
│   │       └── formatCurrency.test.ts # Utility Tests
│   ├── .env                      # Environment Variables
│   ├── schema.sql                # Database Schema & Sample Data
│   ├── package.json              # Backend Dependencies
│   └── tsconfig.json             # TypeScript Configuration
├── .gitignore                    # Git Ignore Rules
└── README.md                     # This Documentation
```

## 🚀 Features Implemented

### Core Features
- **Expense Management**
  - Create new expenses with title, amount, category, date
  - View detailed expense list with pagination
  - Edit existing expenses
  - Delete expenses with confirmation
  - Optional receipt URL attachment

- **Advanced Filtering & Search**
  - Search expenses by title
  - Filter by category (Food, Transportation, Entertainment, Health, Education, Other)
  - Filter by date range (start date, end date)
  - Combined filtering capabilities

- **Analytics & Reporting**
  - Dashboard with summary cards (Total Expenses, Total Spending, This Month, Categories)
  - Category-wise spending breakdown with pie charts
  - Monthly spending trends
  - Highest/Lowest expense tracking
  - Average expense calculations
  - Receipt attachment statistics

- **User Interface**
  - Responsive design for desktop and mobile
  - Clean, modern UI with Tailwind CSS
  - Intuitive navigation with sidebar
  - Interactive charts and data visualization
  - Form validation with error messages

### Technical Features
- **RESTful API Design**
  - Proper HTTP status codes
  - JSON response format
  - Consistent error handling
  - Input validation middleware

- **Database Design**
  - Normalized PostgreSQL schema
  - Proper indexing for performance
  - Sample data for testing
  - Foreign key relationships

- **Type Safety**
  - TypeScript throughout the application
  - Strict type checking
  - Interface definitions for all data structures

## 🧪 Testing

### Unit Tests
- API endpoint testing with Supertest
- Utility function testing with Jest
- Error handling validation
- Input validation testing

### Test Coverage
```bash
cd server
npm test
```

## 📊 Database Schema

```sql
-- Expenses table
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    expense_date DATE NOT NULL,
    receipt_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_expenses_category ON expenses(category);
CREATE INDEX idx_expenses_date ON expenses(expense_date);
CREATE INDEX idx_expenses_title ON expenses(title);
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Teenuhansa99/expense-receipt-management.git
cd expense-receipt-management
```

### 2. Database Setup
```bash
# Install PostgreSQL and create database
createdb expense_db

# Or using psql command line:
psql -U postgres -c "CREATE DATABASE expense_db;"

# Run the schema to create tables and insert sample data
psql -U postgres -d expense_db -f server/schema.sql
```

### 3. Backend Setup
```bash
cd server

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials:
# PORT=5000
# DB_HOST=localhost
# DB_PORT=5432
# DB_USER=postgres
# DB_PASSWORD=your_password
# DB_NAME=expense_db

# Start development server
npm run dev
```
Backend will be running at: `http://localhost:5000`

### 4. Frontend Setup
```bash
cd ../client

# Install dependencies
npm install

# Start development server
npm run dev
```
Frontend will be running at: `http://localhost:3000`

### 5. Access the Application
Open your browser and navigate to `http://localhost:3000`

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Expenses
- `GET /expenses` - Get all expenses (with optional filters)
- `GET /expenses/:id` - Get expense by ID
- `POST /expenses` - Create new expense
- `PUT /expenses/:id` - Update expense
- `DELETE /expenses/:id` - Delete expense
- `GET /expenses/summary` - Get expense summary statistics

#### Request/Response Examples

**Create Expense:**
```json
POST /api/expenses
{
  "title": "Lunch at Restaurant",
  "amount": 25.50,
  "category": "Food",
  "expenseDate": "2024-01-15",
  "receiptUrl": "https://example.com/receipt.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Expense created successfully",
  "data": {
    "id": 1,
    "title": "Lunch at Restaurant",
    "amount": 25.50,
    "category": "Food",
    "expense_date": "2024-01-15",
    "receipt_url": "https://example.com/receipt.jpg",
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:00:00Z"
  }
}
```

## 🎨 UI/UX Design

### Pages
1. **Dashboard (/)** - Overview with summary cards, recent expenses, and quick actions
2. **Expenses List (/expenses)** - Full expense listing with filtering and search
3. **Add Expense (/expenses/new)** - Form to create new expenses
4. **Expense Details (/expenses/[id])** - View individual expense details
5. **Edit Expense (/expenses/[id]/edit)** - Update existing expenses
6. **Summary (/summary)** - Analytics and spending reports

### Components
- Responsive sidebar navigation
- Search and filter functionality
- Interactive data charts
- Form validation with error states
- Loading states and error handling
- Confirmation dialogs for destructive actions

## 🔒 Security Considerations

- Input validation and sanitization
- SQL injection prevention with parameterized queries
- CORS configuration for cross-origin requests
- Error handling without exposing sensitive information
- TypeScript for compile-time type checking

## 🚀 Deployment (Optional)

### Frontend Deployment (Vercel)
```bash
cd client
npm run build
# Deploy to Vercel
```

### Backend Deployment (Render/Railway)
```bash
cd server
npm run build
# Deploy to Render/Railway with PostgreSQL database
```

## 🤝 Development Guidelines

### Code Quality
- Consistent TypeScript usage throughout
- Proper separation of concerns
- Reusable components and functions
- Clear naming conventions
- Comprehensive error handling

### Commit Guidelines
- Use descriptive commit messages
- Commit frequently with logical units of work
- Include issue references when applicable

### Testing
- Write unit tests for utility functions
- Test API endpoints with various scenarios
- Validate input handling and error cases

## 📈 Performance Optimizations

- Database indexing for query performance
- Efficient SQL queries with proper joins
- Client-side data caching where appropriate
- Lazy loading for large datasets
- Optimized bundle size with Next.js

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error:**
- Ensure PostgreSQL is running
- Verify database credentials in `.env`
- Check if database exists: `psql -U postgres -l`

**Port Already in Use:**
- Kill existing processes: `taskkill /IM node.exe /F`
- Or change ports in configuration

**Build Errors:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run type-check`

## 📚 Learning Outcomes

This project demonstrates:
- Full-stack web development with modern technologies
- RESTful API design and implementation
- Database design and optimization
- TypeScript for type-safe development
- Component-based UI development
- State management and data flow
- Testing methodologies
- Version control best practices
- Documentation and code organization

## 📞 Support

For questions or issues with this project:
1. Check the troubleshooting section above
2. Review the code comments and documentation
3. Examine the test files for usage examples
4. Check the GitHub repository for updates

## 📄 License

This project is developed as part of a software engineering internship assignment.

---

**Built with ❤️ using Next.js, Express.js, PostgreSQL, and TypeScript**