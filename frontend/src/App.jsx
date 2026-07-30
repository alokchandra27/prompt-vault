import React from 'react'
import MainRoutes from './components/Routes/MainRoutes'
import Nav from './components/Navbar/Nav'

const App = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      {/* Left Navigation Bar */}
      <Nav />

      {/* Right Side Main Content / Routes */}
      <div className="flex-1 h-full overflow-y-auto">
        <MainRoutes className />
      </div>
    </div>
  );
};

export default App;