-- Database schema for expense tracking app

-- Create database
CREATE DATABASE expense_db;

-- Connect to the database
\c expense_db;

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for email lookup
CREATE INDEX idx_users_email ON users(email);

-- Create expenses table
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

-- Create index for better query performance
CREATE INDEX idx_expenses_category ON expenses(category);
CREATE INDEX idx_expenses_date ON expenses(expense_date);
CREATE INDEX idx_expenses_title ON expenses(title);

-- Insert some sample data
INSERT INTO expenses (title, amount, category, expense_date, receipt_url) VALUES
('Lunch at Restaurant', 25.50, 'Food', '2024-01-15', 'https://example.com/receipt1.jpg'),
('Grocery Shopping', 85.30, 'Food', '2024-01-16', NULL),
('Bus Ticket', 12.00, 'Transportation', '2024-01-17', NULL),
('Coffee', 4.50, 'Food', '2024-01-18', NULL),
('Movie Tickets', 28.00, 'Entertainment', '2024-01-19', 'https://example.com/receipt2.jpg'),
('Gas Station', 45.00, 'Transportation', '2024-01-20', NULL),
('Book Purchase', 15.99, 'Education', '2024-01-21', NULL),
('Gym Membership', 50.00, 'Health', '2024-01-22', NULL);