import { db } from "../config/database";
import { PostMember, GetMember } from "../models/User";
import { RowDataPacket } from 'mysql2';
import crypto from 'crypto';

export async function createMember(newAdminInfo: PostMember) {
  const { id, password, name, role } = newAdminInfo;

  // Salt 생성
  const salt = crypto.randomBytes(16).toString('hex');

  // 비밀번호 해시화
  const hashedPassword = crypto
    .createHash('sha256')
    .update(salt + password)
    .digest('hex');

  
  const query = "INSERT INTO users (id, password, salt, name, role) VALUES (?, ?, ?, ?, ?)";
  const values = [id, hashedPassword, salt, name, role];

  try {
    const [result] = await db.execute(query, values);
    const insertId = (result as any).insertId;

    return {
      success: true,
      insertId,
      id,
      name,
      role
    };
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return {
        success: false,
        message: "이미 존재하는 ID 입니다.",
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

export async function getMemberById(id: string): Promise<RowDataPacket | null> {
  try {
    const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [id]);
    return rows.length ? rows[0] : null;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}