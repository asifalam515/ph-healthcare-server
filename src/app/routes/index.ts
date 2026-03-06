import { Router } from "express";
import { AuthRoutes } from "../module/auth/auth.route";
import { DoctorRoutes } from "../module/doctor/doctor.routes";
import { specialtyRoutes } from "../module/specialty/specialty.router";
import { UserRoutes } from "../module/User/user.route";

const router = Router();
router.use("/specialties", specialtyRoutes);
router.use("/auth", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/doctors", DoctorRoutes);
export const IndexRoutes = router;
