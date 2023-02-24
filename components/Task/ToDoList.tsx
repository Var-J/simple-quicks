import React, { useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import axios from "axios";
import { ToDo } from "../../typing";
import { v4 as uuid } from "uuid";
import moment from "moment";
import Countdown from "react-countdown";
import { BsChevronUp, BsClock, BsPencil, BsThreeDots } from "react-icons/bs";
import ReactTextareaAutosize from "react-textarea-autosize";

function ToDoList() {
  const [task, setTask] = useState(false);
  const [selectTask, setSelectTask] = useState("My Tasks");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ToDo[]>([]);
  const [openTag, setOpenTag] = useState("");

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
  const [more, setMore] = useState([false, false, false, false]);

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
    if (dummyArray[i] == false) {
      dummyArray.splice(i, 0, true);
      dummyArray.splice(i + 1, 1);
    } else {
      dummyArray.splice(i, 0, false);
      dummyArray.splice(i + 1, 1);
    }
    setOpen(dummyArray);
  };

  const handleMore = (i: number) => {
    const dummyArray = [...more];
    if (dummyArray[i] == false) {
      dummyArray.splice(i, 0, true);
      dummyArray.splice(i + 1, 1);
    } else {
      dummyArray.splice(i, 0, false);
      dummyArray.splice(i + 1, 1);
    }
    setMore(dummyArray);
  };

  const newTask = () => {
    const dummyArray = [...data];
    dummyArray.push({
      title: "",
      completed: false,
      id: uid,
      tag: [],
      userId: "1",
    });
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
    dummyArray.splice(i, 1);
    setData(dummyArray);
    const dateArray = [...date];
    dateArray.splice(i, 1);
    setDate(dateArray);
    const checkArray = [...check];
    checkArray.splice(i, 1);
    setCheck(checkArray);
    const openArray = [...open];
    openArray.splice(i, 1);
    setOpen(openArray);
    const moreArray = [...more];
    moreArray.splice(i, 1);
    setMore(moreArray);
  };

  const handleOpenTag = (id: string) => {
    if (openTag !== id) {
      setOpenTag(id);
    } else {
      setOpenTag("");
    }
  };

  const addTag = (tag: string, i: number) => {
    const dummyArray = [...data];
    if (dummyArray[i].tag) {
      if (dummyArray[i].tag.includes(tag)) {
      } else {
        dummyArray[i].tag.push(tag);
      }
    } else {
      dummyArray[i].tag = [tag];
    }
    console.log(dummyArray);
    setData(dummyArray);
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
    <div className="h-full w-full flex flex-col px-[32px]">
      <div className="flex justify-between pl-20 pt-[24px] pb-[22px]">
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
          <div key={i} className="w-full h-fit pb-[22px]">
            <div className="flex w-full items-start space-x-4">
              <div
                onClick={() => handleCheck(i)}
                className="flex items-center justify-center"
              >
                {check[i] == "check" || Date.parse(date[i]) < Date.now() ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M24.5089 0.526306H3.38607C1.72642 0.526306 0.36853 1.8842 0.36853 3.54385V24.6667C0.36853 26.3263 1.72642 27.6842 3.38607 27.6842H24.5089C26.1685 27.6842 27.5264 26.3263 27.5264 24.6667V3.54385C27.5264 1.8842 26.1685 0.526306 24.5089 0.526306ZM24.5089 24.6667H3.38607V3.54385H24.5089V24.6667ZM20.8576 7.43649L22.985 9.57895L10.9148 21.6491L4.87975 15.6291L7.02221 13.5018L10.9148 17.3793L20.8576 7.43649Z"
                      fill="#BDBDBD"
                    />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.54391 0.526306H24.6667C26.3264 0.526306 27.6843 1.8842 27.6843 3.54385V24.6667C27.6843 26.3263 26.3264 27.6842 24.6667 27.6842H3.54391C1.88426 27.6842 0.526367 26.3263 0.526367 24.6667V3.54385C0.526367 1.8842 1.88426 0.526306 3.54391 0.526306ZM24.6667 24.6667V3.54385H3.54391V24.6667H24.6667Z"
                      fill="#BDBDBD"
                    />
                  </svg>
                )}
              </div>
              <ReactTextareaAutosize maxRows={2} placeholder={set.title == "" ? "Type Task Title" : set.title} className={`w-1/2 overflow-hidden font-semibold border-none resize-none ${
                  check[i] == "check" || Date.parse(date[i]) < Date.now()
                    ? "line-through text-[#828282]"
                    : Date.parse(date[i]) > Date.now()
                    ? "placeholder:text-black text-black"
                    : "placeholder:text-black"
                }`}/>
              <div className="flex items-center space-x-4">
              <Countdown date={date[i]} renderer={renderer} />
              <p className="text-sm">{moment(date[i]).format("MM/DD/YYYY")}</p>
              <BsChevronUp
                className={`h-3 w-3 ${open[i] == true ? "" : "rotate-180"}`}
                onClick={() => handleOpen(i)}
              />
              <div className="relative">
                <BsThreeDots
                  className="h-4 w-4"
                  onClick={() => handleMore(i)}
                />
                {more[i] == true && (
                  <p
                    onClick={() => deleteTask(i)}
                    className="absolute bg-white right-0 mt-1 text-left w-28 cursor-pointer text-red-500 px-4 py-1 border border-[#828282] rounded-sm"
                  >
                    Delete
                  </p>
                )}
              </div>
              </div>
            </div>
            <div
              className={`px-6 flex flex-col space-y-2 py-2 ${
                open[i] == true ? "block" : "hidden"
              }`}
            >
              <div className="flex items-center px-2 space-x-2">
                <svg
                  width="16.67"
                  height="16.67"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.2508 0.514648C6.31048 0.514648 0.690308 6.1474 0.690308 13.0877C0.690308 20.0281 6.31048 25.6608 13.2508 25.6608C20.2038 25.6608 25.8365 20.0281 25.8365 13.0877C25.8365 6.1474 20.2038 0.514648 13.2508 0.514648ZM13.2637 23.1462C7.70636 23.1462 3.20519 18.6451 3.20519 13.0878C3.20519 7.53045 7.70636 3.02928 13.2637 3.02928C18.821 3.02928 23.3221 7.53045 23.3221 13.0878C23.3221 18.6451 18.821 23.1462 13.2637 23.1462ZM12.0061 6.80121H13.8921V13.4021L19.55 16.7591L18.607 18.3056L12.0061 14.3451V6.80121Z"
                    fill="#2F80ED"
                  />
                </svg>

                <input
                  type="date"
                  placeholder="Set Date"
                  onChange={(e) => handleDate(e.target.value, i)}
                  value={date[i]}
                />
              </div>
              <div className="flex items-start px-2 space-x-2">
                <svg
                  width="16.67"
                  height="16.67"
                  viewBox="0 0 24 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.3092 0C18.9949 0 18.668 0.125731 18.4291 0.36462L16.1282 2.6655L20.8431 7.38041L23.144 5.07953C23.6343 4.58918 23.6343 3.79708 23.144 3.30673L20.2019 0.36462C19.9504 0.113158 19.6361 0 19.3092 0ZM14.7831 7.569L15.9398 8.72573L4.54857 20.117H3.39185V18.9602L14.7831 7.569ZM0.877197 17.9167L14.783 4.01081L19.498 8.72572L5.59211 22.6316H0.877197V17.9167Z"
                    fill="#2F80ED"
                  />
                </svg>

                <textarea
                  className="w-[88%] resize-none placeholder:text-black"
                  placeholder="No Description"
                />
              </div>
              <div
                onClick={() => handleOpenTag(set.id)}
                className="bg-[#f9f9f9] flex items-center space-x-4 px-2 py-3 relative"
              >
                <svg
                  width="16.67"
                  height="16.67"
                  viewBox="0 0 22 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.005 0.257324H7.116C5.80952 0.257324 4.75246 1.3889 4.75246 2.77194H16.6295C17.936 2.77194 19.005 3.90352 19.005 5.28656V21.6316L21.3804 22.8889V2.77194C21.3804 1.3889 20.3114 0.257324 19.005 0.257324ZM14.2543 7.80118V24.1085L9.25402 21.8328L8.31573 21.4053L7.37744 21.8328L2.37719 24.1085V7.80118H14.2543ZM2.37712 5.28655H14.2542C15.5607 5.28655 16.6296 6.41813 16.6296 7.80117V27.9181L8.31566 24.1462L0.00170898 27.9181V7.80117C0.00170898 6.41813 1.07065 5.28655 2.37712 5.28655Z"
                    fill="#2F80ED"
                  />
                </svg>
                <ul className="w-full h-fit flex space-x-2 items-center">
                  {set.tag ? (
                    set.tag.map((tag: string, i: number) => (
                      <li
                        key={i}
                        className={`py-1 px-2 w-fit text-sm font-semibold rounded-md ${
                          tag == "Important ASAP"
                            ? "bg-[#e5f1ff]"
                            : tag == "Offline Meeting"
                            ? "bg-[#fdcfa4]"
                            : tag == "Virtual Meeting"
                            ? "bg-[#f9e9c3]"
                            : tag == "ASAP"
                            ? "bg-[#afebdb]"
                            : tag == "Client Related"
                            ? "bg-[#cbf1c2]"
                            : tag == "Self Task"
                            ? "bg-[#cfcef9]"
                            : tag == "Appointments"
                            ? "bg-[#f9e0fd]"
                            : tag == "Court Related" && "bg-[#9dd0ed]"
                        }`}
                      >
                        {tag}
                      </li>
                    ))
                  ) : (
                    <></>
                  )}
                </ul>
                <div
                  className={`${
                    openTag == set.id ? "block" : "hidden"
                  } absolute top-10 w-fit p-4 bg-white border border-black rounded-md z-20`}
                >
                  <ul className="flex flex-col space-y-2">
                    <li
                      onClick={() => addTag("Important ASAP", i)}
                      className="py-1 px-4 w-60 text-sm font-semibold rounded-md cursor-pointer bg-[#e5f1ff]"
                    >
                      Important ASAP
                    </li>
                    <li
                      onClick={() => addTag("Offline Meeting", i)}
                      className="py-1 px-4 w-60 text-sm font-semibold rounded-md cursor-pointer bg-[#fdcfa4]"
                    >
                      Offline Meeting
                    </li>
                    <li
                      onClick={() => addTag("Virtual Meeting", i)}
                      className="py-1 px-4 w-60 text-sm font-semibold rounded-md cursor-pointer bg-[#f9e9c3]"
                    >
                      Virtual Meeting
                    </li>
                    <li
                      onClick={() => addTag("ASAP", i)}
                      className="py-1 px-4 w-60 text-sm font-semibold rounded-md cursor-pointer bg-[#afebdb]"
                    >
                      ASAP
                    </li>
                    <li
                      onClick={() => addTag("Client Related", i)}
                      className="py-1 px-4 w-60 text-sm font-semibold rounded-md cursor-pointer bg-[#cbf1c2]"
                    >
                      Client Related
                    </li>
                    <li
                      onClick={() => addTag("Self Task", i)}
                      className="py-1 px-4 w-60 text-sm font-semibold rounded-md cursor-pointer bg-[#cfcef9]"
                    >
                      Self Task
                    </li>
                    <li
                      onClick={() => addTag("Appointments", i)}
                      className="py-1 px-4 w-60 text-sm font-semibold rounded-md cursor-pointer bg-[#f9e0fd]"
                    >
                      Appointments
                    </li>
                    <li
                      onClick={() => addTag("Court Related", i)}
                      className="py-1 px-4 w-60 text-sm font-semibold rounded-md cursor-pointer bg-[#9dd0ed]"
                    >
                      Court Related
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {i !== data.length - 1 && (
              <div className="w-full">
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
