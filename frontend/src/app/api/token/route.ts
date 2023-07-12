import { NextResponse } from "next/server";

export async function GET(request:Request) {

    const token = request


    if (token) {
    return NextResponse.json(true)
}
}