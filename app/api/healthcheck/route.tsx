import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
    return new NextResponse(JSON.stringify({
        message: "Server is up and running!"
    }), {
        status: 200
    })
}