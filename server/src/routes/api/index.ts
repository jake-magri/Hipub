import { Router } from "express";
// import { userRouter } from "./user-routes.js";
import { gptRouter } from "./gpt-routes.js";
import { placesRoutes } from "./places-routes.js";

const router = Router();

// router.use("/users", userRouter);
// attach endpoints to router
router.use("/ask", gptRouter);
router.use("/api", placesRoutes);
export default router;
