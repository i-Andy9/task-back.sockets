## Funciones pendientes y realizadas

### Realizadas:

- ✔️ Definición de la entidad Task (TaskEntity)
- ✔️ Lógica de acceso a datos con PostgreSQL (task-db.ts)
- ✔️ Creación automática de la tabla tasks
- ✔️ Endpoint GET /api/tasks para obtener todas las tareas
- ✔️ Endpoint POST /api/tasks para crear una tarea
- ✔️ Endpoint PATCH /api/tasks/:id para actualizar el estado de una tarea
- ✔️ Configuración de variables de entorno y conexión a la base de datos
- ✔️ Docker Compose para la base de datos
- ✔️ Endpoint DELETE /api/tasks/:id para eliminar una tarea
- ✔️ Integración de WebSockets para notificaciones en tiempo real
- ✔️ Endpoint de health check documentado
- ✔️ Poblar la base de datos con tareas de ejemplo

### Pendientes:

- ⬜ (Opcional) Frontend básico o instrucciones para probar WebSockets

---

## Configuraciones listas y por hacer

### Listas:

- ✔️ Archivo .env con variables para app y base de datos
- ✔️ Docker Compose para PostgreSQL
- ✔️ Carga de variables de entorno con dotenv
- ✔️ Conexión y pool de PostgreSQL funcionando
- ✔️ Configuración de WebSockets (socket.io)
- ✔️ Documentación en README sobre cómo levantar y probar el proyecto

### Por hacer:

- ⬜ Docker Compose para levantar también la app (si se desea)
- ⬜ Manejo de errores más detallado en los endpoints
