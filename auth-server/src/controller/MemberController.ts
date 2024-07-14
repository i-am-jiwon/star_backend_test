import { Request, Response } from "express";
import { PostMember, GetMember } from "../models/User";
import * as adminData from "../data/Member";


// 생성 후 insertId를 리턴하도록 설계
export async function createMember(req: Request, res: Response) {
  const newAdminInfo: PostMember = req.body;
  const result = await adminData.createMember(newAdminInfo);
  res.status(201).json(result);
}


// 모든 admin user 들을 배열로 전송하도록 설계
export async function getMember(req: Request, res: Response) {
  const adminInfo: Array<GetMember> = await adminData.getMember();
  res.send(adminInfo);
}