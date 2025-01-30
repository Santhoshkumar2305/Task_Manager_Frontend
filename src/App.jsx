import React, { useEffect } from 'react'
import Home from './pages/Home'
import AllTasks from './pages/AllTasks'
import ImportantTasks from './pages/ImportantTasks'
import CompletedTasks from './pages/CompletedTasks'
import PendingTasks from './pages/PendingTasks'
import OverdueTasks from './pages/OverdueTasks'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Routes,Route,useNavigate } from 'react-router-dom'
import { authActions } from './store/auth'


const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
  useEffect(()=>{
    if(localStorage.getItem('id') && localStorage.getItem('token')){
      dispatch(authActions.login())
    }else if(isLoggedIn === false){
      navigate('/signup')
    }
  },[])
  return (
    <div className='bg-gray-900 text-white h-screen p-2 relative'>
        <Routes>
          <Route exact path='/' element={<Home/>}>
            <Route index element={<AllTasks/>}/> 
            <Route path='/importantTasks' element={<ImportantTasks/>}/>
            <Route path='/completedTasks' element={<CompletedTasks/>}/>
            <Route path='/pendingTasks' element={<PendingTasks/>}/>
            <Route path='/overdueTasks' element={<OverdueTasks/>}/>
          </Route>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
    </div>
    
  )
}

export default App