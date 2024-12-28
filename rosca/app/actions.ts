"use server";

import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import type { UserFormData } from "@/types/users";
import type { UserRole, UserStatus } from "@prisma/client";

export async function createUser(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const data: UserFormData = {
    username: String(rawData.username),
    email: String(rawData.email),
    password: String(rawData.password),
    firstName: String(rawData.firstName),
    lastName: String(rawData.lastName),
    phone: String(rawData.phone),
    role: String(rawData.role) as UserRole,
    status: String(rawData.status) as UserStatus,
  };
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await prisma.user.create({
    data: { ...data, password: hashedPassword },
  });
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
