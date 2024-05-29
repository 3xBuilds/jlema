import User from "@/schemas/userSchema";
import { connectToDB } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req) {
    revalidatePath('/', 'layout') 
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
        console.log("rest of data: ", body.jlemalegendary);

        await connectToDB();
        const user = await User.findOneAndUpdate({username: userName},
            {username, ...rest},
            {new: true}
        )
        return new NextResponse(JSON.stringify({
            user
        }), { status: 200 });
    }
    catch (error) {
        // console.log(error);
        return new NextResponse(JSON.stringify(error), {
            status: 500,
        });
    }
}