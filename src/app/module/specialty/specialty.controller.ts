import { Request, Response } from "express";
import { specialtyService } from "./specialty.service";

const createSpecialty = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await specialtyService.createSpecialty(payload);
    res.status(201).json({
      success: true,
      message: "Specialty Created Successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      message: "Failed to create Specialty",
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
};
const getAllSpecialty = async (req: Request, res: Response) => {
  try {
    const specialties = await specialtyService.getAllSpecialty();
    res.status(201).json({
      success: true,
      message: "Retrieve all specialties",
      data: specialties,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to create Specialty",
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
};
const deleteSpecialty = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const deletedSpecialties = await specialtyService.deleteSpecialty(id);
    res.status(201).json({
      success: true,
      message: "Deleted  specialties",
      data: deletedSpecialties,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Specialty",
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
};
const updateSpecialty = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data = req.body;
    const updatedSpecialties = await specialtyService.updateSpecialty(id, data);
    res.status(201).json({
      success: true,
      message: "Updated  specialty",
      data: updatedSpecialties,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to Update Specialty",
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
};
export const specialtyController = {
  createSpecialty,
  getAllSpecialty,
  deleteSpecialty,
  updateSpecialty,
};
