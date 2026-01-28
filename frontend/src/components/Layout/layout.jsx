import { Sidebar } from "./Sidebar";

export function Layout({ children }) {
  return (
    <div className="flex w-full min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
