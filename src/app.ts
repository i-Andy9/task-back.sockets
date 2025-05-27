import express, { Application } from "express";
import dotenv from "dotenv";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

dotenv.config();

const app: Application = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: "*" },
});

app.use(express.json());

import { checkHealth } from "./controller/handler-health";
import taskRouter from "./routes/task-routes";
import { initTaskTable } from "./model/task-db";

app.get("/", checkHealth);
app.use("/api", taskRouter);

// initialize the database table for tasks
initTaskTable()
  .then(() => {
    console.log("Tabla 'tasks' verificada/creada correctamente.");
  })
  .catch((err) => {
    console.error("Error al crear/verificar la tabla 'tasks':", err);
  });

// weboscket connection
export { io };

io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

const port: number = parseInt(process.env.PORT || "3000");
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
