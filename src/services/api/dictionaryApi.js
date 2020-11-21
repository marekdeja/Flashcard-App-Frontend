import axios from 'axios'

const { REACT_APP_API_LOCAL } = process.env;
const { REACT_APP_API_REMOTE } = process.env;

const apiUrl = process.env.NODE_ENV === 'development' ? REACT_APP_API_LOCAL : REACT_APP_API_REMOTE;


export const getTranslation = (word, lang) => {
    if (lang && word) {
        return axios.get(`${apiUrl}/dictionary/translate`, { params: { word, lang } })
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.log(error);
            });
    }
    return ""
}

export const getDictionaryList = () =>
    axios.get(`${apiUrl}/dictionary/list`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log(error);
        });