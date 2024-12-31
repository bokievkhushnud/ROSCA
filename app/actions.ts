"use server";

import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import type { UserFormData } from "@/types/users";
import { revalidatePath } from "next/cache";
import type { LoanFormData } from "@/types/loans";
import type { ContributionFormData } from "@/types/contributions";

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

export async function createLoan(data: LoanFormData) {
	const loan = await prisma.loan.create({
		data: {
			amount: data.amount,
			interestRate: data.interestRate,
			userId: data.userId,
			status: data.status,
		},
	});
	revalidatePath("/admin");
	return loan;
}

export async function getLoans() {
	return await prisma.loan.findMany({
		select: {
			id: true,
			amount: true,
			interestRate: true,
			userId: true,
			status: true,
			user: {
				select: {
					firstName: true,
					lastName: true,
				},
			},
		},
	});
}

export async function getContributions() {
	return await prisma.contribution.findMany({
		select: {
			id: true,
			amount: true,
			userId: true,
			status: true,
			contributionType: true,
			user: {
				select: {
					firstName: true,
					lastName: true,
				},
			},
		},
	});
}

export async function createContribution(data: ContributionFormData) {
	const contribution = await prisma.contribution.create({
		data: { ...data },
	});
	revalidatePath("/admin");
	return contribution;
}