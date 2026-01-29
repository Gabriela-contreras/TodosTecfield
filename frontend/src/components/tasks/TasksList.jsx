import { useState } from "react"
import { Button } from "@/components/ui/button"
import { deleteTaskService } from "@/services/deleteTask"
import { useNotification } from "@/hooks/useNotification"
import { UpdateTaskForm } from "../formUpdateTask"
import { updateTaskService } from "@/services/updateTask"

const STATUS_STYLES = {
  pendiente: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  progreso: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  completada: "bg-green-500/10 text-green-400 border-green-500/20",
}

const DEFAULT_STATUS_STYLE = "bg-muted text-muted-foreground border-border"

const getStatusStyle = (status) =>
  STATUS_STYLES[status] || DEFAULT_STATUS_STYLE

const toggleStatus = (currentStatus) =>
  currentStatus === "completada" ? "pendiente" : "completada"

export function Task({ arrtasks, setArrtasks }) {
  const [openMenuId, setOpenMenuId] = useState(null)
  const [editingTask, setEditingTask] = useState(null)
  const { success, error } = useNotification()

  const updateTaskInList = (updatedTask) => {
    setArrtasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    )
  }

  // eliminar task
  const handleDelete = async (taskId) => {
    try {
      await deleteTaskService(taskId)

      setArrtasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskId)
      )

      success("Tarea eliminada correctamente")
    } catch (err) {
      error("Error al eliminar la tarea")
      console.error(err)
    }
  }

  // checkbox conectado con la bd actualizar estado en BD
  const handleCheckboxChange = async (taskId, currentStatus) => {
    const newStatus = toggleStatus(currentStatus)

    try {
      const updatedTask = await updateTaskService(taskId, {
        status: newStatus,
      })

      setArrtasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      )

      success("Estado actualizado")
    } catch (err) {
      error("No se pudo actualizar el estado")
      console.error(err)
    }
  }

  const handleMenuToggle = (taskId) => {
    setOpenMenuId((prev) => (prev === taskId ? null : taskId))
  }

  const closeMenu = () => setOpenMenuId(null)

  const openEditModal = (task) => {
    setEditingTask(task)
    closeMenu()
  }

  const closeEditModal = () => setEditingTask(null)

  const isCompleted = (status) => status === "completada"

  const formatDate = (dateString) => {
    //Se suman 3 horas para compensar la diferencia horaria:
    // la fecha viene en UTC desde la base de datos y en Argentina (UTC-3)
    // sin este ajuste se muestra un día anterior
    const date = new Date(new Date(dateString).getTime() + 3 * 60 * 60 * 1000)

    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",

    })
  }

  return (
    <>
      <div className="space-y-3">
        {arrtasks.map((task) => (
          <div
            key={task._id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full rounded-xl border border-border bg-background p-3 sm:p-4 shadow-sm transition hover:shadow-md"
          >

            <div className="flex items-start gap-3 flex-1 min-w-0">


              <div className="flex flex-col gap-2 min-w-0 flex-1 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isCompleted(task.status)}
                    onChange={() =>
                      handleCheckboxChange(task._id, task.status)
                    }
                    className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-primary justify-center items-center"
                  />
                  <h3
                    className={`truncate text-sm sm:text-base font-semibold ${isCompleted(task.status)
                      ? "line-through text-muted-foreground"
                      : ""
                      }`}
                  >
                    {task.title}
                  </h3>
                </div>



                <div className="flex flex-wrap md:items-center  sm:items-start  gap-4">
                  <div className="flex flex-col md:items-center sm:items-start justify-center  gap-2 mx-4">
                    <span>fecha de creación:</span><span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(task.createdAt)}
                    </span>
                  </div>
                  <div className="flex flex-col md:items-center sm:items-start justify-center  gap-2 mx-4 ">
                    <span>fecha de entrega:</span>
                    <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(task.deadline)}
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center  gap-2 mx-4 ">
                    <span
                      className={`px-2.5 py-0.5 text-xs sm:text-sm sm:block rounded-full border capitalize ${getStatusStyle(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span> 
                  </div>

                </div>
              </div>
            </div>

            {/* Acciones para eliminar y actualizar tarea */}
            <div className="relative self-end sm:self-auto">
              <button
                onClick={() => handleMenuToggle(task._id)}
                className={`p-2 rounded-lg transition-colors ${openMenuId === task._id
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </svg>
              </button>

              {openMenuId === task._id && (
                <div className="absolute right-0 top-full mt-2 z-20 w-36 overflow-hidden rounded-lg border border-border bg-card shadow-lg">
                  <button
                    onClick={() => {
                      handleDelete(task._id)
                      closeMenu()
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-secondary"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => openEditModal(task)}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-secondary"
                  >
                    Actualizar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* modal para actualizar tarea */}
      {editingTask && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={closeEditModal}
        >
          <div
            className="w-full max-w-md rounded-xl border border-border bg-background p-4 sm:p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <UpdateTaskForm
              task={editingTask}
              onUpdate={updateTaskInList}
              onClose={closeEditModal}
            />

            <Button
              variant="ghost"
              className="mt-4 w-full"
              onClick={closeEditModal}
            >
              Cerrar
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
