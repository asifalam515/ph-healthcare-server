import { NextFunction, Request, Router } from "express";
import z from "zod";
import { Gender } from "../../../generated/prisma/enums";
import { UserController } from "./user.controller";


export const createDoctorZodSchema = z.object({
  password: z.string().min(6),

  doctor: z.object({
    name: z.string(),
    email: z.string().email(),
    profilePhoto: z.string().url().optional(),
    contactNumber :z.string().min(11,"contact number must  be minimum 11 digit").max(14,"maximum can be 14 digit"),
    address: z.string().optional(),
    gender: z.enum([Gender.MALE,Gender.FEMALE,Gender.OTHER]),
    dob: z.string(), 
    appointmentFee: z.number(),
    qualifications: z.string(),
    currentWorkingPlace: z.string(),
    designation: z.string("Designation Required"),
    registrationNumber: z.string("Resigration Number Required"),
    experience: z.int("Experience must be a integer").nonnegative("Experience can not be negative"),
  }),

  specialties: z.array(z.uuid("Specialty ID must be a valid UUID").nonempty("Specialty ID is required")),
});
const router = Router()

router.post("/create-doctor",(req:Request,res:Response,next:NextFunction)=>{
    const parseResult = createDoctorZodSchema.safeParse(req.body)
    if(!parseResult.success){
       next(parseResult.error)  
    }
    // sanitize the data
    req.body = parseResult.data
    next()
},UserController.createDoctor)
// router.post("/create-admin",UserController.create)
// router.post("/create-superadmin",UserController.createDoctor)

export const UserRoutes = router