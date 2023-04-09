import React from "react"
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs"
import { HiSpeakerWave } from "react-icons/hi2"

import "./DebateAction.css"


const DebateAction = ({ handleMicToggle, micMuted, handleLeaveRoom }) => {









  return (
    <div className="DebateActionWrapper">
      <HiSpeakerWave />
      {


        micMuted ? <BsFillMicMuteFill onClick={handleMicToggle} /> : <BsFillMicFill className="activeMic" onClick={handleMicToggle} />
      }
      <button className="leaveBtn" onClick={handleLeaveRoom}>
        LEAVE
      </button>
    </div>
  )
}

export default DebateAction