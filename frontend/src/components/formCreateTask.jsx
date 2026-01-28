import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTask } from "@/services/createtasks"
import { useNotification } from "@/hooks/useNotification"

export function TaskForm({ updateTasks, onClose }) {
  const { success, error } = useNotification()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title: e.target.title.value.trim(),
      status: e.target.status.value,
      deadline: e.target.date.value,
    };

    console.log(newTask);
    if (!newTask.title) {
      return error("El título es obligatorio");
    }

    if (!["pendiente", "completada"].includes(newTask.status)) {
      return error("El estado de la tarea es inválido");
    }

    if (!validateDeadline(newTask.deadline)) {
      return;
    }

    try {
      const createdTask = await createTask(newTask);
      updateTasks((prevTasks) => [...prevTasks, createdTask]);
      success("Tarea creada correctamente");
      e.target.reset();
      onClose?.();
    } catch (err) {
      error("Error al crear la tarea");
      console.error(" Error creando la tarea:", err);
    }
  };


  const validateDeadline = (deadline) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const deadlineDate = new Date(deadline)
    deadlineDate.setHours(0, 0, 0, 0)
    // console.log(today);
    const nextDay = new Date(deadlineDate.getTime()+ (1 * 24 * 60 * 60 * 1000))
    // console.log(nextDay);
    

    if (nextDay < today) {
      error("La fecha de entrega debe ser mayor a la fecha actual")
      return false
    }

    return true
  }




  return (
    <Card className="w-full max-w-md bg-background border-none">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-xl text-foreground">Crear nueva tarea</CardTitle>
        <CardDescription className="text-muted-foreground">
          Agregá una tarea para organizar tu día
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground">Tarea</Label>
            <Input
              id="title"
              placeholder="Ej: Estudiar React"
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              required
            />
            <label htmlFor="date" className="text-foreground">Fecha de entrega</label>
            <Input type="date" id="date" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground" required onChange={(e) => validateDeadline(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status" className="text-foreground">Estado</Label>

            <select name="status" id="status" className="bg-secondary border-border text-foreground placeholder:text-muted-foreground w-full h-9 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none">
              <option value="pendiente">Pendiente</option>
              <option value="completada">Completada</option>
            </select>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0"
          >
            Crear tarea
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
