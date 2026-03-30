'use client';

import { Search, Plus, User } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  title: string;
  showSearch?: boolean;
  showAddButton?: boolean;
  onSearch?: (query: string) => void;
}

export function Header({ title, showSearch = false, showAddButton = false, onSearch }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>

      <div className="flex items-center space-x-4">
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search expenses..."
              className="w-64 rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        )}

        {showAddButton && (
          <Link
            href="/expenses/new"
            className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-white hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
          >
            <Plus className="h-4 w-4" />
            <span>Add Expense</span>
          </Link>
        )}

        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
          <User className="h-4 w-4 text-gray-600" />
        </button>
      </div>
    </header>
  );
}