import { auth } from "../../lib/auth";

interface IRegisterPatient {
  name: string;
  email: string;
  password: string;
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
  //   const patient = await prisma.$transaction(async (tx) => {});

  return data;
};
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
