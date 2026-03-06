import { Role, Specialty } from "../../../generated/prisma/client";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { ICreateDoctorPayload } from "./user.interface";

const createDoctor  = async (payload:ICreateDoctorPayload) => {
    const specialties:Specialty[] =[]
    for(const spcialtyId of payload.specialties){
        const specialty =  await prisma.specialty.findUnique({
            where:{
                id:spcialtyId
            }
        })
        if(!specialty){
            throw new Error(`Spcialty with id ${spcialtyId} not found`)
        }
        specialties.push(specialty)
    }      
    const userExists = await prisma.user.findUnique({
        where:{
            email:payload.doctor.email
        }
    })
    if(userExists){
        throw new Error("User already exists")
    }
   const userData = await auth.api.signUpEmail({
    body:{
email:payload.doctor.email,
name:payload.doctor.name,
password:payload.password,
role:Role.DOCTOR,
needPasswordChange:true
    }
   })

   try {
    const result = await prisma.$transaction(async(tx)=>{
        const doctorData = await tx.doctor.create({
            data:{
                userId:userData.user.id,
                ...payload.doctor,
               
            }
        })
        const doctorSpcialtiesData = specialties.map((speciailty)=>{
            return {
                doctorId :doctorData.id,
                specialtyId:speciailty.id
            }
        })
        await tx.doctorSpecialty.createMany({
            data:doctorSpcialtiesData
        })
        const doctor = await tx.doctor.findUnique({
            where:{
                id:doctorData.id
            },
           select:{
            id:true,
            userId:true,
            name:true
            ,
            email:true,
            profilePhoto:true,
            contactNumber:true,
            address:true,
            isDeleted:true,
            gender:true,
            dob:true,
            appointmentFee:true,
            qualifications:true,
            currentWorkingPlace:true,
            designation:true,
            user:{
                select:{
                    id:true,
                    email:true,
                    name:true,
                    role:true,
                    status:true,
                    needsPasswordChange:true,
                    isDeleted:true,
                    deletedAt:true,
                    emailVerified:true,
                    image:true,
                    createdAt:true,
                    updatedAt:true,
                }
            },
            specialties:{
                select:{
                    specialty:{
                        select:{
                            title:true,
                            id :true
                        
                        }
                    }
                }
            },
            registrationNumber:true,
            experience:true,
            averageRating:true,
            createdAt:true,
            updatedAt:true,
            
           }
        })
        return doctor
    }
)
return result
   } catch (error) {
console.log("Transaction Error : ",error)
await prisma.user.delete({
    where:{
        id:userData.user.id
    }
})
throw error
   }
}

export const UserService = {
    createDoctor
}