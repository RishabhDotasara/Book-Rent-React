import React,{createContext} from 'react'

const loadingContext = createContext({
    loading:false,
    setLoading:()=>{}
})

export default loadingContext;
