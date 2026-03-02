import { Router } from "express";
import { AuthRoutes } from "../module/auth/auth.route";
import { specialtyRoutes } from "../module/specialty/specialty.router";

const router = Router();
router.use("/specialties", specialtyRoutes);
router.use("/auth", AuthRoutes);
export const IndexRoutes = router;
