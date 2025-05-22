import axios from 'axios'
import React from 'react'
import {IoLogOutOutline} from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const Header = ({setAddTaskDiv}) => {
    const navigate = useNavigate()
    const logOut = async()=>{
        try {
            const res = await axios.post("https://task-backend-brown.vercel.app/api/v1/logout",{},{withCredentials:true})
            alert(res.data.success)
            localStorage.clear("userLoggedIn")
            navigate("/login")
        } catch (error) {
            console.log(error)
            // navigate("/login")
        }
    }
  return (
    <div className='flex px-12 py-4 items-center justify-between border-b'>
        <div>
            <h1 className='text-2xl text-blue-800 font-semibold'>Taskify</h1>
        </div>
        <div className='flex gap-6'>
            <button className='hover:text-blue-800 transition-all duration-300'
            onClick={()=>setAddTaskDiv("block")}>
                Add Task
            </button>
            <button className='text-2xl hover:text-red-600 transition-all duration-300'
            onClick={logOut}>
                <IoLogOutOutline/>
            </button>
        </div>
    </div>
  )
}

export default Header
