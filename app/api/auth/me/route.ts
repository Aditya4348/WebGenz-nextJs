import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    // ambil token dari cookie
        const cookieStore = await cookies();
        let token = cookieStore.get("token")?.value;

        // kalau tidak ada di cookie, cek header Authorization
        if (!token) {
            const authHeader = req.headers.get("authorization");
            if (authHeader?.startsWith("Bearer ")) {
                token = authHeader.split(" ")[1];
            }
        }

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as { id: number };

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                email: true,
                name: true,
                avatar: true,
                exp: true,
                badges: true,
                socials: true,
                quote: true,
                bio: true,
                posts: true,
            }
        });

        return NextResponse.json({
            success: true,
            data: user
        });

  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 500,
      message: error,
    });
  }
}
