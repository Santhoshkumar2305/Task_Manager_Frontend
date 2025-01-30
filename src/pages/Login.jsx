import React,{useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { authActions } from '../store/auth'

const Login = () => {
    const [Data,setData] = useState({username:"",password:""})
    const history=useNavigate()
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
    if(isLoggedIn === true){
        history('/')
    }
    const change = (e) =>{
        const {name,value} = e.target
        setData({...Data , [name] :value})
    }
    const submit = async() =>{
        try{
            if(Data.username === "" || Data.password ===""){
                alert("All fields are required")
            }
            else{
                const response = await axios.post('http://localhost:3000/api/login',Data)
                setData({username:"",password:""})
                localStorage.setItem('id', response.data.id);
                localStorage.setItem('token', response.data.token);   
                dispatch(authActions.login())
                 history('/')
            }
        }
        catch(error){
            alert(error.response.data.message)
        }
    }






  return (
    <div className='h-[98vh] flex items-center justify-center'>
        <div className='p-4 w-2/6 rounded bg-gray-800'>
            <div className='text-2xl font-semi-bold'>Log In</div>
            <input 
                type="username" 
                placeholder='Username'
                className='bg-gray-700 px-3 py-2 my-3 w-full rounded' 
                name='username'
                value={Data.username}
                onChange={change}
            />
            <input 
                type="password" 
                placeholder='Password'
                className='bg-gray-700 px-3 py-2 my-3 w-full rounded' 
                name='password'
                value={Data.password}
                onChange={change}
            />
            <div className='w-full flex items-center justify-between'>
                <button className='bg-blue-400 px-3 py-2 my-3 rounded text-black' onClick={submit}>Log In</button>
                <Link to='/signup' className='text-gray-400 hover:text-gray-200'>Don't have any account? Sign up here</Link>
            </div>
        </div>
    </div>
  )
}

export default Login