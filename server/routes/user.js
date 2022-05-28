import express from "express";
import { signin, signup, getUserList, checksignin } from "../controllers/user.js";
import { AdminProtection } from '../middleware/auth.js';

const router = express.Router();

router.post("/getUserList", AdminProtection, getUserList);
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/checksignin", checksignin);

export default router;
