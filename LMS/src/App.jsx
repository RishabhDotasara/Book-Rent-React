import { createContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './components/Home/Home'
import loadingContext from './components/contexts/LoadingContext'
import Signup from './components/Signup/Signup'
import BookDetail from './components/BookDetail/BookDetail'
import Admin from './components/dashboard/Admin'
import HomeAdmin from './components/dashboard/HomeAdmin'
import AddBook from './components/dashboard/AddBook'
import AddAdmin from './components/dashboard/AddAdmin'

function App() {
  const [loading, setLoading] = useState(false)
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [isAdmin,setIsAdmin] = useState(false)
  const SERVER_URL = "https://lms-server-mu.vercel.app"

  useEffect(()=>{ 
    setLoading(false)
    const token = localStorage.getItem("token")
    const adminAccess = localStorage.getItem("isAdmin")
    //assuming the token is valid and not expired.
    if(token)
    {
      setIsLoggedIn(true)
    }
    if(adminAccess)
    {
      setIsAdmin(true)
    }
  },[])
  

  return (
    <BrowserRouter>
            <loadingContext.Provider value={{loading,setLoading,isLoggedIn,setIsLoggedIn,SERVER_URL,isAdmin,setIsAdmin}}>
        <Navbar/>
        <Routes>
          
                  <Route index element={<Home />} />
                  <Route path="/login" element={<Signup config="login"/>}/>
                  <Route path="/signup" element={<Signup config="signup"/>}/>
                  <Route path="/book/:id" element={<BookDetail/>}></Route>
                  <Route path='/admin' element={<Admin/>}>
                      <Route path='dash' element={<HomeAdmin/>}></Route>
                      <Route path='book' element={<AddBook/>}></Route>
                      <Route path='user' element={<AddAdmin/>}></Route>
                  </Route>
                  <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>

            </loadingContext.Provider>
      
      
     </BrowserRouter> 
  )
}

export default App
