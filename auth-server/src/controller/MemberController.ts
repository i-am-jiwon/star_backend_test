import { Request, Response } from "express";
import { PostMember, GetMember } from "../models/User";
import * as adminData from "../data/Member";


// 생성 후 insertId를 리턴하도록 설계
export async function createMember(req: Request, res: Response) {
  const newAdminInfo: PostMember = req.body;
  const result = await adminData.createMember(newAdminInfo);

  if (result.success) {
    res.status(201).json(result);
  } else {
    res.status(409).json({ message: result.message }); // HTTP 409 Conflict 상태 코드 사용
  }
}

// 모든 admin user 들을 배열로 전송하도록 설계
export async function getMember(req: Request, res: Response) {
  const adminInfo: Array<GetMember> = await adminData.getMember();
  res.send(adminInfo);
}