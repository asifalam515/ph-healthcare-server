import { Specialty } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createSpecialty = async (payload: Specialty) => {
  const specialty = await prisma.specialty.create({
    data: payload,
  });
  return specialty;
};
const getAllSpecialty = async () => {
  const specialty = await prisma.specialty.findMany();
  return specialty;
};
const deleteSpecialty = async (id: string) => {
  await prisma.specialty.delete({
    where: {
      id,
    },
  });
};
const updateSpecialty = async (id: string, payload) => {
  const updatedSpecialty = await prisma.specialty.update({
    where: {
      id,
    },
    data: payload,
  });
  return updatedSpecialty;
};
export const specialtyService = {
  createSpecialty,
  getAllSpecialty,
  deleteSpecialty,
  updateSpecialty,
};
