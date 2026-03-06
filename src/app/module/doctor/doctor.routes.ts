import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { DoctorController } from "./doctor.controller";
import { updateDoctorValidationSchema } from "./doctor.validation";

const router = Router()
router.get("/",DoctorController.getAllDoctors)
router.get("/:id",DoctorController.getSingleDoctor)
router.patch("/:id",validateRequest(updateDoctorValidationSchema), DoctorController.updateDoctor)
router.delete("/:id",DoctorController.deleteDoctor)
export const DoctorRoutes = router