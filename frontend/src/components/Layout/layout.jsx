import { Sidebar } from "./Sidebar";

export function Layout({ children, setTasks }) {
  return (
    <div className="flex w-full min-h-screen bg-background">
      <Sidebar setTasks={setTasks} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
