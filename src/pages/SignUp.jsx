import React,{useState}from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const SignUp = () => {
    const history=useNavigate()
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
    if(isLoggedIn === true){
        history('/')
    }

    const [Data,setData] = useState({username:"",email:"",password:""})
    const change = (e) =>{
        const {name,value} = e.target
        setData({...Data , [name] :value})
    }
    const submit = async() =>{
        try{
            if(Data.username === "" || Data.email === "" || Data.password ===""){
                alert("All fields are required")
            }
            else{
                const response = await axios.post('http://localhost:3000/api/signup',Data)
                setData({username:"",email:"",password:""})
                alert(response.data.message)
                history('/login')
            }
        }
        catch(error){
            alert(error.response.data.message)
        }
    }
  return (
    <div className='h-[98vh] flex items-center justify-center'>
        <div className='p-4 w-2/6 rounded bg-gray-800'>
            <div className='text-2xl font-semi-bold'>Sign Up</div>
            <input 
                type="username" 
                placeholder='Username'
                className='bg-gray-700 px-3 py-2 my-3 w-full rounded' 
                name='username'
                value={Data.username}
                onChange={change}
            />
            <input 
                type="email" 
                placeholder='Email'
                className='bg-gray-700 px-3 py-2 my-3 w-full rounded' 
                name='email'
                value={Data.email}
                required
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
                <button className='bg-blue-400 px-3 py-2 my-3 rounded text-black' onClick={submit}>Sign Up</button>
                <Link to='/login' className='text-gray-400 hover:text-gray-200'>Already have any account? Log In here</Link>
            </div>
        </div>
    </div>
  )
}

export default SignUp