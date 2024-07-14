import { db } from "./database";
import { PostMember, GetMember } from "../models/User";

export async function createMember(newAdminInfo: PostMember) {
  const { id, password, salt, name, email, depart, duty, role } = newAdminInfo;

  const query = "INSERT INTO users (id, password, salt, name, email, depart, duty, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [id, password, salt, name, email || null, depart || null, duty || null, role];

  try {
    const [result] = await db.execute(query, values);
    const insertId = (result as any).insertId;

    return {
      success: true,
      insertId,
      id,
      name,
      email,
      depart,
      duty,
      role,
    };
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return {
        success: false,
        message: "Duplicate entry for key 'users.PRIMARY'. This ID is already in use.",
      };
    }
    throw error; // 다른 오류는 그대로 throw
  }
}

export async function getMember(): Promise<Array<GetMember>> {
  const query = "SELECT * FROM users";

  // 쿼리 실행
  const [rows] = await db.execute(query);

  // 결과 반환
  return rows as GetMember[];
}