import axios from 'axios'

const { REACT_APP_API_LOCAL } = process.env;
const { REACT_APP_API_REMOTE } = process.env;

const apiUrl = process.env.NODE_ENV === 'development' ? REACT_APP_API_LOCAL : REACT_APP_API_REMOTE;

export const getFlashcards = () => {
    return axios.get(`${apiUrl}/flashcard`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error);
        });
}

// const mockFlashcard = {
//     word: "zamek",
//     translations: ["castle", "lock"]
// }

export const postFlashcard = (flashcard) => {
    axios.post(`${apiUrl}/flashcard`, flashcard)
        .then(response => {
            console.log(response.data)
            // return response.data
        })
        .catch(error => {
            console.log(error);
        });
}

const mockFlashcardUpdate = {
    flashcardId: "5f9dc6acbce64c3170ef319c",
    newFlashcard:
    {
        word: "tort",
        translations: ["cake"]
    }
}

export const putFlashcard = () => {
    axios.put(`${apiUrl}/flashcard`, mockFlashcardUpdate)
        .then(response => {
            console.log(response.data)
            // return response.data
        })
        .catch(error => {
            console.log(error);
        });
}


export const deleteFlashcard = (flashcardId) => {
    axios.delete(`${apiUrl}/flashcard`, { data: {flashcardId} })
        .then(response => {
            console.log(response.data)
            // return response.data
        })
        .catch(error => {
            console.log(error);
        });
}
