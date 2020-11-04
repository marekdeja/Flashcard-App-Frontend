import { useState } from "react"
import { getTranslation } from '../services/api/dictionaryApi'
import { postFlashcard } from '../services/api/flashcardApi'

export const Search = () => {
    const [searchedWord, setSearchWord] = useState("here")
    const [keyWord, setKeyWord] = useState()
    const [hits, setHits] = useState([])


    const handleSearchChange = (event) => {
        setSearchWord(event.target.value)
    }

    const handleSumbit = async (event) => {
        event.preventDefault()
        setHits(undefined)
        const translation = await getTranslation(searchedWord)
        setKeyWord(searchedWord)
        if (translation.length > 0) {
            const translationHits = translation[0].hits
            setHits(translationHits)
        }

    }

    const saveFlashcard = (allTranslations, index) => {
        const word = allTranslations[index].source.replace(/(<([^>]+)>)/ig, '');
        const translation = allTranslations[index].target.replace(/(<([^>]+)>)/ig, '');
        postFlashcard({ word, translation })
        const element = document.getElementById('added' + index);
        element.textContent = "Added"
        const button = document.getElementById('button' + index);
        button.remove()
    }

    const printTranslations = () => {
        let allTranslations = []
        for (let i = 0; i < hits.length; i++) {
            const roms = hits[i].roms

            for (let j = 0; j < roms.length; j++) {
                const arabs = roms[j].arabs

                for (let k = 0; k < arabs.length; k++) {
                    const translations = arabs[k].translations

                    for (let l = 0; l < translations.length; l++) {
                        allTranslations.push(translations[l])
                    }
                }
            }

        }
        return allTranslations.map((value, index) => <p><span dangerouslySetInnerHTML={{ __html: value.source.replace(/(<([^>]+)>)/ig, '') }} />
         ---> <span dangerouslySetInnerHTML={{ __html: value.target.replace(/(<([^>]+)>)/ig, '') }} /><button onClick={() => saveFlashcard(allTranslations, index)} id={"button"+index}>Add Flashcard</button><strong><span id={'added' + index}></span></strong></p>)
    }


    return (
        <div>
            <div>Search flashcard</div>
            <form className="searchForm" onSubmit={handleSumbit}>
                <input value={searchedWord} onChange={handleSearchChange}></input>
                <p>
                    <button type="submit" >Search</button>
                </p>
            </form>
            <p>
                Results {keyWord && <span>for &quot;<strong>{keyWord}</strong>&quot;</span>} :
            </p>
            <p>
                {hits && hits.length > 0 && printTranslations()}
            </p>
        </div>
    )
}
