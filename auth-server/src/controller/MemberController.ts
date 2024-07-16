import { NextFunction, Request, Response } from "express";
import { PostMember, GetMember } from "../models/User";
import * as memberData from "../data/Member";
import { createSession } from "../data/userSession";
import { signJWT } from "../jwt/jwt";
import crypto from 'crypto';
import logger from '../config/logger';

export async function createMember(req: Request, res: Response) {
  const newMemberInfo: PostMember = req.body;

  if (!newMemberInfo || Object.keys(newMemberInfo).length === 0) {
    logger.warn('Empty request body for creating member.');
    return res.status(400).json({
      status: 400,
      message: '비어있는 요청입니다.',
    });
  }

  const { id, password, role, name } = newMemberInfo;

  if (!id) {
    logger.warn('Missing ID in request body for creating member.');
    return res.status(400).json({
      status: 400,
      message: 'ID가 필요합니다.',
    });
  }

  if (!password) {
    logger.warn('Missing password in request body for creating member.');
    return res.status(400).json({
      status: 400,
      message: '비밀번호가 필요합니다.',
    });
  }

  if (!role) {
    logger.warn('Missing role in request body for creating member.');
    return res.status(400).json({
      status: 400,
      message: '역할이 필요합니다.',
    });
  }

  if (!name) {
    logger.warn('Missing name in request body for creating member.');
    return res.status(400).json({
      status: 400,
      message: '이름이 필요합니다.',
    });
  }

  try {
    const result = await memberData.createMember(newMemberInfo);

    if (result.success) {
      logger.info(`Member created successfully: ${newMemberInfo.id}`);
      res.status(201).json(result);
    } else {
      logger.warn(`Duplicate ID attempt: ${newMemberInfo.id}`);
      res.status(409).json({
        status: 409,
        message: result.message,
      });
    }
  } catch (error) {
    logger.error('Error creating member:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
}

// 모든 member user 들을 배열로 전송하도록 설계
export async function getMember(req: Request, res: Response) {
  try {
    const memberInfo: Array<GetMember> = await memberData.getMember();
    logger.info('Fetched all members successfully.');
    res.send(memberInfo);
  } catch (error) {
    logger.error('Error fetching members:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
}

// 특정 회원 정보를 가져오는 함수
export async function getMemberById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const user = await memberData.getMemberById(id);

    if (user) {
      logger.info(`Fetched member by ID: ${id}`);
      res.status(200).json(user);
    } else {
      logger.warn(`Member not found: ${id}`);
      res.status(404).json({
        status: 404,
        message: "찾을 수 없는 회원입니다."
      });
    }
  } catch (error) {
    logger.error(`Error fetching member by ID ${id}:`, error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error'
    });
  }
}

// function for handle user login
export async function handleUserLogin(req: Request, res: Response, next: NextFunction) {
  const { id, password } = req.body;

  try {
    const user = await memberData.getMemberById(id);

    if (!user) {
      logger.warn(`Login attempt with non-existent ID: ${id}`);
      return res.status(401).json({
        status: 401,
        message: "등록된 아이디가 없습니다."
      });
    }

    const hashedPassword = crypto
      .createHash('sha256')
      .update(user.salt + password)
      .digest('hex');

    if (user.password !== hashedPassword) {
      logger.warn(`Incorrect password attempt for ID: ${id}`);
      return res.status(401).json({
        status: 401,
        message: "비밀번호가 일치하지 않습니다."
      });
    }

    const accessToken = signJWT({
      id: user.id, role: user.role
    }, "24h");

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

    logger.info(`User logged in successfully: ${id}`);
    return res.status(200).send(session);
  } catch (error) {
    logger.error('Error handling user login:', error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
}
