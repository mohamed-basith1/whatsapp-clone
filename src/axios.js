import axios from 'axios'

const connection = axios.create({ baseURL: 'https://whatsappmerno.herokuapp.com/' })

export default connection
