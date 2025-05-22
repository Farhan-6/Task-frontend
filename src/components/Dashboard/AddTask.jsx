import axios from 'axios';
import React, { useState } from 'react';

const AddTask = ({ setAddTaskDiv }) => {
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

    const addTask = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "https://task-backend-brown.vercel.app/api/v1/addTask",
                Values,
                { withCredentials: true }
            );

            alert(res.data.success || "Task added successfully.");
            setValues({
                title: "",
                description: "",
                priority: "low",
                status: "yetToStart"
            });
        } catch (error) {
            alert(error.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <div className='bg-white rounded px-4 py-4 w-[40%]'>
            <h1 className='text-center font-semibold text-xl'>Add Task</h1>
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
                        onClick={addTask}
                    >
                        Add Task
                    </button>
                    <button
                        className='w-full border border-black py-2 hover:bg-zinc-600 transition duration-300 rounded'
                        type="button"
                        onClick={() => setAddTaskDiv("hidden")}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTask;
