import React, { useState, useEffect } from "react";
import { SlMagnifier } from "react-icons/sl";
import { AiOutlineUser } from "react-icons/ai";
import axios from "axios";
import moment from "moment";
import { Posts } from "../../typing";
import { v4 as uuid } from "uuid";

type Props = {
  setId: any;
  setFirstPost: any;
  read: string[];
};

function MessagesList({ setId, setFirstPost, read }: Props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Posts[] | []>([]);

  const currentDate = new Date();
  const dateTime = currentDate.toISOString();
  const uid = uuid();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://dummyapi.io/data/v1/post?limit=2`, {
        headers: { "app-id": process.env.NEXT_PUBLIC_DUMMYAPI_APP_ID },
      })
      .then(({ data }) => setData(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const openMessage = (id: string, data: Posts) => {
    setId(id);
    setFirstPost(data);
  };

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
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-fit p-4 px-8">
        <div className="w-full border border-black/50 px-10 h-4 p-3 flex items-center rounded-md shadow-sm ">
          <input
            type="text"
            className="w-full h-fit outline-none text-sm"
            placeholder="Search"
          />
          <SlMagnifier className="h-4 w-4" />
        </div>
      </div>
      <div className="w-full h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-[#bdbdbd] scrollbar-thumb-rounded-full">
        {data.map((data, i) => (
          <>
            <div
              key={i}
              onClick={() => openMessage(data.id, data)}
              className="w-full h-fit relative px-8 pt-2 pb-6 flex space-x-8 hover:bg-black/20 
            cursor-pointer"
            >
              <div className="relative">
                <div className="w-9 h-9 mt-1 bg-[#2f80ed] rounded-full flex justify-center items-center absolute left-5">
                  <AiOutlineUser className="h-4 w-4 text-white" />
                </div>
                <div className="w-9 h-9 mt-1 bg-[#e0e0e0] rounded-full flex justify-center items-center">
                  <AiOutlineUser className="h-4 w-4 text-black" />
                </div>
              </div>
              <div className="w-full">
                <div className="flex space-x-5 items-center">
                  <h3 className="text-[#2f80ed] font-semibold">
                    {data.owner.firstName} {data.owner.lastName}
                  </h3>
                  <p className="text-xs">
                    {moment(data.publishDate).format("MM-DD-YYYY HH:MM")}
                  </p>
                </div>
                <h4 className="font-semibold text-sm">
                  {data.owner.firstName} {data.owner.lastName}
                </h4>
                <div className="flex w-full items-center justify-between">
                  <p className="text-sm text-[#4f4f4f]">{data.text}</p>
                  <div
                    className={`h-2 w-2 ${
                      read.includes(data.id) ? "bg-transparent" : "bg-red-500"
                    } rounded-full`}
                  ></div>
                </div>
              </div>
            </div>
            <div className="w-full px-8 pb-2">
              <div className={`h-0.5 w-full bg-[#c0c0c0]`}></div>
            </div>
          </>
        ))}
        <div
          onClick={() =>
            openMessage("Support", {
              id: uid,
              image: "",
              likes: 0,
              owner: {
                id: "Support",
                firstName: "FastVisa",
                lastName: "support",
                picture: "",
                title: "",
              },
              publishDate: dateTime,
              tags: [""],
              text: `Hey, There. Welcome to your Inbox! Contact us for more information and help about anything! We'll send you a response as soon as possible`,
            })
          }
          className="w-full h-fit relative px-8 pt-2 pb-6 flex space-x-8 hover:bg-black/20 cursor-pointer"
        >
          <div className="relative w-10">
            <p className="w-9 h-9 mt-1 bg-[#2f80ed] rounded-full flex justify-center items-center absolute left-2 text-white font-semibold text-lg">
              F
            </p>
          </div>
          <div className="w-full">
            <div className="flex space-x-5 items-center">
              <h3 className="text-[#2f80ed] font-semibold">FastVisa Support</h3>
              <p className="text-xs">
                {moment(Date.now()).format("MM-DD-YYYY HH:MM")}
              </p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="text-sm text-[#4f4f4f]">
                Hey There! Welcome to your Inbox.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagesList;
