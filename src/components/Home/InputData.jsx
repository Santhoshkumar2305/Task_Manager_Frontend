import React, { useState, useEffect } from 'react'
import { IoMdClose } from "react-icons/io";
import axios from 'axios';

const InputData = ({ InputDiv, setInputDiv, fetchTasks, UpdatedData, setUpdatedData }) => {
    const [Data, setData] = useState({ title: "", desc: "", due: "" })
    // const formattedDate = new Date(UpdatedData.due).toISOString().split('T')[0]
    useEffect(() => {
        setData({ title: UpdatedData.title, desc: UpdatedData.desc, due: UpdatedData.due })
    }, [UpdatedData])
    const headers = {
        id: localStorage.getItem('id'),
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
    const change = (e) => {
        const { name, value } = e.target
        setData({ ...Data, [name]: value })
    }
    const submitData = async () => {
        if (Data.title === "" || Data.desc === "" || Data.due === "") {
            alert("All fields are required")
        }
        else {
            const response = await axios.post("https://task-manager-backend-urct.onrender.com/api/tasks/create-task", Data, { headers })
            if (response.data.message === "Task Created") {
                setData({ title: "", desc: "", due: "" })
                setInputDiv("hidden")
                fetchTasks()
            }
        }

    }

    const UpdateTask = async () => {
        if (Data.title === "" || Data.desc === "" || Data.due === "") {
            alert("All fields are required")
        }
        else {
            const response = await axios.put(`https://task-manager-backend-urct.onrender.com/api/tasks/update-task/${UpdatedData.id}`, Data, { headers })
            setUpdatedData({
                id: "", title: "", desc: ""
            })
            setData({ title: "", desc: "", due: "" })
            setInputDiv("hidden")
            fetchTasks()

        }
    }
    return (
        <>
            <div className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-50 h-screen w-full`}></div>
            <div className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>

                <div className='w-2/6 bg-gray-900 p-7 rounded'>
                    <div className='flex justify-end' >
                        <button
                            onClick={() => {
                                setInputDiv("hidden")
                                setData({ title: "", desc: "" })
                                setUpdatedData({
                                    id: "", title: "", desc: ""
                                })
                            }}>
                            <IoMdClose className='text-2xl' />
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder='Title'
                        name='title'
                        className='bg-gray-700 px-3 py-2 rounded w-full'
                        value={Data.title}
                        onChange={change}
                    />
                    <textarea
                        name="desc"
                        cols="30"
                        rows="10"
                        placeholder="Description..."
                        className='px-3 py-2 rounded w-full my-2 bg-gray-700'
                        value={Data.desc}
                        onChange={change}
                    >
                    </textarea>
                    <input
                        type="date"
                        placeholder='Due Date'
                        name='due'
                        className='bg-gray-700 px-3 py-2 rounded w-full'
                        value={Data.due}
                        onChange={change}
                    />
                    {UpdatedData.id === "" ?
                        (<button className='m-3 bg-blue-400 rounded p-2 text-black font-semi-bold' onClick={submitData}>Submit</button>) :
                        (<button className='m-3 bg-blue-400 rounded p-2 text-black font-semi-bold' onClick={UpdateTask}>Update</button>)
                    }
                </div>
            </div>
        </>
    )
}

export default InputData
