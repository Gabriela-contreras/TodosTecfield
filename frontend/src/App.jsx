import { useEffect, useState } from "react";
import "./App.css";
// import { TaskForm } from "./components/formCreateTask";
import { Layout } from "./components/Layout/layout";
import { getTasks } from "@/services/gettasks";
import { Task } from "./components/tasks/TasksList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data); 
    };
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filter === "all" || task.status === filter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout 
      setTasks={setTasks} 
      searchTerm={searchTerm} 
      setSearchTerm={setSearchTerm}
      filter={filter}
      onFilterChange={setFilter}
    >
      <div className="space-y-3 w-full">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Mis Tareas</h1>
        <Task arrtasks={filteredTasks} setArrtasks={setTasks} />
      </div>
    </Layout>
  );
}

export default App;
