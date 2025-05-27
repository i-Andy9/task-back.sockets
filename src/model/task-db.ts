import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";
import { TaskEntity } from "./entity/task-entity";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

// Crea la tabla si no existe
export async function initTaskTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      titulo VARCHAR(100) NOT NULL,
      descripcion VARCHAR(500),
      status VARCHAR(20) NOT NULL DEFAULT 'pendiente',
      "fechaCreacion" TIMESTAMP NOT NULL DEFAULT NOW(),
      "fechaActualizacion" TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);
}

export async function getAllTasks(): Promise<TaskEntity[]> {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
  return result.rows;
}

export async function createTask(
  titulo: string,
  descripcion?: string
): Promise<TaskEntity> {
  const result = await pool.query(
    `INSERT INTO tasks (titulo, descripcion) VALUES ($1, $2) RETURNING *`,
    [titulo, descripcion || null]
  );
  return result.rows[0];
}

export async function updateTaskStatus(
  id: number,
  status: string
): Promise<TaskEntity | null> {
  const result = await pool.query(
    `UPDATE tasks SET status = $1, "fechaActualizacion" = NOW() WHERE id = $2 RETURNING *`,
    [status, id]
  );
  return result.rows[0] || null;
}

export async function updateTaskCompleted(
  id: number,
  completed: boolean
): Promise<TaskEntity | null> {
  const result = await pool.query(
    `UPDATE tasks SET status = $1, "fechaActualizacion" = NOW() WHERE id = $2 RETURNING *`,
    [completed, id]
  );
  return result.rows[0] || null;
}

export async function deleteTask(id: number): Promise<boolean> {
  const result = await pool.query(`DELETE FROM tasks WHERE id = $1`, [id]);
  return (result.rowCount ?? 0) > 0;
}
