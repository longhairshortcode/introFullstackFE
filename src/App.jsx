import Dashboard from "./pages/Dashboard"
import {Routes, Route, Navigate} from "react-router-dom"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Error from "./pages/Error"
import { useState, createContext, useEffect } from "react"


export const AuthContext = createContext()


function App() {
  //For session storage
const [userID, setUserID] = useState(window.sessionStorage.getItem("userID"))
  //For local storage
const [userId, setUserId] = useState(window.localStorage.getItem("userID"))

  const [user, setUser] = useState({
    name: "",
    email: "",
    id: userId,
  })


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
