import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MyVault from '../Pages/MyVault'
import Community from '../Pages/Community'
import Dashboard from '../Pages/Dashboard'

const MainRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/myvault" element={<MyVault/>} />
            <Route path="/community" element={<Community/>} />
        </Routes>
    </div>
  )
}

export default MainRoutes