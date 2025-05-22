import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const EditTask = ({setEditTaskDiv,EditTaskId}) => {
    const [Values, setValues] = useState({
            title: "",
            description: "",
            priority: "low",
            status: "yetToStart"
        });
    
        const change = (e) => {
            const { name, value } = e.target;
            setValues({ ...Values, [name]: value });
        };

        console.log(EditTaskId)

        useEffect(()=>{
            const fetchDetails = async ()=>{
                try {
                    const res = await axios.get(`http://localhost:1000/api/v1/getTask/${EditTaskId}`,{withCredentials:true})
                    setValues(res.data.taskDetails)
                } catch (error) {
                    
                }
            }
            fetchDetails()
        },[EditTaskId])


        const editTask = async (e, id) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                `http://localhost:1000/api/v1/editTask/${id}`,
                Values,
                { withCredentials: true }
            );

            alert(res.data.success || "Task Updated successfully.");
            window.sessionStorage.clear("editTaskId")
            setEditTaskDiv("hidden")
            window.location.reload()
        } catch (error) {
            alert(error.response?.data?.error || "Something went wrong");
        }
    };

    const deleteTask = async (e, id) => {
        e.preventDefault();
        try {
            const res = await axios.delete(
                `http://localhost:1000/api/v1/deleteTask/${id}`,
                { withCredentials: true }
            );

            alert(res.data.success || "Task Updated successfully.");
            window.sessionStorage.clear("editTaskId")
            setEditTaskDiv("hidden")
            window.location.reload()
        } catch (error) {
            alert(error.response?.data?.error || "Something went wrong");
        }
    };
  return (
    <div className='bg-white rounded px-4 py-4 w-[40%]'>
            <h1 className='text-center font-semibold text-xl'>Edit Task</h1>
            <hr className='mb-4 mt-2' />
            <form className='flex flex-col gap-4'>
                <input
                    type="text"
                    className='border px-2 py-1 border-zinc-300 outline-none'
                    placeholder='Title'
                    name='title'
                    value={Values.title}
                    onChange={change}
                />
                <div className='flex items-center justify-between gap-4'>
                    <div className='w-full'>
                        <h3 className='mb-2'>Select Priority</h3>
                        <select
                            name="priority"
                            className='border px-2 py-1 border-zinc-300 outline-none w-full'
                            value={Values.priority}
                            onChange={change}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className='w-full'>
                        <h3 className='mb-2'>Select Status</h3>
                        <select
                            name="status"
                            className='border px-2 py-1 border-zinc-300 outline-none w-full'
                            value={Values.status}
                            onChange={change}
                        >
                            <option value="yetToStart">Yet To Start</option>
                            <option value="inProgress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>
                <textarea
                    name="description"
                    className='border px-2 py-1 border-zinc-300 outline-none h-[25vh]'
                    placeholder="Description"
                    value={Values.description}
                    onChange={change}
                ></textarea>
                <div className='flex items-center justify-between gap-4'>
                    <button
                        className='w-full bg-blue-800 py-2 hover:bg-blue-700 transition duration-300 text-white rounded'
                        onClick={(e)=>editTask(e, Values._id)}
                    >
                        Edit Task
                    </button>
                    <button
                        className='w-full border border-red-600 text-red-600 py-2 hover:bg-red-600 hover:text-white transition duration-300 rounded'
                        type="button"
                        onClick={(e)=>deleteTask(e, Values._id)}
                    >
                        Delete Task
                    </button>

                    <button
                        className='w-full border border-black py-2 hover:bg-zinc-600 transition duration-300 rounded'
                        type="button"
                        onClick={(event) => {event.preventDefault(); 
                            window.sessionStorage.clear("editTaskId")
                            setEditTaskDiv("hidden")}}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
  )
}

export default EditTask