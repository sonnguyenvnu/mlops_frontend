import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar'
import SideBar from '../SideBar'

const DefaultLayout = () => {
  return (
    <>
      <NavBar />
      {/* <SideBar /> */}
      <Outlet className="outlet" />
    </>
  )
}

export default DefaultLayout
