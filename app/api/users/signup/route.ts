
import { connect } from "@/dbConfig/dbConfig";
import User from "@/app/Models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, phoneNumber, password } = reqBody

        console.log(reqBody);

        const user = await User.findOne({ email , phoneNumber, username})
        
       if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 500 })
        }

        

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username, email, password: hashedPassword,
            phoneNumber
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        return NextResponse.json({
            message: "User created Successfully",
            success: true,
            savedUser
        })

    }
    catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 })
    }
}

