import React, { useEffect, useState } from 'react'
import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs'
import "./DebatorView.css"
import UserProfile from "../../popovers/viewprofile/UserProfile"

const DebatorView = ({ debator, activeSpeakers, pink }) => {

  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {



    if (debator.type !== "audience") {


      if (activeSpeakers.some(speaker => speaker.uid.toString() === debator.rtcUid.toString() && speaker.level > 50)) {
        setIsSpeaking(true)
      } else {
        setIsSpeaking(false)
      }
    }
  }, [activeSpeakers, debator])



  return (
      <UserProfile userId={debator?.id}>

    <div className={`debatorViewWrapper ${pink ? "pink" : "blue"} ${isSpeaking ? "isSpeaking" : ""} `}>
      <img referrerPolicy="no-referrer" className='debator_img' src={debator.avatar} alt="userImg" />
      <p className='debator_name' > {debator.username} </p >
      {/* <div className='action_button_box'>
        {
          isSpeaking ? <BsFillMicFill /> : <BsFillMicMuteFill />
        }
      </div> */}
    </div>
        </UserProfile>
  )
}

export default DebatorView