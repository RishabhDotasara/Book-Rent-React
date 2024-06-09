import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './components/Home/Home'
import loadingContext from './components/contexts/LoadingContext'
import Signup from './components/Signup/Signup'
import BookDetail from './components/BookDetail/BookDetail'

function App() {
  const [loading, setLoading] = useState(false)
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  

  return (
    <BrowserRouter>
            <loadingContext.Provider value={{loading,setLoading,isLoggedIn,setIsLoggedIn}}>
        <Navbar/>
        <Routes>
          {/* <Route index element={<Landing />} /> */}
                  <Route index element={<Home />} />
                  <Route path="/login" element={<Signup config="login"/>}/>
                  <Route path="/signup" element={<Signup config="signup"/>}/>
                  <Route path="/book/:id" element={<BookDetail/>}></Route>
        </Routes>

            </loadingContext.Provider>
      

     </BrowserRouter> 
  )
}

export default App
