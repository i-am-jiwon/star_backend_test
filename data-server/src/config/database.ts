import mysql from "mysql2";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const pool = mysql.createPool({
  host: 'localhost', // 호스트 주소 (docker-compose.yml에서 정의한 서비스 이름)
  user: process.env.DB_USER, // mysql user
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3003,
});

export const db = pool.promise();