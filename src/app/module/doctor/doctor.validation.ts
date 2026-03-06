import { z } from "zod";
import { Gender } from "../../../generated/prisma/enums";

export const updateDoctorValidationSchema = z.object({
  name: z.string().optional(),

  email: z.string().email().optional(),

  profilePhoto: z.string().url().optional(),

  address: z.string().optional(),

  gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER]).optional(),

  dob: z.string().optional(),

  appointmentFee: z.number().optional(),

  qualifications: z.string().optional(),

  currentWorkingPlace: z.string().optional(),

  designation: z.string().optional(),

  registrationNumber: z.string().optional(),

  experience: z.number().int().nonnegative().optional(),
});