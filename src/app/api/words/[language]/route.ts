import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";


export async function GET(req: NextRequest, { params }: { params: { language: string } }) {

    try {
        const { language } = await params
        const searchParams = new URL(req.url).searchParams
        const letters = searchParams.get("letters")?.split(",") || []

        let dictionary: Record<string, any> = {}

        for (const letter of letters) {
            try {
                const wordData = await import(`@/data/words/${language}-dictionary/${letter}.json`)
                dictionary = { ...dictionary, ...wordData.default }
            } catch (err) {
                console.warn(`Dictionary file for letter "${letter}" Not Found`)
            }
        }

        return NextResponse.json(dictionary)
    } catch (err) {
        return NextResponse.json({ error: "Could not load dictionary" }, { status: 500 })
    }
}