import User from "@/schemas/userSchema";
import { connectToDB } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req) {

    revalidatePath('/', 'layout') 

    try{
        const username = req.nextUrl.pathname.split("/")[4];

        await connectToDB();
        const user = await User.findOne({username: username})

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