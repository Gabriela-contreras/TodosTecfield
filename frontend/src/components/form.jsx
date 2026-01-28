import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTask } from "@/services/createtasks"

export function TaskForm({ updateTasks}) {
  
  const handleSubmit = async (e) => {
    e.preventDefault()
  
    const newTask = {
      title: e.target.title.value,
      status: e.target.status.value,
    }
  
    try {
      const createdTask = await createTask(newTask)
  
      updateTasks((prevTasks) => [...prevTasks, createdTask])
  
      e.target.reset()
    } catch (error) {
      console.error("Error creando la tarea", error)
    }
    e.target.reset()
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
