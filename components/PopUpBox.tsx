import React, { useState } from "react";
import { Posts } from "../typing";
import MessageBox from "./Inbox/MessageBox";
import MessagesList from "./Inbox/MessagesList";
import ToDoList from "./Task/ToDoList";

type Props = {
  button: number;
  setButton: any;
};

function PopUpBox({ button, setButton }: Props) {
    const [id, setId] = useState("")
    const [firstPost, setFirstPost] = useState()
    const [read, setRead] = useState([])

  return (
    <div
      className={`${
        button !== 0 ? "block" : "hidden"
      } h-[64%] aspect-square absolute bg-white right-10 bottom-32 rounded-md`}
    >
      {button == 1 && id == "" ? (
        <MessagesList setId={setId} setFirstPost={setFirstPost} read={read}/>
      ) : button == 1 && id !== "" ? (
        <MessageBox id={id} setId={setId} firstPost={firstPost!} read={read} setRead={setRead} setButton={setButton}/>
      ) : (
        <ToDoList />
      )}
    </div>
  );
}

export default PopUpBox;
