import { Gender } from "../../../generated/prisma/enums"

export interface ICreateDoctorPayload {
    password:string
    doctor:{
        name:string,
        email:string,
        profilePhoto?:string,
        contactNumber?:string,
        address?:string,
        isDeleted?:boolean,
        gender?:Gender,
        dob?:string,
        appointmentFee?:number,
        qualifications?:string,
        currentWorkingPlace?:string,
        designation?:string,
        registrationNumber?:string,
        experience?:number,
        averageRating?:number,
    },
    specialties:string[],
   

}