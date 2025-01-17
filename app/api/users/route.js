import  { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req, res) {
  try {
    const { auth0Id, email, firstName, lastName, phone } = await req.json();
    if (!auth0Id || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if a user with this sub already exists in DB
    let user = await prisma.user.findUnique({
      where: { auth0Id: auth0Id },
    });

    if (!user) {
      // Create user
      user = await prisma.user.create({
        data: {
          auth0Id: auth0Id,
          email: email,
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


export async function GET(req, res) {
  const users = await prisma.user.findMany();
  return NextResponse.json( users , { status: 200 });
}


export async function DELETE(req, res) {
  const { id } = await req.json();
  await prisma.user.delete({ where: { id: id } });
  return NextResponse.json({ success: true }, { status: 200 });
}


export async function PUT(req, res) {
  const { id, ...data } = await req.json();
  await prisma.user.update({ where: { id: id }, data: data });
  return NextResponse.json({ success: true }, { status: 200 });
}
