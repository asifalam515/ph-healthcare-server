import { Router } from "express";
import { specialtyController } from "./specialty.controller";

const router = Router();
router.get("/", specialtyController.getAllSpecialty);
router.post("/", specialtyController.createSpecialty);
router.delete("/:id", specialtyController.deleteSpecialty);
router.put("/:id", specialtyController.updateSpecialty);
export const specialtyRoutes = router;
