import React, { useState } from 'react'
import Header from '../components/Dashboard/Header'
import AddTask from '../components/Dashboard/AddTask'
import StateTitle from '../components/Dashboard/StateTitle'
import YetToStart from '../components/Dashboard/YetToStart'
import InProgress from '../components/Dashboard/InProgress'
import Completed from '../components/Dashboard/Completed'
import axios from 'axios'
import { useEffect } from 'react'
import EditTask from '../components/Dashboard/EditTask'

const Dashboard = () => {
    const [AddTaskDiv, setAddTaskDiv ] = useState ('hidden')
    const [Tasks, setTasks] = useState()
    const [EditTaskDiv, setEditTaskDiv] = useState("hidden")
    const [EditTaskId, setEditTaskId] = useState()

    useEffect(() => {
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:1000/api/v1/userDetails", { withCredentials: true });
      setTasks(res.data.tasks);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  fetchTasks(); 

  if(window.sessionStorage.getItem("editTaskId")){
    setEditTaskDiv("block")
    setEditTaskId(window.sessionStorage.getItem("editTaskId"))
  }
}, [AddTaskDiv]);
    
  return (
    <div className='w-full relative'>
        <div className="bg-white">
            <Header setAddTaskDiv={setAddTaskDiv}/>
        </div>


        <div className='px-12 py-4 flex gap-12 bg-zinc-100 min-h-[89vh] max-h-auto'>
          <div className='w-1/3'>
            <StateTitle title = {"Yet To Start"}/>
            <div className='pt-2'>
              { Tasks && <YetToStart task = {Tasks[0].yetToStart}/>}
            </div>
          </div>
          <div className='w-1/3'>
            <StateTitle title = {"In Progress"}/>
            <div className='pt-2'>
              { Tasks && <InProgress task = {Tasks[1].inProgress}/>}
            </div>
          </div>
          <div className='w-1/3'>
            <StateTitle title = {"Completed"}/>
            <div className='pt-2'>
              { Tasks && <Completed task = {Tasks[2].completed}/>}
            </div>
          </div>
        </div>


        <div className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}></div>
        <div className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}>
            <AddTask setAddTaskDiv={setAddTaskDiv}/>
        </div>

        <div className={`w-full ${EditTaskDiv} h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}></div>
        <div className={`w-full ${EditTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}>
            <EditTask EditTaskId={EditTaskId} setEditTaskDiv={setEditTaskDiv}/>
        </div>
    </div>
  )
}

export default Dashboard