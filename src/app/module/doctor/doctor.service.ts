import { prisma } from "../../lib/prisma"
import { iUpdateDoctorPayload } from "./doctor.interface"

const getAllDoctors = async () => {
    const doctors = await prisma.doctor.findMany({
        include:{
            user:true,
            specialties:{
                include:{
                    specialty:true
                }
            }
        }
    })
    return doctors
}

const getSingleDoctor = async (id:string) => {
    const doctor = await prisma.doctor.findUnique({
        where:{
            id
        },
        include:{
            user:true,
            specialties:{
                include:{
                    specialty:true
                }
            }
        }
    })
    return doctor
}

const updateDoctor = async (id:string,payload:iUpdateDoctorPayload) => {
    const doctor = await prisma.doctor.update({
        where:{
            id
        },
        data:payload
    })
    return doctor
}

const deleteDoctor = async (id:string) => {
    const doctor = await prisma.doctor.delete({
        where:{
            id
        }
    })
    return doctor
}

export const DoctorService = {
    getAllDoctors,
    getSingleDoctor,
    updateDoctor,
    deleteDoctor
}