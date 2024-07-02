import User from "@/schemas/userSchema";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache'

export async function GET() {
    revalidatePath('/', 'layout');
    
    try {
        await connectToDB();
        const leaderboard = await User.aggregate([
            {
                "$setWindowFields": {
                    "sortBy": { "points": -1 },
                    "output": {
                        "rank": { "$documentNumber": {} }
                    },
                }
            }
        ]);

        // Update rank in user schema
        for (const user of leaderboard) {
            await User.findByIdAndUpdate(user._id, { rank: user.rank });
        }

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