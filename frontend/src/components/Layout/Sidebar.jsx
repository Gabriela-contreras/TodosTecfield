import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Plus, ListTodo, Clock, CheckCircle2, ChevronLeft } from "lucide-react";
import { TaskForm } from "../form";
import SearchFilter from "./SearchFilter";

export function Sidebar({ setTasks, searchTerm, setSearchTerm }) {
  const [open, setOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const menuItems = [
    { icon: ListTodo, label: "Tareas", active: true },
    { icon: Clock, label: "Pendientes" },
    { icon: CheckCircle2, label: "Completadas" },
  ];

  const openCreateTask = () => setIsCreateOpen(true);
  const closeCreateTask = () => setIsCreateOpen(false);

  return (
    <>
      <aside
        className={`${
          open ? "w-64" : "w-[72px]"
        } h-screen bg-card border-r border-border transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-end p-4 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            className="text-muted-foreground hover:text-foreground hover:bg-secondary"
          >
            {open ? <ChevronLeft className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>

        <div className="p-3">
          <Button
            className={`${
              open ? "w-full" : "w-12 px-0"
            } cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-600
              hover:from-violet-500 hover:to-fuchsia-500 text-white border-0`}
            onClick={openCreateTask}
          >
            <Plus className="size-5" />
            {open && <span className="ml-2">Crear tarea</span>}
          </Button>
        </div>

        <SearchFilter
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          open={open}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <nav className="flex-1 px-3 py-3 flex flex-col gap-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`${open ? "justify-start" : "justify-center px-0"} ${
                item.active
                  ? "bg-secondary text-primary hover:bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className="size-5 shrink-0" />
              {open && <span className="ml-3">{item.label}</span>}
            </Button>
          ))}
        </nav>
      </aside>

      {isCreateOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={closeCreateTask}
        >
          <div
            className="w-full max-w-md rounded-xl border border-border bg-background p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <TaskForm updateTasks={setTasks} onClose={closeCreateTask} />

            <Button
              variant="ghost"
              className="mt-4 w-full"
              onClick={closeCreateTask}
            >
              Cerrar
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
