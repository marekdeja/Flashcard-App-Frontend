import axios from 'axios'

const { REACT_APP_API_LOCAL } = process.env;
const { REACT_APP_API_REMOTE } = process.env;

const apiUrl = process.env.NODE_ENV === 'development' ? REACT_APP_API_LOCAL : REACT_APP_API_REMOTE;

export const getFlashcards = () => {
    axios.get(`${apiUrl}/flashcard`)
        .then(response => {
            console.log(response.data)
            return response.data
        })
        .catch(error => {
            console.log(error);
        });
}

const mockFlashcard = {
    word: "zamek",
    translations: ["castle", "lock"]
}

export const saveFlashcard = () => {
    axios.post(`${apiUrl}/flashcard`, mockFlashcard)
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

export const updateFlashcard = () => {
    axios.put(`${apiUrl}/flashcard`, mockFlashcardUpdate)
        .then(response => {
            console.log(response.data)
            // return response.data
        })
        .catch(error => {
            console.log(error);
        });
}

const mockFlashcardDelete = {
    flashcardId: "5f9dc57c9b03f745140be8e3"
}

export const deleteFlashcard = () => {
    axios.delete(`${apiUrl}/flashcard`, { data: mockFlashcardDelete })
        .then(response => {
            console.log(response.data)
            // return response.data
        })
        .catch(error => {
            console.log(error);
        });
}
