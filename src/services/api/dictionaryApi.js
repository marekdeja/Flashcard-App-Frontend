import axios from 'axios'

const { REACT_APP_API_LOCAL } = process.env;
const { REACT_APP_API_REMOTE } = process.env;

const apiUrl = process.env.NODE_ENV === 'development' ? REACT_APP_API_LOCAL : REACT_APP_API_REMOTE;


const mockLang = "deen"


export const getTranslation = (word) =>
    axios.get(`${apiUrl}/dictionary/translate`, { params: { word, lang: mockLang } })
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error);
        });
