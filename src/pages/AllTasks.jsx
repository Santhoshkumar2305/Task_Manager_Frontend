import React from 'react'
import Cards from '../components/Home/Cards'
import InputData from '../components/Home/InputData'
import { useState,useEffect } from 'react'
import axios from 'axios'
const AllTasks = () => {
  const [InputDiv,setInputDiv]=useState("hidden")
  const [Data, setData] = useState()
  const [UpdatedData,setUpdatedData] = useState({id:"",title:"",desc:"",due:""})

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`
}

const fetchTasks = async () => {
  const response = await axios.get("http://localhost:3000/api/tasks/get-all-tasks", { headers })
  setData(response.data.data)
}

  useEffect(() => {
    if(localStorage.getItem('id') && localStorage.getItem('token')){
    fetchTasks()
    }
}, [])
  return (
    <div>
      <>
        {Data && (
        <Cards home={"true"}  setInputDiv={setInputDiv} data={Data.tasks} setUpdatedData={setUpdatedData}/> 
        )}
        <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} fetchTasks={fetchTasks} UpdatedData={UpdatedData} setUpdatedData={setUpdatedData}/>
      </>
    </div>
  )
}

export default AllTasks