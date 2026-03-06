import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { iUpdateDoctorPayload } from "./doctor.interface";
import { DoctorService } from "./doctor.service";

const getAllDoctors  = catchAsync(
    async(req:Request,res:Response)=>{
        const result = await DoctorService.getAllDoctors()
        sendResponse(res,{
            httpStatusCode:status.OK,
            success:true,
            message:'Fetched All Doctors successfully',
            data:result
        })
    }
)
const getSingleDoctor = catchAsync(
    async(req:Request,res:Response)=>{
        const result = await DoctorService.getSingleDoctor(req.params.id as string)
        sendResponse(res,{
            httpStatusCode:status.OK,
            success:true,
            message:'Fetched Single Doctor successfully',
            data:result
        })
    }
)
const updateDoctor = catchAsync(
    async(req:Request,res:Response)=>{
        const result = await DoctorService.updateDoctor(req.params.id as string,req.body as iUpdateDoctorPayload)
        sendResponse(res,{
            httpStatusCode:status.OK,
            success:true,
            message:'Updated Doctor successfully',
            data:result
        })
    }
)
const deleteDoctor = catchAsync(
    async(req:Request,res:Response)=>{
        const result = await DoctorService.deleteDoctor(req.params.id as string)
        sendResponse(res,{
            httpStatusCode:status.OK,
            success:true,
            message:'Deleted Doctor successfully',
            data:result
        })
    }
)
export const DoctorController = {
    getAllDoctors,
    getSingleDoctor,
    updateDoctor,
    deleteDoctor
}