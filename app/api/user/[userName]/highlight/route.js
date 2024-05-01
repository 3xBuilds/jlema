import User from "@/schemas/userSchema";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function PATCH(req) {
    try{
        const userName = req.nextUrl.pathname.split("/")[3];
        
        const body = await req.json();
        const {highlights} = body;
        
        await connectToDB();
        
        const user = await User.findOne({username : userName}); 
        if(user == null){
            return new NextResponse(JSON.stringify({message: "User not found"}), {status: 404});
        }

        if(user.highlights == null){
            user.highlights = [];
        }
        user.highlights = highlights;

        await user.save();
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