import axios from 'axios'

export default axios.create({
    baseURL : 'https://react-quiz-ba8da.firebaseio.com/'
})