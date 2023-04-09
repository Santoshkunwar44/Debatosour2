import MessageInput from '../../ChatBox/MessageInput/MessageInput'
import MessageText from '../../ChatBox/MessageText'
import "./LiveChat.css"
const LiveChat = () => {
  return (
    <div className='LiveChatWrapper' >
      <div className="live_chat_header">

        <h2>LIVE CHATS</h2>
      </div>
      <div className='live_chat_message_list'>

        <MessageText text='Hello i like this debate . The right one is Awesome' />
        <MessageText text='Hello i like this debate . ' />
        <MessageText own={true} text='Hello guys i am in ' />
      </div>
      <MessageInput isLiveChat={true} />
    </div>
  )
}

export default LiveChat