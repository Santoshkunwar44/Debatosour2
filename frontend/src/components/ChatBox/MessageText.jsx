
import { useState } from "react"
import { FiMoreVertical } from "react-icons/fi"
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { useSpeechSynthesis } from "react-speech-kit";
import "./MessageText.css"

const MessageText = ({ text, own }) => {
  const [isHovered, setIsHovered] = useState(false)
  const { speak, speaking, cancel } = useSpeechSynthesis();

  const handleSpeak = (typee) => {

    if (speaking) {
      cancel()
      return;
    };
    speak({ text: typee })
  }




  return (
    <div className="messageTextWrapper" onMouseLeave={() => setIsHovered(false)} onMouseOver={() => setIsHovered(true)} style={{ marginLeft: own ? "auto" : "", flexDirection: own ? "row-reverse" : "row" }}>
      <div className="user_emoji">

        {
          own ? <img className="user_image" src="/images/user.jpeg" alt="userImg" /> : <p>🤖</p>
        }


      </div>
      <div className="message_content">
        {
          isHovered && <>

            <span className="message_time">3:00 AM</span>
            <div className={`hover_options ${own ? "myoption" : "otheroption"}`}>

              <FiMoreVertical className={`options_icon`} />
              <HiOutlineSpeakerWave onClick={() => handleSpeak(text)} className={`speakerIcon ${speaking ? "isspeaking" : ""}`} />
            </div>
          </>
        }

        <p className={`message_text_content ${own ? "my_text_content" : ""}`}>
          {text}
        </p>

      </div>
    </div>
  )
}

export default MessageText