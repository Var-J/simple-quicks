import React, { useState } from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { VscNote } from 'react-icons/vsc'
import { HiOutlineChatAlt2 } from 'react-icons/hi'

type Props = {
    button: number;
    setButton: any;
}

function PopUpIcon({ button, setButton }: Props) {
    const [openMenu, setOpenMenu] = useState(false);

    const handleButton = (i: number) => {
        if (button == i) {
            setButton(0)
            setOpenMenu(false)
        } else {
            setOpenMenu(false)
            setButton(i)
        }
    }

  return (
    <div className={`absolute bottom-10 right-10 flex cursor-pointer items-center ${button == 1 ? 'space-x-6' : button == 2 ? 'space-x-reverse space-x-6' : 'space-x-4'}`}>
      <div className={`relative ${openMenu || button !== 0 ? 'block' : 'hidden'} ${button == 2 ? 'order-2' : 'order-1'}`}>
        <p className={`text-white font-semibold absolute -top-7 w-full text-center ${openMenu == false ? 'hidden' : 'block'}`}>Task</p>
          <button onClick={() => handleButton(2)} className={`${button == 2 ? 'h-16 w-16 bg-[#f6c68d] drop-shadow-[-12px_0px_0px_rgba(255,255,255,0.2)]' : 'h-14 w-14 bg-white'}  rounded-full flex items-center justify-center`}>
            <VscNote className={` ${button == 2 ? 'h-8 w-8 text-white' : 'h-6 w-6 text-[#f6c68d]'} `} />
          </button>
      </div>
      <div className={`relative ${openMenu || button !== 0 ? 'block' : 'hidden'} ${button == 1 ? 'order-2' : 'order-1'}`}>
        <p className={`text-white font-semibold absolute -top-7 w-full text-center ${openMenu == false ? 'hidden' : 'block'}`}>Inbox</p>
          <button onClick={() => handleButton(1)} className={`${button == 1 ? 'h-16 w-16 bg-[#8785ff] drop-shadow-[-12px_0px_0px_rgba(255,255,255,0.2)]' : 'h-14 w-14 bg-white'}  rounded-full flex items-center justify-center`}>
            <HiOutlineChatAlt2 className={` ${button == 1 ? 'h-8 w-8 text-white' : 'h-6 w-6 text-[#8885ff]'} `} />
          </button>
      </div>
      <button onClick={() => setOpenMenu(!openMenu)} className={`${button !== 0 ? "hidden" : "block order-2"} h-16 w-16 rounded-full bg-[#2f80ed] flex items-center justify-center`}>
        <BsFillLightningChargeFill className="h-8 w-8 text-white" />
      </button>
    </div>
  );
}

export default PopUpIcon;
