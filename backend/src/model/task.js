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

// Índice descendente para optimizar sort({ createdAt: -1 }), dado que se utiliza en getTasks constantemente en el frontend, muy util para gran carga de datos.
taskSchema.index({ createdAt: -1 })

export default mongoose.model("Task", taskSchema)
