import style from "./Styles/SignUp.module.css"
import {Link, useNavigate} from "react-router-dom" 
import {useState, useEffect, useContext} from "react" 
import axios from "axios"
import {AuthContext} from "../App.jsx"

function SignUp() {
    // just to see how I got next line of code from this: useContext(AuthContext)
    const {setUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const [userSignUp, setUserSignUp] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [isNameValid, setIsNameValid] = useState(false)
    const [isPWLengthValid, setIsPWLengthValid] = useState(false)
    const [passwordsMatch, setPasswordsMatch] = useState(true)

    // 
    useEffect(() => {
        if (userSignUp.name.length > 1){
            setIsNameValid(true)
        }else{
            setIsNameValid(false)
        }

    }, [userSignUp.name])
   
    useEffect(() => {
        if(userSignUp.password.length > 7){
            setIsPWLengthValid(true)
        }else{
            setIsPWLengthValid(false)
        }

    }, [userSignUp.password])

    useEffect(() => {
        if (userSignUp.confirmPassword !== userSignUp.password){
            setPasswordsMatch(false)
        }else{
            setPasswordsMatch(true)
        }

    }, [userSignUp.confirmPassword])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {name, email, password, confirmPassword} = userSignUp
        if (password !== confirmPassword){
            setPasswordsMatch(false)
            setUserSignUp(prev => ({
                ...prev,
                confirmPassword : ""
            })
             )
            return;
        }
        try{
            const res = await axios.post("http://localhost:2121/user/sign-up", {name, email, password} )
            console.log(res)
            if (res.status === 201){
                setUser(prev => ({
                    ...prev,
                    name: res.data.name,
                    email: res.data.email,
                    id: res.data.id,
                }))
                navigate("/dashboard")
            }
        }catch(error){
            console.log(error)
        }
    }
// review this 
    function handleChange(e){
        const {name, value} = e.target
        setUserSignUp(prev => ({
            ...prev,
            [name] : value
        }))
    }

  return (
    <div className={style.componentContainer}>
        <div className={style.titleAndFormContainer}>
            <p className={style.title}>Welcome to Student Database</p>
            <p className={style.createOrLog}>Create an account or <Link className={style.login}to={"login"}>log in</Link></p>
            <form className={style.formContainer} onSubmit={handleSubmit} >
               
            <input 
                type="email"
                className={style.email}
                name="email"
                value={userSignUp.email}
                onChange = {handleChange}
                placeholder="Email:"
                required/>
               
               
                {/* <div> */}
                {!isNameValid &&   
                    <p className={style.nameInvalid}>Name must be at least 2 letters.</p>
                    }
                    <input 
                        type="text"
                        className={style.name}
                        name="name"
                        value={userSignUp.name}
                        onChange={handleChange} 
                        placeholder="Name:"
                        required
                    />
                {/* </div> */}
                
                {!isPWLengthValid &&   
                        <p className={style.pwLengthInvalid}>Password must be at least 8 letters.</p>
                    }

                <input 
                type="password"
                className={style.password}
                name="password"
                value={userSignUp.password}
                onChange={handleChange}
                placeholder="Password:"
                required/>

                {!passwordsMatch &&   
                    <p className={style.pwLengthInvalid}>Confirmation password does not match password.</p>
                    }
                
                <input 
                type="password"
                className={style.confirmPassword}
                name="confirmPassword"
                value={userSignUp.confirmPassword}
                onChange = {handleChange}
                placeholder="Confirm Password:"
                required/>
                
                <div className={style.checkBoxContainer}>
                <input className={style.checkBox} type="checkbox" id="myCheckbox"/>
                <label className={style.checkBoxLabel} htmlFor="myCheckbox">I don't want to receive promotional emails from Student Database.</label>
                </div>
                <p className={style.notice}>By clicking the "Sign Up" button, you are creating a Student Database accound, and you agree to Student Database's terms of use and privacy policy.</p>
                
                <button className={style.button}>Sign Up</button>
            </form>
            
        </div> 
    </div>
  )
  
}

export default SignUp
