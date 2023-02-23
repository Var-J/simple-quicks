import React, { useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import axios from "axios";
import { ToDo } from "../../typing";
import { v4 as uuid } from "uuid";
import moment from "moment";
import Countdown from "react-countdown";
import { BsChevronUp, BsClock, BsPencil, BsThreeDots } from "react-icons/bs";

function ToDoList() {
  const [task, setTask] = useState(false);
  const [selectTask, setSelectTask] = useState("My Tasks");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const [data, setData] = useState<ToDo[]>([]);


  const currentDate = new Date();
  const dummyDate = Date.now() + 864000000;
  const dateTime = currentDate.toISOString();
  const uid = uuid();

  const [date, setDate] = useState<any[]>([Date.now(), Date.now(), Date.now(), Date.now(), ])

  const handleSelect = (text: string) => {
    setTask(false);
    setSelectTask(text);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/users/1/todos`)
      .then(({ data }) => setData(data.slice(0,4)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const renderer = ({ days, completed }: any) => {
    if (completed) {
      // Render a completed state
      return <></>;
    } else {
      // Render a countdown
      return (
        <span className="mr-4 text-red-500 text-sm whitespace-nowrap">
          {days} Days left
        </span>
      );
    }
  };

  const handleDate = (e:any, i:number) => {
    const dummyArray = [...date];
    dummyArray.splice(i, 0, e)
    dummyArray.splice(i+1, 1)
    console.log(dummyArray)
    setDate(dummyArray)
  }

  const newTask = () => {
    const dummyArray = [...data];
    dummyArray.push({title:"hello", completed:false, id:uid, userId:'1'})
  }

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
          <div
            onClick={() => setTask(!task)}
            className="w-fit flex space-x-2 items-center border border-[#c0c0c0] cursor-pointer rounded-md p-2"
          >
            <p className="font-semibold">{selectTask}</p>
            <AiOutlineDown />
          </div>
          <div
            className={`${
              task ? "block" : "hidden"
            } absolute top-12 cursor-pointer`}
          >
            <p
              className={` border border-[#c0c0c0] hover:bg-black/10 rounded-t-sm p-1 w-60`}
              onClick={() => handleSelect("Personal Errands")}
            >
              Personal Errands
            </p>
            <p
              className={` border border-[#c0c0c0] hover:bg-black/10 rounded-b-sm p-1 w-60`}
              onClick={() => handleSelect("Urgent To-Do")}
            >
              Urgent To-Do
            </p>
          </div>
        </div>
        <button onClick={() => newTask()} className="px-4 rounded-md font-semibold bg-[#2f80ed] text-white">
          New Task
        </button>
      </div>
      <>
        {data.map((set, i) => (
          <div key={i} className="w-full h-fit px-6">
            {set.completed || Date.parse(date[i]) < Date.now() ? (
              <div className="flex w-full items-center space-x-4">
              <input type="checkbox" />
              <h2 className="w-1/2 font-semibold line-through text-[#828282]">{set.title}</h2>
              <Countdown date={date[i]} renderer={renderer} />
              <p className="text-sm">
                {moment(date[i]).format("MM/DD/YYYY")}
              </p>
              <BsChevronUp className={`h-3 w-3 ${open ? '' : 'rotate-180'}`} onClick={() => setOpen(!open)}/>
              <BsThreeDots className="h-4 w-4" />
            </div>
            ) : (
              <div className="flex w-full items-center space-x-4">
                <input type="checkbox" />
                <h2 className="w-1/2 font-semibold">{set.title}</h2>
                <Countdown date={date[i]} renderer={renderer} />
                <p className="text-sm">
                  {moment(date[i]).format("MM/DD/YYYY")}
                </p>
                <BsChevronUp className={`h-3 w-3 ${open ? '' : 'rotate-180'}`} onClick={() => setOpen(!open)}/>
                <BsThreeDots className="h-4 w-4" />
              </div>
            )}
            <div className={`px-8 flex flex-col space-y-2 py-2 ${open? 'block' : 'hidden'}`}>
              <div className="flex items-center space-x-2">
                <BsClock className="text-[#3c88ee]"/>
                <input type="date" onChange={(e) => handleDate(e.target.value, i)} value={date[i]} />
              </div>
              <div className="flex items-start space-x-2">
                <BsPencil className="text-[#3c88ee]"/>
                <textarea className="w-[88%] resize-none placeholder:text-black" placeholder="No Description"/>
              </div>
            </div>
            
            <div className="w-full px-8 pb-2">
              <div className={`h-0.5 w-full bg-[#c0c0c0]`}></div>
            </div>
          </div>
        ))}
      </>
    </div>
  );
}

export default ToDoList;
