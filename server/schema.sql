-- Database schema for expense tracking app

-- Create users table in public schema
CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for email lookup
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- Create expenses table in public schema
CREATE TABLE IF NOT EXISTS public.expenses (
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

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_expenses_category ON public.expenses(category);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON public.expenses(expense_date);
CREATE INDEX IF NOT EXISTS idx_expenses_title ON public.expenses(title);
CREATE INDEX IF NOT EXISTS idx_expenses_user_id ON public.expenses(user_id);