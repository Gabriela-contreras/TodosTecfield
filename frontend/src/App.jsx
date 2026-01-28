import { useEffect, useState } from "react";
import "./App.css";
import { TaskForm } from "./components/form";
import { Layout } from "./components/Layout/layout";
import { Task } from "./components/task";
import { getTasks } from "@/services/gettasks";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  return (
    <Layout>
      {/* <TaskForm createTask={setTasks} /> */}
      <div>
        <h1 className="text-2xl font-bold mb-6">Mis Tareas</h1>
        <Task arrtasks={tasks} />
      </div>

    </Layout>
  );
}

export default App;
