import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

interface IRegisterPatient {
  name: string;
  email: string;
  password: string;
  contactNumber?: string;
}
const registerPatient = async (payload: IRegisterPatient) => {
  const { name, email, password } = payload;
  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });
  if (!data.token) {
    throw new Error("Failed to register user");
  }
  //   create patient profile in transaction after sign up of patient in user model
try {
      const patient = await prisma.$transaction(async (tx) => {
   const patientTx=   await tx.patient.create({
        data:{
          userId:data.user.id,
          name:payload.name,
          email:payload.email,
          contactNumber:payload?.contactNumber,
          
        }
      })
      return patientTx
    });

  return {...data,patient}
} catch (error) {
console.log("transaction error: ",error)
await prisma.user.delete({
  where:{
    id:data.user.id
  }
})
throw error
}
}
interface ILoginUserPayload {
  password: string;
}
const loginUser = async (payload: ILoginUserPayload) => {
  const {email,password} =payload
  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  return data;
};
export const AuthService = { registerPatient, loginUser };
