// Jai Shree Ram

import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import NotFound from './pages/notfound/NotFound'
import Memories from './pages/memories/Memories'
import ExpandedMemory from './pages/memories/ExpandedMemory'
import { Toaster } from 'react-hot-toast'

function App() {


      
  return (
    <>
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        },
      }} />


    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/memories" element={<Memories />} />
      <Route path='/memory/:id' element={<ExpandedMemory />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    
    </>
  
  )
}

export default App