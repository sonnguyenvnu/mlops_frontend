import { message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import * as auth from '../../api/auth'
import logo from '../../assets/images/logo.png'
import { validateEmail, validatePassword } from '../../utils/validate'

const Login = () => {
  const cookies = new Cookies()
  const navigate = useNavigate()
  const writeCookies = ({ accessToken, refreshToken }) => {
    const cookieOptions = {
      path: '/',
      secure: true,
      sameSite: 'none',
    }
    if (process.env.REACT_APP_DOMAIN_NAME) {
      cookieOptions.domain = process.env.REACT_APP_DOMAIN_NAME
    }
    cookies.set('accessToken', accessToken, cookieOptions)
    if (refreshToken) {
      cookies.set('refreshToken', refreshToken, cookieOptions)
    }
  }
  const onLogin = async (credential) => {
    try {
      const { data } = await auth.login(credential)
      // console.log(data)
      writeCookies({ accessToken: data.access_token, refreshToken: data.refresh_token })

      navigate('/app/projects', { replace: true })
    } catch (error) {
      console.error(error)
    }
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password')
    const credential = {
      email,
      password,
    }
    // validate user info
    if (!validateEmail(credential.email)) {
      return message.error('Email is invalid.')
    }

    if (!validatePassword(credential.password)) {
      return message.error('Password is invalid.')
    }
    onLogin(credential)
  }

  return (
    <>
      <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
        <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
          <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
            <div className="text-center">
              <img src={logo} width={150} className="mx-auto" alt="logo" />
              <div className="mt-5 space-y-2">
                <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Login</h3>
                <p className="">
                  Don't have an account?{' '}
                  <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign up
                  </a>
                </p>
              </div>
            </div>
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                Login{' '}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}

export default Login
