import { useState } from "react"
import { deleteTaskService } from "@/services/deleteTask"
import { updateTaskService } from "@/services/updateTask"

const statusStyles = {
  pendiente: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  progreso: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  hecho: "bg-green-500/10 text-green-400 border-green-500/20",
}

export function Task({ arrtasks, setArrtasks }) {
  const [openMenuId, setOpenMenuId] = useState(null)

  const deleteTask = async (id) => {
    await deleteTaskService(id)
    setArrtasks(arrtasks.filter((task) => task._id !== id))

  }

  const updateTask = async (id) => {
    await updateTaskService(id)
    setArrtasks(arrtasks.map((task) => task._id === id ? { ...task, status: "completada" } : task))
  }


  const handleCheckboxChange = (id) => {
    if (arrtasks.find((task) => task._id === id).status === "completada") {
      setArrtasks(arrtasks.map((task) => task._id === id ? { ...task, status: "pendiente" } : task))
    } else {
      setArrtasks(arrtasks.map((task) => task._id === id ? { ...task, status: "completada" } : task))
    }
  }

  return (
    <div className="space-y-3 ">
      {arrtasks.map((task) => (
        <div
          key={task._id}
          className="flex items-center justify-between gap-4 w-full p-4 rounded-xl border border-border bg-background text-foreground shadow-sm hover:shadow-md transition mt-4"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4 accent-primary cursor-pointer"
              onChange={() => handleCheckboxChange(task._id)}
            />

            <div className="flex flex-row items-center gap-2">
              <h3 className="text-base font-semibold">{task.title}</h3>
              <span
                className={`mt-1 w-fit px-3 py-1 text-sm rounded-full border capitalize
                  ${statusStyles[task.status] || "bg-muted text-muted-foreground border-border"}`}
              >
                {task.status}
              </span>
            </div>
          </div>

          <div className="relative">
            <button
              className={`p-2 rounded-lg transition-colors ${
                openMenuId === task._id
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
              onClick={() =>
                setOpenMenuId(openMenuId === task._id ? null : task._id)
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="5" r="2"/>
                <circle cx="12" cy="12" r="2"/>
                <circle cx="12" cy="19" r="2"/>
              </svg>
            </button>
            {openMenuId === task._id && (
              <div className="absolute right-0 top-full mt-1 z-10 w-36 rounded-lg border border-border bg-card shadow-lg overflow-hidden">
                <button
                  onClick={() => {
                    deleteTask(task._id)
                    setOpenMenuId(null)
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-secondary transition-colors"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => {
                    updateTask(task)
                    setOpenMenuId(null)
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-secondary transition-colors"
                >
                  Actualizar
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
