import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req, res) {
	try {
		// Parse and validate input
		const { amount, interestRate, userId, issueDate, status, description } =
			await req.json();

		if (!amount || !interestRate || !userId || !issueDate) {
			return NextResponse.json(
				{
					error:
						"All fields are required: amount, interestRate, userId, issueDate.",
				},
				{ status: 400 },
			);
		}

		if (amount <= 0 || interestRate < 0) {
			return NextResponse.json(
				{
					error:
						"Amount must be positive and interest rate cannot be negative.",
				},
				{ status: 400 },
			);
		}

		// Validate status enum
		const validStatuses = ["PENDING", "ACTIVE", "PAID", "REJECTED"];
		if (status && !validStatuses.includes(status)) {
			return NextResponse.json(
				{
					error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
				},
				{ status: 400 },
			);
		}

		// Validate issueDate
		if (Number.isNaN(new Date(issueDate).getTime())) {
			return NextResponse.json(
				{ error: "Invalid issueDate format. Expected a valid date." },
				{ status: 400 },
			);
		}

		// Check if user exists
		const user = await prisma.user.findUnique({ where: { id: userId } });
		if (!user) {
			return NextResponse.json({ error: "User not found." }, { status: 404 });
		}

        const payload = {
			amount: Number.parseInt(amount),
			interestRate: Number.parseFloat(interestRate),
			userId: Number.parseInt(userId),
			issueDate: new Date(issueDate),
			status: String(status) ,
			description: String(description),
		};

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
