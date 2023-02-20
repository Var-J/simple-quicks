import React, { useState, useEffect } from "react";
import { SlMagnifier } from "react-icons/sl";
import { AiOutlineUser } from "react-icons/ai";
import axios from "axios";
import { Posts } from "../../typing";

type Props = {
  setId: any;
  setTitle: any;
};

function MessagesList({ setId, setTitle }: Props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Posts[] | []>([]);

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

  const openMessage = (id: string, firstname: string, lastName: string) => {
    setId(id)
    const title = firstname + " " + lastName
    console.log(title)
    setTitle(title)
  }

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
    <>
      <div className="w-full p-4 px-8">
        <div className="w-full border border-black/50 px-10 h-4 p-3 flex items-center rounded-md shadow-sm ">
          <input
            type="text"
            className="w-full h-fit outline-none text-sm"
            placeholder="Search"
          />
          <SlMagnifier className="h-4 w-4" />
        </div>
      </div>
      {data.map((data) => (
        <div
          onClick={() => openMessage(data.id, data.owner.firstName, data.owner.lastName)}
          className="w-full h-24 relative px-8 py-2 flex space-x-8 hover:bg-black/20 cursor-pointer"
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
              <p className="text-xs">{data.publishDate}</p>
            </div>
            <h4 className="font-semibold text-sm">{data.owner.firstName} {data.owner.lastName}</h4>
            <div className="flex w-full items-center justify-between">
              <p className="text-sm text-[#4f4f4f]">{data.text}</p>
              <div className="h-2 w-2 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default MessagesList;
