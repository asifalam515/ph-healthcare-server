import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { specialtyService } from "./specialty.service";

const createSpecialty = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await specialtyService.createSpecialty(payload);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Specialty Created Successfully",
    data: result,
  });
});

const getAllSpecialty = catchAsync(async (req: Request, res: Response) => {
  const result = await specialtyService.getAllSpecialty();
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "specialties fetched successfully",
    data: result,
  });
});
const deleteSpecialty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const deletedSpecialties = await specialtyService.deleteSpecialty(id);
  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Deleted  specialties",
    data: deletedSpecialties,
  });
});
const updateSpecialty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const data = req.body;
  const updatedSpecialties = await specialtyService.updateSpecialty(id, data);
    sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Updated  specialty",
    data: updatedSpecialties,
  });
});

export const specialtyController = {
  createSpecialty,
  getAllSpecialty,
  deleteSpecialty,
  updateSpecialty,
};
