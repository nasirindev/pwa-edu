import { PrismaClient } from "@prisma/client/extension";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, schoolName, grade } = body;

    console.log("needs ", body);

    const newStudent = await prisma.student.create({
      data: {
        fullName,
        schoolName,
        grade,
      },
    });

    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error saat simpan data" },
      { status: 500 },
    );
  }
}
