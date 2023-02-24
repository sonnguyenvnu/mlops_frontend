import React from 'react'
import Cookies from 'universal-cookie'
import * as auth from '../../api/auth'

const Login = () => {
  const cookies = new Cookies()

  const writeCookies = ({ accessToken, refreshToken }) => {
    cookies.set('accessToken', accessToken, { path: '/' })
    if (refreshToken) {
      cookies.set('refreshToken', refreshToken, { path: '/' })
    }
  }

  const login = async () => {
    const credential = {
      email: 'test@gmail.com',
      password: '12345678',
    }
    try {
      const { data } = await auth.login(credential)
      writeCookies({ accessToken: data.access_token, refreshToken: data.refresh_token })
      // TODO: Go to dashboard
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login
