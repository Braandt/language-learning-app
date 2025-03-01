'use client'

import { Button } from "@/components/ui/button";
import { useState } from "react"
import { json } from "stream/consumers";

type Dictionary = {
    [word: string]:
    {
        MEANINGS: { [key: string]: [string, string, string[], string[]] }
        ANTONYMS: string[]
        SYNONYMS: string[];
    }
}

const Word = ({ word, wordData }: { word: string, wordData: Dictionary }) => {

    const [wordHovered, setWordHovered] = useState<boolean>(false)

    // if (wordData != undefined) {
    //     console.log(wordData.MEANINGS[Object.keys(wordData.MEANINGS)[0] as keyof typeof wordData.MEANINGS])
    // }

    return (
        <span
            className='relative hover:text-green-700'
        >
            <div
                className="cursor-default"
                onMouseOver={() => setWordHovered(true)}
                onMouseLeave={() => setWordHovered(false)}
            >
                {word}
            </div>


            {wordHovered && wordData != undefined && (
                <div
                    className="absolute text-black cursor-default bg-white/95 w-96 max-h-96 overflow-y-scroll p-4 border-[1px] backdrop-blur-sm border-stone-300 rounded-lg no-scrollbar shadow-md"
                    onMouseOver={() => setWordHovered(true)}
                    onMouseLeave={() => setWordHovered(false)}
                >
                    <div className="mb-2 flex gap-2">
                        <span className="font-bold capitalize ">{word}</span>
                        <span>&#8226;</span>
                        <span>{wordData.MEANINGS.MEANINGS != undefined ? wordData.MEANINGS.MEANINGS['1'].join(" | ") : ''}</span>
                    </div>
                    {/* <p>
                        {wordData.MEANINGS[Object.keys(wordData.MEANINGS)[0]] != undefined && wordData.MEANINGS[Object.keys(wordData.MEANINGS)[0]][0]}
                    </p>
                    <p>
                        {wordData.MEANINGS[Object.keys(wordData.MEANINGS)[0]] != undefined && wordData.MEANINGS[Object.keys(wordData.MEANINGS)[0]][1]}
                    </p>
                    <p>
                        {wordData.MEANINGS[Object.keys(wordData.MEANINGS)[0]] != undefined && wordData.MEANINGS[Object.keys(wordData.MEANINGS)[0]][wordData.MEANINGS[Object.keys(wordData.MEANINGS)[0]].length - 1]}
                    </p> */}

                    {/* <div>
                        {wordData.MEANINGS[Object.keys(wordData.MEANINGS)[0][wordData.MEANINGS.length - 1]].map((example, index) => (
                            <div
                                key={index}
                                className="bg-stone-200 p-2 rounded-md gap-4 flex items-center flex-col mt-2"
                            >
                                <div className="flex flex-col text-center gap-1">
                                    <div className="font-semibold">
                                        {example.phrase}
                                    </div>
                                    <div className="">
                                        {example.translation}
                                    </div>
                                </div>
                                <Button>
                                    Add to deck
                                </Button>
                            </div>
                        ))}
                    </div> */}
                </div>
            )}
        </span>
    )
}

export default Word