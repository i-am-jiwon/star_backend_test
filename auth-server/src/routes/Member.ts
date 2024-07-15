import express, { Request, Response, NextFunction } from "express";
import * as memberController from "../controller/MemberController";

const router = express.Router();

router.get("/member", memberController.getMember);
router.post("/member", memberController.createMember);
router.get('/member/:id', memberController.getMemberById);
router.post("/login", memberController.handleUserLogin);

export default router;