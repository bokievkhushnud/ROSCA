"use server";

import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import type { UserFormData } from "@/types/users";
import type { UserRole, UserStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createUser(data: UserFormData) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const result = await prisma.user.create({
    data: { ...data, password: hashedPassword },
  });

  if (result) {
    revalidatePath("/admin");
    return result;
  }
  return null;
}

export async function getUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });
}
