import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Users fetched successfully",
      data: users
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
