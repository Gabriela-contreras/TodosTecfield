import { Sidebar } from "./Sidebar";

export function Layout({ children, setTasks, searchTerm, setSearchTerm, filter, onFilterChange }) {
  return (
    <div className="flex w-full min-h-screen bg-background">
      <Sidebar 
        setTasks={setTasks}
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        filter={filter}
        onFilterChange={onFilterChange}
      />
      <main className="flex-1 p-4 pt-16 md:pt-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
