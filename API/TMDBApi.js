import axios from 'axios'
import { API_TOKEN } from '@env'

// async await est un raccourcies synthaxiques de promesses
// async => async s'exécute de façon synchrone jusqu'à ce qu'elle atteigne sa première expression await , où elle est suspendue jusqu'à ce que la tâche attendue soit terminée. Dans le même temps, le contrôle retourne à l'appelant de la méthode
// await => attend qu'une promesse soit résolue ou rejetée


const getFilmsFromApiWithSearchedText = async (text, page) => {
  /*   await slowNetwork()
   */ const url =
    'https://api.themoviedb.org/3/search/movie?api_key=' +
    API_TOKEN +
    '&language=fr&query=' +
    text +
    '&page=' +
    page
  console.log(url)
  const response = await axios.get(url)
  console.log('--getFilmsFromApiWithSearchedText--')
  console.log(response.data)
  console.log('--fin getFilmsFromApiWithSearchedText--')
  return response.data
}

const getFilmDetailFromApi = async (id) => {
  const url =
    'https://api.themoviedb.org/3/movie/' +
    id +
    '?api_key=' +
    API_TOKEN +
    '&language=fr'
  const response = await axios.get(url)
  return response.data
}

const getImageFromApi = (name) => {
  if (name === null || name === undefined)
    return require('../Assets/images/filmVide.png')
  // 'https://image.tmdb.org/t/p/original' + name
  // 'https://image.tmdb.org/t/p/w300' + name
  return { uri: 'https://image.tmdb.org/t/p/w300' + name }
}
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
/* async function slowNetwork() {
  await sleep(5000)
}
 */
export default getFilmsFromApiWithSearchedText
export {
  getFilmDetailFromApi,
  getImageFromApi,
  getFilmsFromApiWithSearchedText,
}
