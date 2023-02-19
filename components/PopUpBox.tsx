import React from "react";
import { SlMagnifier } from 'react-icons/sl'

type Props = {
  button: number;
};

function PopUpBox({ button }: Props) {
  return (
    <div
      className={`${
        button !== 0 ? "block" : "hidden"
      } h-[64%] aspect-square absolute bg-white right-10 bottom-32 rounded-md`}
    >
      {button == 1 ? (
        <div className="w-full p-4 px-8">
          <div className="w-full border border-black/50 px-10 h-4 p-3 flex items-center rounded-md shadow-md">
            <input type="text" className="w-full h-fit outline-none text-sm" placeholder="Search" />
            <SlMagnifier className="h-4 w-4" />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default PopUpBox;
