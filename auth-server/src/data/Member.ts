import { db } from "./database";
import { PostMember, GetMember } from "../models/User";

export async function createMember(newAdminInfo: PostMember): Promise<string> {
    const {
      id,
      password,
      salt,
      name,
      role,
      email,
      tel,
      depart,
      duty,
    } = newAdminInfo;
  
    const query: string =
      "INSERT INTO users (id, password, salt, name, role, email, tel, depart, duty) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    return db
      .execute(query, [
        id,
        password,
        salt,
        name,
        role,
        email,
        tel,
        depart,
        duty,
      ])
      .then((result: any) => result[0].insertId);
  }
  
  export async function getMember(): Promise<Array<GetMember>> {
    const query: string =
      "SELECT id, name, email, depart, duty, role FROM users";
    
    return db.execute(query).then((result: any) => result[0]);
  }