import React, { useState } from 'react'
import PopUpBox from './PopUpBox'
import PopUpIcon from './PopUpIcon'

function PopUp() {
    const [button, setButton] = useState(0);
  return (
    <>
        <PopUpBox button={button}/>
        <PopUpIcon button={button} setButton={setButton}/>
    </>
  )
}

export default PopUp