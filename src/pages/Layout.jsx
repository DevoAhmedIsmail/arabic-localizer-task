import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const Layout = (props) => {
  return (
    <>
        <Sidebar />
        <div className="screen-margin">
            <Navbar />
            {props.children}
        </div>
    </>
  )
}

export default Layout