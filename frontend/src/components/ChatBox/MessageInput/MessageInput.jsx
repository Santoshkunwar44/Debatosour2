import React, { useState, useEffect } from 'react'
import "./MessageInput.css"
import { BsFillSendFill } from "react-icons/bs"
import { MdKeyboardVoice } from 'react-icons/md';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const MessageInput = ({ isLiveChat }) => {

  const [voiceText, setVoiceText] = useState("");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();


  useEffect(() => {
    setVoiceText(transcript)

  }, [transcript]);

  const handleInputChange = (event) => {

    setVoiceText(event.target.value);

  }

  const handleListen = () => {
    if (listening) {
      SpeechRecognition.stopListening()
    } else {
      SpeechRecognition.startListening({ continuous: true })
    }
  }
  return (
    <div className='MessageInputWrapper'  >
      <MdKeyboardVoice className={`voiceText ${listening ? "active_speaking" : ""}`} onClick={handleListen} />
      <input className='message_input' type="text" placeholder={` ${!isLiveChat ? "Ask anything to Debatasour chatbot..." : "Say something in live chat..."}`} onChange={handleInputChange} value={voiceText} />
      <div className='sent_message_box'>
        <BsFillSendFill />

      </div>
    </div>
  )
}

export default MessageInput