import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import z, { success } from "zod";

const regisSchema = z.object({
  email: z.string().email("Email Belum Valid Bro"),
  password: z.string().min(8, "Password harus lebih dari 8 karakter"),
  name: z.string().min(3, "Nama harus lebih dari 3 karakter"),
  isAcceptedTerms: z.boolean().refine((val) => val === true, {
    message: "Anda harus menyetujui syarat dan ketentuan terlebih dahulu",
  }),
});

export async function POST(req: Request) {
  try {
    const { email, password, name, isAcceptedTerms } = await req.json();
    const body = { email, password, name, isAcceptedTerms };

    const validate = regisSchema.safeParse(body);

    if (!validate.success) {
      return NextResponse.json(
        {
          success: false,
          message: validate.error.errors,
        },
        {
          status: 400,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(validate.data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: validate.data.email,
        password: hashedPassword,
        name: validate.data.name,
        email_verified_at: new Date(),
      },
    });

    const { password: _, ...safeUser } = user;

    return NextResponse.json(
      {
        success: true,
        message: "Register successful",
        data: safeUser,
      },
      {
        status: 201,
      },
    );
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
