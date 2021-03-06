import { useEffect, useState } from "react"
import { deleteFlashcard, getFlashcards } from "../services/api/flashcardApi"
import styles from './Flashcards.module.scss'

export const Flashcards = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await getFlashcards();
            return fetchedData
        }
        fetchData().then(res => setData(res))
    }, [])

    const removeFlashcard = (index) => {
        const removeFlashcardCall = async () => {
            await deleteFlashcard(data[index]._id)
        }
        removeFlashcardCall().then(() => {
            data.splice(index, 1)
            setData([...data])
        })

    }

    return <><div className={styles.title}>Flashcards</div>
    <div className={styles.subtitle}>You have <strong>{data.length}</strong> flashcards</div>
        <div className={styles.allFlashcardsContainer}>
            {data.length > 0 && (
                data.map((item, index) => <div className={styles.flashcardContainer} key={index}>
                    <div className={styles.flashcardNumber}>{index + 1}</div>
                    <div className={styles.flashcard}>
                        <div className={styles.flashcardInner}> 
                            <div className={styles.front}>
                                <div dangerouslySetInnerHTML={{ __html: item.word }} />
                            </div>
                            <div className={styles.back}>
                                <div dangerouslySetInnerHTML={{ __html: item.translation }} />
                            </div>
                        </div>
                    </div>
                    <button className={styles.deleteButton} onClick={() => removeFlashcard(index)}>-</button>
                </div>
                )
            )}
            <div className={styles.emptyFlashcard}></div>
            <div className={styles.emptyFlashcard}></div>
            <div className={styles.emptyFlashcard}></div>
        </div>
    </>
}