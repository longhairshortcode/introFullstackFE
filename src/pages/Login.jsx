import style from "./Styles/Login.module.css"
import {useState, useContext} from "react"
import { useNavigate } from "react-router-dom"
import {AuthContext} from "../App.jsx"
import axios from "axios"

function Login() {
    const {setUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    })

    
    function handleChange(e){
        const {name, value} = e.target
        setUserLogin(prev => ({
            ...prev,
            [name] : value
        }))
    }


    async function handleSubmit(e){
        e.preventDefault()
        const {email, password} = userLogin
        try{
            const res = await axios.post("https://student-register-bkend.onrender.com/user/login", {email, password})
            // console.log(res)
            if (res.status === 200){
                setUser(prev => ({
                    ...prev,
                    name: res.data.name,
                    email: res.data.email,
                    id: res.data.id
                    
                }))
                //Use for more sensitive apps or if you don't mind session ending at close of tab
                // window.sessionStorage.setItem("userID", res.data.id)
                
                //use below for when you want them to be logged in forever until they click log out/timer is up
                window.localStorage.setItem("userID", res.data.id)
                navigate("/dashboard")
            }
            
        }catch(error){
            console.log(error)
        }
       
    }

  return (
    <div className={style.componentContainer}>
        <div className={style.titleAndFormContainer}>
            <p className={style.title}>Welcome to Student Database</p>
            <form  className={style.formContainer} onSubmit={handleSubmit}>
                <input 
                type="email"
                className={style.email}
                name="email"
                value={userLogin.email}
                onChange={handleChange}
                placeholder="Email"
                required/>
                
                <input 
                type="password"
                className={style.password}
                name="password"
                value={userLogin.password}
                onChange={handleChange}
                placeholder="Password"
                required/>
                
                <button className={style.button}>Log In</button>
            </form>
        </div>
    </div>
  )
}

export default Login




