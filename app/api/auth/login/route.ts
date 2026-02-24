import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export async function POST( req: Request) {
    try {

        const { email, password } = await req.json();

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if(!user){
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, {
                status: 404
            })
        }

        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid){
            return NextResponse.json({
                success: false,
                message: "Invalid credentials"
            }, {
                status: 401
            })
        }

        // buat jwt Token
        const token = jwt.sign({
            id: user.id,
        }, process.env.JWT_SECRET!, {
            expiresIn: "1d",
        })

        const response = NextResponse.json({
            success: true,
            message: "Login successful",
            data: {
                token,
                user
            }}, {
            status: 200
        })

        response.cookies.set({
            name: "token",
            value: token,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
            httpOnly: true
        })

        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            status: 500,
            message: error
        })
    }
}