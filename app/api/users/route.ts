import type{ NextRequest } from "next/server";
import  { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { auth0Id, email, username, firstName, lastName, phone } = await req.json();
    if (!auth0Id || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if a user with this sub already exists in DB
    let user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      // Create user
      user = await prisma.user.create({
        data: {
          auth0Id: auth0Id,     // store the Auth0 user_id
          email: email,
          username: username,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
        },
      });
    }

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /auth0-register:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}