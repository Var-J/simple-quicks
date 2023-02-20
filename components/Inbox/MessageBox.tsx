import React, { useEffect, useState } from "react";
import axios from "axios";
import { Comments } from "../../typing";
import { BsArrowLeftShort, BsPlus } from "react-icons/bs";

type Props = {
  id: string;
  setId: any;
  setButton: any;
  title: string;
};

function MessageBox({ id, setId, setButton, title }: Props) {
  const [data, setData] = useState<Comments[] | []>([]);

  useEffect(() => {
    axios
      .get(`https://dummyapi.io/data/v1/post/${id}/comment?limit=10`, {
        headers: { "app-id": process.env.NEXT_PUBLIC_DUMMYAPI_APP_ID },
      })
      .then(({ data }) => setData(data.data))
      .catch(console.error);
  }, []);

  console.log(data);

  return (
    <>
    <div className="px-4 py-2 border-b border-[#cdcdcd]">
      <div className="flex justify-between space-x-2 items-center text-[#333333]">
        <BsArrowLeftShort className="h-10 w-10 cursor-pointer" onClick={() => setId("")} />
        <div className="w-full text-left">
            <h1 className="text-[#2f80ed] font-semibold">{title}</h1>
            <h3 className="text-sm text-[#4f4f4f]">3 participants</h3>
        </div>
        <BsPlus className="h-10 w-10 rotate-45 cursor-pointer" onClick={() => setButton(0)} />
      </div>
    </div>
    <div className="px-4">
        {data.map((data) => (
            <>
            <h4 className="mt-4 text-blue-400 font-semibold text-sm">{data.owner.firstName} {data.owner.lastName}</h4>
            <div className="w-fit p-2 bg-blue-200 rounded-lg">
                <p>{data.message}</p>
                <p>{data.publishDate}</p>
            </div>
            </>
        ))}
    </div>
    <form className="absolute bottom-0 w-full p-4 px-3">
        <div className="w-full flex items-center rounded-md shadow-sm space-x-4">
          <input
            type="text"
            className="w-full h-full py-2 px-4 outline-none rounded-md border border-black"
            placeholder="Type a new message"
          />
          <button type="submit" className="px-4 py-2 bg-[#2f80ed] text-white font-semibold rounded-md">Send</button>
        </div>
      </form>
    </>
  );
}

export default MessageBox;
