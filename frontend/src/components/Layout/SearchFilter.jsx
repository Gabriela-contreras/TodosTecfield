import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchFilter({ searchOpen, setSearchOpen, open, searchTerm, setSearchTerm }) {
  return (
    <div className="px-3 mb-2">
      {searchOpen && open ? (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar tarea..."
            className="pl-9 pr-9 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            autoFocus
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 size-7 text-muted-foreground hover:text-foreground"
              onClick={() => setSearchTerm("")}
            >
              <X className="size-4" />
            </Button>
          )}
        </div>
      ) : (
        <Button
          variant="ghost"
          onClick={() => setSearchOpen(true)}
          className={`${
            open ? "w-full justify-start" : "w-12 px-0 justify-center"
          } text-muted-foreground hover:text-foreground hover:bg-secondary`}
        >
          <Search className="size-5" />
          {open && <span className="ml-3">Buscar</span>}
        </Button>
      )}
    </div>
  );
}
