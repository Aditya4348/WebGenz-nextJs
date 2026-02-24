import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Berhasil Logout",
    });

    response.cookies.set("token", "", {
      secure: process.env.NODE_ENV === "production",
      path: "/",
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: error,
    });
  }
}
