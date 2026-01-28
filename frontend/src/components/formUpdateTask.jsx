import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateTaskService } from "@/services/updateTask"
import { useNotification } from "@/hooks/useNotification"

const formatDateForInput = (dateString) => {
    if (!dateString) return ""
    return new Date(dateString).toISOString().split("T")[0]
}

export function UpdateTaskForm({ task, onUpdate, onClose }) {
    const { success, error } = useNotification()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const updatedData = {
            title: e.target.title.value,
            status: e.target.status.value,
            deadline: e.target.deadline.value || null,
        }

        try {
            const updatedTask = await updateTaskService(task._id, updatedData)
            onUpdate(updatedTask)
            success("Tarea actualizada correctamente")
            onClose()
        } catch (err) {
            error("Error al actualizar la tarea")
            console.error("Error actualizando la tarea:", err)
        }
    }

    return (
        <Card className="w-full max-w-md bg-background border-none">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-xl text-foreground">Actualizar tarea</CardTitle>
                <CardDescription className="text-muted-foreground">
                    Modificá los datos de tu tarea
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-foreground">Tarea</Label>
                        <Input
                            id="title"
                            name="title"
                            defaultValue={task.title}
                            placeholder="Ej: Estudiar React"
                            className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="status" className="text-foreground">Estado</Label>
                        <select 
                            name="status" 
                            id="status" 
                            defaultValue={task.status}
                            className="bg-secondary border-border text-foreground w-full h-9 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none"
                        >
                            <option value="pendiente">Pendiente</option>
                            <option value="completada">Completada</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="deadline" className="text-foreground">Fecha límite</Label>
                        <Input
                            id="deadline"
                            name="deadline"
                            type="date"
                            defaultValue={formatDateForInput(task.deadline)}
                            className="bg-secondary border-border text-foreground w-full"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0"
                    >
                        Actualizar tarea
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}