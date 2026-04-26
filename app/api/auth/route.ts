import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/prisma/prisma-client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, schoolName, grade } = body;


    const newStudent = await prisma.student.create({
      data: {
        fullName,
        schoolName,
        grade,
      },
    });

    // Set cookie agar proxy.ts bisa mendeteksi bahwa user sudah login
    const cookieStore = await cookies();
    cookieStore.set("auth-token", newStudent.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // Berlaku selama 1 minggu
    });

    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    console.error("Auth Error:", error);
    return NextResponse.json(
      { message: "Error saat simpan data" },
      { status: 500 },
    );
  }
}

// Tambahkan import DELETE atau gabungkan dengan yang sudah ada
export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("auth-token");

    return NextResponse.json({ message: "Logout berhasil" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Gagal logout" }, { status: 500 });
  }
}
