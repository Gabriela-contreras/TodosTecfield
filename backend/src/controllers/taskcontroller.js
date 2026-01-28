import Task from "../model/task.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  try {
    const { title, status } = req.body

    const newTask = new Task({
      title,
      status,
      createdAt: new Date(),
      deadline: new Date(req.body.deadline),
    })

    const savedTask = await newTask.save()

    res.status(201).json(savedTask)
  } catch (error) {
    res.status(500).json({ message: "Error creando la tarea" })
  }
}

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
