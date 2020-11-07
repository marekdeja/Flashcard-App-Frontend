import { useState, useEffect } from "react"
import { getTranslation } from '../services/api/dictionaryApi'
import { postFlashcard } from '../services/api/flashcardApi'
import styles from './Search.module.scss'

export const Search = () => {
    const [searchedWord, setSearchWord] = useState("")
    const [keyWord, setKeyWord] = useState()

const [allTranslations, setAllTranslations] = useState([])

    const handleSearchChange = (event) => {
        setSearchWord(event.target.value)
    }

    const handleSumbit = async (event) => {
        event.preventDefault()
        const translation = await getTranslation(searchedWord)
        setKeyWord(searchedWord)
        let translationHits = []
        if (translation.length > 0) {
            translationHits = translation[0].hits
        }
        translationHits[0] && translationHits[0].roms ? gatherAllTranslations(translationHits) : setAllTranslations([])
    }

    const gatherAllTranslations = (hits) =>{
        const allTranslationsArray = []
        
        for (let i = 0; i < hits.length; i++) {
            const roms = hits[i].roms

            for (let j = 0; j < roms.length; j++) {
                const arabs = roms[j].arabs

                for (let k = 0; k < arabs.length; k++) {
                    const translations = arabs[k].translations

                    for (let l = 0; l < translations.length; l++) {
                        allTranslationsArray.push(translations[l])
                    }
                }
            }

        }
        setAllTranslations(allTranslationsArray)
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
       
        return allTranslations.map((value, index) =>
            <div className={styles.flashcard}>
                <div className={styles.flashcardNumber}>{index + 1}</div>
                <div className={styles.textContainer}>
                <div className={styles.word} dangerouslySetInnerHTML={{ __html: value.source.replace(/(<([^>]+)>)/ig, '') }} />
                <div className={styles.translation} dangerouslySetInnerHTML={{ __html: value.target.replace(/(<([^>]+)>)/ig, '') }} />
                </div>
                <div>
                {/* <button onClick={() => saveFlashcard(allTranslations, index)} id={"button" + index}>Add Flashcard</button> */}
                <div className={styles.plusButton}>+</div>
                <strong><span id={'added' + index}></span></strong>
                </div>
                
            </div>)
    }



    return (
        <div className={styles.search}>
            <div className={styles.searchHeader}>
                <div className={styles.title}>Search translation</div>
                <form className="searchForm" onSubmit={handleSumbit}>
                    <input value={searchedWord} onChange={handleSearchChange} placeholder="Search for ..."></input>
                    <button type="submit" className={styles.buttonSearch}>Go!</button>
                </form>
            </div>

            <div className={styles.resultsContainer}>          
                <div className={styles.resultsTitle} onClick={()=>console.log(allTranslations)}>
                {keyWord && <span>Results ({allTranslations && allTranslations.length}) for &quot;<strong>{keyWord}</strong>&quot;{allTranslations.length > 0 && ':'} </span>}
                    </div>
                <div className={styles.resultsOutput}>
                    {allTranslations && allTranslations.length > 0 && printTranslations()}
                </div>
            </div>
        </div>
    )
}
