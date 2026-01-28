import { Sidebar } from "./Sidebar";

export function Layout({ children, setTasks, searchTerm, setSearchTerm }) {
  return (
    <div className="flex w-full min-h-screen bg-background">
      <Sidebar setTasks={setTasks} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
