import style from "./Styles/Dashboard.module.css"
import Add from "../components/Dashboard/Add/Add.jsx"
import Table from "../components/Dashboard/Table/Table.jsx"
import Update from "../components/Dashboard/Update/Update.jsx"
import { useState, useEffect } from "react"
import axios from "axios"

function Dashboard() {

  const [students, setStudents] = useState([]);

  const [updatedStudent, setUpdatedStudent] = useState({
    _id: "",
    studentID: "",
    name: "",
    email: "",
  })

  const displayAllStudents = async () => {
    try{
      const response = await axios.get("http://localhost:2121/student-register/get-all-students");
      console.log("This is the 4th console: ", response)
      if (response.status === 200){
        setStudents(response.data)
      }
    }catch(error){
      console.log(error)
    }
  }




  const updateStudent = (student) => {
    console.log("This is the first console:" , student)
    const {_id, studentID, email, name} = student;
    setUpdatedStudent((prev) => (
      {
        ...prev,
        _id: _id,
        studentID: studentID,
        name: name,
        email: email,
      }
    ))
    console.log("This is the 2nd console:" , updatedStudent)
  }

  useEffect(() => {
    displayAllStudents();
  }, [])

  useEffect(() => {
    console.log("This is the third console:" , updatedStudent)
  }, [updatedStudent])


    return (
    <div className={style.componentContainer}>
      <h1 className={style.title}>Student Record</h1>
      <div className={style.allFormsContainer}>
      <Add displayAllStudents={displayAllStudents}/>
      <Update students={students} updatedStudent={updatedStudent} setUpdatedStudent= {setUpdatedStudent} displayAllStudents={displayAllStudents}/> 
      <Table students={students} updateStudent={updateStudent} displayAllStudents={displayAllStudents}/>
    </div>
        
        
    </div>
  )
}

export default Dashboard
