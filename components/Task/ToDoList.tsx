import React, { useEffect, useState } from 'react'
import { AiOutlineDown } from 'react-icons/ai'
import axios from "axios";
import { Posts } from "../../typing";
import { v4 as uuid } from "uuid";

function ToDoList() {
  const [task, setTask] = useState(false);
  const [selectTask, setSelectTask] = useState('My Tasks')
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const currentDate = new Date();
  const dateTime = currentDate.toISOString();
  const uid = uuid();

  const handleSelect = (text: string) => {
    setTask(false)
    setSelectTask(text)
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/users/1/todos`)
      .then(({ data }) => setData(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // const openMessage = (id: string, data: Posts) => {
  //   setId(id);
  //   setFirstPost(data);
  // };

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col space-y-4 justify-center items-center">
        <div className="relative mx-auto">
          <div className="border-t-transparent absolute border-l-transparent border-solid animate-spin  rounded-full border-[#c4c4c4] border-[6px] h-14 w-14"></div>
          <div className="border-solid rounded-full border-[#f8f8f8] border-[6px] h-14 w-14"></div>
        </div>
        <p className="text-sm tracking-tight text-[#5a5a5a] font-medium">
          Loading Chats ...
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between pl-20 p-4">
        <div className="relative items-center flex justify-center">
          <div onClick={() => setTask(!task)} className="w-fit flex space-x-2 items-center border border-[#c0c0c0] cursor-pointer rounded-md p-2">
            <p className='font-semibold'>{selectTask}</p><AiOutlineDown />
          </div>
          <div className={`${task ? 'block' : 'hidden'} absolute top-12 cursor-pointer`}>
            <p className={` border border-[#c0c0c0] hover:bg-black/10 rounded-t-sm p-1 w-60`} onClick={() => handleSelect('Personal Errands')}>Personal Errands</p>
            <p className={` border border-[#c0c0c0] hover:bg-black/10 rounded-b-sm p-1 w-60`} onClick={() => handleSelect('Urgent To-Do')}>Urgent To-Do</p>
          </div>
        </div>
        <button className='px-4 rounded-sm bg-[#2f80ed] text-white'>New Task</button>
      </div>
    </div>
  )
}

export default ToDoList