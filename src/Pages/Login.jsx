import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
        const [Values, setValues] = useState({
            email:"",
            password:"",
        })
        const change = (e)=>{
            const {name,value} = e.target;
            setValues({...Values, [name]:value})
        }
        
        const login = async(e)=>{
            e.preventDefault()
            try {
                const res= await axios.post('https://task-backend-brown.vercel.app/api/v1/login',Values,
                    { withCredentials: true}
                )
                localStorage.setItem("userLoggedIn" , "yes")
                navigate('/dashboard')
                
            } catch (error) {
                alert(error.response.data.error)
            }
        }
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
            <div className='w-[60vw] md:w-[50vw] lg:w-[30vw]'>
                <h1 className='text-3xl font-bold text-center mb-1 text-blue-800'>Taskify</h1>
                <h3 className='text-center font-semibold text-zinc-900'>Login With Taskify</h3>
            </div>
            <div className='w-[60vw] md:w-[50vw] lg:w-[30vw] mt-4'>
                <form className='flex flex-col gap-4'>
                    <input type="email" required 
                    placeholder='Email' 
                    className='border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none'
                    value={Values.email}
                    onChange={change}
                    name='email'/>

                    <input type="password" required 
                    placeholder='Password' 
                    className='border rounded px-4 py-1 border-zinc-400 w-[100%] outline-none'
                    value={Values.password}
                    onChange={change}
                    name='password'/>

                    <button className='bg-blue-800 text-white font-semibold py-2 hover:bg-blue-600 transition-all duration-300'
                    onClick={login}>
                        Login
                    </button>
                    <p className='text-center text-gray-900'>
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </form>
            </div>
        </div>
  )
}

export default Login
