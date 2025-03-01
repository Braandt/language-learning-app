'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Word from "../[language]/_components/Word";
import { use, useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Phrase from "./_components/Phrase";

type Dictionary = {
    [key: string]: {
        translations: string[],
        meaning: string,
        examples: { phrase: string; translation: string; }[]
    }
};

type Dict = {
    [word: string]:
    {
        MEANINGS: { [key: string]: [string, string, string[], string[]] }
        ANTONYMS: string[]
        SYNONYMS: string[];
    }
}

const dictionary: Dictionary = {
    the: {
        translations: ['O', 'Os', 'A', 'As'],
        meaning: `determiner 1.denoting one or more people or things already mentioned or assumed to be common knowledge."what's the matter?"2.used to point forward to a following qualifying or defining clause or phrase."the fuss that he made of her
        determiner 1.denoting one or more people or things already mentioned or assumed to be common knowledge."what's the matter?"2.used to point forward to a following qualifying or defining clause or phrase."the fuss that he made of her"`,
        examples: [{
            phrase: "what's the matter?",
            translation: "Qual é o problema?"
        }, {
            phrase: "the darkness that he saw when he came into the room was dark",
            translation: "A escuridão que ele viu quando entrou no quarto foi escura"
        }]
    },
    book: {
        translations: ['Livro'],
        meaning: `a written or printed work consisting of pages glued or sewn together along one side and bound in covers`,
        examples: [{
            phrase: "A book is something that he likes to write",
            translation: "Um livro é algo que ele gosta de escrever"
        }, {
            phrase: "The book was written by Eleanor",
            translation: "O livro foi escrito por Eleanor"
        }]
    },
    is: {
        translations: ['É', 'Está'],
        meaning: `verb. (used with he, she, it, and with singular nouns) a form of the present tense (indicative mood) of b`,
        examples: [{
            phrase: "A book is something that he likes to use",
            translation: "Um livro é algo que ele gosta de usar"
        }, {
            phrase: "This is too hard to hold",
            translation: "Isso é muito difícil de segurar"
        }]
    },
    on: {
        translations: ['No', 'Na', 'Nos', 'Nas'],
        meaning: `physically in contact with and supported by (a surface)`,
        examples: [{
            phrase: "On flat surfaces I can ski",
            translation: "Em superfícies planas eu posso esquiar"
        }, {
            phrase: "She saw him lying on the ground",
            translation: "Ela o viu deitado no chão"
        }]
    },
    table: {
        translations: ['Mesa'],
        meaning: `a piece of furniture with a flat top and one or more legs, providing a level surface on which objects may be placed, and that can be used for such purposes as eating, writing, working, or playing games`,
        examples: [{
            phrase: "The eat where we eat is made of wood",
            translation: "A mesa em que comemos é feita de madeira"
        }, {
            phrase: "My cat likes to seat on my table",
            translation: "Meu gato gosta de sentar na minha mesa"
        }]
    }
}

const learnPage = ({ params }: { params: Promise<{ language: string }> }) => {

    const { language } = use(params)
    const [phrases, setPhrases] = useState<{ text: string; translation: string }[]>([])
    const [phrase, setPhrase] = useState<string>(phrases[0] != undefined ? phrases[0].text : '')
    const [dict, setDict] = useState<Dict | null>(null)

    useEffect(() => {
        if (language) {
            fetch(`../api/phrases/${language}`)
                .then(res => res.json())
                .then(data => setPhrases(data))
        }
    }, [language])

    useEffect(() => {
        if (phrases[0] !== undefined) {
            setPhrase(phrases[0].text)
        }
    }, [phrases])

    if (!language) return <div>...loading</div>

    return (
        <>
            <Link href='/'>
                <ArrowLeft className="absolute top-0 left-0 m-2" size={25} />
            </Link>
            <div className="h-screen flex flex-col gap-4 items-center justify-center">

                <Phrase phrase={phrase} language={language} />

                <div>
                    <form className="flex flex-col items-center gap-2">
                        <Input
                            placeholder="Translate to portuguese"
                            className="w-96"
                        />
                        <Button className="w-fit">
                            Check
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default learnPage