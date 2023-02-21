import React, { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { Comments, Posts } from "../../typing";
import { BsArrowLeftShort, BsPlus } from "react-icons/bs";
import moment from "moment";
import { v4 as uuid } from 'uuid'

type Props = {
  id: string;
  setId: any;
  setButton: any;
  firstPost: Posts;
};

function MessageBox({ id, setId, setButton, firstPost }: Props) {
  const [data, setData] = useState<Comments[] | []>([]);
  const [input, setInput] = useState("")
  const [more, setMore] = useState("")

  useEffect(() => {
    axios
      .get(`https://dummyapi.io/data/v1/post/${id}/comment?limit=10`, {
        headers: { "app-id": process.env.NEXT_PUBLIC_DUMMYAPI_APP_ID },
      })
      .then(({ data }) => setData(data.data))
      .catch(console.error);
  }, [id]);

  let participants = 1
  let count = 0
  let dummyArray = [firstPost.owner.id]

  for (let i = 0; i < data.length; i++) {
    dummyArray.push(data[i].owner.id)
  }
  console.log(dummyArray)

  for (let i = 0; i < dummyArray.length; i++) {
    for (let j = 0; j < dummyArray.length; j++) {
        if (dummyArray[i] == '1') {
        }
        else if (dummyArray[i] !== dummyArray[j]) {
            count += 1
        }
        if (count == dummyArray.length - 1) {
            participants += 1
            count = 0
        }
    }}

  const newData: Comments[] = [...data]

  const addMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage = input
    setInput("")
    const currentDate = new Date()
    const dateTime = currentDate.toISOString()
    const uid = uuid()
    newData.push({
        id: uid,
        message: newMessage,
        owner: {
            id: '1',
            title: 'Mr.',
            firstName: "You",
            lastName: '',
            picture: ''
        },
        post: firstPost.id,
        publishDate: dateTime
      })
    setData(newData)
  }

  const openMore = (x: string) => {
    if (more == '' || more !== x) {
      setMore(x)
    } else {
      setMore('')
    }
  }

  return (
    <div className="flex flex-col h-full w-full">
    <div className="px-4 py-2 border-b h-fit border-[#cdcdcd]">
      <div className="flex justify-between space-x-2 w-full h-fit items-center text-[#333333]">
        <BsArrowLeftShort className="h-10 w-10 cursor-pointer" onClick={() => setId("")} />
        <div className="w-full text-left">
            <h1 className="text-[#2f80ed] font-semibold">{firstPost.owner.firstName} {firstPost.owner.lastName}</h1>
            <h3 className="text-sm text-[#4f4f4f]">{participants} participants</h3>
        </div>
        <BsPlus className="h-10 w-10 rotate-45 cursor-pointer" onClick={() => setButton(0)} />
      </div>
    </div>
    <div className="px-4 w-full h-full flex flex-col-reverse overflow-y-scroll ">
        {data.sort((a, b) => Date.parse(b.publishDate) - Date.parse(a.publishDate)).map((set, i) => (
          <>
            <div key={i} className={`mb-2 ${set.owner.id=='1' ? 'w-full flex flex-col items-end' : ''}`}>
              {set.owner.id == (i < data.length - 1 ? data[i+1].owner.id : '') ? 
              <></>
              :
              <h4 className={`${set.owner.id == '1' ? 'text-[#b47ce8]':'text-blue-400'} font-semibold text-sm`}>{set.owner.firstName} {set.owner.lastName}</h4>
              }
              <div className={`${set.owner.id == '1' ? 'flex-row-reverse space-x-reverse' : '' } flex items-start space-x-2`}>
            <div className={`w-fit p-2 ${set.owner.id == '1' ? 'bg-[#eedcff]':'bg-blue-200'} rounded-md`}>
                <p>{set.message}</p>
                <p className="text-xs text-[#817b86] mt-1">{moment(set.publishDate).format('HH.MM')}</p>
            </div>
            <div className="flex relative">
            <button onClick={() => openMore(set.id)} className="-my-2 text-lg font-semibold">...</button>
            <div className={`${more == set.id ? 'block' : 'hidden'} absolute ${set.message.length > 15 ? 'left-5' : 'right-5'} w-24 text-sm `}>
              <button className="w-full py-1 px-3 text-left border rounded-t-md text-blue-500">Edit</button>
              <button className="w-full py-1 px-3 text-left border rounded-b-md text-red-500">Delete</button>
            </div>
            </div>
            </div>
            </div>
            {Date.parse(set.publishDate) - (i < data.length -1 ? Date.parse(data[i+1].publishDate) : 0) > 86400 ? 
            <div className="my-1 flex items-center space-x-8">
              <div className="w-full h-[1px] bg-[#a7a7a7]"/>
              <p className="whitespace-nowrap font-bold text-sm text-[#4f4f4f] ">{moment(data[i].publishDate).format("MMMM DD, YYYY")}</p>
              <div className="w-full h-[1px] bg-[#a7a7a7]"/></div> 
              : 
              <></>}
          </>
        ))}
         <div>
        <h4 className="mt-4 text-blue-400 font-semibold text-sm">{firstPost.owner.firstName} {firstPost.owner.lastName}</h4>
        <div className="w-1/2 h-auto relative p-2 bg-blue-200 rounded-lg mb-1">
                <img src={firstPost.image} alt="" className="object-contain rounded-md"/>
                <p className="text-xs text-[#817b86] mt-1">{firstPost.publishDate.split("T")[1].split('Z')[0].split(":")[0]}.{firstPost.publishDate.split("T")[1].split('Z')[0].split(":")[1]}</p>
        </div>
        <div className="w-fit p-2 bg-blue-200 rounded-lg">
            <p>{firstPost.text}</p>
            <p className="text-xs text-[#817b86] mt-1">{firstPost.publishDate.split("T")[1].split('Z')[0].split(":")[0]}.{firstPost.publishDate.split("T")[1].split('Z')[0].split(":")[1]}</p>
        </div>
        </div>
    </div>
    <form onSubmit={addMessage} className="h-fit w-full p-4 px-3">
        <div className="w-full flex items-center rounded-md shadow-sm space-x-4">
          <input
            type="text"
            value = {input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-full py-2 px-4 outline-none rounded-md border border-black"
            placeholder="Type a new message"
          />
          <button type="submit" disabled={!input} className="px-4 py-2 bg-[#2f80ed] text-white font-semibold rounded-md disabled:opacity-50 disabled:cursor-not-allowed">Send</button>
        </div>
      </form>
    </div>
  );
}

export default MessageBox;
