import User from "@/schemas/userSchema";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try{
        const wallet = req.nextUrl.pathname.split("/")[3];

        await connectToDB();
        const user = await User.findOne({wallet: wallet})

        return new NextResponse(JSON.stringify({
            user
        }), { status: 200 });
    }
    catch (error) {
        return new NextResponse(JSON.stringify(error), {
            status: 500,
        });
    }
}

//write a patch request to edit fields in a user document
export async function PATCH(req) {
    try{
        const userName = req.nextUrl.pathname.split("/")[3];
        
        const body = await req.json();
        const {username, wallet="", ...rest} = body;

        await connectToDB();
        const user = await User.findOneAndUpdate({userName},
            {username, ...rest},
            {new: true}
        )
        return new NextResponse(JSON.stringify({
            user
        }), { status: 200 });
    }
    catch (error) {
        return new NextResponse(JSON.stringify(error), {
            status: 500,
        });
    }
}