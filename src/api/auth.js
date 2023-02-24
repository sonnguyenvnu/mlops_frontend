import instance from './axios'

const signup = (credential) => instance.post('/auth/signup', credential)
const login = (credential) => instance.post('/auth/login', credential)
const refreshToken = () => instance.get('/auth/refresh-token')

export { signup, login, refreshToken }
