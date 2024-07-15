import { NextFunction, Request, Response } from "express";
import { PostMember, GetMember } from "../models/User";
import * as adminData from "../data/Member";

import { createSession } from "../data/userSession";
import { signJWT } from "../jwt/jwt";
import crypto from 'crypto';

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

// 특정 회원 정보를 가져오는 함수
export async function getMemberById(req: Request, res: Response) {
  const { id } = req.params;
  const user = await adminData.getMemberById(id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
}

// function for handle user login
export async function handleUserLogin(req: Request, res: Response, next: NextFunction) {

  // user가 입력한 email, password를 변수로 저장
  const { id, password } = req.body;

  // email을 통해 user 정보 접근
  const user = await adminData.getMemberById(id);


  // 만약 db에 password와 id 정보가 없다면 401 리턴
  if (!user) {
    return res.status(401).send("등록된 아이디가 존재하지 않습니다.");
  } 
  // 입력한 password를 salt와 함께 해시화하여 비교
  const hashedPassword = crypto
    .createHash('sha256')
    .update(user.salt + password) // 저장된 salt와 입력한 비밀번호를 조합
    .digest('hex');

  if (user.password !== hashedPassword) {
    return res.status(401).send("비밀번호가 유효하지 않습니다.");
  }

  // 입력한 id 통해 session 생성
  const session = createSession(id);

  // access token과 refresh token 생성
  // access token과 refresh token의 만료 주기는 각각 5분, 1년으로 설정
  const accessToken = signJWT({
    id: user.id, sessionId: session.sessionId
  }, "5s")

  const refreshToken = signJWT({
    sessionId: session.sessionId
  }, "1y");

  // 쿠키에 accessToken과 refreshToken을 담음
  res.cookie("accessToken", accessToken, {
    maxAge: 300000, // 5분
    httpOnly: true,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 3.154e10, // 1년
    httpOnly: true,
  });

  // 유저에게 session 반환
  return res.status(200).send(session);
}