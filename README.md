# To-Do List API (Node.js, Express, PostgreSQL)

## Descripción

Sistema de lista de tareas pendientes (To-Do List) en tiempo real. Permite crear, consultar, actualizar y eliminar tareas. Pensado para ser extendido con WebSockets y frontend opcional.

## Tecnologías

- Node.js
- Express
- PostgreSQL
- Docker (solo para la base de datos)
- TypeScript
- Socket.io (WebSockets)

## Endpoints principales

- `GET /api/tasks` — Obtener todas las tareas
- `POST /api/tasks` — Crear una nueva tarea
- `PATCH /api/tasks/:id` — Actualizar el estado (`status`) de una tarea
- `DELETE /api/tasks/:id` — Eliminar una tarea
- `GET /` — Health check (devuelve OK)

## Estructura de la tarea

- `id`: number (autogenerado)
- `titulo`: string (obligatorio, máx 100)
- `descripcion`: string (opcional, máx 500)
- `status`: string ('pendiente' o 'completada')
- `fechaCreacion`: timestamp
- `fechaActualizacion`: timestamp

## Instalación y uso

1. Clona el repositorio y entra a la carpeta del proyecto.
2. Instala dependencias:
   ```sh
   npm install
   ```
3. Crea un archivo `.env` basado en `.env.template` y configura tus variables:
   ```env
   PORT=3000
   DB_USER=admin
   DB_PASSWORD=admin123
   DB_DATABASE=tasksdb
   DB_HOST=localhost
   DB_PORT=5432
   POSTGRES_USER=admin
   POSTGRES_PASSWORD=admin123
   POSTGRES_DB=tasksdb
   ```
4. Levanta la base de datos con Docker:
   ```sh
   docker compose up -d
   ```
5. Inicia el backend:
   ```sh
   npm run dev
   ```

## Poblar la base de datos con ejemplos

Puedes usar la siguiente query en PostgreSQL:

```sql
INSERT INTO tasks (titulo, descripcion, status)
VALUES
  ('Comprar víveres', 'Leche, pan, huevos y frutas', 'pendiente'),
  ('Estudiar Node.js', 'Repasar documentación y hacer ejercicios', 'pendiente'),
  ('Hacer ejercicio', 'Correr 30 minutos en el parque', 'pendiente'),
  ('Leer un libro', 'Avanzar al menos 20 páginas', 'pendiente'),
  ('Llamar a mamá', 'Preguntar cómo está y ponerse al día', 'pendiente'),
  ('Limpiar la casa', 'Barrer, trapear y limpiar el baño', 'pendiente'),
  ('Enviar reporte semanal', 'Enviar por correo antes de las 5pm', 'completada'),
  ('Actualizar CV', 'Agregar últimos proyectos y experiencia', 'completada'),
  ('Planificar vacaciones', 'Buscar destinos y precios', 'pendiente'),
  ('Revisar correo electrónico', 'Responder mensajes importantes', 'completada');
```

## Pruebas de WebSocket (sin frontend)

Puedes probar la funcionalidad WebSocket usando el script incluido `test-socket.js` o con la herramienta wscat:

### Opción 1: test-socket.js

1. Instala el cliente de socket.io si no lo tienes:
   ```sh
   npm install socket.io-client
   ```
2. Ejecuta el script en una terminal:
   ```sh
   node test-socket.js
   ```
3. Realiza acciones en la API (crear, actualizar, eliminar tareas) usando Postman, curl, etc. Verás los eventos en tiempo real en la terminal.

### Opción 2: wscat (solo para ver conexión, no eventos socket.io personalizados)

1. Instala wscat si no lo tienes:
   ```sh
   npm install -g wscat
   ```
2. Conéctate al WebSocket:
   ```sh
   wscat -c ws://localhost:3000
   ```
3. Realiza acciones en la API y observa la conexión (los eventos socket.io personalizados no se mostrarán correctamente, pero puedes ver la conexión y mensajes en crudo).

**Ejemplo de comandos curl:**

- Crear tarea:
  ```sh
  curl -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"titulo":"Tarea websocket"}'
  ```
- Actualizar estado:
  ```sh
  curl -X PATCH http://localhost:3000/api/tasks/1 -H "Content-Type: application/json" -d '{"status":"completada"}'
  ```
- Eliminar tarea:
  ```sh
  curl -X DELETE http://localhost:3000/api/tasks/1
  ```

## Health Check

Puedes comprobar que el backend está corriendo accediendo a:

```
GET http://localhost:3000/
```

Respuesta esperada:

```json
{ "message": "OK" }
```

## Decisiones de diseño y consideraciones

- El campo `status` es string para cumplir con la consigna y facilitar la extensión a más estados.
- Se usa PostgreSQL por robustez, pero puedes adaptar fácilmente a SQLite cambiando la capa de datos.
- Los eventos WebSocket (`newTask`, `taskUpdated`, `taskDeleted`, `allTasks`) permiten que cualquier cliente conectado tenga la lista de tareas siempre actualizada en tiempo real.
- El backend es fácilmente extensible y cumple con buenas prácticas de API REST y manejo de eventos.

## Autor y contacto

- Desarrollado por Andre Zapata

---

> Recuerda actualizar este README si agregas nuevas funcionalidades o cambias la estructura del proyecto.
