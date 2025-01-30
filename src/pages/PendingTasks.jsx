import React,{useState,useEffect} from 'react'
import Cards from '../components/Home/Cards'
import axios from 'axios'
const PendingTasks = () => {
  const [Data,setData] = useState()
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`
  }
  const fetchTasks = async() =>{
    const response = await axios.get("http://localhost:3000/api/tasks/get-incomplete-tasks",{headers})
    setData(response.data.data)
  }
  useEffect(()=>{
    fetchTasks()
  },[])

  return (
    <div>
        <Cards home={"false"} data={Data}/>
    </div>
  )
}

export default PendingTasks