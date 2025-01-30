import React, { useState, useEffect } from 'react'
import { FaRegHeart, FaRegEdit, FaRegTrashAlt , FaHeart } from 'react-icons/fa'
import { IoMdAddCircle } from 'react-icons/io'
import axios from 'axios'

const Cards = ({ home, setInputDiv, data , setUpdatedData}) => {
    const [taskData, setTaskData] = useState(data || [])

    useEffect(() => {
        setTaskData(data)
    }, [data])

    const headers = {
        id: localStorage.getItem('id'),
        authorization: `Bearer ${localStorage.getItem('token')}`
    }

    const handleCompleteTask = async (id) => {
        setTaskData(prevTasks => 
            prevTasks.map(task => 
                task._id === id ? { ...task, isCompleted: !task.isCompleted } : task
            )
        )

        try {
            const response = await axios.put(`http://localhost:3000/api/tasks/update-complete-task/${id}`, {}, { headers })
            alert(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    const handleImportant = async (id) =>{
        setTaskData(prevTasks => 
            prevTasks.map(task => 
                task._id === id ? {...task,isImportant: !task.isImportant} : task
            )
        )
        try{
            const response = await axios.put(`http://localhost:3000/api/tasks/update-imp-task/${id}`,{},{headers})
            console.log(response)
        }catch(error){
            console.log(error)
        }
    }

    const deleteTask = async(id) =>{
        const prevTasks=[...taskData]
        setTaskData(prevTasks.filter(task => task._id !== id));
        try{
        const response = await axios.delete(`http://localhost:3000/api/tasks/delete-task/${id}`,{headers})
        console.log(response)
        }
        catch(error){
            console.log(error)
            setTaskData(prevTasks)
        }

    }

    const handleUpdate = (id,title,desc,due) =>{
         setInputDiv('fixed')
         setUpdatedData({id:id,title:title,desc:desc,due:due})
    }

    return (
        <div className='grid grid-cols-3 gap-4 p-4'>
            {taskData && taskData.map((item) => (
                <div key={item._id} className='bg-gray-800 rounded-sm p-4 flex flex-col justify-between my-2'>
                    <div>
                        <h3 className='text-xl font-semibold'>{item.title}</h3>
                        <p className='text-gray-400 my-2'>{item.desc}</p>
                        <h6 className='text-blue-400'>Due: {new Date(item.due).toLocaleDateString()}</h6>
                    </div>
                    <div className='mt-4 w-full flex items-center'>
                        <div>
                            <button 
                                className={`${item.isCompleted ? 'bg-green-500' : 'bg-red-500'} p-2 rounded`} 
                                onClick={() => handleCompleteTask(item._id)}
                            >
                                {item.isCompleted ? 'Completed' : 'Incomplete'}
                            </button>
                        </div>
                        <div className='p-2 w-3/6 text-2xl flex justify-around'>
                            <button onClick={() => handleImportant(item._id)}>
                                {!item.isImportant ? (<FaRegHeart />) : (<FaHeart className='text-red-500'/>)}
                            </button>
                            { home !== "false" && (
                            <button onClick={() => handleUpdate(item._id,item.title,item.desc,item.due)}>
                                <FaRegEdit />
                            </button>
                            )}
                            <button onClick={() => deleteTask(item._id)}>
                                <FaRegTrashAlt />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {home === 'true' && (
                <button 
                    className='flex flex-col justify-center items-center border bg-gray-800 rounded-sm p-4 my-2 hover:scale-103 cursor-pointer transition-all duration-300' 
                    onClick={() => setInputDiv('fixed')}
                >
                    <IoMdAddCircle className='text-4xl'/>
                    <h2 className='text-2xl text-gray-400 mt-4'>Add Tasks</h2>
                </button>
            )}
        </div>
    )
}

export default Cards
