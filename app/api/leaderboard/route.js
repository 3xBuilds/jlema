import User from "@/schemas/userSchema";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        await connectToDB();
        const leaderboard = await User.aggregate([
            {
              "$setWindowFields": {
                "sortBy": { "points": -1 },
                "output": {
                  "rank":  {"$documentNumber": {}}
                },
              }
            }
        ])

        return new NextResponse(JSON.stringify({
            leaderboard
        }), { status: 200 });
    }
    catch (error) {
        return new NextResponse(JSON.stringify(error), {
            status: 500,
        });
    }
}