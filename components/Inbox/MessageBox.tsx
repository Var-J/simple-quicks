/* eslint-disable @next/next/no-img-element */
import React, { FormEvent, useEffect, useState, useRef } from "react";
import axios from "axios";
import { Comments, Posts, Reply } from "../../typing";
import { BsArrowLeftShort, BsPlus } from "react-icons/bs";
import moment from "moment";
import { v4 as uuid } from "uuid";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

type Props = {
  id: string;
  setId: any;
  setButton: any;
  firstPost: Posts;
  read: string[];
  setRead: any;
};

function MessageBox({ id, setId, setButton, firstPost, read, setRead }: Props) {
  const [data, setData] = useState<Comments[] | []>([]);
  const [input, setInput] = useState("");
  const [more, setMore] = useState("");
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const [reply, setReply] = useState({ name: "", message: "" });

  useEffect(() => {
    axios
      .get(`https://dummyapi.io/data/v1/post/${id}/comment?limit=10`, {
        headers: { "app-id": process.env.NEXT_PUBLIC_DUMMYAPI_APP_ID },
      })
      .then(({ data }) => setData(data.data))
      .catch(console.error);
  }, [id]);


  let participants = 1;
  let count = 0;
  let dummyArray = [firstPost.owner.id];

  for (let i = 0; i < data.length; i++) {
    dummyArray.push(data[i].owner.id);
  }

  const colorArray: number[] = [];
  for (let i = 0; i < dummyArray.length; i++) {
    for (let j = 0; j < dummyArray.length; j++) {
      if (dummyArray[i] == "1") {
      } else if (dummyArray[i] !== dummyArray[j]) {
        count += 1;
      }
      if (count == dummyArray.length - 1) {
        colorArray.push(participants);
        participants += 1;
        count = 0;
      }
    }
  }

  const newData: Comments[] = [...data];

  const addMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage = input;
    setInput("");
    const newReply = reply.message;
    setReply({name: '', message: ''})
    const currentDate = new Date();
    const dateTime = currentDate.toISOString();
    const uid = uuid();
    newData.push({
      id: uid,
      message: newMessage,
      owner: {
        id: "1",
        title: "Mr.",
        firstName: "You",
        lastName: "",
        picture: "",
      },
      post: firstPost.id,
      publishDate: dateTime,
      reply: newReply
    });
    setData(newData);
  };

  const openMore = (x: string) => {
    if (more == "" || more !== x) {
      setMore(x);
    } else {
      setMore("");
    }
  };

  const closeMessage = (id: string) => {
    const dummyRead = [firstPost.id, ...read];
    setId(id);
    setRead(dummyRead);
  };

  const replyMessage = (
    firstName: string,
    lastName: string,
    message: string
  ) => {
    setMore("");
    setReply({ name: firstName + " " + lastName, message: message });
  };

  return (
    <div className="flex flex-col h-full w-full p-2">
      <div className="px-2 pb-2 border-b h-fit border-[#cdcdcd]">
        <div className="flex justify-between space-x-2 w-full h-fit items-center text-[#333333]">
          <BsArrowLeftShort
            className="h-10 w-10 cursor-pointer"
            onClick={() => closeMessage("")}
          />
          <div className="w-full text-left">
            <h1 className="text-[#2f80ed] font-semibold">
              {firstPost.owner.firstName} {firstPost.owner.lastName}
            </h1>
            <h3 className="text-sm text-[#4f4f4f]">
              {participants} participants
            </h3>
          </div>
          <BsPlus
            className="h-10 w-10 rotate-45 cursor-pointer"
            onClick={() => setButton(0)}
          />
        </div>
      </div>
      <div className="overflow-y-scroll h-full w-full scrollbar-thin scrollbar-thumb-[#bdbdbd] scrollbar-thumb-rounded-full scroll-smooth">
        <div className="px-2 mb-2 w-full h-fit">
          <h4 className="mt-4 text-blue-400 font-semibold text-sm">
            {firstPost.owner.firstName} {firstPost.owner.lastName}
          </h4>
          {firstPost.image == "" ? (
            <></>
          ) : (
            <div className="w-1/2 h-auto relative p-2 bg-blue-200 rounded-lg mb-1">
              <img
                src={firstPost.image}
                alt=""
                className="object-contain rounded-md"
              />
              <p className="text-xs text-[#817b86] mt-1">
                {moment(firstPost.publishDate).format("HH.MM")}
              </p>
            </div>
          )}
          <div className="w-fit p-2 bg-blue-200 rounded-lg">
            <p>{firstPost.text}</p>
            <p className="text-xs text-[#817b86] mt-1">
              {moment(firstPost.publishDate).format("HH.MM")}
            </p>
          </div>
        </div>
        <div className="px-4 w-full h-fit flex flex-col-reverse">
          {data
            .sort(
              (a, b) => Date.parse(b.publishDate) - Date.parse(a.publishDate)
            )
            .map((set, i) => (
              <>
                <div
                  key={i}
                  className={` mb-2 ${
                    set.owner.id == "1" ? "w-full flex flex-col items-end" : ""
                  }`}
                >
                  {set.owner.id ==
                  (i < data.length - 1 ? data[i + 1].owner.id : "") ? (
                    <></>
                  ) : (
                    <h4
                      className={`${
                        set.owner.id == "1"
                          ? "text-[#b47ce8]"
                          : colorArray[i] == 1
                          ? "text-blue-500"
                          : colorArray[i] == 2
                          ? "text-green-500"
                          : colorArray[i] == 3
                          ? "text-purple-500"
                          : colorArray[i] == 4
                          ? "text-red-500"
                          : colorArray[i] == 5
                          ? "text-yellow-500"
                          : "text-cyan-500"
                      } font-semibold text-sm`}
                    >
                      {set.owner.firstName} {set.owner.lastName}
                    </h4>
                  )}{" "}
                  {set.owner.id == "1" && (
                    <div
                      className={`bg-[#f2f2f2] w-fit p-1 text-sm h-fit ${
                        reply ? "block" : "hidden"
                      }`}
                    >
                      {set.reply}
                    </div>
                  )}
                  <div
                    className={`${
                      set.owner.id == "1"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    } flex items-start space-x-2`}
                  >
                    <div
                      className={`w-fit p-2 ${
                        set.owner.id == "1"
                          ? "bg-[#b47ce8]"
                          : colorArray[i] == 1
                          ? "bg-blue-200"
                          : colorArray[i] == 2
                          ? "bg-green-200"
                          : colorArray[i] == 3
                          ? "bg-purple-200"
                          : colorArray[i] == 4
                          ? "bg-red-200"
                          : colorArray[i] == 5
                          ? "bg-yellow-200"
                          : "bg-cyan-200"
                      } rounded-md`}
                    >
                      <p>{set.message}</p>
                      <p className="text-xs text-[#817b86] mt-1">
                        {moment(set.publishDate).format("HH.MM")}
                      </p>
                    </div>
                    <div className="flex relative">
                      <button
                        onClick={() => openMore(set.id)}
                        className="-my-2 text-lg font-semibold"
                      >
                        ...
                      </button>
                      {set.owner.id == "1" ? (
                        <div
                          className={`bg-white absolute ${
                            more == set.id ? "block" : "hidden"
                          } ${
                            set.message.length < 15 && set.owner.id == "1"
                              ? "right-5"
                              : "left-5"
                          } w-24 text-sm `}
                        >
                          <button className="w-full py-1 px-3 text-left border rounded-t-md text-blue-500">
                            Edit
                          </button>
                          <button className="w-full py-1 px-3 text-left border rounded-b-md text-red-500">
                            Delete
                          </button>
                        </div>
                      ) : (
                        <div
                          className={`bg-white absolute ${
                            more == set.id ? "block" : "hidden"
                          } ${
                            set.message.length < 15 && set.owner.id == "1"
                              ? "right-5"
                              : "left-5"
                          } w-24 text-sm `}
                        >
                          <button className="w-full py-1 px-3 text-left border rounded-t-md text-blue-500">
                            Share
                          </button>
                          <button
                            onClick={() =>
                              replyMessage(
                                set.owner.firstName,
                                set.owner.lastName,
                                set.message
                              )
                            }
                            className="w-full py-1 px-3 text-left border rounded-b-md text-blue-500"
                          >
                            Reply
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {i == 0 && read.includes(firstPost.id) == false ? (
                  <>
                    <div
                      key={i}
                      id="new-message"
                      className="my-1 flex items-center space-x-4"
                      ref={ref}
                    >
                      <div className="w-full h-[1px] bg-[#f08181]" />
                      <p className="whitespace-nowrap font-bold text-sm text-[#eb5757] ">
                        New Message
                      </p>
                      <div className="w-full h-[1px] bg-[#f08181]" />
                    </div>
                    {!inView && (
                      <Link
                        href="#new-message"
                        className="absolute bottom-16 mx-auto w-fit left-0 right-0 text-center"
                      >
                        <p className="px-3 py-1 bg-[#e9f3ff] text-[#2f80ed] rounded-md font-semibold">
                          New Message
                        </p>
                      </Link>
                    )}
                  </>
                ) : Date.parse(set.publishDate) -
                    (i < data.length - 1
                      ? Date.parse(data[i + 1].publishDate)
                      : 0) >
                  86400 ? (
                  <div className="my-1 flex items-center space-x-8">
                    <div className="w-full h-[1px] bg-[#a7a7a7]" />
                    <p className="whitespace-nowrap font-bold text-sm text-[#4f4f4f] ">
                      {moment(data[i].publishDate).format("MMMM DD, YYYY")}
                    </p>
                    <div className="w-full h-[1px] bg-[#a7a7a7]" />
                  </div>
                ) : (
                  <></>
                )}
              </>
            ))}
        </div>
      </div>
      {firstPost.owner.id == "Support" && (
        <div className="px-1 rounded-sm ">
          <div className="bg-[#e9f3ff] p-2 px-4 flex items-center space-x-4">
            <div className="border-t-transparent border-l-transparent border-solid animate-spin rounded-full border-[#2f80ed] border-4 h-6 w-6"></div>
            <p className="text-sm tracking-tight text-[#4f4f4f]">
              Please wait while we connect you with one of our team ...
            </p>
          </div>
        </div>
      )}
      <form onSubmit={addMessage} className="relative h-fit w-full px-4">
        {reply.name !== "" && reply.message !== "" ? (
          <div className="absolute w-[468px] h-fit bottom-10 bg-[#f2f2f2] p-2 border-black border ">
            <div
              className="absolute right-2 top-1"
              onClick={() => setReply({ name: "", message: "" })}
            >
              X
            </div>
            <h4 className="font-semibold text-sm">Replying to {reply.name}</h4>
            <p className="text-sm">{reply.message}</p>
          </div>
        ) : (
          <></>
        )}
        <div className="w-full flex items-center rounded-md shadow-sm space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-full py-2 px-4 outline-none rounded-md border border-[#a1a1a1] placeholder:text-[#4c4c4c]"
            placeholder="Type a new message"
          />
          <button
            type="submit"
            disabled={!input}
            className="px-4 py-2 bg-[#2f80ed] text-white font-semibold rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default MessageBox;
