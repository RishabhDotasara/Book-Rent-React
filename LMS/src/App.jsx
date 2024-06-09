import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './components/Home/Home'
import loadingContext from './components/contexts/LoadingContext'

function App() {
  const [loading, setLoading] = useState(false)
  

  return (
    <BrowserRouter>
        <Navbar/>
            <loadingContext.Provider value={{loading,setLoading}}>
        <Routes>
          {/* <Route index element={<Landing />} /> */}
                  <Route index element={<Home />} />
        </Routes>
            </loadingContext.Provider>
      

     </BrowserRouter> 
  )
}

export default App
