import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'

const App = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem("userLoggedIn")){
      navigate("/dashboard")
    }else{
      navigate("/login")
    }
  },[])
  return (
    <>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </>
  )
}

export default App