import { Router } from "express";
import TaskController from "../controller/task-controller";

const taskRouter = Router();

taskRouter.get("/tasks", TaskController.getTasks);
taskRouter.post("/tasks", TaskController.createTask);
taskRouter.patch("/tasks/:id", TaskController.updateTaskStatus);
taskRouter.delete("/tasks/:id", TaskController.deleteTask);

export default taskRouter;
