import React, { useState, useEffect } from "react";
import { SlMagnifier } from "react-icons/sl";
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
        headers: { "app-id": '63f2ca8becf41e73e390db49' },
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
      <div className="w-full h-fit py-[24px] px-[32px]">
        <div className="w-full h-4 px-32 p-4 rounded-[5px] space-x-2 border  border-[#828282] flex items-center shadow-sm ">
          <input
            type="text"
            className="w-full h-6 form-input outline-none text-sm border-none"
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
              className="w-full h-fit relative px-[32px] py-[22px] flex space-x-8 hover:bg-black/20 
            cursor-pointer"
            >
              <div className="relative">
                <div className="w-[34px] h-[34px] mt-1 bg-[#2f80ed] rounded-full flex justify-center items-center absolute left-5">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.1755 0.0292358C7.39687 0.0292358 5.14629 2.27982 5.14629 5.05848C5.14629 7.83713 7.39687 10.0877 10.1755 10.0877C12.9542 10.0877 15.2048 7.83713 15.2048 5.05848C15.2048 2.27982 12.9542 0.0292358 10.1755 0.0292358ZM12.6901 5.0585C12.6901 3.67546 11.5585 2.54388 10.1755 2.54388C8.79244 2.54388 7.66086 3.67546 7.66086 5.0585C7.66086 6.44154 8.79244 7.57312 10.1755 7.57312C11.5585 7.57312 12.6901 6.44154 12.6901 5.0585ZM17.7193 17.6316C17.4678 16.7389 13.5702 15.117 10.1754 15.117C6.79327 15.117 2.92076 16.7263 2.63158 17.6316H17.7193ZM0.117004 17.6316C0.117004 14.2871 6.81847 12.6023 10.1755 12.6023C13.5325 12.6023 20.234 14.2871 20.234 17.6316V20.1462H0.117004V17.6316Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="w-[34px] h-[34px] mt-1 bg-[#e0e0e0] rounded-full flex justify-center items-center">
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.1755 0.0292358C7.39687 0.0292358 5.14629 2.27982 5.14629 5.05848C5.14629 7.83713 7.39687 10.0877 10.1755 10.0877C12.9542 10.0877 15.2048 7.83713 15.2048 5.05848C15.2048 2.27982 12.9542 0.0292358 10.1755 0.0292358ZM12.6901 5.0585C12.6901 3.67546 11.5585 2.54388 10.1755 2.54388C8.79244 2.54388 7.66086 3.67546 7.66086 5.0585C7.66086 6.44154 8.79244 7.57312 10.1755 7.57312C11.5585 7.57312 12.6901 6.44154 12.6901 5.0585ZM17.7193 17.6316C17.4678 16.7389 13.5702 15.117 10.1754 15.117C6.79327 15.117 2.92076 16.7263 2.63158 17.6316H17.7193ZM0.117004 17.6316C0.117004 14.2871 6.81847 12.6023 10.1755 12.6023C13.5325 12.6023 20.234 14.2871 20.234 17.6316V20.1462H0.117004V17.6316Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
              <div className="w-full">
                <div className="flex space-x-5 items-center">
                  <h3 className="text-[#2f80ed] font-lato font-bold text-[16px]">
                    {data.owner.firstName} {data.owner.lastName}
                  </h3>
                  <p className="text-xs text-[#4F4F4F]">
                    {moment(data.publishDate).format("MM-DD-YYYY HH:MM")}
                  </p>
                </div>
                <h4 className="font-bold font-lato text-[14px] text-[#4F4F4F]">
                  {data.owner.firstName} {data.owner.lastName}:
                </h4>
                <div className="flex w-full items-center justify-between">
                  <p className="text-sm text-[#4F4F4F]">{data.text}</p>
                  <div
                    className={`h-2 w-2 ${
                      read.includes(data.id) ? "bg-transparent" : "bg-[#EB5757]"
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
