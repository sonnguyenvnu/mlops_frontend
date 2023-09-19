import instance from './axios'
import axios from 'axios'

console.log(`process.env.REACT_APP_API_URL: ${process.env.REACT_APP_API_URL}`);
const instanceWithoutCredential = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

const signup = (credential) => instanceWithoutCredential.post('/auth/signup', credential)
const login = (credential) => instanceWithoutCredential.post('/auth/login', credential)
const refreshToken = () => instance.get('/auth/refresh-token')

export { signup, login, refreshToken }
