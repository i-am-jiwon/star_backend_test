import express, { Request, Response, NextFunction } from "express";
import * as memberController from "../controller/MemberController";

const router = express.Router();

router.get("/member", memberController.getMember);
router.post("/member", memberController.createMember);

export default router;