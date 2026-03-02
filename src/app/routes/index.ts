import { Router } from "express";
import { specialtyRoutes } from "../module/specialty/specialty.router";

const router = Router();
router.use("/specialties", specialtyRoutes);
export const IndexRoutes = router;
