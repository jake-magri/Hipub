import { Router } from "express";
import { userRouter } from "./user-routes.js";
import { gptRouter } from "./gpt-routes.js";

const router = Router();

router.use("/users", userRouter);
// attach endpoints to router
router.use("/ask", gptRouter);
export default router; 