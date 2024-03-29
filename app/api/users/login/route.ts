
import { connect } from "@/dbConfig/dbConfig";
import User from "@/app/Models/userModel";
import { NextRequest, NextResponse } from "next/server";
import  Jwt  from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, phoneNumber} = reqBody

        console.log(reqBody);

        const user = await User.findOne({ email, phoneNumber })
        if (user) {
            return NextResponse.json({
                message: "Login Successful",
                success: true
            })
        }
        // else {
        //     return NextResponse.json({ message: "Failed to Login! Please check Your Phone Number" })
        // }

        
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            phone: user.phoneNumber
        }
        //create token
        const token = await Jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
        return response;


    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 })
    }
}




