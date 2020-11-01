import axios from 'axios'

const { REACT_APP_API_LOCAL } = process.env;
const { REACT_APP_API_REMOTE } = process.env;

const apiUrl = process.env.NODE_ENV === 'development' ? REACT_APP_API_LOCAL : REACT_APP_API_REMOTE;

const mockWord = "haus"
const mockLang = "deen"


export const getTranslation = () => {
    axios.get(`${apiUrl}/dictionary/translate`, { params: { word: mockWord, lang: mockLang } })
        .then(response => {
            console.log(response.data)
            return response.data
        })
        .catch(error => {
            console.log(error);
        });
}