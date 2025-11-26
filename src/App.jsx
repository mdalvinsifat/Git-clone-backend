import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Profile from './components/user/Profile'


function App() {
 



const ProjectRoute = () =>{
  const {currentUser, setcurrentUser} = useAuth()
  const navigate = useNavigate()

  useEffect(() =>{
    const userIdFromStorage = localStorage.setItem("userId")

    if(userIdFromStorage && !currentUser)
    {
      setcurrentUser(userIdFromStorage)
    }

    if(!userIdFromStorage && !["/auth" , "/signup"].includes(window.location.pathname)){
      navigate("/auth")
    }

    if(userIdFromStorage && window.location.pathname =="/auth")
    {
      navigate("/")
    }
 })
,[currentUser, setcurrentUser, navigate]}

  return (
    <>
    
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/auth' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
    </>
  )
}

export default App
