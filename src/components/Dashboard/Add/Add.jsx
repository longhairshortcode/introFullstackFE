import style from "./Add.module.css"
import {useState} from "react" 
import axios from "axios" 

function Add({displayAllStudents}) {
    const [studentData, setStudentData] = useState({
        studentID: "",
        name: "",
        email: "",
    })
    
    function handleChange(e){
        // destruct("take out") name and value attributes (their values essentially) from the input that e.target represents
        const {name /* x (email)*/, value /* y (studentData.email)*/} = e.target
        setStudentData(prev => ({
            ...prev, //   name: "", email: "",
            //x email :  y studentData.email 
            [name] : value // property : value in studentData will take the 
        }))
    
    }
    
    async function handleSubmit(e) {
        e.preventDefault()
            const {studentID, name, email} =  studentData
            try{
                const response = await axios.post("http://localhost:2121/student-register/create-single-student", {studentID, name, email})
                console.log(response)
                if (response.status === 200) {
                  displayAllStudents();
                }
                //call the getAllStudents controller's function so it gets all, sends it back to FE,
                //then in Dashboard (HOC), the state changes, triggering the useEffect, and the UE
                //will map through it and render all the students

            }catch(error){
                console.log(error)
            }
        }
    
    //This is the same as above just written as a variable with the
    //async function value
    // const handleSubmit = async (e) => {
    
    // }
  return (
    <div className={style.componentContainer} >
        <h2 className={style.subTitle}>Add Student</h2>    
        <form className={style.addFormContainer} onSubmit={handleSubmit}>
        
          <input 
            type="number" 
            name="studentID" 
            value={studentData.studentID} 
            onChange={handleChange} 
            className={style.id} 
            required 
            placeholder="Student ID:">
          </input>

          <input 
            type="text" 
            name="name" 
            value={studentData.name} 
            onChange={handleChange} 
            className={style.name} 
            required 
            placeholder="Full Name:">
          </input>

          <input 
            type="email" 
            //x   
            name="email" 
            // y
            value={studentData.email} 
            onChange={handleChange} 
            className={style.email} 
            required 
            placeholder="Email:">
          </input>
          <button className={style.addButton}>Add</button>
        
      </form>
    </div>
  )
}

export default Add
