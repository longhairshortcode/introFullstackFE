import Dashboard from "./pages/Dashboard"
import {Routes, Route, Navigate} from "react-router-dom"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Error from "./pages/Error"
import { useState, createContext, useEffect } from "react"


export const AuthContext = createContext()


function App() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    id: "",
  })

  useEffect(()=>{
    // console.log("This is from the useEffect: ",  user.id)
  },[user])


  return (
    <>
      <AuthContext.Provider value={{setUser, user}}>
        <Routes>
          <Route path={"/dashboard"} element={ user.id ? <Dashboard/> : <Navigate to="/login"/>}/>
          <Route path={"/"} element={<SignUp/>}/>
          <Route path={"/login"} element={<Login/>}/>
          <Route path={"*"} element={<Error/>}/> 
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
