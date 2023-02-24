import React, { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  button: number;
  setButton: any;
};

function PopUpIcon({ button, setButton }: Props) {
  const [openMenu, setOpenMenu] = useState(false);

  const handleButton = (i: number) => {
    if (button == i) {
      setButton(0);
      setOpenMenu(false);
    } else {
      setOpenMenu(false);
      setButton(i);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`absolute bottom-10 right-10 flex cursor-pointer items-center ${
        button == 1
          ? "space-x-6"
          : button == 2
          ? "space-x-reverse space-x-6"
          : "space-x-4"
      }`}
    >
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={button == 0 ? { x: 0, opacity: 1 } : button == 1 ? {x: -5, opacity: 1} : {opacity: 1, x: 0}}
        exit={{scale:0}}
        className={`relative ${openMenu || button !== 0 ? "block" : "hidden"} ${
          button == 2 ? "order-2" : "order-1"
        }`}
      >
        <motion.p
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          transition={{delay: 0.3}}
          className={`text-white font-semibold absolute -top-7 w-full text-center ${
            openMenu == false ? "hidden" : "block"
          }`}
        >
          Task
        </motion.p>
        <button
          onClick={() => handleButton(2)}
          className={`${
            button == 2
              ? "h-16 w-16 bg-[#f6c68d] drop-shadow-[-12px_0px_0px_rgba(255,255,255,0.2)]"
              : "h-14 w-14 bg-white"
          }  rounded-full flex items-center justify-center`}
        >
          {button == 2 ? (
            <svg
              width="28"
              height="22"
              viewBox="0 0 28 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.70175 0.400635H25.3333C26.7164 0.400635 27.848 1.53221 27.848 2.91526V19.2603C27.848 20.6433 26.7164 21.7749 25.3333 21.7749H2.70175C1.31871 21.7749 0.187134 20.6433 0.187134 19.2603V2.91526C0.187134 1.53221 1.31871 0.400635 2.70175 0.400635ZM2.70172 2.91528V19.2603H12.7602V2.91528H2.70172ZM25.3333 19.2603H15.2749V2.91528H25.3333V19.2603ZM24.0761 7.31582H16.5322V9.20178H24.0761V7.31582ZM16.5322 10.4591H24.0761V12.3451H16.5322V10.4591ZM24.0761 13.6024H16.5322V15.4883H24.0761V13.6024Z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              width="29"
              height="22"
              viewBox="0 0 29 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.92984 0.400635H25.5614C26.9445 0.400635 28.076 1.53221 28.076 2.91526V19.2603C28.076 20.6433 26.9445 21.7749 25.5614 21.7749H2.92984C1.5468 21.7749 0.415222 20.6433 0.415222 19.2603V2.91526C0.415222 1.53221 1.5468 0.400635 2.92984 0.400635ZM2.9298 2.91528V19.2603H12.9883V2.91528H2.9298ZM25.5614 19.2603H15.5029V2.91528H25.5614V19.2603ZM24.3042 7.31582H16.7603V9.20178H24.3042V7.31582ZM16.7603 10.4591H24.3042V12.3451H16.7603V10.4591ZM24.3042 13.6024H16.7603V15.4883H24.3042V13.6024Z"
                fill="#F8B76B"
              />
            </svg>
          )}
        </button>
      </motion.div>
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        whileInView={button == 0 ? { x: 0, opacity: 1 } : button == 2 ? {x: -5, opacity: 1} : {opacity: 1, x: 0}}
        exit={{scale:0}}
        className={`relative ${openMenu || button !== 0 ? "block" : "hidden"} ${
          button == 1 ? "order-2" : "order-1"
        }`}
      >
        <motion.p
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          transition={{delay: 0.3}}
          className={`text-white font-semibold absolute -top-7 w-full text-center ${
            openMenu == false ? "hidden" : "block"
          }`}
        >
          Inbox
        </motion.p>
        <button
          onClick={() => handleButton(1)}
          className={`${
            button == 1
              ? "h-16 w-16 bg-[#8785ff] drop-shadow-[-12px_0px_0px_rgba(255,255,255,0.2)]"
              : "h-14 w-14 bg-white"
          }  rounded-full flex items-center justify-center`}
        >
          {button == 1 ? (
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.6433 0.514526H1.29826C0.606744 0.514526 0.0409546 1.08032 0.0409546 1.77184V19.3742L5.07019 14.3449H17.6433C18.3348 14.3449 18.9006 13.7791 18.9006 13.0876V1.77184C18.9006 1.08032 18.3348 0.514526 17.6433 0.514526ZM16.386 3.02908V11.8302H4.02665L3.28484 12.5721L2.5556 13.3013V3.02908H16.386ZM21.4152 5.54381H23.9298C24.6213 5.54381 25.1871 6.10959 25.1871 6.80112V25.6608L20.1579 20.6315H6.32748C5.63596 20.6315 5.07017 20.0657 5.07017 19.3742V16.8596H21.4152V5.54381Z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.8187 0.514526H1.47368C0.782159 0.514526 0.21637 1.08032 0.21637 1.77184V19.3742L5.24561 14.3449H17.8187C18.5102 14.3449 19.076 13.7791 19.076 13.0876V1.77184C19.076 1.08032 18.5102 0.514526 17.8187 0.514526ZM16.5614 3.02908V11.8302H4.20201L3.46019 12.5721L2.73095 13.3013V3.02908H16.5614ZM21.5907 5.54381H24.1053C24.7968 5.54381 25.3626 6.10959 25.3626 6.80112V25.6608L20.3334 20.6315H6.50296C5.81144 20.6315 5.24565 20.0657 5.24565 19.3742V16.8596H21.5907V5.54381Z"
                fill="#8885FF"
              />
            </svg>
          )}
        </button>
      </motion.div>
      <motion.button
        initial={{scale: 0.5}}
        whileInView={{scale: 1}}
        onClick={() => setOpenMenu(!openMenu)}
        className={`${
          button !== 0 ? "hidden" : "block order-2"
        } h-16 w-16 rounded-full bg-[#2f80ed] flex items-center justify-center`}
      >
        <svg
          width="18"
          height="32"
          viewBox="0 0 18 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.4427 0.335868C13.3618 0.948573 13.6101 2.19031 12.9974 3.10937L5.73704 14H16C16.7376 14 17.4153 14.4059 17.7634 15.0563C18.1114 15.7066 18.0732 16.4957 17.6641 17.1094L8.33077 31.1094C7.71807 32.0284 6.47633 32.2768 5.55727 31.6641C4.63821 31.0514 4.38986 29.8096 5.00257 28.8906L12.263 18H2C1.26241 18 0.584692 17.594 0.236654 16.9437C-0.111384 16.2934 -0.0732391 15.5043 0.335902 14.8906L9.66924 0.890568C10.2819 -0.0284895 11.5237 -0.276837 12.4427 0.335868Z"
            fill="white"
          />
        </svg>
      </motion.button>
    </motion.div>
  );
}

export default PopUpIcon;
