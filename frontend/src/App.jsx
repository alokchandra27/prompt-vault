import React from 'react'
import MainRoutes from './components/Routes/MainRoutes'
import Nav from './components/Navbar/Nav'

const App = () => {
  return (
    <div className='bg-[#F4F2F2] text-white min-h-screen flex'>
   
      <Nav/>
      <MainRoutes/>

    </div>
  )
}

export default App