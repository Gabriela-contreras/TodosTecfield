import mongoose from "mongoose"

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pendiente", "completada"],
      default: "pendiente",
    },
  },
  { timestamps: true }
)

export default mongoose.model("Task", taskSchema)
