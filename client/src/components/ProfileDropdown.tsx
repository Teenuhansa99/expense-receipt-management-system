'use client';

import { useState, useRef, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  if (!user) {
    return null;
  }

  const userInitial = user.email.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-md transition-all duration-200 hover:shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        title={user.email}
      >
        <span className="text-sm font-semibold text-white">{userInitial}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          {/* Header */}
          <div className="border-b border-gray-100 px-4 py-3">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Account</p>
            <p className="mt-2 truncate text-sm font-medium text-gray-900">{user.email}</p>
            <p className="text-xs text-gray-500">
              Member since {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>

          {/* Logout Button */}
          <div className="px-4 py-2">
            <button
              onClick={handleLogout}
              className="flex w-full items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-all duration-150 hover:bg-red-50 active:scale-95"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
