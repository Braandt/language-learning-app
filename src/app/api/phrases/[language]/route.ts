import { NextRequest, NextResponse } from "next/server";

const loadPhrases = async (language: string) => {
    try {

        const phrases = await import(`@/data/phrases/${language}`)
        console.log(phrases);

        return phrases.default
    } catch (e) {
        return null
    }
}


export async function GET(req: NextRequest, { params }: { params: { language: string } }) {

    const { language } = await params
    const phrases = await loadPhrases(language)

    if (!phrases) {
        return NextResponse.json({ error: "Language not found" }, { status: 404 })
    }

    return NextResponse.json(phrases)
}