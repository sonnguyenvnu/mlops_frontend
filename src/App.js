import React, { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Login from './pages/login'
import UploadFolder from './components/UploadFolder'
import Project from './pages/project'

const App = () => {
  return (
    <div className="app">
      <Login />
      <Project />
    </div>
  )
}

export default App
