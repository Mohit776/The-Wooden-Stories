import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

import { createProductsTable, createOrdersTable, createCustomersTable } from "./sql/schema.js";

const requiredEnv = ["MySQL_Host", "MySQL_User", "MySQL_Password", "MySQL_Database"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length) {
  console.warn("[DB] Missing MySQL environment variables:", missingEnv.join(", "));
}

const pool = mysql.createPool({
  host: process.env.MySQL_Host,
  user: process.env.MySQL_User,
  password: process.env.MySQL_Password,
  database: process.env.MySQL_Database,
  waitForConnections: true,
  connectionLimit: 10,
});

async function initDb() {
  try {
    const connection = await pool.getConnection();
    console.log("== ❤️ MYSQL Connected ❤️ ==");
    connection.release();

    await pool.query(createProductsTable);
    await pool.query(createCustomersTable);
    await pool.query(createOrdersTable);
    console.log("== ✅ DB schema ensured ==");
  } catch (err) {
    console.error("[DB] Error during initialization (connection or schema):", err);
  }
}

initDb().catch((err) => {
  console.error("[DB] Unexpected error running initDb():", err);
});

export default pool;
