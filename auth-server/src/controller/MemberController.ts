import { NextFunction, Request, Response } from "express";
import { PostMember, GetMember } from "../models/User";
import * as memberData from "../data/Member";

import { createSession } from "../data/userSession";
import { signJWT } from "../jwt/jwt";
import crypto from 'crypto';

export async function createMember(req: Request, res: Response) {
  const newMemberInfo: PostMember = req.body;

  if (!newMemberInfo || Object.keys(newMemberInfo).length === 0) {
    return res.status(400).json({
      status: 400,
      message: '비어있는 요청입니다.',
    }); 
  }

  try {
    const result = await memberData.createMember(newMemberInfo);

    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(409).json({
        status: 409,
        message: result.message,
      }); 
    }
  } catch (error) {
    console.error('Error creating member:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    }); 
  }
}

// 모든 member user 들을 배열로 전송하도록 설계
export async function getMember(req: Request, res: Response) {
  const memberInfo: Array<GetMember> = await memberData.getMember();
  res.send(memberInfo);
}

// 특정 회원 정보를 가져오는 함수
export async function getMemberById(req: Request, res: Response) {
  const { id } = req.params;
  const user = await memberData.getMemberById(id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({
      status: 404,
      message: "찾을 수 없는 회원입니다."
    });
  }
}

// function for handle user login
export async function handleUserLogin(req: Request, res: Response, next: NextFunction) {

  const { id, password } = req.body;
  const user = await memberData.getMemberById(id);


  if (!user) {
    return res.status(401).json({
      status: 401,
      message: "등록된 아이디가 없습니다."
    });
  }
  const hashedPassword = crypto
    .createHash('sha256')
    .update(user.salt + password) // 저장된 salt와 입력한 비밀번호를 조합
    .digest('hex');

  if (user.password !== hashedPassword) {
    return res.status(401).json({
      status: 401,
      message: "비밀번호가 일치하지 않습니다."
    });
  }


  const accessToken = signJWT({
    id: user.id, role: user.role
  }, "24h")

  const session = createSession(id, accessToken);

  const refreshToken = signJWT({
    sessionId: session.sessionId
  }, "1y");

  res.cookie("accessToken", accessToken, {
    maxAge: 300000, // 5분
    httpOnly: true,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 3.154e10, // 1년
    httpOnly: true,
  });

  return res.status(200).send(session);
}