import React, { useState } from "react";
import MessageBox from "./Inbox/MessageBox";
import MessagesList from "./Inbox/MessagesList";
import ToDoList from "./Task/ToDoList";
import { motion } from 'framer-motion'

type Props = {
  button: number;
  setButton: any;
};

function PopUpBox({ button, setButton }: Props) {
    const [id, setId] = useState("")
    const [firstPost, setFirstPost] = useState()
    const [read, setRead] = useState([])

  return (
    <motion.div
      initial={{scale:0, x: 400, y: 400}}
      whileInView={{scale: 1, x: 0, y: 0}}
      className={`${
        button !== 0 ? "block" : "hidden"
      } w-[734px] h-[737px] aspect-square absolute bg-white right-10 bottom-32 rounded-md`}
    >
      {button == 1 && id == "" ? (
        <MessagesList setId={setId} setFirstPost={setFirstPost} read={read}/>
      ) : button == 1 && id !== "" ? (
        <MessageBox id={id} setId={setId} firstPost={firstPost!} read={read} setRead={setRead} setButton={setButton}/>
      ) : button == 2 ? (
        <ToDoList />
      ) : <></>}
    </motion.div>
  );
}

export default PopUpBox;
