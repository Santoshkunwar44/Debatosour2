import MessageInput from "../../components/ChatBox/MessageInput/MessageInput"
import MessageText from "../../components/ChatBox/MessageText"
import Navbar from "../../Layouts/Navbar/Navbar"
import "./ChatBot.css"

const ChatBot = () => {
  return (

    <>
      <Navbar />
      <div className="ChatbotWrapper">

        <div className="chat_box_message">

          <MessageText text="Welcome to Debatasour !!" />
          <MessageText text="How can i help  you ?" />
          <MessageText text="We are currently unavailable please get back to us after some hour" />
          <MessageText own={true} text="Hello i want to know about this site . About the work flow of the debate session." />
          <MessageText own={true} text="How a  beginner can join to the debate and be a debator?" />


        </div>
        <MessageInput />
      </div>
    </>
  )
}

export default ChatBot