'use client';

import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  showSearch?: boolean;
  showAddButton?: boolean;
  onSearch?: (query: string) => void;
}

export function Layout({ children, title, showSearch, showAddButton, onSearch }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          title={title}
          showSearch={showSearch}
          showAddButton={showAddButton}
          onSearch={onSearch}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}