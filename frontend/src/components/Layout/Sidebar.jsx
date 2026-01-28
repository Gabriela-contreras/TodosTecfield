import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Plus, ChevronLeft, X } from "lucide-react";
import { TaskForm } from "../formCreateTask";
import SearchFilter from "./SearchFilter";
import SelectFilter from "./SelectFilter";

export function Sidebar({ setTasks, searchTerm, setSearchTerm, filter, onFilterChange }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const openCreateTask = () => setIsCreateOpen(true);
  const closeCreateTask = () => setIsCreateOpen(false);
  const toggleSidebar = () => setOpen(!open);

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-40 md:hidden text-muted-foreground hover:text-foreground hover:bg-secondary"
      >
        <Menu className="size-5" />
      </Button>

      {/* Overlay for mobile */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:relative z-50 md:z-auto
          ${open ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-[72px]"}
          h-screen bg-card border-r border-border transition-all duration-300 flex flex-col
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="md:hidden text-muted-foreground hover:text-foreground hover:bg-secondary"
          >
            <X className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="hidden md:flex text-muted-foreground hover:text-foreground hover:bg-secondary"
          >
            {open ? <ChevronLeft className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>

        <div className="p-3">
          <Button
            className={`${open ? "w-full" : "md:w-12 md:px-0 w-full"}
              cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-600
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

        {open && <SelectFilter filter={filter} onFilterChange={onFilterChange} />}
      </aside>

      {isCreateOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={closeCreateTask}
        >
          <div
            className="w-full max-w-md rounded-xl border border-border bg-background p-4 sm:p-6 shadow-lg"
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
