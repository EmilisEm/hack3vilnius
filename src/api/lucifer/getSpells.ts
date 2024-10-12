import axios from 'axios'

// Sitas throwina gal 10 exceptionu
export const getLuciferQuote = async () => {
    return (await axios.get('https://hp-api.onrender.com/api/spells')).data
}
