import Task from "../model/task.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
};

// export const createTask = async (req, res) => {
//   try {
//     const { title, status } = req.body

//     const newTask = new Task({
//       title,
//       status,
//       createdAt: new Date(),
//       deadline: deadline ? new Date(deadline) : null,
//     })
//     console.log(newTask);
//     const savedTask = await newTask.save()

//     res.status(201).json(savedTask)
//   } catch (error) {
//     res.status(500).json({ message: "Error creando la tarea" })
//   }
// }
export const createTask = async (req, res) => {
  try {
    const { title, status, deadline } = req.body;

    // Validaciones
    if (!title || !status) {
      return res.status(400).json({ message: "Title y status son obligatorios" });
    }

    if (!["pendiente", "completada"].includes(status)) {
      return res.status(400).json({ message: "Status inválido" });
    }

    // Crear task
    const newTask = new Task({
      title: title.trim(),
      status,
      createdAt: new Date(),
      deadline: deadline ? new Date(deadline) : new Date(Date.now() + 7*24*60*60*1000) // default 7 días
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);

  } catch (error) {
    console.error("🔥 Error creando la tarea:", error);
    res.status(500).json({
      message: error.message,
      errors: error.errors
    });
  }
};


export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(task);
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};
