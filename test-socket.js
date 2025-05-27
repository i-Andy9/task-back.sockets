const { io } = require("socket.io-client");
const socket = io("ws://localhost:3000");

socket.on("connect", () => {
  console.log("Conectado al servidor WebSocket");
});

socket.on("allTasks", (data) => {
  console.log("todas las tareas:", data);
});

socket.on("newTask", (data) => {
  console.log("Nueva tarea:", data);
});

socket.on("taskUpdated", (data) => {
  console.log("Tarea actualizada:", data);
});

socket.on("taskDeleted", (data) => {
  console.log("Tarea eliminada:", data);
});