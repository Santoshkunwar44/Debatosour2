import React from "react"
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs"
import { HiSpeakerWave } from "react-icons/hi2"
import {HiOutlineClipboardDocument} from "react-icons/hi2";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import "./DebateAction.css"
import { useToast } from '@chakra-ui/react';

const DebateAction = ({ 
  handleMicToggle,
   micMuted, 
   handleLeaveRoom 
   ,roomId  
   ,isUserParticipant 
   , isLive,
   WatchType}) => {


  const toast = useToast()
  const handleCopyLink=()=>{

    toast({
      title: '',
      description: "Link copied to clipboard",
      status: 'success',
      duration: 5000,
      position: "top",
      isClosable: true,
    })
  }





  return (
    <>
      <div className={"debateActionContainer"}>

        {
            isUserParticipant === null ? ".." : (isUserParticipant && isLive && WatchType === "PARTICIPANT")  ?
    <div className="DebateActionWrapper">
     
      {
        
        
        micMuted ? <BsFillMicMuteFill onClick={handleMicToggle} /> : <BsFillMicFill className="activeMic" onClick={handleMicToggle} />
      }
      <button className="leaveBtn" onClick={handleLeaveRoom}>
        LEAVE
      </button>
    </div>:""
        }
    <CopyToClipboard text={`${process.env.REACT_APP_FRONTEND_URL}/watch?debateId=${roomId}`} onCopy={handleCopyLink}>
      <button   className="copy_link_button">
        <HiOutlineClipboardDocument/> 
        <p>Copy Link</p>
      </button>
    </CopyToClipboard>
      </div>
      </>
  )
}

export default DebateAction