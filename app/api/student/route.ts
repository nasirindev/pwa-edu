import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/prisma/prisma-client";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth-token")?.value;

        if (!token) {
            return NextResponse.json({ message: "Tidak terautentikasi" }, { status: 401 });
        }

        // Cari data student berdasarkan ID yang disimpan di token
        const currentStudent = await prisma.student.findUnique({
            where: {
                id: parseInt(token),
            },
        });

        if (!currentStudent) {
            return NextResponse.json({ message: "Siswa tidak ditemukan" }, { status: 404 });
        }

        return NextResponse.json(currentStudent, { status: 200 });
    } catch (error) {
        console.error("Get Student Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}