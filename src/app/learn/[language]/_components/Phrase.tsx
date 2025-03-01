'use client'

import { useEffect, useState } from "react"
import Word from "./Word"

function findFirstLetters(phrase: string): string[] {
    const firstLettersUnique = phrase.split(' ').map((word, index) => (
        (Array.from(word)[0]).toLowerCase()
    )).filter((item, i, ar) => { return ar.indexOf(item) === i })

    return firstLettersUnique
}

async function getWordDefinition() {
    await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/hello')
        .then(res => res.json())
        .then(data => console.log(data))
}

const Phrase = ({ phrase, language }: { phrase: string, language: string }) => {

    const [dictionary, setDictionary] = useState<Record<string, any>>({})
    const [wordsData, setWordsData] = useState<Record<string, any>>({})

    getWordDefinition()

    useEffect(() => {
        if (phrase) {

            const firstLetters = findFirstLetters(phrase)
            const lettersParam = firstLetters.join(',')

            fetch(`../api/words/${language}?letters=${lettersParam}`)
                .then(res => res.json())
                .then(data => setDictionary(data))
        }
    }, [phrase, language])

    useEffect(() => {
        if (phrase && Object.keys(dictionary).length > 0) {
            let newWordsData: Record<string, any> = {}

            phrase.split(' ').forEach((word) => {
                const uppercaseWord = word.toUpperCase()
                if (dictionary[uppercaseWord]) {
                    newWordsData[word] = dictionary[uppercaseWord]
                }
            })

            setWordsData(prevState => ({ ...prevState, ...newWordsData }))

        }
    }, [dictionary])

    return (
        <div className="flex gap-2">
            {phrase.split(' ').map((word, index) => (
                <Word key={index} word={word} wordData={wordsData[word]} />
            ))}
        </div>
    )
}

export default Phrase