import React from 'react'
import { useState, useEffect } from 'react';
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { MdFileDownloadDone } from "react-icons/md";
import { FaWindowRestore } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, } from 'react-redux'
import { authActions } from '../store/auth';
import axios from 'axios';

const Sidebar = () => {
    const history = useNavigate()
    const dispatch = useDispatch()
    const data = [
        {
            title: "All Tasks",
            icon: <CgNotes />,
            link: "/"
        }, {
            title: "Important Tasks",
            icon: <MdLabelImportant />,
            link: "/importantTasks"
        }, {
            title: "Completed Tasks",
            icon: <MdFileDownloadDone />,
            link: "/completedTasks"
        }, {
            title: "Pending Tasks",
            icon: <FaWindowRestore />,
            link: "/pendingTasks"
        }, {
            title: "Overdue Tasks",
            icon: <IoMdTime />,
            link: "/overdueTasks"
        }
    ]
    const [Data, setData] = useState()
    const logout = () => {
        dispatch(authActions.logout())
        localStorage.clear('id')
        localStorage.clear('token')
        history('/signup')
    }
    const headers = {
        id: localStorage.getItem('id'),
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get("https://task-manager-backend-urct.onrender.com/api/tasks/get-all-tasks", { headers })
            setData(response.data.data)
        }
        if(localStorage.getItem('id') && localStorage.getItem('token')){
        fetch()
        }
    }, [])

    return (
        <>
            {Data && <div>
                <h2 className='text-xl font-semibold'>{Data.username}</h2>
                <h4 className='mb-1 text-gray-400'>{Data.email}</h4>
                <hr />
            </div>}

            <div>
                {data.map((item, i) => {
                    return <Link
                        to={item.link}
                        className='my-2 flex items-center hover:bg-gray-600 p-2 rounded transition:all duration-300 cursor-pointer'>
                        {item.icon}{item.title}
                    </Link>
                })}
            </div>
            <div>
                <button className='bg-gray-500 w-full p-2 rounded hover:bg-gray-700 transition:all duration-300 cursor-pointer' onClick={logout}>Log Out</button>
            </div>
        </>
    )
}

export default Sidebar
