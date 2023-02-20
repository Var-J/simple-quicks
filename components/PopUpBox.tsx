import React, { useState } from "react";
import MessageBox from "./Inbox/MessageBox";
import MessagesList from "./Inbox/MessagesList";
import ToDoList from "./Task/ToDoList";

type Props = {
  button: number;
  setButton: any;
};

function PopUpBox({ button, setButton }: Props) {
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")

  return (
    <div
      className={`${
        button !== 0 ? "block" : "hidden"
      } h-[64%] aspect-square absolute bg-white right-10 bottom-32 rounded-md`}
    >
      {button == 1 && id == "" ? (
        <MessagesList setId={setId} setTitle={setTitle} />
      ) : button == 1 && id !== "" ? (
        <MessageBox id={id} setId={setId} title={title} setButton={setButton}/>
      ) : (
        <ToDoList />
      )}
    </div>
  );
}

export default PopUpBox;
