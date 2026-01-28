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
    createdAt:{
      type: Date,
      required: true,
    },
    deadline: {
      type: Date,
      required: false,
    }
  },
  { timestamps: true }
)

export default mongoose.model("Task", taskSchema)
