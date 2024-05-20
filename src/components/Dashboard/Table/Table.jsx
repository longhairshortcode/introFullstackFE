import style from "./Table.module.css"
import axios from "axios"


function Table({students, updateStudent, displayAllStudents}) {


  async function deleteStudent(id) {
        try{
            const response = await axios.delete(`https://student-register-bkend.onrender.com/student-register/delete-single-student/${id}`)
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

  return (
    <div className={style.componentContainer}>
      <div className={style.columnTitles}>
            <div className={style.idColumn}>
                <h3 className={style.tableTitles}>Student ID:</h3>
            </div>
            <div className={style.nameColumn}>
                <h3 className={style.tableTitles}>Student Full Name:</h3>
            </div>
            <div className={style.emailColumn}>
                <h3 className={style.tableTitles}>Student Email:</h3>
            </div>
      </div>
      <div className={style.studentTableContainer}>
        { students.sort((a, b) => a.studentID - b.studentID).map((student) => {
          return( 
          <div className={style.studentTable} key={student.studentID}>
            <div className={style.idColumn}>
                <h3 className={style.studentID}>{student.studentID}</h3>
            </div>
            <div className={style.nameColumn}>
                <h3 className={style.tableTitles}>{student.name}</h3>
            </div>
            <div className={style.emailColumn}>
                <h3 className={style.tableTitles}>{student.email}</h3>
                <div className={style.updateAndDeleteContainer}>
                  <button onClick={() => updateStudent(student)} className={style.updateButton}>Update Student</button>
                  <button onClick={() => deleteStudent(student._id)} className={style.deleteButton}>Delete Student</button>
                </div>
            </div>
          </div>  

          )
        })

        }
      </div>
    </div>
  )
}

export default Table
