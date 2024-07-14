import { db } from "./database";
import { PostMember, GetMember } from "../models/User";

export async function createMember(newAdminInfo: PostMember) {
  const { id, password, salt, name, email, depart, duty, role } = newAdminInfo;

  // SQL 쿼리와 매개변수 배열
  const query = "INSERT INTO users (id, password, salt, name, email, depart, duty, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [id, password, salt, name, email || null, depart || null, duty || null, role];

  // 쿼리 실행
  const [result] = await db.execute(query, values);

  // 삽입된 행의 insertId 반환
  const insertId = (result as any).insertId;

  // 리턴 객체
  return {
    insertId,
    id,
    name,
    email,
    depart,
    duty,
    role,
  };
}

export async function getMember(): Promise<Array<GetMember>> {
  const query = "SELECT * FROM users";

  // 쿼리 실행
  const [rows] = await db.execute(query);

  // 결과 반환
  return rows as GetMember[];
}