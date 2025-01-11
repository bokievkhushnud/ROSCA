import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const LOAN_STATUS = ["PENDING", "ACTIVE", "PAID", "REJECTED"];

const validateLoan = (payload) => {
	if (!payload.amount || !payload.interestRate || !payload.userId || !payload.issueDate) {
		return NextResponse.json(
			{
				error:
					"All fields are required: amount, interestRate, userId, issueDate.",
			},
			{ status: 400 },
		);
	}

	if (payload.amount <= 0 || payload.interestRate < 0) {
		return NextResponse.json(
			{
				error:
					"Amount must be positive and interest rate cannot be negative.",
			},
			{ status: 400 },
		);
	}

	// Validate status enum
	if (payload.status && !LOAN_STATUS.includes(payload.status)) {
		return NextResponse.json(
			{
				error: `Invalid status. Must be one of: ${LOAN_STATUS.join(", ")}`,
			},
			{ status: 400 },
		);
	}

	// Validate issueDate
	if (Number.isNaN(new Date(payload.issueDate).getTime())) {
		return NextResponse.json(
			{ error: "Invalid issueDate format. Expected a valid date." },
			{ status: 400 },
		);
	}

	return true;
}

// Create a loan
export async function POST(req, res) {
	try {
		// Parse and validate input
		const { amount, interestRate, userId, issueDate, status, description } =
			await req.json();

		const payload = {
			amount: Number.parseInt(amount),
			interestRate: Number.parseFloat(interestRate),
			userId: Number.parseInt(userId),
			issueDate: new Date(issueDate),
			status: String(status) ,
			description: String(description),
		};

		validateLoan(payload);

		// Check if user exists
		const user = await prisma.user.findUnique({ where: { id: payload.userId } });
		if (!user) {
			return NextResponse.json({ error: "User not found." }, { status: 404 });
		}

		// Create the loan record
		const loan = await prisma.loan.create({
			data: payload,
		});

		// Return success response
		return NextResponse.json(loan, { status: 201 });
	} catch (error) {
		console.error("Error saving loan:", error);

		// Prisma-specific error handling
		if (error.code === "P2002") {
			return NextResponse.json(
				{ error: "A unique constraint violation occurred." },
				{ status: 409 },
			);
		}

		if (error.code === "P2003") {
			return NextResponse.json(
				{ error: "Foreign key constraint failed." },
				{ status: 400 },
			);
		}

		// General error handling
		return NextResponse.json(
			{ error: error.message || "An unknown error occurred." },
			{ status: 500 },
		);
	} finally {
		// Ensure Prisma disconnects after use
		await prisma.$disconnect();
	}
}

// Get all loans with user
export async function GET(req) {
	const loans = await prisma.loan.findMany({
		include: {
			user: true,
		},
	});
	return NextResponse.json(loans);
}

// Delete a loan
export async function DELETE(req, res) {
	const { id } = await req.json();
	await prisma.loan.delete({ where: { id: id } });
	return NextResponse.json({ success: true }, { status: 200 });
}

// Update a loan
export async function PUT(req, res) {
	const { id, amount, interestRate, userId, issueDate, status, description } = await req.json();
	const payload = {
		amount: Number.parseInt(amount),
		interestRate: Number.parseFloat(interestRate),
		userId: Number.parseInt(userId),
		issueDate: new Date(issueDate),
		status: String(status),
		description: String(description),
	};

	validateLoan(payload);
	await prisma.loan.update({ where: { id: id }, data: { ...payload } });
	return NextResponse.json({ success: true }, { status: 200 });
}