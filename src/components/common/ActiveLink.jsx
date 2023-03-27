import React from 'react'
import { NavLink } from 'react-router-dom'

const ActiveLink = (props) => {
  return (
    <NavLink
      {...props}
      className={({ isActive }) => {
        return isActive ? props.activeClassName : props.defaultClassName
      }}
    />
  )
}

export default ActiveLink
