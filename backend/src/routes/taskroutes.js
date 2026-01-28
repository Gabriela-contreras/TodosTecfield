import { Router } from "express"
import Task from "../model/task.js"

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskcontroller.js"

const router = Router()


router.get("/", async (req, res) => {
  try {
    const { from, to } = req.query

    let query = {}

    if (from && to) {
      const fromDate = new Date(from)
      const toDate = new Date(to)

      if (isNaN(fromDate) || isNaN(toDate)) {
        return res.status(400).json({ error: "Invalid dates" })
      }

      query.deadline = {
        $gte: fromDate,
        $lte: toDate,
      }
    }

    const tasks = await Task.find(query)
    res.json(tasks)
  } catch (error) {
    console.error("❌ Error fetching tasks:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})



router.post("/", createTask)
router.put("/:id", updateTask)
router.delete("/:id", deleteTask)

export default router
