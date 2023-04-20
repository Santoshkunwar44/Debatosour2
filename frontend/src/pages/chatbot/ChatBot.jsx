import { useState } from "react"
import AiOptions from "../../components/ChatBot/AIOptions/AiOptions"
import MessageInput from "../../components/ChatBox/MessageInput/MessageInput"
import MessageText from "../../components/ChatBox/MessageText"
import Sidebar from "../../Layouts/ChatAI/Sidebar/Sidebar"
import Navbar from "../../Layouts/Navbar/Navbar"
import { getBotMessageApi } from "../../utils/Api"
import "./ChatBot.css"

const ChatBot = () => {


  const [prompt, setPrompt] = useState("")

  const getChatBotMessage = async () => {
    try {
      const res = await getBotMessageApi({
        prompt
      })
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }




  return (

    <>
      <Navbar />
      <div className="ChatbotWrapper">

        <Sidebar />


        <div className="chat_bot_message_play_ground">
          <AiOptions />
          <div className="chat_box_message">

            {/* <MessageText text="Welcome to Debatasour !!" />
            <MessageText text="How can i help  you ?" />
            <MessageText text="We are currently unavailable please get back to us after some hour" />
            <MessageText own={true} text="Hello i want to know about this site . About the work flow of the debate session." />
            <MessageText own={true} text="How a  beginner can join to the debate and be a debator?" />
 */}

          </div>
          <MessageInput handleSubmit={getChatBotMessage} />
        </div>
      </div>
    </>
  )
}

export default ChatBot