import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MySQL_Host,
  user: process.env.MySQL_User,
  password: process.env.MySQL_Password,
  database: process.env.MySQL_Database,
  waitForConnections: true,
  connectionLimit: 10,
});
console.log("== ❤️ MYSQL Connected ❤️ ==")
export default pool;
