import React, { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineDown } from "react-icons/ai";
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
  const [data, setData] = useState<ToDo[]>([]);

  const currentDate = new Date();
  const dateTime = currentDate.toISOString();
  const uid = uuid();

  const [date, setDate] = useState<any[]>([
    Date.now(),
    Date.now(),
    Date.now(),
    Date.now(),
  ]);
  const [check, setCheck] = useState([
    "uncheck",
    "uncheck",
    "uncheck",
    "uncheck",
  ]);
  const [open, setOpen] = useState<boolean[]>([true, true, true, false]);
  const [more, setMore] = useState([false, false, false, false])

  const handleSelect = (text: string) => {
    setTask(false);
    setSelectTask(text);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/users/1/todos`)
      .then(({ data }) => setData(data.slice(0, 4)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const renderer = ({ days, completed }: any) => {
    if (completed) {
      // Render a completed state
      return (
        <span className="mr-4 text-red-500 text-sm whitespace-nowrap opacity-0">
          {days} Days left
        </span>
      );
    } else {
      // Render a countdown
      return (
        <span className="mr-4 text-red-500 text-sm whitespace-nowrap opacity-100">
          {days} Days left
        </span>
      );
    }
  };

  const handleDate = (e: any, i: number) => {
    const dummyArray = [...date];
    dummyArray.splice(i, 0, e);
    dummyArray.splice(i + 1, 1);
    setDate(dummyArray);
  };

  const handleCheck = (i: number) => {
    const dummyArray = [...check];
    if (dummyArray[i] == "check") {
      dummyArray.splice(i, 0, "uncheck");
      dummyArray.splice(i + 1, 1);
    } else {
      dummyArray.splice(i, 0, "check");
      dummyArray.splice(i + 1, 1);
    }
    setCheck(dummyArray);
  };

  const handleOpen = (i: number) => {
    const dummyArray = [...open];
    if (dummyArray[i] == false ) {
      dummyArray.splice(i, 0, true);
      dummyArray.splice(i + 1, 1);
    } else {
      dummyArray.splice(i, 0, false);
      dummyArray.splice(i + 1, 1);
    }
    setOpen(dummyArray);
  };

  const handleMore = (i: number) => {
    const dummyArray = [...more]
    if (dummyArray[i] == false ) {
      dummyArray.splice(i, 0, true);
      dummyArray.splice(i + 1, 1);
    } else {
      dummyArray.splice(i, 0, false);
      dummyArray.splice(i + 1, 1);
    }
    setMore(dummyArray)
  }

  const newTask = () => {
    const dummyArray = [...data];
    dummyArray.push({ title: "", completed: false, id: uid, userId: "1" });
    setData(dummyArray);
    const dateArray = [...date];
    dateArray.push(Date.now());
    setDate(dateArray);
    const checkArray = [...check];
    checkArray.push("uncheck");
    setCheck(checkArray);
    const openArray = [...open];
    openArray.push(true);
    setOpen(openArray);
    const moreArray = [...more];
    moreArray.push(false);
    setMore(moreArray);
  };

  const deleteTask = (i: number) => {
    const dummyArray = [...data];
    dummyArray.splice(i, 1)
    setData(dummyArray);
    const dateArray = [...date];
    dateArray.splice(i, 1)
    setDate(dateArray);
    const checkArray = [...check];
    checkArray.splice(i, 1)
    setCheck(checkArray);
    const openArray = [...open];
    openArray.splice(i, 1)
    setOpen(openArray);
    const moreArray = [...more];
    moreArray.splice(i, 1)
    setMore(moreArray);
  };

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col space-y-4 justify-center items-center">
        <div className="relative mx-auto">
          <div className="border-t-transparent absolute border-l-transparent border-solid animate-spin  rounded-full border-[#c4c4c4] border-[6px] h-14 w-14"></div>
          <div className="border-solid rounded-full border-[#f8f8f8] border-[6px] h-14 w-14"></div>
        </div>
        <p className="text-sm tracking-tight text-[#5a5a5a] font-medium">
          Loading To Do Lists ...
        </p>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col px-2">
      <div className="flex justify-between pl-20 py-4">
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
        <button
          onClick={() => newTask()}
          className="px-4 rounded-md font-semibold bg-[#2f80ed] text-white"
        >
          New Task
        </button>
      </div>
      <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-[#bdbdbd] scrollbar-thumb-rounded-full">
        {data.map((set, i) => (
          <div key={i} className="w-full h-fit px-4">
            <div className="flex w-full items-center space-x-4">
              <div
                onClick={() => handleCheck(i)}
                className="h-4 w-4 border-2 border-[#a1a1a1] rounded-sm flex items-center justify-center"
              >
                {check[i] == "check" || Date.parse(date[i]) < Date.now() ? (
                  <AiOutlineCheck />
                ) : (
                  <></>
                )}
              </div>
              <input
                type="text"
                placeholder={set.title == "" ? "Type Task Title" : set.title}
                className={`w-1/2 font-semibold border-none ${
                  check[i] == "check" || Date.parse(date[i]) < Date.now() 
                    ? "line-through text-[#828282]"
                    : Date.parse(date[i]) > Date.now() ? "placeholder:text-black text-black" : 'placeholder:text-black'
                }`}
              />
              <Countdown date={date[i]} renderer={renderer} />
              <p className="text-sm">{moment(date[i]).format("MM/DD/YYYY")}</p>
              <BsChevronUp
                className={`h-3 w-3 ${open[i] == true ? "" : "rotate-180"}`}
                onClick={() => handleOpen(i)}
              />
              <div className="relative">
                <BsThreeDots className="h-4 w-4" onClick={() => handleMore(i)}/>
                {more[i] == true && <p onClick={() => deleteTask(i)} className="absolute bg-white right-0 mt-1 text-left w-28 cursor-pointer text-red-500 px-4 py-1 border border-[#828282] rounded-sm">Delete</p> }
              </div>
            </div>
            <div
              className={`px-8 flex flex-col space-y-2 py-2 ${
                open[i] == true ? "block" : "hidden"
              }`}
            >
              <div className="flex items-center space-x-2">
                <BsClock className="text-[#3c88ee]" />
                <input
                  type="date"
                  placeholder="Set Date"
                  onChange={(e) => handleDate(e.target.value, i)}
                  value={date[i]}
                />
              </div>
              <div className="flex items-start space-x-2">
                <BsPencil className="text-[#3c88ee]" />
                <textarea
                  className="w-[88%] resize-none placeholder:text-black"
                  placeholder="No Description"
                />
              </div>
            </div>

            {i !== data.length - 1 && (
              <div className="w-full px-8 pb-2">
                <div className={`h-0.5 w-full bg-[#c0c0c0]`}></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToDoList;
