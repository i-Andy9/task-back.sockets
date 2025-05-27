import { Request, Response } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTaskStatus,
} from "../model/task-db";
import { io } from "../app";

const TaskController = {
  async getTasks(req: Request, res: Response) {
    try {
      console.info("Load all Task...");
      const allTasks = await getAllTasks();
      io.emit("allTasks", allTasks);
      res.status(200).json({ msg: "All Task", allTasks });
    } catch (error) {
      res.status(500).json({ error: "Error fetching Task" });
    }
  },

  async createTask(req: Request, res: Response) {
    const { titulo, descripcion } = req.body;
    if (!titulo) {
      return res.status(400).json({ error: "Title is required" });
    }

    try {
      console.info("Create Task...");
      const newTask = await createTask(titulo, descripcion);
      io.emit("newTask", newTask);
      const allTasks = await getAllTasks();
      io.emit("allTasks", allTasks);
      res.status(201).json({ msg: "Task created", newTask });
    } catch (error) {
      res.status(500).json({ error: "Error creating Task" });
    }
  },

  async updateTaskStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;

    if (
      !id ||
      typeof status !== "string" ||
      (status !== "pendiente" && status !== "completada")
    ) {
      return res.status(400).json({
        error: "ID y status (string: 'pendiente' o 'completada') requeridos",
      });
    }

    try {
      console.info(`Update Task ${id} status to ${status}...`);
      const updatedTask = await updateTaskStatus(+id, status);
      io.emit("taskUpdated", { id: +id, status });
      const allTasks = await getAllTasks();
      io.emit("allTasks", allTasks);
      res.status(200).json({ msg: "Task status updated", updatedTask });
    } catch (error) {
      res.status(500).json({ error: "Error updating Task status" });
    }
  },

  async deleteTask(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    try {
      console.info(`Delete Task ${id}...`);
      await deleteTask(+id);
      io.emit("taskDeleted", { id: +id });
      const allTasks = await getAllTasks();
      io.emit("allTasks", allTasks);
      res.status(200).json({ msg: "Task deleted" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting Task" });
    }
  },
};

export default TaskController;
