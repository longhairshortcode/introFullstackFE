import style from "./Update.module.css"
import axios from "axios"

function Update({updatedStudent, setUpdatedStudent, displayAllStudents}) {

    
  function handleChange(e){
    const {name, value} = e.target
    setUpdatedStudent(prev => ({
      ...prev, 
      [name] : value 
    }))
}

async function handleSubmit(e) {
  e.preventDefault()
  const {_id, studentID, name, email} = updatedStudent
 try{ 
  const response = await axios.put(`http://localhost:2323/student-register/update-single-student/${_id}`, {studentID, name, email} )
  console.log(response)
  if (response.status === 200){
  displayAllStudents();
  }
  //call the getAllStudents controller's function so it gets all, sends it back to FE,
  //then in Dashboard (HOC), the state changes, triggering the useEffect, and the UE
  //will map through it and render all the students
}catch(error){
  console.log(error)
}
}

  return (
    <div className={style.componentContainer} >
        <h2 className={style.subTitle}>Update Student</h2>    
        <form className={style.updateFormContainer} onSubmit={handleSubmit}>
        
          <input 
            type="number" 
            name="studentID" 
            value={updatedStudent.studentID} 
            onChange={handleChange} 
            className={style.id} 
            required 
            placeholder="Student ID:">
          </input>

          <input 
            type="text" 
            name="name" 
            value={updatedStudent.name} 
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
            value={updatedStudent.email} 
            onChange={handleChange} 
            className={style.email} 
            required 
            placeholder="Email:">
          </input>
          <button className={style.updateButton}>Update</button>
        
      </form>
    </div>
  )
}

export default Update
